(ns curlnoise.core
  (:require [quil.core :as q]
            [quil.middleware :as m]))

(def framerate 30)
(def res-x 800)
(def res-y res-x)
;; Lower grid size produces more points
(def grid-size 25)
;; Lower alpha produces *longer* particle trails
(def alpha 10)

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

(defn setup []
  (q/background 255)
  (q/frame-rate framerate)
  {:frame 0
   :grid (pix-grid grid-size res-x res-y)
   })

(defn update-state [state]
  (let [w (q/width)
        h (q/height)
        ;; Overall multiplier for velocity of particle:
        vf 0.2
        ;; Domain scale for noise function:
        scale 400.0
        ;; Amplitude multiplier for noise:
        noise-scale (* scale 3.0)
        ;; Radius for mouse-thingy
        rad 50.0
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
        d-border (fn [x y]
                   (min
                    (- x margin)
                    (- y margin)
                    (- (- w margin) x)
                    (- (- h margin) y)))
        ;; potential modulation function - takes (x,y):
        amp-fn #(ramp (min (/ (d-mouse %1 %2) d0)
                           (/ (d-border %1 %2) d0)))
        ;;amp-fn (fn [x y] 1.0)
        ;; Noise function - must take 3 arguments, (x,y,z):
        n-fn #(* noise-scale (q/noise (* f-inv %1) (* f-inv %2) (* f-inv %3)))
        ;;n-fn (fn [x y z] (* x f-inv))
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

(defn draw-state [state]
  ;;(q/background 255)
  (q/fill 255 255 255 alpha)
  (q/rect 0 0 (q/width) (q/height))
  (q/stroke 0)
  (q/stroke-weight 3)
  (let [pix (q/pixels)
        w (q/width)
        color (+ 255 (* 256 255) (* 256 256 255))
        ]
    (doseq [point (:grid state)]
      (let [[i j px py] point
            ;;pix (q/pixels)
            ]
        ;;(aset-int pix (+ px (* py w)) color)
        (q/point px py)
        ))
    ;;(q/update-pixels)
    ))

(defn update-state-circles [state]
  (update state :frame inc))

(defn draw-state-circles [state]
  (q/background 240)
  (q/fill 0 0 0)
  (doseq [point (:grid state)]
    (let [[i j px py] point
          z (/ (:frame state) 50.0)
          x (/ i 10.0)
          y (/ j 10.0)
          rad (int (* (q/noise x y z) grid-size))]
      (q/ellipse px py rad rad))))

(q/defsketch curlnoise
  :title "Curl Noise"
  :size [res-x res-y]
  :setup setup
  :update update-state
  :draw draw-state
  :features [:keep-on-top]
  :middleware [m/fun-mode m/pause-on-error])

(defn -main [& args]
  (q/sketch
  :title "Curl Noise"
  :size [res-x res-y]
  :setup setup
  :update update-state
  :draw draw-state
  :features []
  :middleware [m/fun-mode]))
