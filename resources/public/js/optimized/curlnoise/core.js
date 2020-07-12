// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('curlnoise.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('quil.core');
goog.require('quil.middleware');
curlnoise.core.framerate = (60);
curlnoise.core.res_x = (500);
curlnoise.core.res_y = curlnoise.core.res_x;
curlnoise.core.grid_size = (10);
curlnoise.core.alpha = (40);
curlnoise.core.renderer = cljs.core.cst$kw$p2d;
curlnoise.core.grid = (function curlnoise$core$grid(nx,ny){

return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (x){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (y){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(ny));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.range.cljs$core$IFn$_invoke$arity$1(nx)], 0));
});
curlnoise.core.pix_grid = (function curlnoise$core$pix_grid(grid_size,res_x,res_y){

var nx = ((res_x / grid_size) | (0));
var ny = ((res_y / grid_size) | (0));
var offset = ((grid_size / (2)) | (0));
var x2pix = ((function (nx,ny,offset){
return (function (p1__6098_SHARP_){
return (offset + quil.core.map_range(p1__6098_SHARP_,(0),nx,(0),res_x));
});})(nx,ny,offset))
;
var y2pix = ((function (nx,ny,offset,x2pix){
return (function (p1__6099_SHARP_){
return (offset + quil.core.map_range(p1__6099_SHARP_,(0),ny,(0),res_y));
});})(nx,ny,offset,x2pix))
;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (nx,ny,offset,x2pix,y2pix){
return (function (p__6100){
var vec__6101 = p__6100;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6101,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6101,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j,x2pix(i),y2pix(j)], null);
});})(nx,ny,offset,x2pix,y2pix))
,curlnoise.core.grid(nx,ny));
});
curlnoise.core.ramp = (function curlnoise$core$ramp(r){

if((r >= 1.0)){
return 1.0;
} else {
if((r <= -1.0)){
return -1.0;
} else {
var c1 = (15.0 / 8.0);
var c3 = (-10.0 / 8.0);
var c5 = (3.0 / 8.0);
return (((r * c1) + (Math.pow(r,(3)) * c3)) + (Math.pow(r,(5)) * c5));

}
}
});
curlnoise.core.dist2 = (function curlnoise$core$dist2(x,y){
return ((x * x) + (y * y));
});
curlnoise.core.dist = (function curlnoise$core$dist(x,y){
var G__6104 = curlnoise.core.dist2(x,y);
return Math.sqrt(G__6104);
});
curlnoise.core.clamp = (function curlnoise$core$clamp(v,v0,v1){
if((v < v0)){
return v0;
} else {
if((v > v1)){
return v1;
} else {
return v;

}
}
});
curlnoise.core.setup = (function curlnoise$core$setup(){
quil.core.background.cljs$core$IFn$_invoke$arity$1((255));

quil.core.frame_rate(curlnoise.core.framerate);

var gr = quil.core.create_graphics.cljs$core$IFn$_invoke$arity$2(curlnoise.core.res_x,curlnoise.core.res_y);
var gr__575__auto___6107 = gr;
var _STAR_graphics_STAR__orig_val__6105_6108 = quil.core._STAR_graphics_STAR_;
var _STAR_graphics_STAR__temp_val__6106_6109 = gr__575__auto___6107;
quil.core._STAR_graphics_STAR_ = _STAR_graphics_STAR__temp_val__6106_6109;

try{quil.core.begin_draw(gr__575__auto___6107);

quil.core.background.cljs$core$IFn$_invoke$arity$2((255),curlnoise.core.alpha);

quil.core.end_draw(gr__575__auto___6107);
}finally {quil.core._STAR_graphics_STAR_ = _STAR_graphics_STAR__orig_val__6105_6108;
}
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$frame,(0),cljs.core.cst$kw$grid,curlnoise.core.pix_grid(curlnoise.core.grid_size,curlnoise.core.res_x,curlnoise.core.res_y),cljs.core.cst$kw$blend,gr], null);
});
curlnoise.core.sdf_box = (function curlnoise$core$sdf_box(px,py,bx,by){
var bx2 = (0.5 * bx);
var by2 = (0.5 * by);
var dx = ((function (){var G__6110 = (px - bx2);
return Math.abs(G__6110);
})() - bx2);
var dy = ((function (){var G__6111 = (py - by2);
return Math.abs(G__6111);
})() - by2);
var l = (curlnoise.core.dist((function (){var x__4219__auto__ = 0.0;
var y__4220__auto__ = dx;
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})(),(function (){var x__4219__auto__ = 0.0;
var y__4220__auto__ = dy;
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})()) + (function (){var x__4222__auto__ = (function (){var x__4219__auto__ = dx;
var y__4220__auto__ = dy;
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})();
var y__4223__auto__ = 0.0;
return ((x__4222__auto__ < y__4223__auto__) ? x__4222__auto__ : y__4223__auto__);
})());
return l;
});
curlnoise.core.update_state = (function curlnoise$core$update_state(state){
var w = quil.core.width();
var h = quil.core.height();
var vf = 0.1;
var scale = 400.0;
var noise_scale = (scale * 10.0);
var rad = 20.0;
var rect_rad = 100.0;
var margin = (0);
var eps = (w * 0.001);
var mx = quil.core.mouse_x();
var my = quil.core.mouse_y();
var f_inv = ((1) / scale);
var d0 = 150.0;
var d_mouse = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0){
return (function (p1__6112_SHARP_,p2__6113_SHARP_){
if(cljs.core.truth_(quil.core.mouse_pressed_QMARK_())){
return (curlnoise.core.dist((mx - p1__6112_SHARP_),(my - p2__6113_SHARP_)) - rad);
} else {
return 1000000.0;
}
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0))
;
var d_border = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse){
return (function (p1__6114_SHARP_,p2__6115_SHARP_){
return (rect_rad - curlnoise.core.sdf_box((p1__6114_SHARP_ - rect_rad),(p2__6115_SHARP_ - rect_rad),(w - (rect_rad * (2))),(h - (rect_rad * (2)))));
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse))
;
var amp_fn = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border){
return (function (_,___$1){
return 1.0;
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border))
;
var mouse_drift = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn){
return (function (p1__6117_SHARP_,p2__6116_SHARP_){
if(cljs.core.truth_(quil.core.mouse_pressed_QMARK_())){
return (((((mx / w) - 0.5) * p2__6116_SHARP_) * 0.01) + ((((my / h) - 0.5) * p1__6117_SHARP_) * -0.01));
} else {
return 0.0;
}
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn))
;
var n_fn = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift){
return (function (p1__6118_SHARP_,p2__6119_SHARP_,p3__6120_SHARP_){
return (noise_scale * (mouse_drift(p1__6118_SHARP_,p2__6119_SHARP_) + quil.core.noise.cljs$core$IFn$_invoke$arity$3((f_inv * p1__6118_SHARP_),(f_inv * p2__6119_SHARP_),(f_inv * p3__6120_SHARP_))));
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift))
;
var p_fn = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn){
return (function (p1__6121_SHARP_,p2__6122_SHARP_,p3__6123_SHARP_){
return ((vf * amp_fn(p1__6121_SHARP_,p2__6122_SHARP_)) * n_fn(p1__6121_SHARP_,p2__6122_SHARP_,p3__6123_SHARP_));
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn))
;
var points = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn){
return (function (pt){
var vec__6124 = pt;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6124,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6124,(1),null);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6124,(2),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6124,(3),null);
var z = (cljs.core.cst$kw$frame.cljs$core$IFn$_invoke$arity$1(state) / 20.0);
var border = (((((((x > margin)) && ((x < (w - margin))))) && ((((y > margin)) && ((x < (h - margin)))))))?1.0:0.0);
var n = p_fn(x,y,z);
var n_dx = p_fn((x + eps),y,z);
var n_dy = p_fn(x,(y + eps),z);
var vx = ((n_dy - n) / eps);
var vy = ((n - n_dx) / eps);
var x2 = (x + vx);
var y2 = (y + vy);
var vec__6127 = (((((x2 < (0))) || ((x2 > w)) || ((y2 < (0))) || ((y2 > h))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.core.random.cljs$core$IFn$_invoke$arity$1(w),quil.core.random.cljs$core$IFn$_invoke$arity$1(h)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x2,y2], null));
var x3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6127,(0),null);
var y3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6127,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j,x3,y3], null);
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn))
,cljs.core.cst$kw$grid.cljs$core$IFn$_invoke$arity$1(state));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(state,cljs.core.cst$kw$frame,cljs.core.inc),cljs.core.cst$kw$grid,points);
});
curlnoise.core.show_fn = false;
curlnoise.core.draw_field = (function curlnoise$core$draw_field(offset,sdf,domain_xform){
var pix = quil.core.pixels.cljs$core$IFn$_invoke$arity$0();
var w = quil.core.width();
var h = quil.core.height();
var seq__6130_6170 = cljs.core.seq(curlnoise.core.grid(quil.core.width(),quil.core.height()));
var chunk__6131_6171 = null;
var count__6132_6172 = (0);
var i__6133_6173 = (0);
while(true){
if((i__6133_6173 < count__6132_6172)){
var point_6174 = chunk__6131_6171.cljs$core$IIndexed$_nth$arity$2(null,i__6133_6173);
var vec__6152_6175 = point_6174;
var px_6176 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6152_6175,(0),null);
var py_6177 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6152_6175,(1),null);
var vec__6155_6178 = (domain_xform.cljs$core$IFn$_invoke$arity$2 ? domain_xform.cljs$core$IFn$_invoke$arity$2(px_6176,py_6177) : domain_xform.call(null,px_6176,py_6177));
var px2_6179 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6155_6178,(0),null);
var py2_6180 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6155_6178,(1),null);
var w2_6181 = w;
var h2_6182 = h;
var d_6183 = (sdf.cljs$core$IFn$_invoke$arity$2 ? sdf.cljs$core$IFn$_invoke$arity$2(px2_6179,py2_6180) : sdf.call(null,px2_6179,py2_6180));
var step_6184 = (cljs.core.mod(d_6183,offset) / offset);
var val_6185 = ((step_6184 * (255)) | (0));
var vec__6158_6186 = (((Math.abs(d_6183) >= (offset * 0.5)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6185,val_6185,val_6185], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6185,0.0,0.0], null));
var r_6187 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6158_6186,(0),null);
var g_6188 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6158_6186,(1),null);
var b_6189 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6158_6186,(2),null);
var offset_6190__$1 = ((4) * (px_6176 + (py_6177 * w)));
(pix[offset_6190__$1] = r_6187);

