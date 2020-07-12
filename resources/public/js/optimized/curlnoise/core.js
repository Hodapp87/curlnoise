// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('curlnoise.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('quil.core');
goog.require('quil.middleware');
curlnoise.core.framerate = (60);
curlnoise.core.res_x = (500);
curlnoise.core.res_y = curlnoise.core.res_x;
curlnoise.core.particles = (2000);
curlnoise.core.alpha = (40);
curlnoise.core.renderer = cljs.core.cst$kw$p2d;
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
var G__6212 = curlnoise.core.dist2(x,y);
return Math.sqrt(G__6212);
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
var gr__575__auto___6215 = gr;
var _STAR_graphics_STAR__orig_val__6213_6216 = quil.core._STAR_graphics_STAR_;
var _STAR_graphics_STAR__temp_val__6214_6217 = gr__575__auto___6215;
quil.core._STAR_graphics_STAR_ = _STAR_graphics_STAR__temp_val__6214_6217;

try{quil.core.begin_draw(gr__575__auto___6215);

quil.core.background.cljs$core$IFn$_invoke$arity$2((255),curlnoise.core.alpha);

quil.core.end_draw(gr__575__auto___6215);
}finally {quil.core._STAR_graphics_STAR_ = _STAR_graphics_STAR__orig_val__6213_6216;
}
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$frame,(0),cljs.core.cst$kw$grid,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (gr){
return (function (_){
return cljs.core.vec(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.core.random.cljs$core$IFn$_invoke$arity$1(quil.core.width()),quil.core.random.cljs$core$IFn$_invoke$arity$1(quil.core.height())], null));
});})(gr))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(curlnoise.core.particles)),cljs.core.cst$kw$blend,gr], null);
});
curlnoise.core.sdf_box = (function curlnoise$core$sdf_box(px,py,bx,by){
var bx2 = (0.5 * bx);
var by2 = (0.5 * by);
var dx = ((function (){var G__6218 = (px - bx2);
return Math.abs(G__6218);
})() - bx2);
var dy = ((function (){var G__6219 = (py - by2);
return Math.abs(G__6219);
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
var scale = 500.0;
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
return (function (p1__6220_SHARP_,p2__6221_SHARP_){
if(cljs.core.truth_(quil.core.mouse_pressed_QMARK_())){
return (curlnoise.core.dist((mx - p1__6220_SHARP_),(my - p2__6221_SHARP_)) - rad);
} else {
return 1000000.0;
}
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0))
;
var d_border = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse){
return (function (p1__6222_SHARP_,p2__6223_SHARP_){
return (rect_rad - curlnoise.core.sdf_box((p1__6222_SHARP_ - rect_rad),(p2__6223_SHARP_ - rect_rad),(w - (rect_rad * (2))),(h - (rect_rad * (2)))));
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse))
;
var amp_fn = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border){
return (function (_,___$1){
return 1.0;
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border))
;
var mouse_drift = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn){
return (function (p1__6225_SHARP_,p2__6224_SHARP_){
if(cljs.core.truth_(quil.core.mouse_pressed_QMARK_())){
return (((((mx / w) - 0.5) * p2__6224_SHARP_) * 0.01) + ((((my / h) - 0.5) * p1__6225_SHARP_) * -0.01));
} else {
return 0.0;
}
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn))
;
var n_fn = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift){
return (function (p1__6226_SHARP_,p2__6227_SHARP_,p3__6228_SHARP_){
return (noise_scale * (mouse_drift(p1__6226_SHARP_,p2__6227_SHARP_) + quil.core.noise.cljs$core$IFn$_invoke$arity$3((f_inv * p1__6226_SHARP_),(f_inv * p2__6227_SHARP_),(f_inv * p3__6228_SHARP_))));
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift))
;
var p_fn = ((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn){
return (function (p1__6229_SHARP_,p2__6230_SHARP_,p3__6231_SHARP_){
return ((vf * amp_fn(p1__6229_SHARP_,p2__6230_SHARP_)) * n_fn(p1__6229_SHARP_,p2__6230_SHARP_,p3__6231_SHARP_));
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn))
;
var points = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn){
return (function (pt){
var vec__6232 = pt;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6232,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6232,(1),null);
var z = (cljs.core.cst$kw$frame.cljs$core$IFn$_invoke$arity$1(state) / 2.0);
var border = (((((((x > margin)) && ((x < (w - margin))))) && ((((y > margin)) && ((x < (h - margin)))))))?1.0:0.0);
var n = p_fn(x,y,z);
var n_dx = p_fn((x + eps),y,z);
var n_dy = p_fn(x,(y + eps),z);
var vx = ((n_dy - n) / eps);
var vy = ((n - n_dx) / eps);
var x2 = (x + vx);
var y2 = (y + vy);
var vec__6235 = (((((x2 < (0))) || ((x2 > w)) || ((y2 < (0))) || ((y2 > h))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.core.random.cljs$core$IFn$_invoke$arity$1(w),quil.core.random.cljs$core$IFn$_invoke$arity$1(h)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x2,y2], null));
var x3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6235,(0),null);
var y3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6235,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x3,y3], null);
});})(w,h,vf,scale,noise_scale,rad,rect_rad,margin,eps,mx,my,f_inv,d0,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn))
,cljs.core.cst$kw$grid.cljs$core$IFn$_invoke$arity$1(state));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(state,cljs.core.cst$kw$frame,cljs.core.inc),cljs.core.cst$kw$grid,points);
});
curlnoise.core.show_fn = false;
curlnoise.core.grid = (function curlnoise$core$grid(nx,ny){

return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (x){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (y){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(ny));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.range.cljs$core$IFn$_invoke$arity$1(nx)], 0));
});
curlnoise.core.draw_field = (function curlnoise$core$draw_field(offset,sdf,domain_xform){
var pix = quil.core.pixels.cljs$core$IFn$_invoke$arity$0();
var w = quil.core.width();
var h = quil.core.height();
var seq__6238_6278 = cljs.core.seq(curlnoise.core.grid(quil.core.width(),quil.core.height()));
var chunk__6239_6279 = null;
var count__6240_6280 = (0);
var i__6241_6281 = (0);
while(true){
if((i__6241_6281 < count__6240_6280)){
var point_6282 = chunk__6239_6279.cljs$core$IIndexed$_nth$arity$2(null,i__6241_6281);
var vec__6260_6283 = point_6282;
var px_6284 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6260_6283,(0),null);
var py_6285 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6260_6283,(1),null);
var vec__6263_6286 = (domain_xform.cljs$core$IFn$_invoke$arity$2 ? domain_xform.cljs$core$IFn$_invoke$arity$2(px_6284,py_6285) : domain_xform.call(null,px_6284,py_6285));
var px2_6287 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6263_6286,(0),null);
var py2_6288 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6263_6286,(1),null);
var w2_6289 = w;
var h2_6290 = h;
var d_6291 = (sdf.cljs$core$IFn$_invoke$arity$2 ? sdf.cljs$core$IFn$_invoke$arity$2(px2_6287,py2_6288) : sdf.call(null,px2_6287,py2_6288));
var step_6292 = (cljs.core.mod(d_6291,offset) / offset);
var val_6293 = ((step_6292 * (255)) | (0));
var vec__6266_6294 = (((Math.abs(d_6291) >= (offset * 0.5)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6293,val_6293,val_6293], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6293,0.0,0.0], null));
var r_6295 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6266_6294,(0),null);
var g_6296 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6266_6294,(1),null);
var b_6297 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6266_6294,(2),null);
var offset_6298__$1 = ((4) * (px_6284 + (py_6285 * w)));
(pix[offset_6298__$1] = r_6295);

