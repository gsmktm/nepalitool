// TodayNepal Poster Studio V2 — standalone, browser-only Canvas designer.
// Original template art is drawn procedurally. Images never leave this browser.
const formats={
  portrait:{name:"Instagram Portrait · 4:5",w:1080,h:1350},
  square:{name:"Square Post · 1:1",w:1080,h:1080},
  story:{name:"Story / Reel · 9:16",w:1080,h:1920},
  landscape:{name:"YouTube / Presentation · 16:9",w:1920,h:1080},
  share:{name:"News / Link Cover · 1.91:1",w:1200,h:628}
};
const templates=[
 {id:"royal",name:"Royal Heritage",group:"राजकीय",bg:["#070f26","#2b2147"],accent:"#e8bc72",ink:"#fffaf2",motif:"royal",symbol:"ॐ"},
 {id:"himalaya",name:"Himalayan Dawn",group:"प्रकृति",bg:["#234d86","#db7869"],accent:"#f9d68a",ink:"#fffdfa",motif:"mountains",symbol:"☀"},
 {id:"midnight",name:"Midnight Editorial",group:"आधुनिक",bg:["#051b34","#174b77"],accent:"#64d5e1",ink:"#ffffff",motif:"grid",symbol:"✦"},
 {id:"festival",name:"Festival Lights",group:"चाडपर्व",bg:["#5a123f","#d0474b"],accent:"#ffd782",ink:"#ffffff",motif:"festival",symbol:"✺"},
 {id:"temple",name:"Temple Skyline",group:"सम्पदा",bg:["#16284b","#654c72"],accent:"#f2c78c",ink:"#ffffff",motif:"temple",symbol:"◈"},
 {id:"mandala",name:"Sacred Geometry",group:"संस्कृति",bg:["#242050","#573273"],accent:"#e7bbf1",ink:"#ffffff",motif:"mandala",symbol:"ॐ"},
 {id:"paper",name:"Vintage Parchment",group:"सम्पादकीय",bg:["#fcf0d7","#dbc4a0"],accent:"#803b36",ink:"#3a2932",motif:"paper",symbol:"❋"},
 {id:"national",name:"Nepal Identity",group:"राष्ट्रिय",bg:["#a71d3d","#3b0f33"],accent:"#f6e9d0",ink:"#ffffff",motif:"national",symbol:"☼"},
 {id:"ink",name:"Bold Typography",group:"न्यूनतम",bg:["#f9f9f7","#e8e9f0"],accent:"#1c5fe3",ink:"#0e2349",motif:"editorial",symbol:"अ"},
 {id:"sunset",name:"Terai Golden Hour",group:"प्रकृति",bg:["#ef9a61","#ad425c"],accent:"#fff1c6",ink:"#fffaf3",motif:"sunset",symbol:"☼"},
 {id:"cosmic",name:"Shiva Cosmos",group:"आध्यात्मिक",bg:["#060a22","#17265a"],accent:"#92a9ff",ink:"#f7f5ff",motif:"cosmic",symbol:"ॐ"},
 {id:"news",name:"Newsroom Impact",group:"समाचार",bg:["#0d2e68","#114fa5"],accent:"#ffdb53",ink:"#ffffff",motif:"news",symbol:"◆"}
];
const starter={
 format:"portrait",template:"royal",title:"नेपालको गौरव\nहाम्रो पहिचान",
 kicker:"TODAYNEPAL • CREATIVE STUDIO",
 description:"हाम्रो भाषा, कला, संस्कृति र स्वाभिमान",
 footer:"NEPAL FIRST • CREATE WITH PRIDE",
 font:"Anek Devanagari",size:82,bodySize:31,
 align:"center",y:48,spacing:1.28,
 color:"",accent:"",overlay:28,
 photoOpacity:85,photoPosition:50,
 showLogo:true,showBorder:true,showFooter:true,showSymbol:true,
 brand:"TodayNepal.com",zoom:100
};
const fonts=["Anek Devanagari","Noto Serif Devanagari","Mukta","Kalam","Hind","Baloo 2","Martel","Yatra One"];
const STORAGE_KEY="todaynepal-poster-v2";
let state={...starter},undo=[],redo=[],backgroundImage=null,logoImage=null,host=null,canvas=null,ctx=null,drawPending=false,drag=null,files={};

