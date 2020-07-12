# curlnoise

A [Quil](http://www.quil.info/) sketch which implements what is
described in [Curl-Noise for Procedural Fluid
Flow](https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf).

Very much a work-in-progress as I am not especially experienced in
Clojure, nor in the mathematics of this paper.

## Usage

This runs in both Clojure via `lein run`, and ClojureScript via `lein
compile` or `lein figwheel`.

Uncomment the `(run-sketch)` and the below should work:

- LightTable - open `core.clj` and press `Ctrl+Shift+Enter` to evaluate the file.
- Emacs - run cider, open `core.clj` and press `C-c C-k` to evaluate the file.
- REPL - run `(require 'quil_perlin.core)`.

## Demo

See
[here](http://htmlpreview.github.io/?https://github.com/Hodapp87/curlnoise/blob/master/resources/public/index.html)
to run the ClojureScript version in the browser.

## TODO

- Better docs.
- Make things more interactive, e.g. let the user place obstacles.
- Factor out the potential function rather than burying it in
  `update-state`.
- Visualize amplitude function & potential function.  I have
  `draw-field` which `show-fn` enables, but it is rudimentary.
- Figure out reasonable boundary behavior.  I'd like to do toroidal,
  but I would need to gradually blend the potential function at the
  edges for this to work right (otherwise particles are just stuck at
  the boundaries due to the discontinuity).
- Use 'real' simplex or OpenSimplex noise implementation that has a
  gradient instead of doing it numerically?
