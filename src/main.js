
import { preetiToUnicode, unicodeToPreeti } from "@lacspace/preeti";
import "./styles.css";

const tools = [
  {id:"fonts",icon:"अ",title:"नेपाली फन्ट लाइब्रेरी",en:"Font library",desc:"खुला लाइसेन्स भएका देवनागरी फन्ट खोज्नुहोस्, तुलना र पूर्वावलोकन गर्नुहोस्।",tag:"Fonts",category:"Design"},
  {id:"unicode-to-preeti",icon:"⇄",title:"Unicode → Preeti",en:"Unicode to Preeti",desc:"नेपाली Unicode पाठलाई पुरानो Preeti encoding मा रूपान्तरण गर्नुहोस्।",tag:"Converter",category:"Writing"},
  {id:"preeti-to-unicode",icon:"अ+",title:"Preeti → Unicode",en:"Preeti to Unicode",desc:"पुरानो Preeti कागजातलाई मोबाइल र वेबमा चल्ने Unicode मा बदल्नुहोस्।",tag:"Converter",category:"Writing"},
  {id:"easy-nepali-typing",icon:"⌨",title:"सजिलो नेपाली टाइपिङ",en:"Romanized Nepali",desc:"English अक्षर टाइप गरेर नेपाली देवनागरी लेख्नुहोस्।",tag:"Typing",category:"Writing"},
  {id:"voice-typing",icon:"◉",title:"नेपाली भ्वाइस टाइपिङ",en:"Speech to text",desc:"ब्राउजरले समर्थन गरेमा बोलिएका नेपाली शब्दलाई पाठ बनाउनुहोस्।",tag:"Voice",category:"Writing"},
  {id:"typing-test",icon:"⏱",title:"नेपाली टाइपिङ टेस्ट",en:"Typing speed",desc:"आफ्नो नेपाली टाइपिङ गति र शुद्धता तुरुन्त जाँच्नुहोस्।",tag:"Practice",category:"Writing"},
  {id:"documents",icon:"▤",title:"नेपाली डकुमेन्ट एडिटर",en:"Documents",desc:"कागजात लेख्नुहोस्, सुरक्षित राख्नुहोस्, प्रिन्ट वा टेक्स्ट डाउनलोड गर्नुहोस्।",tag:"Productivity",category:"Writing"},
  {id:"poster-maker",icon:"✦",title:"पोस्टर तथा उद्धरण डिजाइन",en:"Poster maker",desc:"नेपाली सन्देशलाई आकर्षक सामाजिक सञ्जाल पोस्टरमा बदल्नुहोस्।",tag:"Popular",category:"Design"},
  {id:"background-remover",icon:"▧",title:"फोटो ब्याकग्राउन्ड हटाउने",en:"Simple background remover",desc:"सादा रंगको फोटो ब्याकग्राउन्ड हटाई पारदर्शी PNG बनाउनुहोस्।",tag:"Image",category:"Design"},
  {id:"profile-maker",icon:"◈",title:"प्रोफाइल फोटो मेकर",en:"Profile maker",desc:"आफ्नो तस्बिरमा नेपाल पहिचानको मौलिक फ्रेम लगाउनुहोस्।",tag:"Social",category:"Design"},
  {id:"nepali-numbers",icon:"१२३",title:"नेपाली अंक रूपान्तरण",en:"Numeral converter",desc:"०१२३ र 0123 बीचमा अंक तुरुन्तै रूपान्तरण गर्नुहोस्।",tag:"Numbers",category:"Utilities"}
];
const fontNames=["Anek Devanagari","Mukta","Noto Serif Devanagari","Kalam","Yatra One","Teko","Hind","Martel","Baloo 2","Khand","Rajdhani","Rozha One"];
const fontKinds=["Versatile","Modern","Serif","Handwritten","Display","Headline","Modern","Serif","Rounded","Headline","Headline","Display"];
const fontFamily=fontNames.map((name,i)=>({name,kind:fontKinds[i],url:"https://fonts.google.com/specimen/"+encodeURIComponent(name.replaceAll(" ","+"))}));
const sampleText="नेपालको भाषा, कला र संस्कृति";
const romanLex={
  namaste:"नमस्ते",nepal:"नेपाल",nepali:"नेपाली",kathmandu:"काठमाडौं",pokhara:"पोखरा",
  mero:"मेरो",meri:"मेरी",ma:"म",timi:"तिमी",tapai:"तपाईं",tapain:"तपाईं",hamro:"हाम्रो",hami:"हामी",
  raja:"राजा",rajya:"राज्य",desh:"देश",deshko:"देशको",shree:"श्री",shiva:"शिव",om:"ॐ",jai:"जय",
  dhanyabad:"धन्यवाद",dhanyavaad:"धन्यवाद",sundar:"सुन्दर",chha:"छ",cha:"छ",chhu:"छु",
  huncha:"हुन्छ",ho:"हो",ra:"र",ko:"को",ka:"का",ki:"की",yo:"यो",tyo:"त्यो",
  sabai:"सबै",janata:"जनता",sarkar:"सरकार",bhasa:"भाषा",bhasha:"भाषा",nam:"नाम",
  maya:"माया",prem:"प्रेम",samaya:"समय",saty:"सत्य",satya:"सत्य",shakti:"शक्ति",
  himalaya:"हिमालय",gorkha:"गोर्खा",gurkha:"गोरखा",nepalfirst:"नेपाल प्रथम",
  ram:"राम",hari:"हरि",ramro:"राम्रो",dherai:"धेरै",sanchai:"सन्चै",sanchhai:"सञ्चै",
  hajur:"हजुर",ke:"के",kina:"किन",kasari:"कसरी",ani:"अनि",ek:"एक",dui:"दुई",
  tin:"तीन",char:"चार",panch:"पाँच",samman:"सम्मान",prithvi:"पृथ्वी",path:"पथ"
};
const vowels={aa:"ा",ai:"ै",au:"ौ",ee:"ी",ii:"ी",oo:"ू",ou:"ौ",a:"",i:"ि",u:"ु",e:"े",o:"ो"};
const consonants={chh:"छ",ch:"च",kh:"ख",gh:"घ",jh:"झ",th:"थ",dh:"ध",ph:"फ",bh:"भ",sh:"श",ng:"ङ",ny:"ञ",tr:"त्र",gy:"ज्ञ",k:"क",g:"ग",j:"ज",t:"त",d:"द",n:"न",p:"प",b:"ब",m:"म",y:"य",r:"र",l:"ल",v:"व",w:"व",s:"स",h:"ह",f:"फ",q:"क",x:"क्स",z:"ज"};
const initialVowels={aa:"आ",ai:"ऐ",au:"औ",ee:"ई",ii:"ई",oo:"ऊ",a:"अ",i:"इ",u:"उ",e:"ए",o:"ओ"};
let currentRoute="", testStarted=0, testTimer=null, activeImage=null, avatarImage=null, posterImage=null, posterObjectUrl=null, toastTimer=null;
const root=document.querySelector("#app");
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function route(){let p=location.pathname.replace(/^\/design(?=\/|$)/,"");p=p.replace(/^\/+|\/+$/g,"");return p||"home";}
function urlFor(id){const prefix=location.pathname.startsWith("/design")?"/design":"";return prefix+(id==="home"?"/":"/"+id+"/");}
function link(id,label,cls){return '<a class="'+(cls||"")+'" href="'+urlFor(id)+'" data-nav="'+id+'">'+label+"</a>";}

