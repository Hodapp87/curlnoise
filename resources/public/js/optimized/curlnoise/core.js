// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('curlnoise.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('quil.core');
goog.require('quil.middleware');
curlnoise.core.framerate = (60);
curlnoise.core.res_x = (500);
curlnoise.core.res_y = curlnoise.core.res_x;
curlnoise.core.particles = (1000);
curlnoise.core.alpha = (30);
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
curlnoise.core.magn2 = (function curlnoise$core$magn2(x,y){

return ((x * x) + (y * y));
});
curlnoise.core.magn = (function curlnoise$core$magn(x,y){

var G__6227 = curlnoise.core.magn2(x,y);
return Math.sqrt(G__6227);
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
var gr__575__auto___6230 = gr;
var _STAR_graphics_STAR__orig_val__6228_6231 = quil.core._STAR_graphics_STAR_;
var _STAR_graphics_STAR__temp_val__6229_6232 = gr__575__auto___6230;
quil.core._STAR_graphics_STAR_ = _STAR_graphics_STAR__temp_val__6229_6232;

try{quil.core.begin_draw(gr__575__auto___6230);

quil.core.background.cljs$core$IFn$_invoke$arity$2((255),curlnoise.core.alpha);

quil.core.end_draw(gr__575__auto___6230);
}finally {quil.core._STAR_graphics_STAR_ = _STAR_graphics_STAR__orig_val__6228_6231;
}
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$frame,(0),cljs.core.cst$kw$grid,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (gr){
return (function (_){
return cljs.core.vec(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.core.random.cljs$core$IFn$_invoke$arity$1(quil.core.width()),quil.core.random.cljs$core$IFn$_invoke$arity$1(quil.core.height())], null));
});})(gr))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(curlnoise.core.particles)),cljs.core.cst$kw$blend,gr], null);
});
curlnoise.core.sdf_box = (function curlnoise$core$sdf_box(x,y,bw,bh){

var bw2 = (0.5 * bw);
var bh2 = (0.5 * bh);
var dx = ((function (){var G__6233 = (x - bw2);
return Math.abs(G__6233);
})() - bw2);
var dy = ((function (){var G__6234 = (y - bh2);
return Math.abs(G__6234);
})() - bh2);
var l = (curlnoise.core.magn((function (){var x__4219__auto__ = 0.0;
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
curlnoise.core.scale = 500.0;
curlnoise.core.noise_scale = (curlnoise.core.scale * 5.0);
curlnoise.core.f_inv = ((1) / curlnoise.core.scale);
curlnoise.core.potential = (function curlnoise$core$potential(x,y,t){

return (curlnoise.core.noise_scale * (quil.core.noise.cljs$core$IFn$_invoke$arity$3((curlnoise.core.f_inv * x),(curlnoise.core.f_inv * y),(curlnoise.core.f_inv * t)) + quil.core.noise.cljs$core$IFn$_invoke$arity$3(((curlnoise.core.f_inv * x) * 2.0),((curlnoise.core.f_inv * y) * 2.0),((curlnoise.core.f_inv * t) * 1.61))));
});
curlnoise.core.eps = 0.5;
curlnoise.core.eps_inv = ((1) / curlnoise.core.eps);
curlnoise.core.gradient = (function curlnoise$core$gradient(p_fn,x,y,t){

var p = (p_fn.cljs$core$IFn$_invoke$arity$3 ? p_fn.cljs$core$IFn$_invoke$arity$3(x,y,t) : p_fn.call(null,x,y,t));
var p_dx = (function (){var G__6235 = (x + curlnoise.core.eps);
var G__6236 = y;
var G__6237 = t;
return (p_fn.cljs$core$IFn$_invoke$arity$3 ? p_fn.cljs$core$IFn$_invoke$arity$3(G__6235,G__6236,G__6237) : p_fn.call(null,G__6235,G__6236,G__6237));
})();
var p_dy = (function (){var G__6238 = x;
var G__6239 = (y + curlnoise.core.eps);
var G__6240 = t;
return (p_fn.cljs$core$IFn$_invoke$arity$3 ? p_fn.cljs$core$IFn$_invoke$arity$3(G__6238,G__6239,G__6240) : p_fn.call(null,G__6238,G__6239,G__6240));
})();
var grad_x = ((p_dx - p) * curlnoise.core.eps_inv);
var grad_y = ((p_dy - p) * curlnoise.core.eps_inv);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [grad_x,grad_y], null);
});
curlnoise.core.move_point = (function curlnoise$core$move_point(x,y){
return "Move a particle by the potential at a point.\n\n  Returns [x y] of the 'updated' point.";
});
curlnoise.core.vf = 0.1;
curlnoise.core.mouse_rad = 20.0;
curlnoise.core.mouse_strength = 20.0;
curlnoise.core.rect_rad = 100.0;
curlnoise.core.d0 = 200.0;
curlnoise.core.update_state = (function curlnoise$core$update_state(state){
var w = quil.core.width();
var h = quil.core.height();
var mx = quil.core.mouse_x();
var my = quil.core.mouse_y();
var d_mouse = ((function (w,h,mx,my){
return (function (p1__6241_SHARP_,p2__6242_SHARP_){
if(cljs.core.truth_(quil.core.mouse_pressed_QMARK_())){
return (curlnoise.core.magn((mx - p1__6241_SHARP_),(my - p2__6242_SHARP_)) - curlnoise.core.mouse_rad);
} else {
return 1000000.0;
}
});})(w,h,mx,my))
;
var d_border = ((function (w,h,mx,my,d_mouse){
return (function (p1__6243_SHARP_,p2__6244_SHARP_){
return (curlnoise.core.rect_rad - curlnoise.core.sdf_box((p1__6243_SHARP_ - curlnoise.core.rect_rad),(p2__6244_SHARP_ - curlnoise.core.rect_rad),(w - (curlnoise.core.rect_rad * (2))),(h - (curlnoise.core.rect_rad * (2)))));
});})(w,h,mx,my,d_mouse))
;
var amp_fn = ((function (w,h,mx,my,d_mouse,d_border){
return (function (x,y){
return curlnoise.core.ramp((d_mouse(x,y) / curlnoise.core.d0));
});})(w,h,mx,my,d_mouse,d_border))
;
var mouse_drift = ((function (w,h,mx,my,d_mouse,d_border,amp_fn){
return (function (p1__6246_SHARP_,p2__6245_SHARP_){
if((((mx < (0))) || ((my < (0))) || ((mx > w)) || ((my > h)))){
return 0.0;
} else {
return (((((mx / w) - 0.5) * p2__6245_SHARP_) * curlnoise.core.mouse_strength) + ((((my / h) - 0.5) * p1__6246_SHARP_) * (- curlnoise.core.mouse_strength)));
}
});})(w,h,mx,my,d_mouse,d_border,amp_fn))
;
var n_fn = ((function (w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift){
return (function (p1__6247_SHARP_,p2__6248_SHARP_,p3__6249_SHARP_){
return (mouse_drift(p1__6247_SHARP_,p2__6248_SHARP_) + curlnoise.core.potential(p1__6247_SHARP_,p2__6248_SHARP_,p3__6249_SHARP_));
});})(w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift))
;
var p_fn = ((function (w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift,n_fn){
return (function (p1__6250_SHARP_,p2__6251_SHARP_,p3__6252_SHARP_){
return ((curlnoise.core.vf * amp_fn(p1__6250_SHARP_,p2__6251_SHARP_)) * n_fn(p1__6250_SHARP_,p2__6251_SHARP_,p3__6252_SHARP_));
});})(w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift,n_fn))
;
var t = (cljs.core.cst$kw$frame.cljs$core$IFn$_invoke$arity$1(state) / 2.0);
var f = ((function (w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn,t){
return (function (p1__6253_SHARP_,p2__6254_SHARP_,p3__6255_SHARP_){
return (curlnoise.core.vf * (mouse_drift(p1__6253_SHARP_,p2__6254_SHARP_) + (curlnoise.core.potential(p1__6253_SHARP_,p2__6254_SHARP_,p3__6255_SHARP_) * amp_fn(p1__6253_SHARP_,p2__6254_SHARP_))));
});})(w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn,t))
;
var points = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn,t,f){
return (function (pt){
var vec__6256 = pt;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6256,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6256,(1),null);
var vec__6259 = curlnoise.core.gradient(f,x,y,t);
var gx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6259,(0),null);
var gy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6259,(1),null);
var x2 = (x + gy);
var y2 = (y - gx);
var vec__6262 = (((((x2 < (0))) || ((x2 > w)) || ((y2 < (0))) || ((y2 > h))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.core.random.cljs$core$IFn$_invoke$arity$1(w),quil.core.random.cljs$core$IFn$_invoke$arity$1(h)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x2,y2], null));
var x3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6262,(0),null);
var y3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6262,(1),null);
var vec__6265 = (cljs.core.truth_((function (){var and__4120__auto__ = quil.core.mouse_pressed_QMARK_();
if(cljs.core.truth_(and__4120__auto__)){
return (curlnoise.core.magn((mx - x),(my - y)) < curlnoise.core.mouse_rad);
} else {
return and__4120__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.core.random.cljs$core$IFn$_invoke$arity$1(w),quil.core.random.cljs$core$IFn$_invoke$arity$1(h)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x3,y3], null));
var x4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6265,(0),null);
var y4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6265,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x4,y4], null);
});})(w,h,mx,my,d_mouse,d_border,amp_fn,mouse_drift,n_fn,p_fn,t,f))
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
var seq__6268_6308 = cljs.core.seq(curlnoise.core.grid(quil.core.width(),quil.core.height()));
var chunk__6269_6309 = null;
var count__6270_6310 = (0);
var i__6271_6311 = (0);
while(true){
if((i__6271_6311 < count__6270_6310)){
var point_6312 = chunk__6269_6309.cljs$core$IIndexed$_nth$arity$2(null,i__6271_6311);
var vec__6290_6313 = point_6312;
var px_6314 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6290_6313,(0),null);
var py_6315 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6290_6313,(1),null);
var vec__6293_6316 = (domain_xform.cljs$core$IFn$_invoke$arity$2 ? domain_xform.cljs$core$IFn$_invoke$arity$2(px_6314,py_6315) : domain_xform.call(null,px_6314,py_6315));
var px2_6317 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6293_6316,(0),null);
var py2_6318 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6293_6316,(1),null);
var w2_6319 = w;
var h2_6320 = h;
var d_6321 = (sdf.cljs$core$IFn$_invoke$arity$2 ? sdf.cljs$core$IFn$_invoke$arity$2(px2_6317,py2_6318) : sdf.call(null,px2_6317,py2_6318));
var step_6322 = (cljs.core.mod(d_6321,offset) / offset);
var val_6323 = ((step_6322 * (255)) | (0));
var vec__6296_6324 = (((Math.abs(d_6321) >= (offset * 0.5)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6323,val_6323,val_6323], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6323,0.0,0.0], null));
var r_6325 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6296_6324,(0),null);
var g_6326 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6296_6324,(1),null);
var b_6327 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6296_6324,(2),null);
var offset_6328__$1 = ((4) * (px_6314 + (py_6315 * w)));
(pix[offset_6328__$1] = r_6325);