(pix[(offset_6298__$1 + (1))] = g_6296);

(pix[(offset_6298__$1 + (2))] = b_6297);

(pix[(offset_6298__$1 + (3))] = (255));


var G__6299 = seq__6238_6278;
var G__6300 = chunk__6239_6279;
var G__6301 = count__6240_6280;
var G__6302 = (i__6241_6281 + (1));
seq__6238_6278 = G__6299;
chunk__6239_6279 = G__6300;
count__6240_6280 = G__6301;
i__6241_6281 = G__6302;
continue;
} else {
var temp__5735__auto___6303 = cljs.core.seq(seq__6238_6278);
if(temp__5735__auto___6303){
var seq__6238_6304__$1 = temp__5735__auto___6303;
if(cljs.core.chunked_seq_QMARK_(seq__6238_6304__$1)){
var c__4550__auto___6305 = cljs.core.chunk_first(seq__6238_6304__$1);
var G__6306 = cljs.core.chunk_rest(seq__6238_6304__$1);
var G__6307 = c__4550__auto___6305;
var G__6308 = cljs.core.count(c__4550__auto___6305);
var G__6309 = (0);
seq__6238_6278 = G__6306;
chunk__6239_6279 = G__6307;
count__6240_6280 = G__6308;
i__6241_6281 = G__6309;
continue;
} else {
var point_6310 = cljs.core.first(seq__6238_6304__$1);
var vec__6269_6311 = point_6310;
var px_6312 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6269_6311,(0),null);
var py_6313 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6269_6311,(1),null);
var vec__6272_6314 = (domain_xform.cljs$core$IFn$_invoke$arity$2 ? domain_xform.cljs$core$IFn$_invoke$arity$2(px_6312,py_6313) : domain_xform.call(null,px_6312,py_6313));
var px2_6315 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6272_6314,(0),null);
var py2_6316 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6272_6314,(1),null);
var w2_6317 = w;
var h2_6318 = h;
var d_6319 = (sdf.cljs$core$IFn$_invoke$arity$2 ? sdf.cljs$core$IFn$_invoke$arity$2(px2_6315,py2_6316) : sdf.call(null,px2_6315,py2_6316));
var step_6320 = (cljs.core.mod(d_6319,offset) / offset);
var val_6321 = ((step_6320 * (255)) | (0));
var vec__6275_6322 = (((Math.abs(d_6319) >= (offset * 0.5)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6321,val_6321,val_6321], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6321,0.0,0.0], null));
var r_6323 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6275_6322,(0),null);
var g_6324 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6275_6322,(1),null);
var b_6325 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6275_6322,(2),null);
var offset_6326__$1 = ((4) * (px_6312 + (py_6313 * w)));
(pix[offset_6326__$1] = r_6323);

