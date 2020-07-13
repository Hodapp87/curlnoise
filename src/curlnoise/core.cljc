(ns curlnoise.core
  (:require [quil.core :as q :include-macros true]
            [quil.middleware :as m]))

(def framerate 60)
(def res-x 500)
(def res-y res-x)
;; Number of particles to use:
(def particles 1000)
;; Lower alpha produces *longer* particle trails
(def alpha 30)

(def renderer #?(:clj  :java2d
                 :cljs :p2d))
;; TODO: I still must add xorg.libXxf86vm and prepend to 'lein run':
;; LD_LIBRARY_PATH=/nix/store/695kqk35hndbcn2p6crcd8062p13j2a6-libXxf86vm-1.1.4/lib

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

(defn magn2 [x y]
  "Returns squared magnitude of (x,y), i.e. squared distance to origin."
  (+ (* x x) (* y y)))

(defn magn [x y]
  "Returns magnitude of (x,y), i.e. distance to origin."
  (Math/sqrt (magn2 x y)))

(defn clamp [v v0 v1]
  "Returns value 'v', clamped into the range [v0,v1]."
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
     :pressed? false
     :mouse-x 0
     :mouse-y 0
     :grid (mapv (fn [_] (vec [(q/random (q/width)) (q/random (q/height))]))
                 (range particles))
     :blend gr}))

(defn sdf-box [x y bw bh]
  "Signed distance function for a box of dimensions (bw, bh).

  That is, this returns the signed distance from (x, y) to a box
  whose minimum coordinates are (0,0), and whose max coordinates
  are (bw, bh).  If the point is *inside* the box, the value is
  negative; if outside, it is positive.
  "
  (let [bw2 (* 0.5 bw)
        bh2 (* 0.5 bh)
        dx  (- (Math/abs (- x bw2)) bw2)
        dy  (- (Math/abs (- y bh2)) bh2)
        l   (+ (magn (max 0.0 dx) (max 0.0 dy)) (min (max dx dy) 0.0))]
    l))

;; Domain scale for noise function:
(def scale 500.0)
;; Amplitude multiplier for noise:
(def noise-scale (* scale 5.0))

(def f-inv (/ scale))
;; Potential function (2D + time):
(defn potential [x y t]
  "2D (+ time) potential function. Returns a scalar.

  The absolute value of the scalar doesn't matter, but its gradient of
  determines particle velocity. "
  (* noise-scale
     (+ (q/noise (* f-inv x) (* f-inv y) (* f-inv t))
        (q/noise (* f-inv x 2.0) (* f-inv y 2.0) (* f-inv t 1.61))
        )))
;; 1.61 is sort of arbitrarily chosen so that periods of the octaves
;; don't line up exactly

;; Delta used for 'gradient'. Multiplying screen width/height by 1e-3
;; to 1e-4 usually gives an acceptable value.
(def eps 0.5)
(def eps-inv (/ eps))

(defn gradient [p-fn x y t]
  "Numerical gradient of potential function 'p-fn' via finite differences.

  'p-fn' should be a function that takes 3 arguments - (x,y,t) - and
  returns a scalar for the potential at that position and time.

  Returns [d/dx, d/dy] of 'p-fn' at (x, y, t)."
  (let [p      (p-fn x         y         t)
        p-dx   (p-fn (+ x eps) y         t)
        p-dy   (p-fn x         (+ y eps) t)
        grad-x (* (- p-dx p) eps-inv)
        grad-y (* (- p-dy p) eps-inv)]
    [grad-x grad-y]))

;; TODO
(defn move-point [x y]
  "Move a particle by the potential at a point.

  Returns [x y] of the 'updated' point."
  )

;; Overall multiplier for velocity of particle:
(def vf 0.1)
;; Radius for mouse-whorl-thingy:
(def mouse-rad 20.0)
;; How strongly the mouse position influences drift:
(def mouse-strength 20.0)
;; Radius for rounded corners:
(def rect-rad 100.0)
;; "width of the modified region"; the paper uses this term, and
;; loosely, it is a scale factor for the ramp.  Larger values mean
;; that boundaries have influence over a larger area, and smaller
;; values have this influence over a smaller area (which makes for
;; correspondingly faster velocities in this region).
(def d0 200.0)