(pix[(offset_6328__$1 + (1))] = g_6326);

(pix[(offset_6328__$1 + (2))] = b_6327);

(pix[(offset_6328__$1 + (3))] = (255));


var G__6329 = seq__6268_6308;
var G__6330 = chunk__6269_6309;
var G__6331 = count__6270_6310;
var G__6332 = (i__6271_6311 + (1));
seq__6268_6308 = G__6329;
chunk__6269_6309 = G__6330;
count__6270_6310 = G__6331;
i__6271_6311 = G__6332;
continue;
} else {
var temp__5735__auto___6333 = cljs.core.seq(seq__6268_6308);
if(temp__5735__auto___6333){
var seq__6268_6334__$1 = temp__5735__auto___6333;
if(cljs.core.chunked_seq_QMARK_(seq__6268_6334__$1)){
var c__4550__auto___6335 = cljs.core.chunk_first(seq__6268_6334__$1);
var G__6336 = cljs.core.chunk_rest(seq__6268_6334__$1);
var G__6337 = c__4550__auto___6335;
var G__6338 = cljs.core.count(c__4550__auto___6335);
var G__6339 = (0);
seq__6268_6308 = G__6336;
chunk__6269_6309 = G__6337;
count__6270_6310 = G__6338;
i__6271_6311 = G__6339;
continue;
} else {
var point_6340 = cljs.core.first(seq__6268_6334__$1);
var vec__6299_6341 = point_6340;
var px_6342 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6299_6341,(0),null);
var py_6343 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6299_6341,(1),null);
var vec__6302_6344 = (domain_xform.cljs$core$IFn$_invoke$arity$2 ? domain_xform.cljs$core$IFn$_invoke$arity$2(px_6342,py_6343) : domain_xform.call(null,px_6342,py_6343));
var px2_6345 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6302_6344,(0),null);
var py2_6346 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6302_6344,(1),null);
var w2_6347 = w;
var h2_6348 = h;
var d_6349 = (sdf.cljs$core$IFn$_invoke$arity$2 ? sdf.cljs$core$IFn$_invoke$arity$2(px2_6345,py2_6346) : sdf.call(null,px2_6345,py2_6346));
var step_6350 = (cljs.core.mod(d_6349,offset) / offset);
var val_6351 = ((step_6350 * (255)) | (0));
var vec__6305_6352 = (((Math.abs(d_6349) >= (offset * 0.5)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6351,val_6351,val_6351], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_6351,0.0,0.0], null));
var r_6353 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6305_6352,(0),null);
var g_6354 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6305_6352,(1),null);
var b_6355 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6305_6352,(2),null);
var offset_6356__$1 = ((4) * (px_6342 + (py_6343 * w)));
(pix[offset_6356__$1] = r_6353);