(pix[(offset_6190__$1 + (1))] = g_6188);

(pix[(offset_6190__$1 + (2))] = b_6189);

(pix[(offset_6190__$1 + (3))] = (255));


var G__6191 = seq__6130_6170;
var G__6192 = chunk__6131_6171;
var G__6193 = count__6132_6172;
var G__6194 = (i__6133_6173 + (1));
seq__6130_6170 = G__6191;
chunk__6131_6171 = G__6192;
count__6132_6172 = G__6193;
i__6133_6173 = G__6194;
continue;
} else {
var temp__5735__auto___6195 = cljs.core.seq(seq__6130_6170);
if(temp__5735__auto___6195){
var seq__6130_6196__$1 = temp__5735__auto___6195;
if(cljs.core.chunked_seq_QMARK_(seq__6130_6196__$1)){
var c__4550__auto___6197 = cljs.core.chunk_first(seq__6130_6196__$1);
var G__6198 = cljs.core.chunk_rest(seq__6130_6196__$1);
var G__6199 = c__4550__auto___6197;
var G__6200 = cljs.core.count(c__4550__auto___6197);
var G__6201 = (0);
seq__6130_6170 = G__6198;
chunk__6131_6171 = G__6199;
count__6132_6172 = G__6200;
i__6133_6173 = G__6201;
continue;
} else {
var point_6202 = cljs.core.first(seq__6130_6196__$1);
var vec__6161_6203 = point_6202;
var px_6204 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6161_6203,(0),null);
var py_6205 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6161_6203,(1),null);
var vec__6164_6206 = (domain_xform.cljs$core$IFn$_invoke$arity$2 ? domain_xform.cljs$core$IFn$_invoke$arity$2(px_6204,py_6205) : domain_xform.call(null,px_6204,py_6205));
var px2_6207 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6164_6206,(0),null);
var py2_6208 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6164_6206,(1),null);
var w2_6209 = w;
var h2_6210 = h;
var d_6211 = (sdf.cljs$core$IFn$_invoke$arity$2 ? sdf.cljs$core$IFn$_invoke$arity$2(px2_6207,py2_6208) : sdf.call(null,px2_6207,py2_6208));
var step_6212 = (cljs.core.mod(d_6211,offset) / offset);
var val_6213 = ((step_6212 * (255)) | (0));
var vec__6167_6214 = (((Math.abs(d_6211) >= (offset * 0.5)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6213,val_6213,val_6213], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6213,0.0,0.0], null));
var r_6215 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6167_6214,(0),null);
var g_6216 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6167_6214,(1),null);
var b_6217 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6167_6214,(2),null);
var offset_6218__$1 = ((4) * (px_6204 + (py_6205 * w)));
(pix[offset_6218__$1] = r_6215);

