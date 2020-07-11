(ns curlnoise.core
  (:require [quil.core :as q :include-macros true]
            [quil.middleware :as m]))

(def framerate 60)
(def res-x 500)
(def res-y res-x)
;; Lower grid size produces more points
(def grid-size 20)
;; Lower alpha produces *longer* particle trails
(def alpha 20)

(def renderer #?(:clj  :java2d
                 :cljs :p2d))
;; TODO: I still must add xorg.libXxf86vm and prepend to 'lein run':
;; LD_LIBRARY_PATH=/nix/store/695kqk35hndbcn2p6crcd8062p13j2a6-libXxf86vm-1.1.4/lib

;; Return sequence of [x y], with 
(defn grid [nx ny]
  "Returns lazy sequence of [x y], with x ranging in [0,nx) and y in [0,ny).

  That is, the resultant sequence has nx*ny elements and goes through every
  value of x and y in that range, varying y first and then x."
  (mapcat
   (fn [x] (map (fn [y] [x y]) (range ny)))
   (range nx)))

(defn pix-grid [grid-size res-x res-y]
  "Returns both grid indices and screen coordinates.

  grid-size is the desired size of a grid square in pixels.
  res-x and res-y are resolutions in X & Y (likewise in pixels).

  More specifically, this returns a lazy sequence of [x y px py] for
  which x & y are grid indices, and px & py are the corresponding
  *center* point of that grid square.

  x and y still are grid indices, but px and py are screen coordinates
  for the *center* of the respective grid square.
  "
  (let [nx (int (/ res-x grid-size))
        ny (int (/ res-y grid-size))
        offset (int (/ grid-size 2))
        x2pix #(+ offset (q/map-range % 0 nx 0 res-x))
        y2pix #(+ offset (q/map-range % 0 ny 0 res-y))
        ]
    (map (fn [[i j]] [i j (x2pix i) (y2pix j)]) (grid nx ny))))

(defn ramp [r]
  "Ramp function suggested in 'Curl-Noise for Procedural Fluid-Flow'"
  (cond (>= r 1.0)   1.0
        (<= r -1.0) -1.0
        :else (let [c1 (/ 15.0 8.0)
                    c3 (/ -10.0 8.0)
                    c5 (/ 3.0 8.0)]
                (+ (* r c1)
                   (* (Math/pow r 3) c3)
                   (* (Math/pow r 5) c5)))))

(defn dist2 [x y]
  (+ (* x x) (* y y)))

(defn dist [x y]
  (Math/sqrt (dist2 x y)))

(defn clamp [v v0 v1]
  (cond (< v v0) v0
        (> v v1) v1
        :else    v))

(defn setup []
  (q/background 255)
  (q/frame-rate framerate)
  (let [gr (q/create-graphics res-x res-y)]
    (q/with-graphics gr
      (q/background 255 alpha))
    {:frame 0
     :grid (pix-grid grid-size res-x res-y)
     :blend gr}))

(defn sdf-box [px py bx by]
  (let [bx2 (* 0.5 bx)
        by2 (* 0.5 by)
        dx (- (Math/abs (- px bx2)) bx2)
        dy (- (Math/abs (- py by2)) by2)
        l  (+ (dist (max 0.0 dx) (max 0.0 dy)) (min (max dx dy) 0.0))]
    l))