const glyphs={
  "fonts":'<path d="M4 19h16M9 17l4-11 4 11M10.5 13h5"/><path d="M4 6h2m12 0h2"/>',
  "unicode-to-preeti":'<path d="M4 7h16l-4-4M20 7l-4 4M20 17H4l4 4M4 17l4-4"/>',
  "preeti-to-unicode":'<path d="M4 7h16l-4-4M20 7l-4 4M20 17H4l4 4M4 17l4-4"/>',
  "easy-nepali-typing":'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M10 13h.01M14 13h.01M18 13h.01M7 16h10"/>',
  "voice-typing":'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-5 0h10"/>',
  "typing-test":'<circle cx="12" cy="13" r="9"/><path d="M12 8v5l3 2M9 2h6"/>',
  "documents":'<path d="M7 2h7l5 5v15H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v6h6M9 13h7M9 17h7"/>',
  "poster-maker":'<path d="M3 4h18v16H3zM7 9h.01M3 16l5-5 4 4 3-3 6 5"/><path d="M17 1v5M14.5 3.5h5"/>',
  "background-remover":'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18M3 3l18 18" stroke-dasharray="2 3"/>',
  "profile-maker":'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0M3 3h4M17 3h4"/>',
  "nepali-numbers":'<path d="M6 5h4v14M4 19h8M14 6c1-2 6-2 6 1 0 2-5 5-6 9h7"/>',
  "tools":'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  "search":'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
  "arrow":'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  "home":'<path d="m3 10 9-7 9 7v11H3V10Zm6 11v-8h6v8"/>',
  "menu":'<path d="M4 6h16M4 12h16M4 18h16"/>',
  "shield":'<path d="M12 2 4 5v7c0 5 4 8 8 10 4-2 8-5 8-10V5l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
  "sparkle":'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
  "download":'<path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  "lock":'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  "globe":'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c5 5 5 15 0 20M12 2c-5 5-5 15 0 20"/>',
  "chevron":'<path d="m6 9 6 6 6-6"/>'
};
function icon(id){
 const path=glyphs[id]||glyphs.sparkle;
 return '<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg>';
}
function card(item,featured=false){
 return '<a class="tool-card tone-'+item.id+(featured?' featured':'')+'" href="'+urlFor(item.id)+'" data-nav="'+item.id+'"><span class="tool-icon">'+icon(item.id)+'</span><span class="card-arrow" aria-hidden="true">'+icon("arrow")+'</span><span class="card-title">'+escapeHtml(item.title)+'</span><span class="card-en">'+escapeHtml(item.en)+'</span><p>'+escapeHtml(item.desc)+'</p><span class="card-bottom"><span>'+escapeHtml(item.tag)+'</span><strong>खोल्नुहोस् ↗</strong></span></a>';
}
function header(){
 const menu=[["home","गृहपृष्ठ"],["fonts","नेपाली फन्ट"],["poster-maker","डिजाइन"],["unicode-to-preeti","कन्भर्टर"],["documents","डकुमेन्ट"]];
 const categories=[["home","गृहपृष्ठ","home"],["easy-nepali-typing","टाइपिङ","easy-nepali-typing"],["unicode-to-preeti","कन्भर्टर","unicode-to-preeti"],["fonts","फन्ट","fonts"],["poster-maker","पोस्टर डिजाइन","poster-maker"],["documents","डकुमेन्ट","documents"],["tools","सबै टुल्स","tools"]];
 return '<div class="announcement"><div class="container announcement-inner"><span>🇳🇵 नेपाली भाषा, डिजाइन र प्रविधिको साझा कार्यस्थल</span><a href="https://todaynepal.com" target="_blank" rel="noopener noreferrer">TodayNepal समाचार ↗</a></div></div>'
 +'<header class="topbar"><div class="container topbar-inner"><a class="brand" href="'+urlFor("home")+'" data-nav="home" aria-label="TodayNepal Studio गृहपृष्ठ"><span class="brand-mark"><img src="/mountain-logo.svg" alt="" width="43" height="38"></span><span class="brand-words"><span class="brand-title">TodayNepal<span>.com</span></span><span class="brand-sub">✦ DESIGN & DIGITAL TOOLS</span></span></a>'
 +'<nav class="navlinks" id="navlinks" aria-label="मुख्य नेभिगेसन">'+menu.map(m=>link(m[0],m[1],currentRoute===m[0]?"active":"")).join("")+link("tools",icon("tools")+' सबै टुल्स',"nav-cta")+'</nav>'
 +'<button type="button" class="menu-button" data-action="menu" aria-controls="navlinks" aria-label="नेभिगेसन खोल्नुहोस्" aria-expanded="false">'+icon("menu")+'</button></div></header>'
 +'<div class="subnav"><nav class="container subnav-inner" aria-label="उपकरण नेभिगेसन">'+categories.map(m=>link(m[0],icon(m[2])+" "+m[1],currentRoute===m[0]?"active":"")).join("")+'</nav></div>';
}
function footer(){
 const group=[["उपकरण",["fonts","unicode-to-preeti","preeti-to-unicode","easy-nepali-typing","voice-typing"]],["डिजाइन",["poster-maker","background-remover","profile-maker","documents","typing-test"]],["जानकारी",["about","privacy","support","tools","nepali-numbers"]]];
 return '<footer class="site-footer"><div class="container"><div class="footer-columns"><div class="footer-intro"><a class="brand" href="'+urlFor("home")+'" data-nav="home"><span class="brand-mark"><img src="/mountain-logo.svg" alt="" width="43" height="38"></span><span class="brand-words"><span class="brand-title">TodayNepal<span>.com</span></span><span class="brand-sub">✦ DESIGN & DIGITAL TOOLS</span></span></a><p>नेपाली भाषा, सृजनशीलता र प्रविधिका लागि मौलिक डिजिटल कार्यस्थल।</p><div class="footer-actions"><a href="https://todaynepal.com" target="_blank" rel="noopener noreferrer">समाचार पोर्टल ↗</a><a href="https://github.com/gsmktm/nepalitool" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div>'
 +group.map(g=>'<div class="footer-links"><h4>'+g[0]+'</h4>'+g[1].map(id=>link(id,tools.find(t=>t.id===id)?.title||({about:"हाम्रो बारेमा",privacy:"गोपनीयता",support:"सहयोग",tools:"सबै उपकरण"}[id])||id)).join("")+'</div>').join("")
 +'</div><div class="footer-bottom"><span>© '+new Date().getFullYear()+' TodayNepal.com · सबै अधिकार सुरक्षित।</span><span>नेपालमा सृजना · नेपालीका लागि उपयोगी उपकरण</span></div></div></footer>';
}
function pageHead(t,desc,tag){
 return '<section class="page-head"><div class="container page-head-inner"><div class="breadcrumbs">'+link("home","गृहपृष्ठ")+' <span>›</span> '+link("tools","उपकरण")+' <span>›</span> '+escapeHtml(t)+'</div><span class="eyebrow">'+(tag||"TODAYNEPAL STUDIO")+'</span><h1>'+escapeHtml(t)+'</h1><p>'+escapeHtml(desc||"")+'</p><div class="page-head-glow" aria-hidden="true"></div></div></section>';
}
function helpers(){
 return '<div class="help-block"><div class="soft-card"><span class="help-icon">'+icon("sparkle")+'</span><h3>छिटो र सजिलो</h3><p>दर्ता नगरी आफ्नै पाठ वा फोटोबाट सिर्जना सुरु गर्नुहोस्।</p></div><div class="soft-card"><span class="help-icon">'+icon("shield")+'</span><h3>गोपनीयतामा ध्यान</h3><p>धेरैजसो सम्पादन ब्राउजरमै हुन्छ; भ्वाइसका लागि सेवा फरक पर्न सक्छ।</p></div><div class="soft-card"><span class="help-icon">'+icon("globe")+'</span><h3>नेपालीका लागि</h3><p>नेपाली लिपि, डिजाइन र डिजिटल सञ्चारलाई प्राथमिकतामा राखेर तयार।</p></div></div>';
}
function home(){
 const featured=["easy-nepali-typing","unicode-to-preeti","poster-maker","fonts","documents","background-remover","voice-typing","typing-test","profile-maker","nepali-numbers"];
 return '<section class="hero"><div class="container hero-inner"><div class="hero-copy">'
 +'<span class="eyebrow">🇳🇵 MADE FOR NEPAL · FREE ONLINE TOOLS</span><h1><span class="hero-brand">TodayNepal</span> <span class="design-chip">Design</span><br><span class="hero-nepali">नेपाली डिजिटल टुल्स प्लेटफर्म</span></h1>'
 +'<p class="hero-p">नेपाली टाइपिङ, फन्ट, कन्भर्टर, पोस्टर, डकुमेन्ट र फोटो डिजाइन — तपाईंको सिर्जनाका लागि सबै उपकरण एउटै ठाउँमा।</p>'
 +'<form class="hero-search" id="hero-search"><span class="hero-search-icon">'+icon("search")+'</span><input id="hero-search-input" type="search" placeholder="फन्ट, कन्भर्टर, टाइपिङ, पोस्टर खोज्नुहोस्..." aria-label="उपकरण खोज्नुहोस्" autocomplete="off"><button type="submit">खोज्नुहोस् '+icon("arrow")+'</button></form>'
 +'<div class="hero-popular"><strong>लोकप्रिय:</strong>'+[["टाइपिङ","typing"],["कन्भर्टर","converter"],["पोस्टर डिजाइन","poster"],["फन्ट","font"]].map(q=>'<button type="button" data-action="quick-search" data-query="'+q[1]+'">'+q[0]+'</button>').join("")+'</div>'
 +'<div class="hero-trust"><span>'+icon("shield")+' बिना खाता प्रयोग</span><span>⚡ ब्राउजरमै काम</span><span>✦ मोबाइल-मैत्री</span></div>'
 +'</div><div class="hero-art"><img src="/studio-device.svg" alt="नेपाली डिजाइन र टाइपिङ टुल्स प्रस्तुत गरिएको डिजिटल स्टुडियो" width="760" height="620" decoding="async"><div class="hero-float float-one"><span>अ आ</span><small>नेपाली फन्ट</small></div><div class="hero-float float-two"><span>✦</span><small>डिजाइन स्टुडियो</small></div></div></div></section>'
 +'<div class="container"><div class="stats-ribbon"><div>'+icon("tools")+'<span><b>११</b><small>उपयोगी उपकरण</small></span></div><div>'+icon("fonts")+'<span><b>१२</b><small>नेपाली फन्ट परिवार</small></span></div><div>'+icon("sparkle")+'<span><b>निःशुल्क</b><small>सबैका लागि</small></span></div><div>'+icon("shield")+'<span><b>मोबाइलमैत्री</b><small>सरल डिजाइन</small></span></div></div></div>'
 +'<section class="section popular-section"><div class="container"><div class="section-heading"><div><span class="eyebrow">EXPLORE THE STUDIO</span><h2>लोकप्रिय <span>नेपाली उपकरणहरू</span></h2><p>टाइपिङदेखि डिजाइनसम्म — आफ्नो काम छान्नुहोस् र सुरु गर्नुहोस्।</p></div>'+link("tools","सबै उपकरण हेर्नुहोस् "+icon("arrow"),"section-link")+'</div><div class="cards popular-grid">'+featured.map((id,i)=>card(tools.find(t=>t.id===id),i===2)).join("")+'</div></div></section>'
 +'<section class="section" style="padding-top:0"><div class="container"><div class="promo-feature"><div class="promo-copy"><span class="promo-tag">✦ NEW CREATIVE EXPERIENCE</span><h2>तपाईंको शब्दलाई<br><span>आकर्षक पोस्टरमा बदल्नुहोस्।</span></h2><p>नेपाली उद्धरण, कार्यक्रम, संस्कृति र सिर्जनशील सन्देशका लागि मौलिक डिजाइन बनाउनुहोस्। PNG मा तुरुन्त डाउनलोड।</p>'+link("poster-maker","पोस्टर डिजाइन सुरु गर्नुहोस् "+icon("arrow"),"btn btn-white")+'</div><img src="/poster-gallery.svg" alt="तीन मौलिक हिमालय र नेपाली संस्कृति प्रेरित पोस्टरका उदाहरणहरू" loading="lazy" width="720" height="470"></div></div></section>'
 +'<section class="section font-section" style="padding-top:14px"><div class="container"><div class="section-heading"><div><span class="eyebrow">TYPOGRAPHY COLLECTION</span><h2>नेपाली <span>फन्ट संग्रह</span></h2><p>आफ्नै शब्दबाट सबै फन्टको रूप तुलना गर्नुहोस्।</p></div>'+link("fonts","फन्ट लाइब्रेरी "+icon("arrow"),"section-link")+'</div><div class="home-font-grid">'+fontFamily.slice(0,5).map(f=>'<a class="home-font" href="'+urlFor("fonts")+'" data-nav="fonts"><span class="font-specimen" style="font-family:'+JSON.stringify(f.name)+',sans-serif">अ आ ॐ</span><span class="font-name">'+escapeHtml(f.name)+'</span><span class="font-kind">'+escapeHtml(f.kind)+'</span></a>').join("")+'</div></div></section>'
 +'<section class="section" style="padding-top:14px"><div class="container"><div class="story-grid"><a href="'+urlFor("typing-test")+'" data-nav="typing-test" class="story-card story-typing"><div class="story-art" aria-hidden="true">क ख ग<span>⌨</span></div><div><span class="eyebrow">LEARN & PRACTICE</span><h3>नेपाली टाइपिङ सिक्नुहोस्</h3><p>अभ्यास गर्नुहोस्, गति नाप्नुहोस् र टाइपिङमा सुधार ल्याउनुहोस्।</p><strong>अभ्यास सुरु गर्नुहोस् ↗</strong></div></a>'
 +'<a href="'+urlFor("documents")+'" data-nav="documents" class="story-card story-docs"><div><span class="eyebrow">WRITE WITH CONFIDENCE</span><h3>आजै आफ्नो डकुमेन्ट लेख्नुहोस्</h3><p>सजिलो लेखन, स्थानीय बचत र प्रिन्ट / PDF।</p><strong>सम्पादन सुरु गर्नुहोस् ↗</strong></div><div class="document-art" aria-hidden="true">'+icon("documents")+'</div></a></div></div></section>'
 +'<section class="section" style="padding-top:0"><div class="container"><div class="band"><div><span class="eyebrow">TODAYNEPAL DESIGN STUDIO</span><h2>सिर्जना, भाषा र प्रविधि — <span>एउटै नेपाल।</span></h2><p>कुनै अनिवार्य खाता छैन। आफूलाई चाहिने उपकरण खोल्नुहोस् र आफ्नै शैलीमा सिर्जना गर्नुहोस्।</p></div>'+link("tools","सबै टुल्स खोल्नुहोस् "+icon("arrow"),"btn btn-primary")+'</div></div></section>';
}
function allTools(){
 return pageHead("सबै नेपाली डिजिटल उपकरण","तपाईंको आवश्यकताअनुसार खोज्नुहोस्, छान्नुहोस् र प्रयोग गर्नुहोस्।","TOOLS DIRECTORY")
 +'<div class="container main-panel"><div class="directory-toolbar"><label class="directory-search">'+icon("search")+'<input id="directory-search" type="search" placeholder="उपकरणको नाम वा प्रयोग खोज्नुहोस्..." aria-label="उपकरण खोज्नुहोस्"></label><div class="tabs directory-categories" role="group" aria-label="उपकरणको प्रकार">'+[["all","सबै"],["Writing","लेखन"],["Design","डिजाइन"],["Utilities","अन्य"]].map((c,i)=>'<button class="tab'+(i===0?" active":"")+'" type="button" data-action="directory-filter" data-kind="'+c[0]+'">'+c[1]+'</button>').join("")+'</div></div><div class="directory-meta" id="directory-meta">११ उपकरण उपलब्ध छन्</div><div class="cards directory-list" id="directory-list">'+tools.map(t=>card(t)).join("")+'</div>'+helpers()+'</div>';
}