(defn update-state [state]
  (let [w (q/width)
        h (q/height)
        mx (q/mouse-x)
        my (q/mouse-y)
        pressed? (q/mouse-pressed?)
        ;; distance of point to a circle of radius 'rad'
        ;; centered at mouse cursor:
        d-mouse #(if pressed?
                   (- (magn (- mx %1) (- my %2)) mouse-rad)
                   1e6)
        ;; function for distance to the border:
        d-border #(- rect-rad
                     (sdf-box (- %1 rect-rad)      ; x
                              (- %2 rect-rad)      ; y
                              (- w (* rect-rad 2)) ; width
                              (- h (* rect-rad 2)) ; height
                              ))
        ;; potential modulation function - takes (x,y):
        amp-fn (fn [x y] (ramp (/ (d-mouse x y) d0)))
        ;; #(ramp (min (/ (d-mouse %1 %2) d0)
        ;;             (/ (d-border %1 %2) d0)
        ;;             ))
        mouse-drift #(if (or (< mx 0) (< my 0) (> mx w) (> my h))
                       0.0
                       (+ (* (- (/ mx w) 0.5) %2 mouse-strength)
                          (* (- (/ my h) 0.5) %1 (- mouse-strength))))
        ;; Noise function - must take 3 arguments, (x,y,z):
        n-fn #(+ (mouse-drift %1 %2) (potential %1 %2 %3))
        ;; Overall amplitude function:
        p-fn #(* vf (amp-fn %1 %2) (n-fn %1 %2 %3))
        ;; Time-value for potential function:
        t (/ (:frame state) 2.0)
        ;; The potential function (modified by a few things):
        f #(* vf (+ (mouse-drift %1 %2)
                    (* (potential %1 %2 %3)
                       (amp-fn %1 %2))))
        ;; Finally, update each point position:
        points (map
                (fn [pt]
                  (let [[x y] pt
                        [gx gy] (gradient f x y t)
                        
                        ;; Update points (perpendicular to gradient):
                        x2 (+ x gy)
                        y2 (- y gx)
                        ;; A particle that leaves the screen
                        ;; 'resurrects' in a random place, which is a
                        ;; little more interesting than having a
                        ;; boundary all around:
                        [x3 y3] (if (or (< x2 0) (> x2 w) (< y2 0) (> y2 h))
                                  [(q/random w) (q/random h)]
                                  [x2 y2])
                        ;; When mouse is pressed, particles inside the
                        ;; configured radius are likewise resurrected:
                        [x4 y4] (if (and pressed?
                                         (< (magn (- mx x) (- my y)) mouse-rad))
                                  [(q/random w) (q/random h)]
                                  [x3 y3])
                        ]
                    [x4 y4])) (:grid state))]
    (-> state
        (update :frame inc)
        (assoc :pressed? pressed?)
        (assoc :mouse-x mx)
        (assoc :mouse-y my)
        (assoc :grid points))))

;; Turn to true to enable kludgey visualization of the potential
;; field's isocontours:
(def show-fn false)

(defn grid [nx ny]
  "Returns lazy sequence of [x y], with x ranging in [0,nx) and y in [0,ny).

  That is, the resultant sequence has nx*ny elements and goes through every
  value of x and y in that range, varying y first and then x."
  (mapcat
   (fn [x] (map (fn [y] [x y]) (range ny)))
   (range nx)))

(defn draw-field [offset sdf domain-xform]
  "Kludgey experimental method to draw out isocontours of the
  potential field"
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
        (let [[px py] point
              ix (clamp (int px) 0 (- w 1))
              iy (clamp (int py) 0 (- h 1))]
          #?(:clj  (aset-int pix (+ ix (* iy w)) color)
             :cljs (let [offset (* 4 (+ ix (* iy w)))]
                     (aset pix offset 0)        ;; R
                     (aset pix (+ offset 1) 0)  ;; G
                     (aset pix (+ offset 2) 0)  ;; B
                     (aset pix (+ offset 3) 255) ;; alpha
                     )))))
    (q/update-pixels)
    (if (:pressed? state)
      (let [r (int mouse-rad)]
        (q/fill 0 255)
        (q/ellipse (:mouse-x state) (:mouse-y state) r r)))))

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