(defn update-state [state]
  (let [w (q/width)
        h (q/height)
        ;; Overall multiplier for velocity of particle:
        vf 0.2
        ;; Domain scale for noise function:
        scale 400.0
        ;; Amplitude multiplier for noise:
        noise-scale (* scale 3.0)
        ;; Radius for mouse-thingy:
        rad 50.0
        ;; Radius for rounded corners:
        rect-rad 100.0
        margin 0
        eps (* w 1e-3)
        mx (q/mouse-x)
        my (q/mouse-y)
        f-inv (/ scale)
        ;; "width of the modified region":
        d0 150.0
        ;; distance of point to a circle of radius 'rad'
        ;; centered at mouse cursor:
        d-mouse #(if (q/mouse-pressed?)
                   (- (dist (- mx %1) (- my %2)) rad)
                   1e6 ;; arbitrarily large value
                   )
        ;; function for distance to the border:
        d-border #(- rect-rad
                     (sdf-box (- %1 rect-rad) ; x
                              (- %2 rect-rad) ; y
                              (- w (* rect-rad 2)) ; width
                              (- h (* rect-rad 2)) ; height
                              ))
        ;; potential modulation function - takes (x,y):
        amp-fn #(ramp (min (/ (d-mouse %1 %2) d0)
                           (/ (d-border %1 %2) d0)))
        ;; Noise function - must take 3 arguments, (x,y,z):
        n-fn #(* noise-scale (q/noise (* f-inv %1) (* f-inv %2) (* f-inv %3)))
        ;; Overall amplitude function:
        p-fn #(* vf (amp-fn %1 %2) (n-fn %1 %2 %3))
        points
        (map (fn [pt]
               (let [[i j x y] pt
                     z (/ (:frame state) 50.0)
                     border (if (and (and (> x margin) (< x (- w margin)))
                                     (and (> y margin) (< x (- h margin))))
                              1.0 0.0)
                     ;; Potential at (x, y, z):
                     n (p-fn x y z)
                     n-dx (p-fn (+ x eps) y z)
                     n-dy (p-fn x (+ y eps) z)
                     ;; Velocity by finite differences:
                     vx (/ (- n-dy n) eps)
                     vy (/ (- n n-dx) eps)
                     ;; Updated point position:
                     x2 (+ x vx)
                     y2 (+ y vy)]
                 [i j x2 y2]
                 )) (:grid state))]
    (-> state
        (update :frame inc)
        (assoc :grid points))))

(def show-fn false)

(defn draw-field [offset sdf domain-xform]
  (let [pix (q/pixels)
        w   (q/width)
        h   (q/height)
        ]
    (doseq [point (grid (q/width) (q/height))]
      (let [[px py] point
            [px2 py2] (domain-xform px py)
            w2      w
            h2      h
            d       (sdf px2 py2)
            step    (/ (mod d offset) offset)
            val     (int (* step 255))
            [r g b] (if (>= (Math/abs d) (* offset 0.5))
                      [val val val]
                      [val 0.0 0.0])]
        #?(:clj  (aset-int pix (+ px (* py w)) (q/color r g b))
           :cljs (let [offset (* 4 (+ px (* py w)))]
                   (aset pix offset       r)
                   (aset pix (+ offset 1) g)
                   (aset pix (+ offset 2) b)
                   (aset pix (+ offset 3) 255) ;; alpha
                   ))
        ))
    (q/update-pixels)))

(defn draw-state [state]
  ;;#?(:cljs (q/translate (- (/ res-x 2)) (- (/ res-y 2))))
  ;; TODO: Is this a p3d thing or a cljs thing?
  
  (q/image (:blend state) 0 0)
  (let [pix (q/pixels)
        w (q/width)
        h (q/height)
        color (q/color 0)
        rad 50
        ]
    (if show-fn
      (draw-field
       10.0
       #(- rad (sdf-box %1 %2 (- (q/width) (* rad 2)) (- (q/height) (* rad 2))))
       #(vec [(- (- %1 rad) 0.0)
              (- (- %2 rad) 0.0)])
       )
      (doseq [point (:grid state)]
        (let [[_ _ px py] point
              ix (clamp (int px) 0 (- w 1))
              iy (clamp (int py) 0 (- h 1))]
          #?(:clj  (aset-int pix (+ ix (* iy w)) color)
             :cljs (let [offset (* 4 (+ ix (* iy w)))]
                     (aset pix offset 0) ;; R
                     (aset pix (+ offset 1) 0) ;; G
                     (aset pix (+ offset 2) 0) ;; B
                     (aset pix (+ offset 3) 255) ;; alpha
                     )))))
    (q/update-pixels)))

(defn settings []
  ;; https://github.com/quil/quil/issues/299
  (q/pixel-density 1))

(defn ^:export run-sketch []
  (q/defsketch curlnoise
    :title "Curl Noise"
    :host "curlnoise"
    :size [res-x res-y]
    :renderer renderer
    :setup setup
    :settings settings
    :update update-state
    :draw draw-state
    :features [:keep-on-top]
    :middleware #?(:clj  [m/fun-mode m/pause-on-error]
                   :cljs [m/fun-mode])
    ))
;; TODO: Should I run with q/sketch rather than q/defsketch?

(defn -main [& args]
  (run-sketch))

;; Just for testing:
;; (run-sketch)