(pix[(offset_6218__$1 + (1))] = g_6216);

(pix[(offset_6218__$1 + (2))] = b_6217);

(pix[(offset_6218__$1 + (3))] = (255));


var G__6219 = cljs.core.next(seq__6130_6196__$1);
var G__6220 = null;
var G__6221 = (0);
var G__6222 = (0);
seq__6130_6170 = G__6219;
chunk__6131_6171 = G__6220;
count__6132_6172 = G__6221;
i__6133_6173 = G__6222;
continue;
}
} else {
}
}
break;
}

return quil.core.update_pixels.cljs$core$IFn$_invoke$arity$0();
});
curlnoise.core.draw_state = (function curlnoise$core$draw_state(state){
quil.core.image.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$blend.cljs$core$IFn$_invoke$arity$1(state),(0),(0));

var pix = quil.core.pixels.cljs$core$IFn$_invoke$arity$0();
var w = quil.core.width();
var h = quil.core.height();
var color = quil.core.color.cljs$core$IFn$_invoke$arity$1((0));
var rad = (50);
if(curlnoise.core.show_fn){
curlnoise.core.draw_field(10.0,((function (pix,w,h,color,rad){
return (function (p1__6223_SHARP_,p2__6224_SHARP_){
return (rad - curlnoise.core.sdf_box(p1__6223_SHARP_,p2__6224_SHARP_,(quil.core.width() - (rad * (2))),(quil.core.height() - (rad * (2)))));
});})(pix,w,h,color,rad))
,((function (pix,w,h,color,rad){
return (function (p1__6225_SHARP_,p2__6226_SHARP_){
return cljs.core.vec(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((p1__6225_SHARP_ - rad) - 0.0),((p2__6226_SHARP_ - rad) - 0.0)], null));
});})(pix,w,h,color,rad))
);
} else {
var seq__6227_6243 = cljs.core.seq(cljs.core.cst$kw$grid.cljs$core$IFn$_invoke$arity$1(state));
var chunk__6228_6244 = null;
var count__6229_6245 = (0);
var i__6230_6246 = (0);
while(true){
if((i__6230_6246 < count__6229_6245)){
var point_6247 = chunk__6228_6244.cljs$core$IIndexed$_nth$arity$2(null,i__6230_6246);
var vec__6237_6248 = point_6247;
var __6249 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6237_6248,(0),null);
var __6250__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6237_6248,(1),null);
var px_6251 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6237_6248,(2),null);
var py_6252 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6237_6248,(3),null);
var ix_6253 = curlnoise.core.clamp((px_6251 | (0)),(0),(w - (1)));
var iy_6254 = curlnoise.core.clamp((py_6252 | (0)),(0),(h - (1)));
var offset_6255 = ((4) * (ix_6253 + (iy_6254 * w)));
(pix[offset_6255] = (0));

