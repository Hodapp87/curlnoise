(defproject curlnoise "0.1.0-SNAPSHOT"
  :description "Quil implementation of 'Curl-Noise for Procedural Fluid-Flow'"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :aot [curlnoise.core]
  :main curlnoise.core
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [quil "3.1.0"]])