const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,Number(v)||0));
const tpl=()=>templates.find(t=>t.id===state.template)||templates[0];
const fmt=()=>formats[state.format]||formats.portrait;
function ico(d){return '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';}
const icons={
 undo:ico('<path d="m9 14-5-5 5-5M4 9h11a5 5 0 1 1 0 10h-2"/>'),
 redo:ico('<path d="m15 14 5-5-5-5m5 5H9a5 5 0 1 0 0 10h2"/>'),
 download:ico('<path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/>'),
 image:ico('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m3 17 5-5 4 4 3-3 6 6"/>'),
 sparkle:ico('<path d="m12 2 2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3L12 2Z"/>'),
 text:ico('<path d="M4 6h16M12 6v14M7 20h10M7 6v3m10-3v3"/>'),
 layers:ico('<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5M3 17l9 5 9-5"/>'),
 palette:ico('<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 2-2 2 2 0 0 0-.3-1 2 2 0 0 1 1.8-3H19a3 3 0 0 0 3-3 9 9 0 0 0-10-9Z"/><circle cx="7" cy="10" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="17" cy="8" r="1"/>'),
 save:ico('<path d="M5 3h14l2 2v16H3V3h2Zm2 0v6h10V3M7 21v-8h10v8"/>'),
 random:ico('<path d="M3 7h3c5 0 7 10 12 10h3m-4-4 4 4-4 4M3 17h3c2 0 3-2 4-4m5-6h6m-4-4 4 4-4 4"/>'),
 reset:ico('<path d="M3 12a9 9 0 1 1 3 6.7M3 4v8h8"/>')
};
function readState(){
 try{
  const old=JSON.parse(localStorage.getItem(STORAGE_KEY));
  if(!old||typeof old!=="object"||Array.isArray(old))return {...starter};
  const copy={...starter};
  Object.keys(starter).forEach(k=>{
   const val=old[k];
   if(typeof val===typeof starter[k]&&(typeof val!=="string"||val.length<3000))copy[k]=val;
  });
  if(!formats[copy.format])copy.format="portrait";
  if(!templates.some(t=>t.id===copy.template))copy.template="royal";
  if(!fonts.includes(copy.font))copy.font=starter.font;
  copy.size=clamp(copy.size,42,150);copy.bodySize=clamp(copy.bodySize,18,56);
  copy.y=clamp(copy.y,22,75);copy.overlay=clamp(copy.overlay,0,85);
  copy.photoOpacity=clamp(copy.photoOpacity,0,100);copy.photoPosition=clamp(copy.photoPosition,0,100);
  return copy;
 }catch{return {...starter};}
}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}}
function snapshot(){undo.push({...state});if(undo.length>35)undo.shift();redo=[];}
function patch(key,value,history=false){
 if(!(key in starter)||state[key]===value)return;
 if(history)snapshot();
 state[key]=value;save();paintSoon();syncUi();
}
function reset(){snapshot();state={...starter};backgroundImage=null;logoImage=null;files={};save();syncUi(true);paintSoon();}
function nav(which){
 if(which==="undo"&&undo.length){redo.push({...state});state=undo.pop();save();syncUi(true);paintSoon();}
 if(which==="redo"&&redo.length){undo.push({...state});state=redo.pop();save();syncUi(true);paintSoon();}
}
function swatch(template){
 const s=template.bg;
 const m=template.motif;
 const art=m==="mountains"||m==="sunset"?"⌃⌃⌃":m==="temple"?"⌂":m==="mandala"?"✺":m==="paper"?"❋":m==="news"?"◆":m==="royal"?"ॐ":m==="national"?"☼":m==="cosmic"?"✦":"अ";
 return '<button type="button" class="ps-template'+(template.id===state.template?" active":"")+'" data-template="'+template.id+'" aria-pressed="'+(template.id===state.template)+'" title="'+esc(template.name)+'"><span class="ps-mini" style="--g1:'+s[0]+';--g2:'+s[1]+';--ga:'+template.accent+'"><span class="ps-mini-symbol">'+art+'</span><span class="ps-mini-line"></span><span class="ps-mini-line short"></span></span><span class="ps-template-label">'+esc(template.name)+'</span><small>'+esc(template.group)+'</small></button>';
}
function control(label,element,hint=""){return '<div class="ps-field"><label>'+label+'</label>'+element+(hint?'<small>'+hint+'</small>':'')+'</div>';}
function numericRange(name,label,min,max,val,unit=""){
 return control(label+' <output id="ps-'+name+'-value">'+state[name]+unit+'</output>','<input class="ps-range" type="range" id="ps-'+name+'" data-ps="'+name+'" min="'+min+'" max="'+max+'" value="'+state[name]+'">');
}
function field(name,placeholder,rows=0){
 return rows?'<textarea id="ps-'+name+'" data-ps="'+name+'" rows="'+rows+'" maxlength="900" placeholder="'+esc(placeholder)+'">'+esc(state[name])+'</textarea>':'<input id="ps-'+name+'" data-ps="'+name+'" type="text" maxlength="900" value="'+esc(state[name])+'" placeholder="'+esc(placeholder)+'">';
}
function selects(name,items){
 return '<select id="ps-'+name+'" data-ps="'+name+'">'+items.map(([value,label])=>'<option value="'+esc(value)+'"'+(state[name]===value?' selected':'')+'>'+esc(label)+'</option>').join("")+'</select>';
}
function toggle(name,label){
 return '<label class="ps-toggle"><span>'+label+'</span><input type="checkbox" id="ps-'+name+'" data-ps="'+name+'"'+(state[name]?" checked":"")+'><span class="ps-switch" aria-hidden="true"></span></label>';
}
function pageTools(){
 return '<section class="ps-top"><div class="container"><div class="ps-breadcrumb"><a href="/">गृहपृष्ठ</a><span>›</span><a href="/tools/">सबै उपकरण</a><span>›</span>Poster Studio</div><div class="ps-heading"><div><span class="ps-kicker">✦ TODAYNEPAL CREATIVE STUDIO · VERSION 2</span><h1>नेपाली पोस्टर <em>डिजाइन स्टुडियो</em></h1><p>शब्दलाई कलामा बदल्नुहोस् — मौलिक टेम्पलेट, नेपाली टाइपोग्राफी, इमेज लेयर र उच्च-गुणस्तरको एक्सपोर्ट।</p></div><span class="ps-free">🇳🇵 १००% Browser-based</span></div></div></section>'
 +'<div class="container ps-container"><section class="ps-workspace" aria-label="पोस्टर निर्माण कार्यस्थल">'
 +'<div class="ps-rail"><button class="ps-rail-button active" data-panel="templates" aria-pressed="true">'+icons.layers+'<span>टेम्पलेट</span></button><button class="ps-rail-button" data-panel="text" aria-pressed="false">'+icons.text+'<span>पाठ</span></button><button class="ps-rail-button" data-panel="style" aria-pressed="false">'+icons.palette+'<span>शैली</span></button><button class="ps-rail-button" data-panel="assets" aria-pressed="false">'+icons.image+'<span>तस्बिर</span></button></div>'
 +'<div class="ps-sidebar">'
 +'<div class="ps-panel" id="ps-panel-templates"><div class="ps-panel-head"><div><strong>मौलिक टेम्पलेट</strong><small>१२ विशेष डिजाइन संग्रह</small></div><span>12</span></div><div class="ps-template-grid" id="ps-template-grid">'+templates.map(swatch).join("")+'</div><button class="ps-outline ps-random" id="ps-random" type="button">'+icons.random+' अर्को शैली छान्नुहोस्</button></div>'
 +'<div class="ps-panel" id="ps-panel-text" hidden><div class="ps-panel-head"><div><strong>लेखन तथा सामग्री</strong><small>नेपालीमा आफ्नै सन्देश लेख्नुहोस्</small></div></div>'+control("मुख्य शीर्षक",field("title","यहाँ शीर्षक लेख्नुहोस्",4),"Enter थिचेर नयाँ लाइनमा जानुहोस्।") +control("सानो शीर्षक / Kicker",field("kicker","माथिको सानो पाठ"))+control("उपशीर्षक",field("description","सन्देशको व्याख्या",3))+control("तल्लो सन्देश",field("footer","सन्देश वा वेबसाइट"))+control("ब्रान्ड नाम",field("brand","ब्रान्ड / नाम"))+'</div>'
 +'<div class="ps-panel" id="ps-panel-style" hidden><div class="ps-panel-head"><div><strong>फन्ट, रंग र लेआउट</strong><small>आफ्नो पहिचानअनुसार अनुकूलन</small></div></div>'
 +control("देवनागरी फन्ट",selects("font",fonts.map(f=>[f,f])))+numericRange("size","शीर्षकको आकार",42,150,state.size,"px")+numericRange("bodySize","उपशीर्षक आकार",18,56,state.bodySize,"px")+numericRange("y","शीर्षकको स्थान",22,75,state.y,"%")
 +numericRange("overlay","पृष्ठभूमि छायाँ",0,85,state.overlay,"%")
 +control("पाठको स्थान",selects("align",[["center","बीचमा"],["left","बायाँ"],["right","दायाँ"]]))
 +control("पाठको रंग",' <input type="color" data-ps="color" id="ps-color" value="'+(state.color||tpl().ink)+'">')
 +control("Accent / सजावट",' <input type="color" data-ps="accent" id="ps-accent" value="'+(state.accent||tpl().accent)+'">')
 +'<div class="ps-toggle-stack">'+toggle("showLogo","ब्रान्डको नाम देखाउने")+toggle("showBorder","सजावटी फ्रेम देखाउने")+toggle("showFooter","तल्लो सन्देश")+toggle("showSymbol","संस्कृति-प्रेरित प्रतीक")+'</div><button type="button" class="ps-outline" id="ps-reset-colors">टेम्पलेटका मूल रंग</button></div>'
 +'<div class="ps-panel" id="ps-panel-assets" hidden><div class="ps-panel-head"><div><strong>तस्बिर तथा लेयर</strong><small>फोटोहरू तपाईंको ब्राउजरमै रहन्छन्</small></div></div>'
 +'<label class="ps-upload">'+icons.image+' <strong>पृष्ठभूमि फोटो</strong><span>JPG, PNG, WebP · अधिकतम 12MB</span><input type="file" id="ps-background" accept="image/png,image/jpeg,image/webp"></label>'
 +'<button type="button" class="ps-outline" id="ps-clear-background">पृष्ठभूमि फोटो हटाउनुहोस्</button>'
 +numericRange("photoOpacity","फोटोको दृश्यता",0,100,state.photoOpacity,"%")+numericRange("photoPosition","फोटोको ठाडो स्थिति",0,100,state.photoPosition,"%")
 +'<label class="ps-upload">'+icons.sparkle+' <strong>ब्रान्ड / लोगो (वैकल्पिक)</strong><span>PNG, JPG, WebP · अधिकतम 12MB</span><input type="file" id="ps-logo" accept="image/png,image/jpeg,image/webp"></label><button type="button" class="ps-outline" id="ps-clear-logo">लोगो हटाउनुहोस्</button><div class="ps-note">तस्बिर, लोगो र ड्राफ्ट तपाईंको कम्प्युटरमै प्रयोग हुन्छन्। फोटो फाइल पुनः खोल्दा पुनः चयन गर्नुपर्छ।</div></div>'
 +'</div><div class="ps-main"><div class="ps-toolbar"><div class="ps-toolbar-group"><label for="ps-format">क्यानभास</label>'+selects("format",Object.entries(formats).map(([k,f])=>[k,f.name]))+'</div><div class="ps-toolbar-actions"><button class="ps-iconbutton" id="ps-undo" type="button" title="Undo" aria-label="पछिल्लो परिवर्तन उल्टाउनुहोस्">'+icons.undo+'</button><button class="ps-iconbutton" id="ps-redo" type="button" title="Redo" aria-label="पछिल्लो परिवर्तन पुनः गर्नुहोस्">'+icons.redo+'</button><button class="ps-iconbutton" id="ps-reset" type="button" title="सुरुबाट" aria-label="डिजाइन रिसेट गर्नुहोस्">'+icons.reset+'</button></div></div>'
 +'<div class="ps-stage"><div class="ps-canvas-shell"><canvas id="ps-canvas" width="1080" height="1350" tabindex="0" aria-label="पोस्टर पूर्वावलोकन, शीर्षक माथि तल सार्न ड्र्याग गर्नुहोस्" role="img"></canvas></div><div class="ps-stage-tip">✦ शीर्षकलाई माथि वा तल सार्न क्यानभासमा ड्र्याग गर्नुहोस्।</div></div>'
 +'<div class="ps-bottom-toolbar"><div class="ps-zoom"><label for="ps-zoom">Zoom</label><input id="ps-zoom" type="range" min="40" max="120" value="'+state.zoom+'"><span id="ps-zoom-label">'+state.zoom+'%</span></div><span id="ps-dimensions">1080 × 1350 px</span></div>'
 +'<div class="ps-export"><div><strong>तपाईंको पोस्टर तयार छ?</strong><small>पूर्ण रिजोलुसनमा PNG, JPG वा WebP</small></div><div class="ps-export-controls"><select id="ps-export-type" aria-label="डाउनलोड फाइल प्रकार"><option value="png">PNG</option><option value="jpeg">JPG</option><option value="webp">WebP</option></select><button type="button" class="ps-primary" id="ps-export">'+icons.download+' डाउनलोड</button></div></div></div></section>'
 +'<div class="ps-secondary"><div class="ps-feature"><div class="ps-feature-icon">'+icons.save+'</div><div><strong>डिजाइन ड्राफ्ट</strong><p>पाठ र सेटिङ यही ब्राउजरमा स्वतः सुरक्षित।</p></div><button type="button" id="ps-save-json">सेटिङ Export</button></div><div class="ps-feature"><div class="ps-feature-icon">'+icons.layers+'</div><div><strong>पुरानो डिजाइन पुनः खोल्नुहोस्</strong><p>आफ्नै JSON सेटिङ लोड गरेर फेरि सम्पादन।</p></div><label class="ps-file-button">सेटिङ Import<input type="file" id="ps-import-json" accept=".json,application/json"></label></div></div>'
 +'<div class="ps-privacy">यो मौलिक टेम्पलेट-आधारित डिजाइनर हो। तस्बिरका अधिकार र प्रयोगको अनुमति आफैँ सुनिश्चित गर्नुहोस्। सबै प्रभाव तथा डाउनलोड स्थानीय Canvas मा हुन्छन्; एआईद्वारा स्वतः पोस्टर उत्पादन होइन।</div></div>';
}
function round(ctx,x,y,w,h,r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);}
function fillCircle(c,x,y,r,color){c.fillStyle=color;c.beginPath();c.arc(x,y,Math.max(.01,r),0,Math.PI*2);c.fill();}
function line(c,pts,color,width){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.lineWidth=width;c.strokeStyle=color;c.stroke();}
function mountain(c,w,h,base,color,offset=0){
 c.fillStyle=color;c.beginPath();c.moveTo(0,h);
 const coords=[[0,base],[.10,base-.08*h],[.22,base-.22*h],[.33,base-.065*h],[.46,base-.3*h],[.55,base-.11*h],[.68,base-.25*h],[.79,base-.08*h],[.9,base-.18*h],[1,base]];
 coords.forEach(([x,y])=>c.lineTo(x*w,y+offset));c.lineTo(w,h);c.closePath();c.fill();
}
function mandala(c,cx,cy,r,color){
 c.save();c.strokeStyle=color;c.lineWidth=Math.max(1.5,r/110);
 for(let layer=0;layer<3;layer++){c.beginPath();c.arc(cx,cy,r*(1-layer*.2),0,Math.PI*2);c.stroke();}
 for(let i=0;i<24;i++){let a=i*Math.PI/12;c.save();c.translate(cx+Math.cos(a)*r*.74,cy+Math.sin(a)*r*.74);c.rotate(a);c.beginPath();c.ellipse(0,0,r*.18,r*.065,0,0,Math.PI*2);c.stroke();c.restore();}
 c.restore();
}
function temple(c,w,h,col){
 const mid=w*.5,base=h*.88,scale=Math.min(w/1080,h/1350);
 c.save();c.globalAlpha=.22;c.fillStyle=col;
 const levels=[{y:base-h*.16,width:w*.36},{y:base-h*.26,width:w*.26},{y:base-h*.345,width:w*.16}];
 levels.forEach(({y,width},i)=>{
  c.fillRect(mid-width*.45,y,width*.9,h*.09);
  c.beginPath();c.moveTo(mid-width*.7,y);c.lineTo(mid,y-h*.055);c.lineTo(mid+width*.7,y);c.closePath();c.fill();
  for(let k=-1;k<=1;k++){c.fillRect(mid+k*width*.23-width*.025,y+h*.02,width*.05,h*.07);}
 });
 line(c,[[mid,base-h*.36],[mid,base-h*.42]],col,4*scale);
 fillCircle(c,mid,base-h*.42,7*scale,col);
 c.restore();
}
function flag(c,x,y,s,color){
 c.save();c.translate(x,y);c.scale(s,s);
 c.fillStyle="#153d85";c.beginPath();c.moveTo(0,0);c.lineTo(95,65);c.lineTo(32,65);c.lineTo(108,140);c.lineTo(0,140);c.closePath();c.fill();
 c.fillStyle="#dc2842";c.beginPath();c.moveTo(8,12);c.lineTo(78,55);c.lineTo(18,55);c.lineTo(91,128);c.lineTo(8,128);c.closePath();c.fill();
 c.fillStyle="#fff";c.beginPath();c.arc(28,40,11,0,Math.PI*2);c.fill();c.fillStyle="#dc2842";c.beginPath();c.arc(33,34,10,0,Math.PI*2);c.fill();
 c.fillStyle="#fff";for(let i=0;i<12;i++){const a=i*Math.PI/6;c.beginPath();c.moveTo(38+Math.cos(a)*10,100+Math.sin(a)*10);c.lineTo(38+Math.cos(a-.18)*18,100+Math.sin(a-.18)*18);c.lineTo(38+Math.cos(a+.18)*18,100+Math.sin(a+.18)*18);c.fill();}
 c.restore();
}
function drawMotif(c,w,h,s,t){
 const a=state.accent||t.accent;
 c.save();c.globalAlpha=.56;
 const type=t.motif;
 if(type==="royal"){
  mandala(c,w*.5,h*.40,Math.min(w,h)*.36,a);
  mountain(c,w,h,h*.95,"#0b1831");
  flag(c,w*.82,h*.085,s*.76,a);
  c.globalAlpha=.22;mandala(c,w*.05,h*.85,w*.13,a);
 }else if(type==="mountains"||type==="sunset"){
  fillCircle(c,w*.78,h*.23,w*.17,a);
  mountain(c,w,h,h*.82,type==="sunset"?"#8c4058":"#6d8fbb");
  mountain(c,w,h,h*.91,type==="sunset"?"#762a50":"#2d527d");
  mountain(c,w,h,h*.99,type==="sunset"?"#541f40":"#15365a");
 }else if(type==="temple"){
  mandala(c,w*.8,h*.2,w*.17,a);
  temple(c,w,h,a);
 }else if(type==="mandala"){
  mandala(c,w*.5,h*.5,Math.min(w,h)*.44,a);
  mandala(c,w*.13,h*.15,Math.min(w,h)*.12,a);
  mandala(c,w*.89,h*.84,Math.min(w,h)*.12,a);
 }else if(type==="festival"){
  for(let i=0;i<14;i++){
   let x=(i+.35)*w/14;line(c,[[x,0],[x,h*.13+i%3*h*.014]],a,2*s);
   fillCircle(c,x,h*.14+i%3*h*.014,6*s,a);
  }
  for(let i=0;i<7;i++){const x=(i+.5)*w/7,y=h*.88+(i%2)*h*.018;fillCircle(c,x,y,25*s,a);fillCircle(c,x,y-31*s,7*s,"#fff0bb");}
 }else if(type==="paper"){
  for(let i=0;i<48;i++){const yy=(i*157.41)%h;line(c,[[0,yy],[w,yy+((i%3)-1)*5*s]],"#92785a",.45*s);}
  mandala(c,w*.86,h*.16,w*.17,a);
 }else if(type==="national"){
  flag(c,w*.76,h*.15,s*2.1,a);
  c.globalAlpha=.28;mountain(c,w,h,h*.95,"#17183c");
  c.globalAlpha=.19;mandala(c,w*.25,h*.4,w*.32,a);
 }else if(type==="editorial"){
  c.fillStyle=a;c.fillRect(0,0,Math.max(12,18*s),h);
  c.globalAlpha=.13;c.fillRect(w*.8,0,w*.2,h);
  c.globalAlpha=.18;mandala(c,w*.84,h*.74,w*.27,a);
 }else if(type==="grid"){
  c.globalAlpha=.13;
  for(let i=0;i<15;i++)line(c,[[i*w/14,0],[i*w/14,h]],a,1*s);
  for(let i=0;i<22;i++)line(c,[[0,i*h/21],[w,i*h/21]],a,1*s);
  c.globalAlpha=.3;mandala(c,w*.85,h*.28,w*.23,a);
 }else if(type==="cosmic"){
  for(let i=0;i<75;i++){const xx=((i*7517)%1000)/1000*w,yy=((i*3299)%1000)/1000*h;fillCircle(c,xx,yy,(i%4+1)*s,"#dde6ff");}
  c.globalAlpha=.30;mandala(c,w*.5,h*.50,w*.39,a);
 }else if(type==="news"){
  c.globalAlpha=.3;c.fillStyle=a;c.fillRect(0,0,Math.max(w*.05,14*s),h);
  c.fillStyle=a;c.fillRect(w*.73,h*.08,w*.18,h*.012);
  c.globalAlpha=.2;mandala(c,w*.83,h*.55,w*.26,a);
 }
 c.restore();
}
function drawCover(c,img,w,h,pos){
 const scale=Math.max(w/img.width,h/img.height);
 const sw=img.width*scale,sh=img.height*scale;
 const y=(h-sh)*(clamp(pos,0,100)/100);
 c.drawImage(img,(w-sw)/2,y,sw,sh);
}
function graphemes(text){
 if(typeof Intl!=="undefined"&&Intl.Segmenter)return Array.from(new Intl.Segmenter("ne",{granularity:"grapheme"}).segment(text),x=>x.segment);
 return Array.from(text);
}
function wrap(c,text,maxWidth,maxLines=7){
 const out=[];
 for(const raw of String(text).split("\n")){
  if(!raw.trim()){out.push("");continue;}
  let current="";
  for(const word of raw.trim().split(/\s+/)){
   const candidate=current?current+" "+word:word;
   if(c.measureText(candidate).width<=maxWidth){current=candidate;continue;}
   if(current){out.push(current);current="";}
   if(c.measureText(word).width<=maxWidth){current=word;continue;}
   let partial="";
   for(const piece of graphemes(word)){
    if(partial&&c.measureText(partial+piece).width>maxWidth){out.push(partial);partial=piece;}else partial+=piece;
   }
   current=partial;
  }
  if(current)out.push(current);
 }
 if(out.length>maxLines){out.length=maxLines;let last=out[maxLines-1];while(last&&c.measureText(last+"…").width>maxWidth)last=graphemes(last).slice(0,-1).join("");out[maxLines-1]=last+"…";}
 return out;
}
function textRows(c,lines,x,midY,lineHeight){
 const start=midY-(lines.length-1)*lineHeight/2;
 lines.forEach((txt,i)=>c.fillText(txt,x,start+i*lineHeight));
 return {start,end:start+(lines.length-1)*lineHeight};
}
function paint(){
 if(!canvas||!canvas.isConnected)return;
 const f=fmt(),t=tpl(),w=f.w,h=f.h,s=Math.min(w/1080,h/1080),accent=state.accent||t.accent,ink=state.color||t.ink;
 if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
 const c=canvas.getContext("2d");if(!c)return;ctx=c;
 c.save();c.clearRect(0,0,w,h);
 const grd=c.createLinearGradient(0,0,w,h);grd.addColorStop(0,t.bg[0]);grd.addColorStop(1,t.bg[1]);c.fillStyle=grd;c.fillRect(0,0,w,h);
 if(backgroundImage){
  c.globalAlpha=clamp(state.photoOpacity,0,100)/100;
  drawCover(c,backgroundImage,w,h,state.photoPosition);c.globalAlpha=1;
  c.fillStyle=t.bg[0];
  c.globalAlpha=clamp(state.overlay,0,85)/100;
  c.fillRect(0,0,w,h);
  c.globalAlpha=1;
 }
 drawMotif(c,w,h,s,t);
 const mx=Math.max(52*s,w*.065),maxW=w-mx*2;
 if(state.showBorder){c.strokeStyle=accent;c.globalAlpha=.46;c.lineWidth=2.1*s;c.strokeRect(mx*.68,mx*.68,w-mx*1.36,h-mx*1.36);c.globalAlpha=1;}
 c.textAlign="center";c.textBaseline="middle";
 // Kicker in a restrained editorial strip.
 if(state.kicker.trim()){
  const kickerFont=Math.max(14,22*s);
  c.font="800 "+kickerFont+"px system-ui,sans-serif";
  c.fillStyle=accent;c.fillText(state.kicker.slice(0,82),w/2,Math.max(78*s,h*.115),maxW);
 }
 if(state.showSymbol){
  c.fillStyle=accent;c.globalAlpha=.87;c.font="600 "+Math.max(35*s,Math.min(w*.085,92*s))+"px "+JSON.stringify(state.font)+",serif";
  c.fillText(t.symbol,w/2,h*.245);c.globalAlpha=1;
 }
 if(state.showLogo){
  if(logoImage){const side=Math.min(115*s,w*.11);c.save();c.translate(w-mx-side,Math.max(30*s,h*.05));round(c,0,0,side,side,14*s);c.clip();drawCover(c,logoImage,side,side,50);c.restore();}
  else{
   c.font="800 "+Math.max(16*s,Math.min(w*.024,27*s))+"px system-ui,sans-serif";
   c.fillStyle=accent;
   c.textAlign="right";c.fillText(state.brand.slice(0,55),w-mx,Math.max(40*s,h*.06),w*.38);
  }
 }
 c.textAlign=state.align;c.fillStyle=ink;
 const x=state.align==="left"?mx:state.align==="right"?w-mx:w/2;
 const cap=state.format==="landscape"?maxW*.87:maxW;
 const titleFont=clamp(state.size,42,150)*s;
 c.font="800 "+titleFont+"px "+JSON.stringify(state.font)+",sans-serif";
 c.shadowColor=(t.motif==="paper"||t.motif==="editorial")?"transparent":"rgba(0,0,0,.36)";
 c.shadowBlur=19*s;c.shadowOffsetY=5*s;
 const rows=wrap(c,state.title,cap,6);
 const lineH=titleFont*clamp(state.spacing,1.15,1.65);
 const centerY=h*clamp(state.y,22,75)/100;
 const bounds=textRows(c,rows,x,centerY,lineH);
 c.shadowColor="transparent";c.shadowBlur=0;c.shadowOffsetY=0;
 if(state.description.trim()){
  const descSize=clamp(state.bodySize,18,56)*s;
  c.font="650 "+descSize+"px "+JSON.stringify(state.font)+",sans-serif";
  c.fillStyle=accent;
  const descRows=wrap(c,state.description,cap*.95,3),descH=descSize*1.55;
  const below=Math.min(h*.89,bounds.end+titleFont*.91+descRows.length*descH*.5);
  textRows(c,descRows,x,below,descH);
 }
 if(state.showFooter&&state.footer.trim()){
  c.textAlign="center";
  c.strokeStyle=accent;c.lineWidth=2*s;c.globalAlpha=.55;
  line(c,[[w*.39,h*.915],[w*.61,h*.915]],accent,2*s);
  c.globalAlpha=1;c.fillStyle=ink;
  c.font="700 "+Math.max(15,19*s)+"px system-ui,sans-serif";
  c.fillText(state.footer.slice(0,120),w/2,h*.953,maxW);
 }
 c.restore();
 const d=document.querySelector("#ps-dimensions");if(d)d.textContent=w+" × "+h+" px";
 const shell=canvas.closest(".ps-canvas-shell");if(shell)shell.style.setProperty("--ps-width",clamp(state.zoom,40,120)+"%");
}
function paintSoon(){if(drawPending)return;drawPending=true;requestAnimationFrame(()=>{drawPending=false;paint();});}
function syncUi(resetAll=false){
 if(!host)return;
 const changed={...state};
 for(const [key,value] of Object.entries(changed)){
  const el=host.querySelector("#ps-"+key);
  if(el&&(resetAll||el!==document.activeElement)){
   if(el.type==="checkbox")el.checked=!!value;
   else if(el.type==="color")el.value=value||((key==="color")?tpl().ink:tpl().accent);
   else el.value=value;
  }
  const output=host.querySelector("#ps-"+key+"-value");
  if(output)output.textContent=value+({size:"px",bodySize:"px",y:"%",overlay:"%",photoOpacity:"%",photoPosition:"%"}[key]||"");
 }
 host.querySelectorAll(".ps-template").forEach(el=>{const active=el.dataset.template===state.template;el.classList.toggle("active",active);el.setAttribute("aria-pressed",String(active));});
 const zoomText=host.querySelector("#ps-zoom-label");if(zoomText)zoomText.textContent=state.zoom+"%";
 const zoom=host.querySelector("#ps-zoom");if(zoom)zoom.value=state.zoom;
 const undoButton=host.querySelector("#ps-undo"),redoButton=host.querySelector("#ps-redo");
 if(undoButton)undoButton.disabled=undo.length===0;
 if(redoButton)redoButton.disabled=redo.length===0;
}
function status(message,error=false){
 const node=host?.querySelector("#ps-status");if(!node)return;
 node.textContent=message;node.dataset.error=String(error);
 clearTimeout(status.timer);
 status.timer=setTimeout(()=>{if(node.isConnected)node.textContent="";},4500);
}
function fileSave(name,blob){const link=document.createElement("a");const uri=URL.createObjectURL(blob);link.href=uri;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(uri),1500);}
async function exportPoster(){
 const btn=host.querySelector("#ps-export");btn.disabled=true;btn.textContent="तयार हुँदैछ…";
 try{
  await document.fonts.load("800 "+clamp(state.size,42,150)+"px "+JSON.stringify(state.font));
  paint();
  const kind=host.querySelector("#ps-export-type").value;
  const mime=kind==="jpeg"?"image/jpeg":kind==="webp"?"image/webp":"image/png";
  const ext=kind==="jpeg"?"jpg":kind;
  const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error("Canvas export failed")),mime,.94));
  if(blob.type!==mime)throw new Error("Selected image format is unsupported");
  fileSave("todaynepal-"+state.template+"-"+fmt().w+"x"+fmt().h+"."+ext,blob);
  status("डाउनलोड तयार भयो ✓");
 }catch(e){status("डाउनलोडमा समस्या आयो। अर्को फर्म्याट प्रयास गर्नुहोस्।",true);}
 finally{btn.disabled=false;btn.innerHTML=icons.download+" डाउनलोड";}
}
async function handleImage(file,which){
 if(!file)return;
 if(!/image\/(jpeg|png|webp)/.test(file.type)||file.size>12*1024*1024){status("PNG, JPG वा WebP (१२ MB सम्म) मात्र प्रयोग गर्नुहोस्।",true);return;}
 let src=URL.createObjectURL(file);
 try{
  const image=new Image();image.decoding="async";
  await new Promise((res,rej)=>{image.onload=res;image.onerror=rej;image.src=src;});
  if(which==="background")backgroundImage=image;else logoImage=image;
  files[which]=file.name;
  status("तस्बिर लोड भयो ✓");paintSoon();
 }catch{status("तस्बिर खोल्न सकिएन।",true);}finally{URL.revokeObjectURL(src);}
}
function activatePanel(name){
 for(const el of host.querySelectorAll(".ps-rail-button")){const selected=el.dataset.panel===name;el.classList.toggle("active",selected);el.setAttribute("aria-pressed",String(selected));}
 for(const el of host.querySelectorAll(".ps-panel"))el.hidden=el.id!=="ps-panel-"+name;
}
function bind(){
 host.querySelectorAll(".ps-rail-button").forEach(el=>el.addEventListener("click",()=>activatePanel(el.dataset.panel)));
 host.querySelectorAll(".ps-template").forEach(el=>el.addEventListener("click",()=>patch("template",el.dataset.template,true)));
 host.querySelectorAll("[data-ps]").forEach(el=>{
  const key=el.dataset.ps;
  const type=el.tagName==="SELECT"||el.type==="checkbox"||el.type==="color"?"change":"input";
  let started=false;
  el.addEventListener("focus",()=>started=false);
  el.addEventListener(type,()=>{
   if(!started&&type==="input"){snapshot();started=true;}
   const value=el.type==="checkbox"?el.checked:el.type==="range"?+el.value:el.value;
   patch(key,value,type!=="input");
  });
  el.addEventListener("blur",()=>started=false);
  if(type==="change")return;
 });
 host.querySelector("#ps-undo").addEventListener("click",()=>nav("undo"));
 host.querySelector("#ps-redo").addEventListener("click",()=>nav("redo"));
 host.querySelector("#ps-reset").addEventListener("click",reset);
 host.querySelector("#ps-random").addEventListener("click",()=>{
  const candidates=templates.filter(t=>t.id!==state.template);patch("template",candidates[Math.floor(Math.random()*candidates.length)].id,true);
 });
 host.querySelector("#ps-reset-colors").addEventListener("click",()=>{snapshot();state.color="";state.accent="";save();syncUi(true);paintSoon();});
 host.querySelector("#ps-zoom").addEventListener("input",e=>patch("zoom",+e.target.value));
 host.querySelector("#ps-export").addEventListener("click",exportPoster);
 host.querySelector("#ps-background").addEventListener("change",e=>handleImage(e.target.files?.[0],"background"));
 host.querySelector("#ps-logo").addEventListener("change",e=>handleImage(e.target.files?.[0],"logo"));
 host.querySelector("#ps-clear-background").addEventListener("click",()=>{backgroundImage=null;files.background="";paintSoon();status("पृष्ठभूमि हटाइयो");});
 host.querySelector("#ps-clear-logo").addEventListener("click",()=>{logoImage=null;files.logo="";paintSoon();status("लोगो हटाइयो");});
 host.querySelector("#ps-save-json").addEventListener("click",()=>fileSave("todaynepal-poster-settings.json",new Blob([JSON.stringify({type:"todaynepal-poster-v2",settings:state},null,2)],{type:"application/json"})));
 host.querySelector("#ps-import-json").addEventListener("change",async e=>{
  const file=e.target.files?.[0];if(!file||file.size>100000)return;
  try{
   const imported=JSON.parse(await file.text());if(imported?.type!=="todaynepal-poster-v2"||!imported.settings||typeof imported.settings!=="object"||!formats[imported.settings.format]||!templates.some(t=>t.id===imported.settings.template))throw new Error("Invalid");
   snapshot();const safe={...starter};
   for(const k of Object.keys(safe)){if(typeof imported.settings[k]===typeof safe[k]&&(typeof imported.settings[k]!=="string"||imported.settings[k].length<3000))safe[k]=imported.settings[k];}
   if(!fonts.includes(safe.font))safe.font=starter.font;
   state=safe;save();syncUi(true);paintSoon();status("डिजाइन सेटिङ आयात गरियो ✓");
  }catch{status("अमान्य डिजाइन JSON फाइल।",true);}finally{e.target.value="";}
 });
 canvas.addEventListener("pointerdown",e=>{snapshot();drag={y:e.clientY,start:state.y};syncUi();canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener("pointermove",e=>{
  if(!drag)return;
  const r=canvas.getBoundingClientRect(),dy=(e.clientY-drag.y)/r.height*100;
  patch("y",Math.round(clamp(drag.start+dy,22,75)));
 });
 canvas.addEventListener("pointerup",()=>drag=null);
 canvas.addEventListener("pointercancel",()=>drag=null);
 canvas.addEventListener("keydown",e=>{
  if(e.key==="ArrowUp"||e.key==="ArrowDown"){e.preventDefault();patch("y",clamp(state.y+(e.key==="ArrowUp"?-1:1),22,75),true);}
 });
 host.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&e.key.toLowerCase()==="z"&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)){e.preventDefault();nav("undo");}
  if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="z"&&!/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)){e.preventDefault();nav("redo");}
 });
}
export function posterStudioPage(){return pageTools();}
export function initPosterStudio(){
 state=readState();undo=[];redo=[];backgroundImage=null;logoImage=null;files={};
 host=document.querySelector(".ps-container");
 canvas=host?.querySelector("#ps-canvas")||null;
 if(!host||!canvas)return;
 // Show status inside the workspace, never append to the whole site.
 if(!host.querySelector("#ps-status")){
  const bar=host.querySelector(".ps-main");
  if(bar)bar.insertAdjacentHTML("beforeend",'<p id="ps-status" role="status" aria-live="polite"></p>');
 }
 bind();syncUi(true);paintSoon();
 if(document.fonts?.ready)document.fonts.ready.then(()=>{if(canvas?.isConnected)paintSoon();});
}
