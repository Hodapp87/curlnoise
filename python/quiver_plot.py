# -*- coding: utf-8 -*-

# Scratch code for visualizing a 3D vector field with arrows

import functools

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
    # 'grads' should be of shape (..., 3, 3);
    # 2nd-to-last dimension is gradient of potential x, y, z.
    # Last dimension is gradient of that w.r.t. x, y, and z.
    cx = grads[..., 2, 1] - grads[..., 1, 2]
    cy = grads[..., 0, 2] - grads[..., 2, 0]
    cz = grads[..., 1, 0] - grads[..., 0, 1]
    return np.stack((cx, cy, cz), axis=-1)

def generate(grid, t=0):
    x_spx = opensimplex.OpenSimplex(seed=0)
    y_spx = opensimplex.OpenSimplex(seed=12345)
    z_spx = opensimplex.OpenSimplex(seed=45678)
    # grad_x = gradient(x_spx.noise3d)
    # grad_y = gradient(y_spx.noise3d)
    # grad_z = gradient(z_spx.noise3d)
    # grad_x = gradient(functools.partial(x_spx.noise4d, t))
    # grad_y = gradient(functools.partial(y_spx.noise4d, t))
    # grad_z = gradient(functools.partial(z_spx.noise4d, t))
    grad_x = gradient(lambda x,y,z: x_spx.noise3d(x + t, y, z))
    grad_y = gradient(lambda x,y,z: y_spx.noise3d(x + t, y, z))
    grad_z = gradient(lambda x,y,z: z_spx.noise3d(x + t, y, z))
    grads = np.array([
        (grad_x(x,y,z), grad_y(x,y,z), grad_z(x,y,z))
        for (x,y,z) in grid
    ])
    curl = curl_3d(grads)
    return grid, curl
    #pos = np.random.normal(size=(count, 3), scale=0.2)
    # one could stop here for the data generation, the rest is just to make the
    # data look more interesting. Copied over from magnify.py
    #return pos
    # centers = np.random.normal(size=(50, 3))
    # indexes = np.random.normal(size=count, loc=centers.shape[0]/2.,
    #                            scale=centers.shape[0]/3.)
    # indexes = np.clip(indexes, 0, centers.shape[0]-1).astype(int)
    # scales = 2**(np.linspace(-2, 0.5, centers.shape[0]))[indexes][:, np.newaxis]
    # pos *= scales
    # pos += centers[indexes]
    # return pos

class Data(object):
    def __init__(self, view):
        self.view = view
        self.visual = vispy.scene.visuals.Arrow(
            color=(1,1,1,0.75),
            connect='segments',
            arrow_size=8,
            arrow_type="triangle_30",
        )
        self.view.add(self.visual)
        self.view.camera = 'turntable'  # or try 'arcball'
        #view.camera = 'arcball'
        s = 1
        count = 8
        xs = zs = np.linspace(-s, s, count)
        ys = np.array([0])
        self.grid = np.array([i.flatten() for i in np.meshgrid(xs,ys,zs)]).T
        self.update()
    def update(self, ev=None):
        t = 0 if ev is None else ev.elapsed
        grid, curl = generate(self.grid, t*0.4)
        a1 = grid
        a2 = grid + curl*0.1
        # So I guess if I give argument 'pos', it needs to be of shape
        # (2*N, 3) and consist of alternating starting & ending vertices?
        # The docs don't say a thing about this.
        self.visual.set_data(
            pos=np.hstack((a1, a2)).reshape(grid.shape[0]*2, -1),
            arrows=np.hstack((a1, a2)),
        )
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