(pix[(offset_6255 + (1))] = (0));

(pix[(offset_6255 + (2))] = (0));

(pix[(offset_6255 + (3))] = (255));


var G__6256 = seq__6227_6243;
var G__6257 = chunk__6228_6244;
var G__6258 = count__6229_6245;
var G__6259 = (i__6230_6246 + (1));
seq__6227_6243 = G__6256;
chunk__6228_6244 = G__6257;
count__6229_6245 = G__6258;
i__6230_6246 = G__6259;
continue;
} else {
var temp__5735__auto___6260 = cljs.core.seq(seq__6227_6243);
if(temp__5735__auto___6260){
var seq__6227_6261__$1 = temp__5735__auto___6260;
if(cljs.core.chunked_seq_QMARK_(seq__6227_6261__$1)){
var c__4550__auto___6262 = cljs.core.chunk_first(seq__6227_6261__$1);
var G__6263 = cljs.core.chunk_rest(seq__6227_6261__$1);
var G__6264 = c__4550__auto___6262;
var G__6265 = cljs.core.count(c__4550__auto___6262);
var G__6266 = (0);
seq__6227_6243 = G__6263;
chunk__6228_6244 = G__6264;
count__6229_6245 = G__6265;
i__6230_6246 = G__6266;
continue;
} else {
var point_6267 = cljs.core.first(seq__6227_6261__$1);
var vec__6240_6268 = point_6267;
var __6269 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6240_6268,(0),null);
var __6270__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6240_6268,(1),null);
var px_6271 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6240_6268,(2),null);
var py_6272 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6240_6268,(3),null);
var ix_6273 = curlnoise.core.clamp((px_6271 | (0)),(0),(w - (1)));
var iy_6274 = curlnoise.core.clamp((py_6272 | (0)),(0),(h - (1)));
var offset_6275 = ((4) * (ix_6273 + (iy_6274 * w)));
(pix[offset_6275] = (0));