(pix[(offset_6356__$1 + (1))] = g_6354);

(pix[(offset_6356__$1 + (2))] = b_6355);

(pix[(offset_6356__$1 + (3))] = (255));


var G__6357 = cljs.core.next(seq__6268_6334__$1);
var G__6358 = null;
var G__6359 = (0);
var G__6360 = (0);
seq__6268_6308 = G__6357;
chunk__6269_6309 = G__6358;
count__6270_6310 = G__6359;
i__6271_6311 = G__6360;
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
return (function (p1__6361_SHARP_,p2__6362_SHARP_){
return (rad - curlnoise.core.sdf_box(p1__6361_SHARP_,p2__6362_SHARP_,(quil.core.width() - (rad * (2))),(quil.core.height() - (rad * (2)))));
});})(pix,w,h,color,rad))
,((function (pix,w,h,color,rad){
return (function (p1__6363_SHARP_,p2__6364_SHARP_){
return cljs.core.vec(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((p1__6363_SHARP_ - rad) - 0.0),((p2__6364_SHARP_ - rad) - 0.0)], null));
});})(pix,w,h,color,rad))
);
} else {
var seq__6365_6381 = cljs.core.seq(cljs.core.cst$kw$grid.cljs$core$IFn$_invoke$arity$1(state));
var chunk__6366_6382 = null;
var count__6367_6383 = (0);
var i__6368_6384 = (0);
while(true){
if((i__6368_6384 < count__6367_6383)){
var point_6385 = chunk__6366_6382.cljs$core$IIndexed$_nth$arity$2(null,i__6368_6384);
var vec__6375_6386 = point_6385;
var px_6387 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6375_6386,(0),null);
var py_6388 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6375_6386,(1),null);
var ix_6389 = curlnoise.core.clamp((px_6387 | (0)),(0),(w - (1)));
var iy_6390 = curlnoise.core.clamp((py_6388 | (0)),(0),(h - (1)));
var offset_6391 = ((4) * (ix_6389 + (iy_6390 * w)));
(pix[offset_6391] = (0));

(pix[(offset_6391 + (1))] = (0));

(pix[(offset_6391 + (2))] = (0));

(pix[(offset_6391 + (3))] = (255));


var G__6392 = seq__6365_6381;
var G__6393 = chunk__6366_6382;
var G__6394 = count__6367_6383;
var G__6395 = (i__6368_6384 + (1));
seq__6365_6381 = G__6392;
chunk__6366_6382 = G__6393;
count__6367_6383 = G__6394;
i__6368_6384 = G__6395;
continue;
} else {
var temp__5735__auto___6396 = cljs.core.seq(seq__6365_6381);
if(temp__5735__auto___6396){
var seq__6365_6397__$1 = temp__5735__auto___6396;
if(cljs.core.chunked_seq_QMARK_(seq__6365_6397__$1)){
var c__4550__auto___6398 = cljs.core.chunk_first(seq__6365_6397__$1);
var G__6399 = cljs.core.chunk_rest(seq__6365_6397__$1);
var G__6400 = c__4550__auto___6398;
var G__6401 = cljs.core.count(c__4550__auto___6398);
var G__6402 = (0);
seq__6365_6381 = G__6399;
chunk__6366_6382 = G__6400;
count__6367_6383 = G__6401;
i__6368_6384 = G__6402;
continue;
} else {
var point_6403 = cljs.core.first(seq__6365_6397__$1);
var vec__6378_6404 = point_6403;
var px_6405 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6378_6404,(0),null);
var py_6406 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6378_6404,(1),null);
var ix_6407 = curlnoise.core.clamp((px_6405 | (0)),(0),(w - (1)));
var iy_6408 = curlnoise.core.clamp((py_6406 | (0)),(0),(h - (1)));
var offset_6409 = ((4) * (ix_6407 + (iy_6408 * w)));
(pix[offset_6409] = (0));

(pix[(offset_6409 + (1))] = (0));

(pix[(offset_6409 + (2))] = (0));

(pix[(offset_6409 + (3))] = (255));


var G__6410 = cljs.core.next(seq__6365_6397__$1);
var G__6411 = null;
var G__6412 = (0);
var G__6413 = (0);
seq__6365_6381 = G__6410;
chunk__6366_6382 = G__6411;
count__6367_6383 = G__6412;
i__6368_6384 = G__6413;
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
var G__6414__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.settings,args);
};
var G__6414 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6415__i = 0, G__6415__a = new Array(arguments.length -  0);
while (G__6415__i < G__6415__a.length) {G__6415__a[G__6415__i] = arguments[G__6415__i + 0]; ++G__6415__i;}
  args = new cljs.core.IndexedSeq(G__6415__a,0,null);
} 
return G__6414__delegate.call(this,args);};
G__6414.cljs$lang$maxFixedArity = 0;
G__6414.cljs$lang$applyTo = (function (arglist__6416){
var args = cljs.core.seq(arglist__6416);
return G__6414__delegate(args);
});
G__6414.cljs$core$IFn$_invoke$arity$variadic = G__6414__delegate;
return G__6414;
})()
:curlnoise.core.settings),cljs.core.cst$kw$update,((cljs.core.fn_QMARK_(curlnoise.core.update_state))?(function() { 
var G__6417__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.update_state,args);
};
var G__6417 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6418__i = 0, G__6418__a = new Array(arguments.length -  0);
while (G__6418__i < G__6418__a.length) {G__6418__a[G__6418__i] = arguments[G__6418__i + 0]; ++G__6418__i;}
  args = new cljs.core.IndexedSeq(G__6418__a,0,null);
} 
return G__6417__delegate.call(this,args);};
G__6417.cljs$lang$maxFixedArity = 0;
G__6417.cljs$lang$applyTo = (function (arglist__6419){
var args = cljs.core.seq(arglist__6419);
return G__6417__delegate(args);
});
G__6417.cljs$core$IFn$_invoke$arity$variadic = G__6417__delegate;
return G__6417;
})()
:curlnoise.core.update_state),cljs.core.cst$kw$renderer,((cljs.core.fn_QMARK_(curlnoise.core.renderer))?(function() { 
var G__6420__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.renderer,args);
};
var G__6420 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6421__i = 0, G__6421__a = new Array(arguments.length -  0);
while (G__6421__i < G__6421__a.length) {G__6421__a[G__6421__i] = arguments[G__6421__i + 0]; ++G__6421__i;}
  args = new cljs.core.IndexedSeq(G__6421__a,0,null);
} 
return G__6420__delegate.call(this,args);};
G__6420.cljs$lang$maxFixedArity = 0;
G__6420.cljs$lang$applyTo = (function (arglist__6422){
var args = cljs.core.seq(arglist__6422);
return G__6420__delegate(args);
});
G__6420.cljs$core$IFn$_invoke$arity$variadic = G__6420__delegate;
return G__6420;
})()
:curlnoise.core.renderer),cljs.core.cst$kw$size,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [curlnoise.core.res_x,curlnoise.core.res_y], null),cljs.core.cst$kw$title,"Curl Noise",cljs.core.cst$kw$setup,((cljs.core.fn_QMARK_(curlnoise.core.setup))?(function() { 
var G__6423__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.setup,args);
};
var G__6423 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6424__i = 0, G__6424__a = new Array(arguments.length -  0);
while (G__6424__i < G__6424__a.length) {G__6424__a[G__6424__i] = arguments[G__6424__i + 0]; ++G__6424__i;}
  args = new cljs.core.IndexedSeq(G__6424__a,0,null);
} 
return G__6423__delegate.call(this,args);};
G__6423.cljs$lang$maxFixedArity = 0;
G__6423.cljs$lang$applyTo = (function (arglist__6425){
var args = cljs.core.seq(arglist__6425);
return G__6423__delegate(args);
});
G__6423.cljs$core$IFn$_invoke$arity$variadic = G__6423__delegate;
return G__6423;
})()
:curlnoise.core.setup),cljs.core.cst$kw$middleware,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),cljs.core.cst$kw$host,"curlnoise",cljs.core.cst$kw$draw,((cljs.core.fn_QMARK_(curlnoise.core.draw_state))?(function() { 
var G__6426__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(curlnoise.core.draw_state,args);
};
var G__6426 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__6427__i = 0, G__6427__a = new Array(arguments.length -  0);
while (G__6427__i < G__6427__a.length) {G__6427__a[G__6427__i] = arguments[G__6427__i + 0]; ++G__6427__i;}
  args = new cljs.core.IndexedSeq(G__6427__a,0,null);
} 
return G__6426__delegate.call(this,args);};
G__6426.cljs$lang$maxFixedArity = 0;
G__6426.cljs$lang$applyTo = (function (arglist__6428){
var args = cljs.core.seq(arglist__6428);
return G__6426__delegate(args);
});
G__6426.cljs$core$IFn$_invoke$arity$variadic = G__6426__delegate;
return G__6426;
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
var len__4730__auto___6430 = arguments.length;
var i__4731__auto___6431 = (0);
while(true){
if((i__4731__auto___6431 < len__4730__auto___6430)){
args__4736__auto__.push((arguments[i__4731__auto___6431]));

var G__6432 = (i__4731__auto___6431 + (1));
i__4731__auto___6431 = G__6432;
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
curlnoise.core._main.cljs$lang$applyTo = (function (seq6429){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq6429));
});

