{ pkgs ? import <nixpkgs> {} }:
pkgs.stdenv.mkDerivation rec {
  name = "vispy-test";

  # PyQt5 should be fine but seems to have other issues
  buildInputs = [
    (pkgs.python3.withPackages
      (ps: [
      ps.vispy
      ps.wxPython_4_0
      ps.sympy
      ps.jupyterlab
      ]))
  ];
}