(pix[(offset_6326__$1 + (1))] = g_6324);

(pix[(offset_6326__$1 + (2))] = b_6325);

(pix[(offset_6326__$1 + (3))] = (255));


var G__6327 = cljs.core.next(seq__6238_6304__$1);
var G__6328 = null;
var G__6329 = (0);
var G__6330 = (0);
seq__6238_6278 = G__6327;
chunk__6239_6279 = G__6328;
count__6240_6280 = G__6329;
i__6241_6281 = G__6330;
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
return (function (p1__6331_SHARP_,p2__6332_SHARP_){
return (rad - curlnoise.core.sdf_box(p1__6331_SHARP_,p2__6332_SHARP_,(quil.core.width() - (rad * (2))),(quil.core.height() - (rad * (2)))));
});})(pix,w,h,color,rad))
,((function (pix,w,h,color,rad){
return (function (p1__6333_SHARP_,p2__6334_SHARP_){
return cljs.core.vec(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((p1__6333_SHARP_ - rad) - 0.0),((p2__6334_SHARP_ - rad) - 0.0)], null));
});})(pix,w,h,color,rad))
);
} else {
var seq__6335_6351 = cljs.core.seq(cljs.core.cst$kw$grid.cljs$core$IFn$_invoke$arity$1(state));
var chunk__6336_6352 = null;
var count__6337_6353 = (0);
var i__6338_6354 = (0);
while(true){
if((i__6338_6354 < count__6337_6353)){
var point_6355 = chunk__6336_6352.cljs$core$IIndexed$_nth$arity$2(null,i__6338_6354);
var vec__6345_6356 = point_6355;
var px_6357 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6345_6356,(0),null);
var py_6358 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6345_6356,(1),null);
var ix_6359 = curlnoise.core.clamp((px_6357 | (0)),(0),(w - (1)));
var iy_6360 = curlnoise.core.clamp((py_6358 | (0)),(0),(h - (1)));
var offset_6361 = ((4) * (ix_6359 + (iy_6360 * w)));
(pix[offset_6361] = (0));

(pix[(offset_6361 + (1))] = (0));

(pix[(offset_6361 + (2))] = (0));

(pix[(offset_6361 + (3))] = (255));


var G__6362 = seq__6335_6351;
var G__6363 = chunk__6336_6352;
var G__6364 = count__6337_6353;
var G__6365 = (i__6338_6354 + (1));
seq__6335_6351 = G__6362;
chunk__6336_6352 = G__6363;
count__6337_6353 = G__6364;
i__6338_6354 = G__6365;
continue;
} else {
var temp__5735__auto___6366 = cljs.core.seq(seq__6335_6351);
if(temp__5735__auto___6366){
var seq__6335_6367__$1 = temp__5735__auto___6366;
if(cljs.core.chunked_seq_QMARK_(seq__6335_6367__$1)){
var c__4550__auto___6368 = cljs.core.chunk_first(seq__6335_6367__$1);
var G__6369 = cljs.core.chunk_rest(seq__6335_6367__$1);
var G__6370 = c__4550__auto___6368;
var G__6371 = cljs.core.count(c__4550__auto___6368);
var G__6372 = (0);
seq__6335_6351 = G__6369;
chunk__6336_6352 = G__6370;
count__6337_6353 = G__6371;
i__6338_6354 = G__6372;
continue;
} else {
var point_6373 = cljs.core.first(seq__6335_6367__$1);
var vec__6348_6374 = point_6373;
var px_6375 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6348_6374,(0),null);
var py_6376 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6348_6374,(1),null);
var ix_6377 = curlnoise.core.clamp((px_6375 | (0)),(0),(w - (1)));
var iy_6378 = curlnoise.core.clamp((py_6376 | (0)),(0),(h - (1)));
var offset_6379 = ((4) * (ix_6377 + (iy_6378 * w)));
(pix[offset_6379] = (0));

(pix[(offset_6379 + (1))] = (0));

(pix[(offset_6379 + (2))] = (0));

(pix[(offset_6379 + (3))] = (255));


var G__6380 = cljs.core.next(seq__6335_6367__$1);
var G__6381 = null;
var G__6382 = (0);
var G__6383 = (0);
seq__6335_6351 = G__6380;
chunk__6336_6352 = G__6381;
count__6337_6353 = G__6382;
i__6338_6354 = G__6383;
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
var G__6384__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.settings,args);
};
var G__6384 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6385__i = 0, G__6385__a = new Array(arguments.length -  0);
while (G__6385__i < G__6385__a.length) {G__6385__a[G__6385__i] = arguments[G__6385__i + 0]; ++G__6385__i;}
  args = new cljs.core.IndexedSeq(G__6385__a,0,null);
} 
return G__6384__delegate.call(this,args);};
G__6384.cljs$lang$maxFixedArity = 0;
G__6384.cljs$lang$applyTo = (function (arglist__6386){
var args = cljs.core.seq(arglist__6386);
return G__6384__delegate(args);
});
G__6384.cljs$core$IFn$_invoke$arity$variadic = G__6384__delegate;
return G__6384;
})()
:curlnoise.core.settings),cljs.core.cst$kw$update,((cljs.core.fn_QMARK_(curlnoise.core.update_state))?(function() { 
var G__6387__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.update_state,args);
};
var G__6387 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6388__i = 0, G__6388__a = new Array(arguments.length -  0);
while (G__6388__i < G__6388__a.length) {G__6388__a[G__6388__i] = arguments[G__6388__i + 0]; ++G__6388__i;}
  args = new cljs.core.IndexedSeq(G__6388__a,0,null);
} 
return G__6387__delegate.call(this,args);};
G__6387.cljs$lang$maxFixedArity = 0;
G__6387.cljs$lang$applyTo = (function (arglist__6389){
var args = cljs.core.seq(arglist__6389);
return G__6387__delegate(args);
});
G__6387.cljs$core$IFn$_invoke$arity$variadic = G__6387__delegate;
return G__6387;
})()
:curlnoise.core.update_state),cljs.core.cst$kw$renderer,((cljs.core.fn_QMARK_(curlnoise.core.renderer))?(function() { 
var G__6390__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.renderer,args);
};
var G__6390 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6391__i = 0, G__6391__a = new Array(arguments.length -  0);
while (G__6391__i < G__6391__a.length) {G__6391__a[G__6391__i] = arguments[G__6391__i + 0]; ++G__6391__i;}
  args = new cljs.core.IndexedSeq(G__6391__a,0,null);
} 
return G__6390__delegate.call(this,args);};
G__6390.cljs$lang$maxFixedArity = 0;
G__6390.cljs$lang$applyTo = (function (arglist__6392){
var args = cljs.core.seq(arglist__6392);
return G__6390__delegate(args);
});
G__6390.cljs$core$IFn$_invoke$arity$variadic = G__6390__delegate;
return G__6390;
})()
:curlnoise.core.renderer),cljs.core.cst$kw$size,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [curlnoise.core.res_x,curlnoise.core.res_y], null),cljs.core.cst$kw$title,"Curl Noise",cljs.core.cst$kw$setup,((cljs.core.fn_QMARK_(curlnoise.core.setup))?(function() { 
var G__6393__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.setup,args);
};
var G__6393 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6394__i = 0, G__6394__a = new Array(arguments.length -  0);
while (G__6394__i < G__6394__a.length) {G__6394__a[G__6394__i] = arguments[G__6394__i + 0]; ++G__6394__i;}
  args = new cljs.core.IndexedSeq(G__6394__a,0,null);
} 
return G__6393__delegate.call(this,args);};
G__6393.cljs$lang$maxFixedArity = 0;
G__6393.cljs$lang$applyTo = (function (arglist__6395){
var args = cljs.core.seq(arglist__6395);
return G__6393__delegate(args);
});
G__6393.cljs$core$IFn$_invoke$arity$variadic = G__6393__delegate;
return G__6393;
})()
:curlnoise.core.setup),cljs.core.cst$kw$middleware,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),cljs.core.cst$kw$host,"curlnoise",cljs.core.cst$kw$draw,((cljs.core.fn_QMARK_(curlnoise.core.draw_state))?(function() { 
var G__6396__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.draw_state,args);
};
var G__6396 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6397__i = 0, G__6397__a = new Array(arguments.length -  0);
while (G__6397__i < G__6397__a.length) {G__6397__a[G__6397__i] = arguments[G__6397__i + 0]; ++G__6397__i;}
  args = new cljs.core.IndexedSeq(G__6397__a,0,null);
} 
return G__6396__delegate.call(this,args);};
G__6396.cljs$lang$maxFixedArity = 0;
G__6396.cljs$lang$applyTo = (function (arglist__6398){
var args = cljs.core.seq(arglist__6398);
return G__6396__delegate(args);
});
G__6396.cljs$core$IFn$_invoke$arity$variadic = G__6396__delegate;
return G__6396;
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
var len__4730__auto___6400 = arguments.length;
var i__4731__auto___6401 = (0);
while(true){
if((i__4731__auto___6401 < len__4730__auto___6400)){
args__4736__auto__.push((arguments[i__4731__auto___6401]));

var G__6402 = (i__4731__auto___6401 + (1));
i__4731__auto___6401 = G__6402;
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
curlnoise.core._main.cljs$lang$applyTo = (function (seq6399){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq6399));
});

