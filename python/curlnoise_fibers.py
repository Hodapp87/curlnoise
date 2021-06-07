#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# (setq python-shell-interpreter (shell-command-to-string "nix-shell --command \"which python3 | tr -d '\n'\""))

import functools
import math

import numpy as np
import vispy
import vispy.scene
from vispy.scene import visuals 

import opensimplex

def gradient(fn, eps=1e-3):
    eps_inv = 1.0 / eps
    # Numerical gradient by finite differences
    def _grad(x, y, z):
        p    = fn(x,     y,     z)
        p_dx = fn(x+eps, y,     z)
        p_dy = fn(x,     y+eps, z)
        p_dz = fn(x,     y,     z+eps)
        return (p_dx - p)*eps_inv, (p_dy - p)*eps_inv, (p_dz - p)*eps_inv
    return _grad

def curl_3d(grads):
    # 'grads' should be of shape (..., 3, 3).  Each 3x3 matrix should
    # be the Jacobian of the potential.
    cx = grads[..., 2, 1] - grads[..., 1, 2]
    cy = grads[..., 0, 2] - grads[..., 2, 0]
    cz = grads[..., 1, 0] - grads[..., 0, 1]
    return np.stack((cx, cy, cz), axis=-1)

class Potential(object):
    def __init__(self):
        self.x_spx = opensimplex.OpenSimplex(seed=0)
        self.y_spx = opensimplex.OpenSimplex(seed=12345)
        self.z_spx = opensimplex.OpenSimplex(seed=45678)
    def eval(self, x, y, z):
        y2 = y# + 0.5*math.sin(3*x) + 0.5*math.sin(2.5*z)
        x2 = x
        z2 = z
        f1 = np.array([
            self.x_spx.noise3d(x2, y2, z2),
            self.y_spx.noise3d(x2, y2, z2),
            self.z_spx.noise3d(x2, y2, z2),
        ])
        f2 = np.array([z*0.5, 0, 0])
        return f1# + f2
    def grad(self, x, y, z, eps=1e-3):
        # Returns gradients in matrix form.
        # 
        # Element (i, j) is gradient of i'th component with respect to
        # j'th component, where components are (x,y,z) - i.e. row 0 is
        # (d/dx Px, d/dy Px, d/dz Px).  I'm fairly sure this is just
        # the Jacobian.
        p    = self.eval(x,     y,     z)
        p_dx = self.eval(x+eps, y,     z)
        p_dy = self.eval(x,     y+eps, z)
        p_dz = self.eval(x,     y,     z+eps)
        return (np.stack((p_dx, p_dy, p_dz)) - p).T / eps

def generate(grid):
    p = Potential()
    grads = np.array([p.grad(*pt) for pt in grid])
    curl = curl_3d(grads)
    return curl

class Data(object):
    def __init__(self, view):
        self.use_tubes = False
        self.view = view
        s = 0.1
        self.s = s
        count = 8
        xs = zs = np.linspace(-s, s, count)
        ys = np.array([0])
        self.points = np.array([i.flatten() for i in np.meshgrid(xs,ys,zs)]).T
        self.points_old = None
        if self.use_tubes:
            self.visual = vispy.scene.visuals.Line(
                color=(1,1,1,0.75),
                connect='segments',
            )
            self.view.add(self.visual)
            self.view.camera = 'turntable'
            self.update()
        else:
            p = self.points
            points = [p]
            for i in range(200):
                print(i)
                curl = generate(p)
                p2 = p + curl*0.1*s
                p = p2
                points.append(p)
            points = np.stack(points, axis=1) / s
            # points = (count*count, N, 3) where first dimension chooses which
            # trajectory, and second dimension proceeds along time/iterations
            # of that trajectory.
            for traj in points:
                tube = vispy.scene.visuals.Tube(points=traj, radius=0.4*s)
                self.view.add(tube)
            self.view.camera = 'turntable'
    def update(self, ev=None):
        if not self.use_tubes:
            return
        t = 0 if ev is None else ev.elapsed
        # Get velocity for current points:
        curl = generate(self.points)
        # 
        a1 = self.points
        a2 = self.points + curl*0.1*self.s
        lines = np.hstack((a1, a2)).reshape(self.points.shape[0]*2, -1) / self.s
        self.points_old = np.vstack((self.points_old, lines))
        maxpoints = self.points.shape[0] * 200
        extra = self.points_old.shape[0] - maxpoints
        if extra > 0:
            self.points_old = self.points_old[extra:]
        self.visual.set_data(
            pos=self.points_old,
            #arrows=np.hstack((a1, a2)),
        )
        self.points = a2
        # self.scatter = visuals.Markers()
        # self.scatter.set_data(self.d, edge_color=None, face_color=(1, 0.5, 1, .5), size=4)
        # view.add(self.scatter)
        #m = np.array([[np.cos(t), np.sin(t*1.01), np.cos(t*1.02)]])
        #d2 = self.d*m
        #self.scatter.set_data(d2, edge_color=None, face_color=(1, 0.5, 1, .5), size=4)

def main():
    #
    # Make a canvas and add simple view
    #
    canvas = vispy.scene.SceneCanvas(keys='interactive', show=True)
    view = canvas.central_widget.add_view()
    import sys
    # add a colored 3D axis for orientation
    axis = visuals.XYZAxis(parent=view.scene)
    timer = vispy.app.Timer()
    da = Data(view)
    # Problem is how slow update() is:
    timer.connect(da.update)
    timer.start(0.05)
    if sys.flags.interactive != 1:
        vispy.app.run()

if __name__ == '__main__':
    main()