(pix[(offset_6275 + (1))] = (0));

(pix[(offset_6275 + (2))] = (0));

(pix[(offset_6275 + (3))] = (255));


var G__6276 = cljs.core.next(seq__6227_6261__$1);
var G__6277 = null;
var G__6278 = (0);
var G__6279 = (0);
seq__6227_6243 = G__6276;
chunk__6228_6244 = G__6277;
count__6229_6245 = G__6278;
i__6230_6246 = G__6279;
continue;
}
} else {
}
}
break;
}
}

return quil.core.update_pixels.cljs$core$IFn$_invoke$arity$0();
});
curlnoise.core.settings = (function curlnoise$core$settings(){
return quil.core.pixel_density((1));
});
curlnoise.core.run_sketch = (function curlnoise$core$run_sketch(){
curlnoise.core.curlnoise = (function curlnoise$core$run_sketch_$_curlnoise(){
return quil.sketch.sketch.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$features,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$keep_DASH_on_DASH_top], null),cljs.core.cst$kw$settings,((cljs.core.fn_QMARK_(curlnoise.core.settings))?(function() { 
var G__6280__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.settings,args);
};
var G__6280 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6281__i = 0, G__6281__a = new Array(arguments.length -  0);
while (G__6281__i < G__6281__a.length) {G__6281__a[G__6281__i] = arguments[G__6281__i + 0]; ++G__6281__i;}
  args = new cljs.core.IndexedSeq(G__6281__a,0,null);
} 
return G__6280__delegate.call(this,args);};
G__6280.cljs$lang$maxFixedArity = 0;
G__6280.cljs$lang$applyTo = (function (arglist__6282){
var args = cljs.core.seq(arglist__6282);
return G__6280__delegate(args);
});
G__6280.cljs$core$IFn$_invoke$arity$variadic = G__6280__delegate;
return G__6280;
})()
:curlnoise.core.settings),cljs.core.cst$kw$update,((cljs.core.fn_QMARK_(curlnoise.core.update_state))?(function() { 
var G__6283__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.update_state,args);
};
var G__6283 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6284__i = 0, G__6284__a = new Array(arguments.length -  0);
while (G__6284__i < G__6284__a.length) {G__6284__a[G__6284__i] = arguments[G__6284__i + 0]; ++G__6284__i;}
  args = new cljs.core.IndexedSeq(G__6284__a,0,null);
} 
return G__6283__delegate.call(this,args);};
G__6283.cljs$lang$maxFixedArity = 0;
G__6283.cljs$lang$applyTo = (function (arglist__6285){
var args = cljs.core.seq(arglist__6285);
return G__6283__delegate(args);
});
G__6283.cljs$core$IFn$_invoke$arity$variadic = G__6283__delegate;
return G__6283;
})()
:curlnoise.core.update_state),cljs.core.cst$kw$renderer,((cljs.core.fn_QMARK_(curlnoise.core.renderer))?(function() { 
var G__6286__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.renderer,args);
};
var G__6286 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6287__i = 0, G__6287__a = new Array(arguments.length -  0);
while (G__6287__i < G__6287__a.length) {G__6287__a[G__6287__i] = arguments[G__6287__i + 0]; ++G__6287__i;}
  args = new cljs.core.IndexedSeq(G__6287__a,0,null);
} 
return G__6286__delegate.call(this,args);};
G__6286.cljs$lang$maxFixedArity = 0;
G__6286.cljs$lang$applyTo = (function (arglist__6288){
var args = cljs.core.seq(arglist__6288);
return G__6286__delegate(args);
});
G__6286.cljs$core$IFn$_invoke$arity$variadic = G__6286__delegate;
return G__6286;
})()
:curlnoise.core.renderer),cljs.core.cst$kw$size,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [curlnoise.core.res_x,curlnoise.core.res_y], null),cljs.core.cst$kw$title,"Curl Noise",cljs.core.cst$kw$setup,((cljs.core.fn_QMARK_(curlnoise.core.setup))?(function() { 
var G__6289__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.setup,args);
};
var G__6289 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6290__i = 0, G__6290__a = new Array(arguments.length -  0);
while (G__6290__i < G__6290__a.length) {G__6290__a[G__6290__i] = arguments[G__6290__i + 0]; ++G__6290__i;}
  args = new cljs.core.IndexedSeq(G__6290__a,0,null);
} 
return G__6289__delegate.call(this,args);};
G__6289.cljs$lang$maxFixedArity = 0;
G__6289.cljs$lang$applyTo = (function (arglist__6291){
var args = cljs.core.seq(arglist__6291);
return G__6289__delegate(args);
});
G__6289.cljs$core$IFn$_invoke$arity$variadic = G__6289__delegate;
return G__6289;
})()
:curlnoise.core.setup),cljs.core.cst$kw$middleware,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),cljs.core.cst$kw$host,"curlnoise",cljs.core.cst$kw$draw,((cljs.core.fn_QMARK_(curlnoise.core.draw_state))?(function() { 
var G__6292__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.draw_state,args);
};
var G__6292 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6293__i = 0, G__6293__a = new Array(arguments.length -  0);
while (G__6293__i < G__6293__a.length) {G__6293__a[G__6293__i] = arguments[G__6293__i + 0]; ++G__6293__i;}
  args = new cljs.core.IndexedSeq(G__6293__a,0,null);
} 
return G__6292__delegate.call(this,args);};
G__6292.cljs$lang$maxFixedArity = 0;
G__6292.cljs$lang$applyTo = (function (arglist__6294){
var args = cljs.core.seq(arglist__6294);
return G__6292__delegate(args);
});
G__6292.cljs$core$IFn$_invoke$arity$variadic = G__6292__delegate;
return G__6292;
})()
:curlnoise.core.draw_state)], 0));
});
goog.exportSymbol('curlnoise.core.curlnoise', curlnoise.core.curlnoise);

if(cljs.core.truth_(cljs.core.some((function (p1__201__202__auto__){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$no_DASH_start,p1__201__202__auto__);
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$keep_DASH_on_DASH_top], null)))){
return null;
} else {
return quil.sketch.add_sketch_to_init_list(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$fn,curlnoise.core.curlnoise,cljs.core.cst$kw$host_DASH_id,"curlnoise"], null));
}
});
goog.exportSymbol('curlnoise.core.run_sketch', curlnoise.core.run_sketch);
curlnoise.core._main = (function curlnoise$core$_main(var_args){
var args__4736__auto__ = [];
var len__4730__auto___6296 = arguments.length;
var i__4731__auto___6297 = (0);
while(true){
if((i__4731__auto___6297 < len__4730__auto___6296)){
args__4736__auto__.push((arguments[i__4731__auto___6297]));

var G__6298 = (i__4731__auto___6297 + (1));
i__4731__auto___6297 = G__6298;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return curlnoise.core._main.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

curlnoise.core._main.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return curlnoise.core.run_sketch();
});

curlnoise.core._main.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
curlnoise.core._main.cljs$lang$applyTo = (function (seq6295){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq6295));
});

