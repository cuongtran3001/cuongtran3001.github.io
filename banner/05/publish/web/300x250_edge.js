
(function(compId){var _=null,y=true,n=false,x1='6.0.0',x3='6.0.0.400',x2='5.0.0',x4='rgba(0,0,0,0)',lf='left',e22='${KV}',e21='${cta}',g='image',e20='${copy1}',e19='${pp}',h='height',e18='${Stage}',bg='background-color',e16='${points}',o='opacity',x15='rgba(255,255,255,1)',x13='solid',m='rect',x12='rgba(255,255,255,0.00)',e17='${replay}',i='none';var g8='pp.png',g10='cta.png',g6='KV.png',g5='bg.jpg',g7='copy1.png',g9='points.png',g11='brand.png',g14='replay.png';var im='images/',aud='media/',vid='media/',js='js/',fonts={},opts={'gAudioPreloadPreference':'auto','gVideoPreloadPreference':'auto'},resources=[],scripts=[],symbols={"stage":{v:x1,mv:x2,b:x3,stf:i,cg:i,rI:n,cn:{dom:[{id:'bg',t:g,r:['0px','0px','100%','100%','auto','auto'],f:[x4,im+g5,'0px','0px']},{id:'KV',t:g,r:['0px','0px','300px','250px','auto','auto'],o:'0',f:[x4,im+g6,'0px','0px']},{id:'copy1',t:g,r:['0px','0px','100%','100%','auto','auto'],o:'0',f:[x4,im+g7,'0px','0px']},{id:'pp',t:g,r:['0px','0px','100%','100%','auto','auto'],o:'0',f:[x4,im+g8,'0px','0px']},{id:'points',t:g,r:['0px','0px','100%','100%','auto','auto'],f:[x4,im+g9,'0px','0px']},{id:'cta',t:g,r:['0px','0px','100%','100%','auto','auto'],f:[x4,im+g10,'0px','0px']},{id:'brand',t:g,r:['0px','0px','100%','100%','auto','auto'],f:[x4,im+g11,'0px','0px']},{id:'border_clickTag',t:m,r:['0px','0px','99.3%','99.2%','auto','auto'],cu:'pointer',f:[x12],s:[1,"rgba(0,0,0,1.00)",x13]},{id:'replay',t:g,r:['0px','0px','45px','20px','auto','auto'],cu:'pointer',f:[x4,im+g14,'0px','0px']}],style:{'${Stage}':{isStage:true,r:['null','null','300px','250px','auto','auto'],overflow:'hidden',f:[x15]}}},tt:{d:15000,a:y,data:[["eid742",o,9000,500,"linear",e16,'0','1'],["eid743",o,13000,500,"linear",e16,'1','0'],["eid575",o,14500,500,"linear",e17,'0','1'],["eid608",lf,0,0,"linear",e17,'0px','0px'],["eid607",bg,0,0,"linear",e18,'rgba(255,255,255,1)','rgba(255,255,255,1)'],["eid602",h,14500,0,"linear",e17,'20px','20px'],["eid747",o,0,0,"linear",e19,'0','0'],["eid741",o,4500,500,"linear",e19,'0','1'],["eid738",o,8500,500,"linear",e19,'1','0'],["eid737",o,500,500,"linear",e20,'0','1'],["eid740",o,4000,500,"linear",e20,'1','0'],["eid744",o,13500,500,"linear",e21,'0','1'],["eid878",o,0,500,"linear",e22,'0','1'],["eid880",o,8500,500,"linear",e22,'1','0']]}}};AdobeEdge.registerCompositionDefn(compId,symbols,fonts,scripts,resources,opts);})("EDGE-20049058");
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;Edge.registerEventBinding(compId,function($){
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${border_clickTag}","click",function(sym,e){window.open(clickTag,"_blank");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${replay}","click",function(sym,e){if(!sym.isPlaying()){sym.play(0);}});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'Preloader'
(function(symbolName){})("Preloader");
//Edge symbol end:'Preloader'
})})(AdobeEdge.$,AdobeEdge,"EDGE-20049058");