function fonts(){
 return pageHead("नेपाली फन्ट लाइब्रेरी","आधिकारिक Google Fonts मा उपलब्ध खुला लाइसेन्स भएका देवनागरी फन्टहरू। यो संग्रह अनेपालीको २००+ फन्ट संग्रहको प्रतिलिपि होइन।","FONT DISCOVERY")+'<div class="container main-panel"><div class="toolbar"><div class="toolbar-left"><span class="pill">१२ OPEN FONT FAMILIES</span><span class="hint" style="margin:0">फन्टको लाइसेन्स आधिकारिक स्रोतमा जाँच्नुहोस्।</span></div></div><div class="workbench"><div class="search-row"><input id="font-search" class="field" type="search" aria-label="फन्ट खोज्नुहोस्" placeholder="फन्ट खोज्नुहोस्: Mukta, Anek, Serif ..."><input id="font-sample" class="field" type="text" aria-label="फन्ट पूर्वावलोकन पाठ" value="'+escapeHtml(sampleText)+'" placeholder="पूर्वावलोकनका लागि नेपाली पाठ लेख्नुहोस्"></div><div class="tabs" id="font-filters"><button class="tab active" data-action="font-filter" data-kind="All">सबै फन्ट</button><button class="tab" data-action="font-filter" data-kind="Headline">Headline</button><button class="tab" data-action="font-filter" data-kind="Serif">Serif</button><button class="tab" data-action="font-filter" data-kind="Display">Display</button></div><div class="font-list" id="font-list" style="margin-top:22px"></div></div>'+helpers()+'</div>';
}
function converter(preeti){
 let name=preeti?"Preeti → Unicode":"Unicode → Preeti",example=preeti?"g]kfn":"नेपाल";
 return pageHead(name,"पुरानो Preeti legacy encoding र आधुनिक नेपाली Unicode बीचको दुईतर्फी रूपान्तरण। जटिल मात्रा र संयुक्त अक्षरहरू रूपान्तरणपछि जाँच्नुहोस्।","NEPALI FONT CONVERTER")+'<div class="container main-panel"><div class="workbench"><div class="toolbar"><div class="tabs">'+link("preeti-to-unicode","Preeti → Unicode","tab"+(preeti?" active":""))+link("unicode-to-preeti","Unicode → Preeti","tab"+(!preeti?" active":""))+'</div><span class="pill">ब्राउजरमै रूपान्तरण</span></div><div class="columns"><div><div class="label-row"><strong>'+(preeti?"Preeti पाठ":"Unicode पाठ")+'</strong><button class="mini-btn" data-action="converter-clear">खाली गर्नुहोस्</button></div><textarea id="conv-input" class="text-area" spellcheck="false" placeholder="यहाँ पाठ टाइप वा पेस्ट गर्नुहोस्...">'+escapeHtml(example)+'</textarea><div class="hint">इनपुटमा <span id="conv-count">०</span> अक्षरहरू</div></div><div><div class="label-row"><strong>'+(preeti?"Unicode नतिजा":"Preeti encoded नतिजा")+'</strong><button class="mini-btn" data-action="converter-copy">⧉ Copy</button></div><textarea id="conv-output" class="text-area" spellcheck="false" readonly aria-label="रूपान्तरण परिणाम"></textarea><div class="hint">नतिजा edit नगरी Copy वा Download गर्न सक्नुहुन्छ।</div></div></div><div class="toolbar" style="margin:20px 0 0"><div class="toolbar-left"><button class="btn btn-primary" data-action="converter-download">↓ नतिजा डाउनलोड</button></div><div class="toolbar-right">'+link("easy-nepali-typing","Roman Nepali typing ↗","btn")+'</div></div><div class="notice" style="margin-top:20px"><strong>ध्यान दिनुहोस्:</strong> Preeti अक्षरहरू सामान्य फन्टमा Latin code जस्तो देखिन सक्छन्। Word वा डिजाइन सफ्टवेयरमा Preeti फन्ट लागू गर्नुहोस्। व्यक्तिगत नाम, जोडाक्षर र पुराना फाइलका अपवाद जाँच्नुहोस्।</div></div>'+helpers()+'</div>';
}
function romanTyping(){
 return pageHead("सजिलो नेपाली टाइपिङ","English (Roman) अक्षरबाट नेपाली Unicode लेख्नुहोस्। सामान्य शब्दहरूको शब्दकोश र phonetic नियम प्रयोग गरिएको छ; जटिल शब्द सच्याउनुहोस्।","ROMAN TO NEPALI")+'<div class="container main-panel"><div class="workbench"><div class="columns"><div><div class="label-row"><strong>Romanized Nepali</strong><button class="mini-btn" data-action="roman-example">उदाहरण</button></div><textarea class="text-area" id="roman-input" placeholder="namaste, mero desh nepal ho" spellcheck="false"></textarea></div><div><div class="label-row"><strong>नेपाली Unicode</strong><button class="mini-btn" data-action="roman-copy">⧉ Copy</button></div><textarea class="text-area" id="roman-output" readonly placeholder="नेपाली पाठ यहाँ आउँछ..."></textarea></div></div><div class="toolbar" style="margin:17px 0 0"><button class="btn btn-primary" data-action="roman-download">↓ .txt डाउनलोड</button>'+link("unicode-to-preeti","Unicode → Preeti ↗","btn")+'</div><div class="notice" style="margin-top:18px"><strong>टाइपिङ सल्लाह:</strong> namaste → नमस्ते, nepal → नेपाल, mero → मेरो। यो प्रारम्भिक local transliteration engine हो; सबै उच्चारणको अनुमान सधैँ शुद्ध हुँदैन।</div></div>'+helpers()+'</div>';
}
function voiceTyping(){
 return pageHead("नेपाली भ्वाइस टाइपिङ","समर्थित ब्राउजरमा माइक्रोफोनबाट बोलेका नेपाली शब्दलाई पाठमा बदल्नुहोस्। HTTPS र माइक्रोफोन अनुमति चाहिन्छ।","NEPALI SPEECH TO TEXT")+'<div class="container main-panel"><div class="workbench"><div class="toolbar"><div class="toolbar-left"><button id="voice-start" class="btn btn-primary" data-action="voice-start">◉ बोल्न सुरु गर्नुहोस्</button><button class="btn" data-action="voice-stop">■ रोक्नुहोस्</button><button class="btn" data-action="voice-clear">खाली</button></div><div class="toolbar-right"><span class="pill" id="voice-status">निष्क्रिय</span></div></div><textarea class="text-area" id="voice-output" style="min-height:270px" placeholder="नेपालीमा बोल्नुहोस् वा यहाँ पाठ सम्पादन गर्नुहोस्..."></textarea><div class="toolbar" style="margin-top:17px;margin-bottom:0"><button class="btn" data-action="voice-copy">⧉ Copy</button><button class="btn" data-action="voice-download">↓ Download .txt</button></div><div class="notice" style="margin-top:20px"><strong>गोपनीयता:</strong> भ्वाइस पहिचान तपाईंको ब्राउजर/सिस्टमले सञ्चालन गर्छ। केही ब्राउजरले speech processing का लागि बाह्य सेवा प्रयोग गर्न सक्छन्। यस उपकरणले आफ्नै सर्वरमा अडियो पठाउँदैन।</div></div>'+helpers()+'</div>';
}
const testSample="नेपाल हाम्रो साझा घर हो। नेपाली भाषा, संस्कृति र सिर्जनशीलताको सम्मान गरौँ। प्रविधिको सही प्रयोगले सबैलाई अघि बढ्न सहयोग गर्छ।";
function typingTest(){
 return pageHead("नेपाली टाइपिङ टेस्ट","अभ्यासमा आफ्नो नेपाली टाइपिङ गति (WPM) र शुद्धता जाँच्नुहोस्।","TYPING PRACTICE")+'<div class="container main-panel"><div class="workbench"><div class="toolbar"><span class="pill">NEPALI UNICODE PRACTICE</span><button class="mini-btn" data-action="test-reset">फेरि सुरु</button></div><div class="test-prompt" id="test-prompt">'+escapeHtml(testSample)+'</div><div class="metrics"><div class="metric"><b id="test-wpm">0</b><span>Words / Minute</span></div><div class="metric"><b id="test-accuracy">100%</b><span>शुद्धता</span></div><div class="metric"><b id="test-time">0s</b><span>समय</span></div></div><textarea class="text-area" id="test-input" placeholder="माथिको पाठ यहाँ हुबहु टाइप गर्नुहोस्..."></textarea><p class="hint" id="test-message">पहिलो अक्षर टाइप गरेपछि समय सुरु हुन्छ।</p></div>'+helpers()+'</div>';
}
function documents(){
 return pageHead("नेपाली डकुमेन्ट एडिटर","कागजात तयार पार्नुहोस्। लेखिएको पाठ यसै ब्राउजरमा स्वतः सुरक्षित हुन्छ; TXT डाउनलोड र Print → PDF उपलब्ध छ।","LOCAL DOCUMENT WORKSPACE")+'<div class="container main-panel"><div class="workbench"><div class="toolbar"><div class="toolbar-left"><button class="mini-btn" data-action="doc-bold" title="Bold">𝐁</button><button class="mini-btn" data-action="doc-italic" title="Italic">𝑰</button><button class="mini-btn" data-action="doc-heading" title="Heading">H2</button><button class="mini-btn" data-action="doc-list" title="List">☷</button></div><div class="toolbar-right"><span class="counter" id="doc-count">० शब्द</span><button class="mini-btn" data-action="doc-download">↓ TXT</button><button class="mini-btn" data-action="doc-print">⎙ Print / PDF</button></div></div><div class="doc-shell"><div id="doc-editor" class="document-editor" contenteditable="true" role="textbox" aria-multiline="true" aria-label="नेपाली कागजात" spellcheck="true"></div></div><div class="hint" id="doc-save">यो कागजातको साधारण पाठ यस ब्राउजरमा स्वतः सुरक्षित हुन्छ। साझा कम्प्युटरमा गोप्य सामग्री नराख्नुहोस्।</div></div>'+helpers()+'</div>';
}
function posterMaker(){
 return pageHead("नेपाली पोस्टर डिजाइन स्टुडियो","नेपाली उद्धरण, समाचार शीर्षक र सन्देशलाई 1080 × 1350 PNG मा बदल्नुहोस् — मौलिक टेम्पलेट।","TODAYNEPAL CREATIVE STUDIO")+'<div class="container main-panel"><div class="design-grid"><div class="workbench controls"><div class="control-group"><label for="poster-title">मुख्य सन्देश</label><textarea class="text-area" style="min-height:155px" id="poster-title">नेपाल पहिलो।\nस्वाभिमान सधैँ।</textarea></div><div class="control-group"><label for="poster-sub">सानो विवरण</label><input class="field" id="poster-sub" value="हाम्रो भाषा • हाम्रो पहिचान • हाम्रो भविष्य"></div><div class="control-group"><label for="poster-template">डिजाइन शैली</label><select id="poster-template" class="select"><option value="royal">Royal Navy & Gold</option><option value="himalaya">Himalayan Sunrise</option><option value="red">National Red</option><option value="minimal">Minimal Ivory</option></select></div><div class="control-group"><label for="poster-size">अक्षर आकार</label><input id="poster-size" type="range" min="48" max="94" value="76"></div><div class="control-group"><label for="poster-font">नेपाली फन्ट</label><select class="select" id="poster-font"><option value="Anek Devanagari">Anek Devanagari</option><option value="Noto Serif Devanagari">Noto Serif Devanagari</option><option value="Mukta">Mukta</option></select></div><div class="control-group"><label class="upload">आफ्नो पृष्ठभूमि (वैकल्पिक)<input type="file" id="poster-upload" accept="image/png,image/jpeg,image/webp"></label></div><button class="btn btn-primary" data-action="poster-download">↓ PNG डाउनलोड</button><p class="hint">यो उपकरणको तस्बिर डाउनलोडका लागि फोटो तपाईंको ब्राउजरमै प्रयोग हुन्छ।</p></div><div class="canvas-box"><canvas id="poster-canvas" width="1080" height="1350" aria-label="पोस्टरको पूर्वावलोकन"></canvas></div></div>'+helpers()+'</div>';
}
function removeBgPage(){
 return pageHead("सादा फोटो ब्याकग्राउन्ड हटाउने","सेतो, हरियो वा एउटै रंगका फोटो पृष्ठभूमि पारदर्शी बनाउने स्थानीय color-key उपकरण। जटिल फोटोका लागि AI segmentation चाहिन्छ।","LOCAL IMAGE UTILITY")+'<div class="container main-panel"><div class="design-grid"><div class="workbench controls"><label class="upload">तस्बिर चयन गर्नुहोस्<input type="file" id="bg-upload" accept="image/png,image/jpeg,image/webp"></label><div class="control-group"><label for="bg-tolerance">रंग सहनशीलता <span id="bg-tolerance-label">58</span></label><input id="bg-tolerance" type="range" min="10" max="170" value="58"></div><p class="hint">तस्बिरका चार कुना भागबाट background रंगको अनुमान गरिन्छ। राम्रो परिणामका लागि एकनासे पृष्ठभूमि भएको फोटो रोज्नुहोस्।</p><button class="btn btn-primary" data-action="bg-download">↓ Transparent PNG</button><div class="notice"><strong>सीमा:</strong> यसमा AI person segmentation छैन। कपाल, कपडा र पृष्ठभूमि उस्तै रंग भए परिणाम फरक पर्न सक्छ।</div></div><div class="canvas-box"><canvas width="960" height="700" id="bg-canvas" aria-label="ब्याकग्राउन्ड परिणाम"></canvas></div></div>'+helpers()+'</div>';
}
function profileMaker(){
 return pageHead("नेपाल प्रोफाइल फोटो मेकर","आफ्नो फोटोमा नेपाल पहिचानको रङ र चन्द्र–सूर्य प्रेरित कलात्मक फ्रेम लगाउनुहोस्।","NEPAL PROFILE FRAME")+'<div class="container main-panel"><div class="design-grid"><div class="workbench controls"><label class="upload">प्रोफाइल फोटो अपलोड<input type="file" id="avatar-upload" accept="image/png,image/jpeg,image/webp"></label><div class="control-group"><label for="avatar-style">फ्रेम शैली</label><select class="select" id="avatar-style"><option value="royal">Royal Gold</option><option value="flag">National Red & Blue</option><option value="light">Minimal White</option></select></div><div class="control-group"><label for="avatar-name">तलको सन्देश</label><input id="avatar-name" class="field" maxlength="46" value="NEPAL FIRST"></div><button class="btn btn-primary" data-action="avatar-download">↓ 1080 × 1080 PNG</button><p class="hint">सिर्जना स्थानीय रूपमा हुन्छ। फोटो कुनै सर्वरमा पठाइँदैन।</p></div><div class="canvas-box"><canvas width="1080" height="1080" id="avatar-canvas" aria-label="प्रोफाइल डिजाइन पूर्वावलोकन"></canvas></div></div>'+helpers()+'</div>';
}
function numbers(){
 return pageHead("नेपाली अंक रूपान्तरण","अंग्रेजी अंक 0–9 र नेपाली अंक ०–९ बीच तुरुन्त परिवर्तन गर्नुहोस्।","NEPALI NUMBERS")+'<div class="container main-panel"><div class="workbench"><div class="columns"><div><div class="label-row"><strong>Input / आगत</strong></div><textarea id="num-input" class="text-area">2083/07/20</textarea></div><div><div class="label-row"><strong>रूपान्तरण परिणाम</strong><button class="mini-btn" data-action="num-copy">⧉ Copy</button></div><textarea id="num-output" class="text-area" readonly></textarea></div></div><div class="toolbar" style="margin-top:20px"><div class="tabs"><button class="tab active" data-action="num-direction" data-direction="ne">English → नेपाली</button><button class="tab" data-action="num-direction" data-direction="en">नेपाली → English</button></div></div></div>'+helpers()+'</div>';
}
const info={
 about:{title:"TodayNepal Studio बारेमा",desc:"नेपाली भाषा र सृजनशीलतालाई सहज बनाउने खुला डिजिटल कार्यस्थल।",body:"<h2>हाम्रो उद्देश्य</h2><p>TodayNepal Studio ले लेखक, विद्यार्थी, पत्रकार, डिजाइनर र आम प्रयोगकर्तालाई नेपालीमै सिर्जना गर्न उपयोगी उपकरण उपलब्ध गराउँछ। यो aNepali वा कुनै तेस्रो-पक्ष सेवाको आधिकारिक शाखा होइन। हाम्रो सफ्टवेयर, दृश्य पहिचान र सामग्री अलग छन्।</p><h2>कसरी बनाइएको?</h2><p>मुख्य सम्पादन, चित्र बनाउने र पाठ रूपान्तरण स्थानीय ब्राउजरमै हुन्छ। Preeti रूपान्तरणका लागि खुला अनुमतियुक्त तेस्रो-पक्ष प्याकेज प्रयोग गरिएको छ। फन्टका लिंकहरू आधिकारिक Google Fonts संग्रहमा जान्छन्।</p>"},
 privacy:{title:"गोपनीयता नीति",desc:"व्यक्तिगत सामग्रीको नियन्त्रण प्रयोगकर्तासँगै राख्ने प्राथमिकता।",body:"<h2>तपाईंको पाठ र तस्बिर</h2><p>कन्भर्टर, पोस्टर, फोटो फ्रेम र साधारण background हटाउने काम ब्राउजरमै हुन्छ। हाम्रो आफ्नै backend मा ती फाइल अपलोड गर्ने कार्य छैन। डकुमेन्टको साधारण पाठ यही ब्राउजरको localStorage मा सुरक्षित हुन्छ, अन्य डिभाइसमा स्वतः जाँदैन।</p><h2>तेस्रो-पक्ष सुविधा</h2><p>Google Fonts प्रयोग गर्दा तपाईंको ब्राउजरले Google का सर्भरबाट फन्ट लिन सक्छ। Voice Typing ब्राउजर/सिस्टमको speech-recognition सुविधामा निर्भर हुन्छ; त्यसको सेवा प्रदायकले अडियो प्रशोधन गर्न सक्छ।</p><h2>सीमा</h2><p>निजी वा संवेदनशील डकुमेन्ट साझा कम्प्युटरमा सुरक्षित नगर्नुहोस्। लोकल डेटा हटाउन ब्राउजर storage खाली गर्न सकिन्छ।</p>"},
 support:{title:"सहयोग तथा सम्पर्क",desc:"उपकरणमा समस्या, त्रुटि वा नयाँ सुझाव छ?",body:'<h2>समस्या रिपोर्ट गर्नुहोस्</h2><p>फिचर, Unicode/Preeti अक्षर वा डिजाइनमा त्रुटि देखिएमा GitHub issue मार्फत रिपोर्ट गर्न सकिन्छ। कृपया ब्राउजर, प्रयोग गरिएको उपकरण, अपेक्षित र प्राप्त परिणाम उल्लेख गर्नुहोस्। संवेदनशील व्यक्तिगत पाठ सार्वजनिक issue मा नराख्नुहोस्।</p><p><a class="btn btn-primary" href="https://github.com/gsmktm/nepalitool/issues" target="_blank" rel="noopener noreferrer">GitHub Issues ↗</a></p><h2>मुख्य समाचार पोर्टल</h2><p><a href="https://todaynepal.com" target="_blank" rel="noopener noreferrer">TodayNepal.com ↗</a></p>'}
};
function infoPage(id){const p=info[id];return pageHead(p.title,p.desc,"INFORMATION")+'<div class="container main-panel"><div class="workbench text-page">'+p.body+'</div></div>';}
function notFound(){return pageHead("पृष्ठ भेटिएन","मागिएको पृष्ठ उपलब्ध छैन।","404")+'<div class="container main-panel">'+link("tools","सबै उपकरणमा फर्कनुहोस्","btn btn-primary")+'</div>';}
function render(){
 if(testTimer){clearInterval(testTimer);testTimer=null;} if(window.voiceRecognition){try{window.voiceRecognition.stop();}catch(e){}window.voiceRecognition=null;}
 currentRoute=route();
 const t=tools.find(x=>x.id===currentRoute);
 let page="";
 if(currentRoute==="home")page=home();
 else if(currentRoute==="tools")page=allTools();
 else if(currentRoute==="fonts")page=fonts();
 else if(currentRoute==="preeti-to-unicode")page=converter(true);
 else if(currentRoute==="unicode-to-preeti")page=converter(false);
 else if(currentRoute==="easy-nepali-typing")page=romanTyping();
 else if(currentRoute==="voice-typing")page=voiceTyping();
 else if(currentRoute==="typing-test")page=typingTest();
 else if(currentRoute==="documents")page=documents();
 else if(currentRoute==="poster-maker")page=posterMaker();
 else if(currentRoute==="background-remover")page=removeBgPage();
 else if(currentRoute==="profile-maker")page=profileMaker();
 else if(currentRoute==="nepali-numbers")page=numbers();
 else if(info[currentRoute])page=infoPage(currentRoute);
 else page=notFound();
 root.innerHTML='<div class="shell">'+header()+'<main id="main" tabindex="-1">'+page+'</main>'+footer()+'</div><div id="toast" aria-live="polite" style="position:fixed;bottom:23px;right:23px;background:#243a54;color:#fff;padding:11px 16px;border-radius:10px;z-index:100;box-shadow:0 8px 25px #0005;display:none"></div>';
 document.title=(t?t.title:info[currentRoute]?.title||"नेपाली डिजिटल टुल्स")+" | TodayNepal Studio";
 if(currentRoute==="fonts")updateFonts();
 if(currentRoute==="preeti-to-unicode"||currentRoute==="unicode-to-preeti")updateConversion();
 if(currentRoute==="documents")initDocument();
 if(currentRoute==="poster-maker")drawPoster();
 if(currentRoute==="background-remover")drawBgPlaceholder();
 if(currentRoute==="profile-maker")drawAvatar();
 if(currentRoute==="nepali-numbers")updateNumbers();
}
function notice(msg){const n=document.querySelector("#toast");if(!n)return;n.textContent=msg;n.style.display="block";clearTimeout(toastTimer);toastTimer=setTimeout(()=>n.style.display="none",2800);}
function downloadFile(filename,blob){const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
function textFile(filename,text){downloadFile(filename,new Blob([text],{type:"text/plain;charset=utf-8"}));}
async function copyText(text){try{await navigator.clipboard.writeText(text);notice("पाठ प्रतिलिपि भयो ✓");}catch(e){const t=document.createElement("textarea");t.value=text;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();notice("पाठ प्रतिलिपि गरियो");}}
function updateFonts(){
 const el=document.querySelector("#font-list");if(!el)return;
 const query=(document.querySelector("#font-search")?.value||"").toLowerCase();
 const kind=document.querySelector(".tab[data-kind].active")?.dataset.kind||"All";
 const sample=document.querySelector("#font-sample")?.value||sampleText;
 const items=fontFamily.filter(f=>(kind==="All"||f.kind===kind)&&f.name.toLowerCase().includes(query));
 el.innerHTML=items.length?items.map(f=>'<article class="font-tile"><header><h3>'+escapeHtml(f.name)+'</h3><span class="pill">'+escapeHtml(f.kind)+'</span></header><div class="preview" style="font-family:'+JSON.stringify(f.name)+',sans-serif">'+escapeHtml(sample)+'</div><footer><span>Unicode · Open font</span><a href="'+f.url+'" target="_blank" rel="noopener noreferrer">Official font ↗</a></footer></article>').join(""):'<div class="empty">यो फिल्टरमा फन्ट भेटिएन।</div>';
}
function updateConversion(){
 const inp=document.querySelector("#conv-input"),out=document.querySelector("#conv-output");if(!inp||!out)return;
 try{out.value=currentRoute==="preeti-to-unicode"?preetiToUnicode(inp.value):unicodeToPreeti(inp.value);}
 catch(e){out.value="";notice("रूपान्तरणमा समस्या भयो।");}
 document.querySelector("#conv-count").textContent=String(Array.from(inp.value).length);
}
function phoneticWord(word){
 const known=romanLex[word.toLowerCase()];if(known)return known;
 const s=word.toLowerCase();let out="",i=0,prevConsonant=false;
 while(i<s.length){
  let found=false;
  for(const n of [3,2,1]){const chunk=s.slice(i,i+n);
   if(vowels[chunk]!==undefined){
    if(!prevConsonant){out+=initialVowels[chunk]||"";}else{out+=vowels[chunk];}
    i+=n;prevConsonant=false;found=true;break;
   }
   if(consonants[chunk]){
    if(prevConsonant)out+="्";
    out+=consonants[chunk];prevConsonant=true;i+=n;found=true;break;
   }
  }
  if(!found){out+=s[i];i++;prevConsonant=false;}
 }
 return out||word;
}
function romanize(s){return s.replace(/[a-zA-Z]+/g,w=>phoneticWord(w));}
function updateRoman(){const i=document.querySelector("#roman-input"),o=document.querySelector("#roman-output");if(i&&o)o.value=romanize(i.value);}
const np="०१२३४५६७८९";
let numDirection="ne";
function updateNumbers(){const i=document.querySelector("#num-input"),o=document.querySelector("#num-output");if(!i||!o)return;o.value=numDirection==="ne"?i.value.replace(/[0-9]/g,c=>np[+c]):i.value.replace(/[०-९]/g,c=>String(np.indexOf(c)));}
function updateTest(){
 const inp=document.querySelector("#test-input"),w=document.querySelector("#test-wpm");if(!inp||!w)return;
 const val=inp.value;if(val&&!testStarted){testStarted=Date.now();testTimer=setInterval(updateTest,1000);}
 const seconds=testStarted?(Date.now()-testStarted)/1000:0;
 let correct=0;for(let i=0;i<val.length;i++)if(val[i]===testSample[i])correct++;
 const acc=val.length?Math.round(correct/val.length*100):100;
 w.textContent=seconds?String(Math.round(correct/5/(seconds/60))):"0";
 document.querySelector("#test-time").textContent=Math.floor(seconds)+"s";
 document.querySelector("#test-accuracy").textContent=acc+"%";
 const done=val===testSample;
 document.querySelector("#test-message").textContent=done?"अभिनन्दन! अभ्यास पूरा भयो।":"सही टाइप भएका अक्षर: "+correct+" / "+testSample.length;
 if(done&&testTimer){clearInterval(testTimer);testTimer=null;}
}
function initDocument(){
 const e=document.querySelector("#doc-editor");if(!e)return;
 e.textContent=localStorage.getItem("tnstudio-document")||"शीर्षक यहाँ लेख्नुहोस्\n\nआफ्नो नेपाली कागजात लेख्न सुरु गर्नुहोस्...";
 updateDocCount();
}
function updateDocCount(){const e=document.querySelector("#doc-editor");if(!e)return;const text=e.innerText||"",words=text.trim()?text.trim().split(/\s+/).length:0;document.querySelector("#doc-count").textContent=words+" शब्द · "+text.length+" अक्षर";}
function saveDoc(){const e=document.querySelector("#doc-editor");if(!e)return;try{localStorage.setItem("tnstudio-document",e.innerText||"");}catch(_){}updateDocCount();}
function downloadCanvas(id,name){const canvas=document.querySelector(id);if(!canvas)return;canvas.toBlob(blob=>{if(blob)downloadFile(name,blob);else notice("PNG बनाउन सकिएन।")},"image/png");}
function wrapCanvas(ctx,text,x,y,maxWidth,lineHeight,maxLines=9){
 let lines=[];for(const rawLine of String(text).split("\n")){let line="";for(const word of rawLine.split(/\s+/)){let test=line?line+" "+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word;}else line=test;}lines.push(line);}
 lines=lines.slice(0,maxLines);let start=y-(lines.length-1)*lineHeight/2;
 lines.forEach((l,i)=>ctx.fillText(l,x,start+i*lineHeight));
}
function drawFlag(ctx,x,y,scale=1){
 ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);
 ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(105,70);ctx.lineTo(35,70);ctx.lineTo(115,145);ctx.lineTo(0,145);ctx.closePath();ctx.fillStyle="#18417c";ctx.fill();
 ctx.beginPath();ctx.moveTo(9,10);ctx.lineTo(89,61);ctx.lineTo(19,61);ctx.lineTo(98,135);ctx.lineTo(9,135);ctx.closePath();ctx.fillStyle="#d93241";ctx.fill();
 ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(34,43,12,0,Math.PI*2);ctx.fill();ctx.fillStyle="#d93241";ctx.beginPath();ctx.arc(39,36,12,0,Math.PI*2);ctx.fill();
 for(let j=0;j<12;j++){const a=j*Math.PI/6;ctx.fillStyle="#fff";ctx.beginPath();ctx.moveTo(41+Math.cos(a)*10,104+Math.sin(a)*10);ctx.lineTo(41+Math.cos(a-.18)*19,104+Math.sin(a-.18)*19);ctx.lineTo(41+Math.cos(a+.18)*19,104+Math.sin(a+.18)*19);ctx.fill();}
 ctx.restore();
}
function mountain(ctx,w,h,base,color){
 ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,h);
 [[0,base],[w*.14,base-120],[w*.25,base-260],[w*.38,base-105],[w*.52,base-340],[w*.65,base-155],[w*.76,base-255],[w*.88,base-100],[w,base]].forEach(p=>ctx.lineTo(p[0],p[1]));ctx.lineTo(w,h);ctx.fill();
}
function drawPoster(){
 const c=document.querySelector("#poster-canvas");if(!c)return;const x=c.getContext("2d"),w=c.width,h=c.height;
 const style=document.querySelector("#poster-template")?.value||"royal";const title=document.querySelector("#poster-title")?.value||"",sub=document.querySelector("#poster-sub")?.value||"";
 let colors={royal:["#07162b","#192d49","#f0c780"],himalaya:["#17213a","#9c5650","#fff0c8"],red:["#520e25","#b6213d","#ffe1a0"],minimal:["#f6f0e4","#e3d6bd","#1d2f48"]}[style];
 const grad=x.createLinearGradient(0,0,w,h);grad.addColorStop(0,colors[0]);grad.addColorStop(1,colors[1]);x.fillStyle=grad;x.fillRect(0,0,w,h);
 if(posterImage){const r=Math.max(w/posterImage.width,h/posterImage.height);x.globalAlpha=.38;x.drawImage(posterImage,(w-posterImage.width*r)/2,(h-posterImage.height*r)/2,posterImage.width*r,posterImage.height*r);x.globalAlpha=1;}
 x.strokeStyle=colors[2];x.globalAlpha=.38;x.lineWidth=3;x.strokeRect(55,55,w-110,h-110);x.globalAlpha=1;
 mountain(x,w,h,1150,style==="minimal"?"#d0bea4":"#10233a");mountain(x,w,h,1260,style==="minimal"?"#b3a68d":"#09172c");
 x.fillStyle=colors[2];x.textAlign="center";x.font="bold 27px system-ui";x.fillText("T O D A Y N E P A L   S T U D I O",w/2,154);
 x.strokeStyle=colors[2];x.lineWidth=2;x.beginPath();x.moveTo(340,181);x.lineTo(740,181);x.stroke();drawFlag(x,850,93,.7);
 x.fillStyle=style==="minimal"?"#18314d":"#fff8ed";
 const fontsize=Number(document.querySelector("#poster-size")?.value||76),font=document.querySelector("#poster-font")?.value||"Anek Devanagari";
 x.font="800 "+fontsize+"px "+JSON.stringify(font)+",sans-serif";x.textBaseline="middle";
 wrapCanvas(x,title,w/2,590,w-190,fontsize*1.52,8);
 x.fillStyle=colors[2];x.font="600 34px "+JSON.stringify(font)+",sans-serif";
 wrapCanvas(x,sub,w/2,910,w-210,49,3);
 x.textBaseline="alphabetic";x.font="600 26px system-ui";x.fillText("NEPAL FIRST  •  CREATE WITH PRIDE",w/2,1270);
}
function drawBgPlaceholder(){
 const c=document.querySelector("#bg-canvas");if(!c)return;const x=c.getContext("2d");x.clearRect(0,0,c.width,c.height);x.fillStyle="#a6b1bf";x.textAlign="center";x.font="600 34px sans-serif";x.fillText("UPLOAD AN IMAGE",c.width/2,c.height/2);
}
function removeBg(){
 const c=document.querySelector("#bg-canvas");if(!c||!activeImage)return;
 const x=c.getContext("2d",{willReadFrequently:true}),w=c.width,h=c.height;x.clearRect(0,0,w,h);
 const r=Math.min(w/activeImage.width,h/activeImage.height,1),sw=Math.round(activeImage.width*r),sh=Math.round(activeImage.height*r);
 c.width=sw;c.height=sh;x.drawImage(activeImage,0,0,sw,sh);
 const image=x.getImageData(0,0,sw,sh),d=image.data,tolerance=Number(document.querySelector("#bg-tolerance")?.value||58);
 const pts=[[0,0],[sw-1,0],[0,sh-1],[sw-1,sh-1]].map(([px,py])=>{const k=(py*sw+px)*4;return [d[k],d[k+1],d[k+2]];});
 const avg=[0,1,2].map(n=>pts.reduce((sum,p)=>sum+p[n],0)/4);
 for(let k=0;k<d.length;k+=4){const dist=Math.sqrt((d[k]-avg[0])**2+(d[k+1]-avg[1])**2+(d[k+2]-avg[2])**2);if(dist<tolerance)d[k+3]=0;else if(dist<tolerance+25)d[k+3]=Math.round(255*(dist-tolerance)/25);}
 x.putImageData(image,0,0);
}
function drawAvatar(){
 const c=document.querySelector("#avatar-canvas");if(!c)return;const x=c.getContext("2d"),w=c.width;
 const style=document.querySelector("#avatar-style")?.value||"royal",bg={royal:"#09192f",flag:"#c3243f",light:"#f3eee3"}[style],ring={royal:"#e4b66a",flag:"#17457d",light:"#af9d80"}[style];
 x.fillStyle=bg;x.fillRect(0,0,w,w);
 x.strokeStyle=ring;x.lineWidth=26;x.beginPath();x.arc(540,480,430,0,2*Math.PI);x.stroke();
 x.save();x.beginPath();x.arc(540,480,402,0,2*Math.PI);x.clip();
 if(avatarImage){const r=Math.max(804/avatarImage.width,804/avatarImage.height);x.drawImage(avatarImage,540-avatarImage.width*r/2,480-avatarImage.height*r/2,avatarImage.width*r,avatarImage.height*r);}else{x.fillStyle=style==="light"?"#d6c9b3":"#233853";x.fillRect(100,65,880,870);x.fillStyle=ring;x.textAlign="center";x.font="bold 330px sans-serif";x.fillText("◈",540,590);}
 x.restore();drawFlag(x,808,55,.7);
 x.fillStyle=style==="light"?"#25334a":"#f4e6cb";x.textAlign="center";x.font="bold 52px system-ui";x.fillText((document.querySelector("#avatar-name")?.value||"NEPAL FIRST").slice(0,46),540,1015);
}
function loadImage(file,callback){if(!file||!file.type.startsWith("image/"))return;if(file.size>15*1024*1024){notice("१५ MB भन्दा सानो फोटो छान्नुहोस्।");return;}const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{URL.revokeObjectURL(url);callback(img);};img.onerror=()=>{URL.revokeObjectURL(url);notice("तस्बिर खोल्न सकिएन।");};img.src=url;}
function handleAction(action,el){
 if(action==="menu"){const n=document.querySelector("#navlinks");n.classList.toggle("show");el.setAttribute("aria-expanded",n.classList.contains("show"));}
 if(action==="font-filter"){document.querySelectorAll("[data-kind]").forEach(x=>x.classList.toggle("active",x===el));updateFonts();}
 if(action==="converter-clear"){document.querySelector("#conv-input").value="";updateConversion();}
 if(action==="converter-copy")copyText(document.querySelector("#conv-output").value);
 if(action==="converter-download")textFile(currentRoute+".txt",document.querySelector("#conv-output").value);
 if(action==="roman-copy")copyText(document.querySelector("#roman-output").value);
 if(action==="roman-download")textFile("nepali-typing.txt",document.querySelector("#roman-output").value);
 if(action==="roman-example"){document.querySelector("#roman-input").value="namaste, mero desh nepal ho. hamro bhasa nepali ho.";updateRoman();}
 if(action==="num-copy")copyText(document.querySelector("#num-output").value);
 if(action==="num-direction"){numDirection=el.dataset.direction;document.querySelectorAll("[data-direction]").forEach(x=>x.classList.toggle("active",x===el));updateNumbers();}
 if(action==="test-reset"){testStarted=0;if(testTimer)clearInterval(testTimer);testTimer=null;document.querySelector("#test-input").value="";updateTest();}
 if(action==="doc-bold"||action==="doc-italic"||action==="doc-heading"||action==="doc-list"){const c={ "doc-bold":"bold","doc-italic":"italic","doc-heading":"formatBlock","doc-list":"insertUnorderedList"}[action];document.querySelector("#doc-editor").focus();document.execCommand(c,false,action==="doc-heading"?"h2":undefined);saveDoc();}
 if(action==="doc-download")textFile("todaynepal-document.txt",document.querySelector("#doc-editor").innerText);
 if(action==="doc-print"){const text=document.querySelector("#doc-editor").innerText;const printWindow=window.open("","_blank");if(!printWindow){notice("Print popup खोल्न अनुमति दिनुहोस्।");return;}printWindow.document.write('<!doctype html><html lang="ne"><meta charset="UTF-8"><title>TodayNepal Document</title><style>body{font-family:Arial,sans-serif;white-space:pre-wrap;line-height:1.8;margin:50px}</style><body>'+escapeHtml(text)+'</body></html>');printWindow.document.close();printWindow.focus();printWindow.print();}
 if(action==="poster-download")downloadCanvas("#poster-canvas","todaynepal-poster.png");
 if(action==="bg-download"){if(!activeImage){notice("पहिले तस्बिर छान्नुहोस्।");return;}downloadCanvas("#bg-canvas","todaynepal-transparent.png");}
 if(action==="avatar-download")downloadCanvas("#avatar-canvas","todaynepal-profile.png");
 if(action==="voice-start")startVoice();
 if(action==="voice-stop"){if(window.voiceRecognition){window.voiceRecognition.stop();window.voiceRecognition=null;}const s=document.querySelector("#voice-status");if(s)s.textContent="रोकिएको";}
 if(action==="voice-clear")document.querySelector("#voice-output").value="";
 if(action==="voice-copy")copyText(document.querySelector("#voice-output").value);
 if(action==="voice-download")textFile("nepali-voice.txt",document.querySelector("#voice-output").value);
}
function startVoice(){
 const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!Speech){notice("यो ब्राउजरमा Speech Recognition उपलब्ध छैन।");return;}
 if(window.voiceRecognition){notice("पहिले नै सुनिरहेको छ।");return;}
 const recognition=new Speech();window.voiceRecognition=recognition;recognition.lang="ne-NP";recognition.continuous=true;recognition.interimResults=true;
 const output=document.querySelector("#voice-output"),base=output.value?output.value+" ":"";
 recognition.onresult=event=>{let final="",interim="";for(let i=event.resultIndex;i<event.results.length;i++){const t=event.results[i][0].transcript;if(event.results[i].isFinal)final+=t+" ";else interim+=t;}output.value=base+final+interim;};
 recognition.onerror=e=>{const s=document.querySelector("#voice-status");if(s)s.textContent="त्रुटि: "+e.error;window.voiceRecognition=null;};
 recognition.onend=()=>{const s=document.querySelector("#voice-status");if(s)s.textContent="रोकिएको";window.voiceRecognition=null;};
 try{recognition.start();document.querySelector("#voice-status").textContent="सुन्दैछ…";}catch(e){notice("माइक्रोफोन सुरु भएन।");window.voiceRecognition=null;}
}
document.addEventListener("click",e=>{
 const a=e.target.closest("a[data-nav]");if(a&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&e.button===0){e.preventDefault();history.pushState(null,"",a.href);render();window.scrollTo(0,0);return;}
 const b=e.target.closest("[data-action]");if(b){e.preventDefault();handleAction(b.dataset.action,b);}
});
document.addEventListener("input",e=>{
 const id=e.target.id;
 if(id==="font-search"||id==="font-sample")updateFonts();
 if(id==="conv-input")updateConversion();
 if(id==="roman-input")updateRoman();
 if(id==="num-input")updateNumbers();
 if(id==="test-input")updateTest();
 if(id==="doc-editor")saveDoc();
 if(["poster-title","poster-sub","poster-size"].includes(id))drawPoster();
 if(id==="bg-tolerance"){document.querySelector("#bg-tolerance-label").textContent=e.target.value;removeBg();}
 if(id==="avatar-name")drawAvatar();
});
document.addEventListener("change",e=>{
 const id=e.target.id;
 if(id==="poster-template"||id==="poster-font")drawPoster();
 if(id==="avatar-style")drawAvatar();
 if(id==="poster-upload")loadImage(e.target.files[0],img=>{posterImage=img;drawPoster();});
 if(id==="bg-upload")loadImage(e.target.files[0],img=>{activeImage=img;removeBg();});
 if(id==="avatar-upload")loadImage(e.target.files[0],img=>{avatarImage=img;drawAvatar();});
});
document.addEventListener("paste",e=>{if(e.target.id==="doc-editor"){e.preventDefault();document.execCommand("insertText",false,e.clipboardData.getData("text/plain"));}});
window.addEventListener("popstate",render);
render();
