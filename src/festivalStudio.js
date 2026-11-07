import {festivals,festivalCategories,festivalById,verified2083,dateSources,dailyQuote,quoteForToday,dayOfYear,kathmanduDate} from "./festivalData.js";
import "./festivalStudio.css";

const art={
 diya:"🪔",tika:"🌼",flower:"🌸",shakti:"🔱",moon:"☾",bird:"❧",paw:"🐾",leaf:"🌿",hill:"⛰",mandala:"✺",sun:"☀",water:"≈",lotus:"❀",mountain:"🏔",trishul:"🔱",colors:"●",book:"📖",temple:"⌂",thread:"⌁",tool:"⚒"
};
const gradients={
 diya:["#3e143f","#d97443"],tika:["#992538","#edaf43"],flower:["#9b4276","#e7a4b5"],shakti:["#201945","#a65b82"],
 moon:["#111e4d","#4966a5"],bird:["#1b5660","#ba9e66"],paw:["#39315a","#bb7894"],leaf:["#194d40","#8bac72"],
 hill:["#26496d","#92a8c5"],mandala:["#48315b","#aa80b1"],sun:["#9f3f3a","#eba15b"],water:["#1d527e","#6daebf"],
 lotus:["#533869","#e0a6ac"],mountain:["#1b4576","#a3c6d3"],trishul:["#141b3b","#72589f"],
 colors:["#3849a9","#b63871"],book:["#284f78","#9ebec9"],temple:["#493e6d","#a37c8a"],thread:["#41677c","#b6bd92"],
 tool:["#283d5b","#8c9aa4"]
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const href=id=>(location.pathname.startsWith("/design")?"/design":"")+"/"+id.replace(/^\/|\/$/g,"")+"/";
const dial=f=>art[f.motif]||"✦";
const tone=f=>gradients[f.motif]||gradients.mountain;
function festivalArt(f,big=false){
 const [a,b]=tone(f);
 return '<span class="fs-art '+(big?"fs-art-big":"")+'" style="--fs-a:'+a+';--fs-b:'+b+'" aria-hidden="true"><span class="fs-orbit"></span><span class="fs-symbol">'+dial(f)+'</span><span class="fs-deco">✦ &nbsp; ✧ &nbsp; ✦</span></span>';
}
function formatAD(s){const [y,m,d]=s.split("-").map(Number);return new Intl.DateTimeFormat("ne-NP",{timeZone:"UTC",day:"numeric",month:"short",year:"numeric"}).format(new Date(Date.UTC(y,m-1,d)));}
function datedEvents(){
 const today=kathmanduDate();
 return verified2083.map(e=>({...e,days:Math.round((Date.parse(e.ad+"T00:00:00Z")-Date.parse(today+"T00:00:00Z"))/86400000)}));
}
function navLinks(){return '<nav class="fs-links" aria-label="पर्व डिजाइन नेभिगेसन"><a href="'+href("festivals")+'" data-nav="festivals">पर्व संग्रह</a><a href="'+href("festival-studio")+'" data-nav="festival-studio">शुभकामना डिजाइन</a><a href="'+href("daily-quotes")+'" data-nav="daily-quotes">३६५ दिनका शब्द</a><a href="'+href("patro")+'" data-nav="patro">प्रमाणित मिति</a></nav>';}
function leadEvent(){
 const list=datedEvents().filter(e=>e.days>=0).sort((a,b)=>a.days-b.days);
 return list[0]||null;
}
function festivalCard(f){
 return '<article class="fs-card">'+festivalArt(f)+'<div class="fs-card-body"><div class="fs-card-label">'+esc(f.category)+' · '+esc(f.season)+'</div><h3><a href="'+href("festivals/"+f.id)+'" data-nav="festivals/'+f.id+'">'+esc(f.name)+'</a></h3><p>'+esc(f.motto)+'</p><div class="fs-card-actions"><a href="'+href("festivals/"+f.id)+'" data-nav="festivals/'+f.id+'">सन्देश हेर्नुहोस्</a><button type="button" data-festival-design="'+f.id+'">पोस्टर बनाउनुहोस् ↗</button></div></div></article>';
}
function festivalHero(mode="catalog"){
 const lead=leadEvent(),f=lead?festivalById(lead.festival):festivalById("dashain");
 return '<section class="fs-hero"><div class="container fs-hero-inner"><div><span class="fs-kicker">🇳🇵 TODAYNEPAL CULTURE & CREATIVE STUDIO</span><h1>हरेक पर्वको सम्मान,<br><em>हरेक दिनको सिर्जना।</em></h1><p>नेपालका समुदाय, भाषा, संस्कृति र लोकपरम्पराबाट प्रेरित मौलिक शुभकामना, उद्धरण र पोस्टर। संस्कृति फरक, सम्मान साझा।</p><div class="fs-hero-actions"><a class="fs-hero-btn" href="'+href("festival-studio")+'" data-nav="festival-studio">✦ शुभकामना डिजाइन गर्नुहोस्</a><a class="fs-hero-outline" href="'+href("daily-quotes")+'" data-nav="daily-quotes">३६५ दिनका उद्धरण ↗</a></div><div class="fs-hero-facts"><span><strong>'+festivals.length+'</strong> पर्व र सांस्कृतिक अवसर</span><span><strong>३६५</strong> दैनिक सन्देश संयोजन</span><span><strong>24/7</strong> डिजाइन पहुँच</span></div></div><div class="fs-hero-illustration">'+festivalArt(f,true)+'<span class="fs-floating-one">संस्कृति • सद्भाव • सिर्जना</span><span class="fs-floating-two">ॐ &nbsp; ✦ &nbsp; ☀</span></div></div></section>';
}
function dateStrip(){
 const upcoming=datedEvents().filter(x=>x.days>=0).slice(0,4);
 if(!upcoming.length)return '<div class="fs-date-strip"><span>📅</span> २०८३ का नमुना पर्वमितिहरूको अवधि सकिएको छ। नयाँ वर्षको स्वीकृत पात्रो प्रकाशित भएपछि अद्यावधिक गर्नुपर्छ। <a href="'+href("patro")+'" data-nav="patro">मिति स्रोत हेर्नुहोस् ↗</a></div>';
 return '<div class="fs-date-strip"><div class="fs-date-intro"><strong>प्रमाणित आगामी मिति</strong><small>२०८३ सालको प्रकाशित पात्रोमा आधारित</small></div>'+upcoming.map(e=>'<a href="'+href("festivals/"+e.festival)+'" data-nav="festivals/'+e.festival+'" class="fs-date-mini"><strong>'+esc(e.label.split(" / ")[0])+'</strong><span>'+esc(e.bs)+'</span><small>'+(e.days===0?"आज":e.days+" दिन बाँकी")+'</small></a>').join("")+'<a class="fs-date-more" href="'+href("patro")+'" data-nav="patro">सबै मिति ↗</a></div>';
}
function basePage(){return festivalHero()+navLinks()+'<div class="container fs-container">'+dateStrip()+'<div class="fs-section-heading"><div><span class="fs-mini-kicker">FESTIVAL LIBRARY</span><h2>नेपालका पर्व, जात्रा र सांस्कृतिक अवसर</h2><p>सन्देश स्वतन्त्र र मौलिक छन्; यो सबै स्थानीय पर्वको अन्तिम/पूर्ण सूची होइन।</p></div><a href="'+href("festival-studio")+'" data-nav="festival-studio">पर्व पोस्टर बनाउनुहोस् ↗</a></div>'
 +'<div class="fs-filters"><label class="fs-search">⌕ <input type="search" id="fs-search" placeholder="पर्व, समुदाय वा शुभकामना खोज्नुहोस्…" aria-label="पर्व खोज्नुहोस्"></label><select id="fs-category" aria-label="समुदाय अनुसार छान्नुहोस्">'+festivalCategories.map(c=>'<option value="'+esc(c)+'">'+esc(c)+'</option>').join("")+'</select><span id="fs-count">'+festivals.length+' अवसरहरू</span></div>'
 +'<div class="fs-card-grid" id="fs-grid">'+festivals.map(festivalCard).join("")+'</div><div class="fs-bottom-notice">यस संग्रहले विविध समुदायका चाडपर्वलाई सम्मानपूर्वक प्रस्तुत गर्छ। स्थानीय विधि, पर्वनाम, अनुष्ठान र मिति क्षेत्र तथा परम्पराअनुसार फरक पर्न सक्छन्।</div></div>';}
function dailyPage(){
 const daily=quoteForToday();
 return '<section class="fs-page-head"><div class="container"><span class="fs-mini-kicker">365 DAYS • YEAR ROUND</span><h1>हरेक दिनका लागि <em>एउटा सन्देश</em></h1><p>३६५ दैनिक संयोजन, नेपाली माटो, संस्कार, साहस, प्रकृति र सृजनशीलताबाट प्रेरित। प्रत्येक दिन काठमाडौं समयअनुसार नयाँ वाक्य।</p></div></section>'+navLinks()
 +'<div class="container fs-container"><section class="fs-quote-stage"><div><span class="fs-quote-top">✦ TODAYNEPAL DAILY MOTTO</span><span class="fs-quote-date" id="fs-quote-date"></span><div class="fs-quote-mark">“</div><blockquote id="fs-daily-text"></blockquote><div class="fs-quote-label" id="fs-day-label"></div><div class="fs-quote-tools"><button type="button" id="fs-prev">← अघिल्लो</button><button type="button" id="fs-next">अर्को →</button><button type="button" id="fs-copy-quote">⧉ Copy</button><button type="button" id="fs-quote-design" class="fs-btn-light">पोस्टर डिजाइन ↗</button></div></div><div class="fs-quote-circle"><span>ॐ</span><small>365 / 24</small></div></section>'
 +'<div class="fs-day-select"><label for="fs-day">दिन चयन गर्नुहोस्</label><input type="range" id="fs-day" min="1" max="365" value="'+daily.dayNumber+'"><output id="fs-day-num">'+daily.dayNumber+'</output><button type="button" id="fs-today">आजको सन्देश</button></div>'
 +'<div class="fs-bottom-notice">३६५ वाक्य संयोजन ७३ मूल विषय र ५ मौलिक निष्कर्षबाट बनेका हुन्। यो सन्देशको रचनात्मक कार्यक्रम हो, राशिफल वा तिथिको भविष्यवाणी होइन। स्वतः सामाजिक सञ्जालमा पोस्ट गरिँदैन।</div></div>';
}
function detailPage(slug){
 const f=festivalById(slug);
 if(!f)return '<div class="container fs-container"><h1>पर्व भेटिएन</h1><a href="'+href("festivals")+'" data-nav="festivals">सबै पर्वमा फर्कनुहोस्</a></div>';
 const dated=verified2083.filter(e=>e.festival===f.id);
 return '<section class="fs-page-head"><div class="container"><span class="fs-mini-kicker">CULTURE • '+esc(f.category)+'</span><h1>'+esc(f.name)+'</h1><p>पर्वको भावनाअनुसार सम्पादन गर्न मिल्ने मौलिक शुभकामना र कला।</p></div></section>'+navLinks()
 +'<div class="container fs-container"><div class="fs-detail-layout"><div class="fs-detail-poster">'+festivalArt(f,true)+'<div class="fs-detail-overlay"><span>TodayNepal.com • Festival Studio</span><h2>'+esc(f.name)+'</h2><p>'+esc(f.motto)+'</p><small>NEPAL • CULTURE • UNITY</small></div></div><div class="fs-detail-copy"><span class="fs-mini-kicker">मौलिक सन्देश संग्रह</span><h2>शुभकामना र जीवनदर्शन</h2><p>समुदाय: <strong>'+esc(f.category)+'</strong> · सामान्य पर्व अवधि: <strong>'+esc(f.season)+'</strong></p>'+f.quotes.map((q,i)=>'<div class="fs-phrase"><p>“'+esc(q)+'”</p><div><button type="button" data-festival-copy="'+f.id+'" data-quote-index="'+i+'">Copy</button><button type="button" data-festival-design="'+f.id+'" data-quote-index="'+i+'">डिजाइन गर्नुहोस् ↗</button></div></div>').join("")+'<div class="fs-verification">'+(dated.length?'<strong>२०८३ का स्रोत-जाँचिएका मिति</strong>'+dated.map(e=>'<p>'+esc(e.bs)+' · '+formatAD(e.ad)+' · <a href="'+e.source+'" target="_blank" rel="noopener noreferrer">पात्रो स्रोत ↗</a></p>').join(""):'<p>यस पर्वको सन् २०२६–२७ को निश्चित मिति यहाँ प्रमाणित गरिएको छैन। गलत मिति अनुमान नगरी सामान्य सांस्कृतिक अवधिमात्र देखाइएको छ।</p>')+'</div><a href="'+href("festivals")+'" data-nav="festivals" class="fs-back">← सबै पर्वहरू</a></div></div></div>';
}
function festivalStudioPage(){
 const popularIds=["dashain","laxmi-puja","bhai-tika","chhath","mha-puja","nepal-sambat","maha-shivaratri","buddha-jayanti","tamu-lhosar","sonam-lhosar","sakela-ubhauli","indra-jatra"];
 const featured=popularIds.map(festivalById).filter(Boolean);
 return '<section class="fs-page-head"><div class="container"><span class="fs-mini-kicker">NEPAL FESTIVAL DESIGN SUITE</span><h1>चाडपर्वका <em>शुभकामना पोस्टर</em></h1><p>पर्व छान्नुहोस्, मौलिक सन्देश लेख्नुहोस् र TodayNepal Poster Studio मा खोल्नुहोस्। तपाईंले त्यहाँ अक्षर, रंग, फोटो, लोगो र आकार परिवर्तन गर्न सक्नुहुन्छ।</p></div></section>'+navLinks()
 +'<div class="container fs-container"><section class="fs-create"><div class="fs-create-fields"><div class="fs-mini-kicker">POSTER PRESET BUILDER</div><h2>आफ्नै शुभकामना डिजाइन बनाउनुहोस्</h2><label for="fs-editor-festival">पर्व छान्नुहोस्</label><select id="fs-editor-festival">'+festivals.map(f=>'<option value="'+f.id+'">'+esc(f.name)+'</option>').join("")+'</select>'
 +'<label for="fs-editor-title">मुख्य सन्देश</label><textarea id="fs-editor-title" rows="3" maxlength="400"></textarea><label for="fs-editor-sub">सानो विवरण</label><input type="text" id="fs-editor-sub" maxlength="220" value="हार्दिक मंगलमय शुभकामना"><label for="fs-editor-brand">ब्रान्ड / हस्ताक्षर</label><input type="text" id="fs-editor-brand" maxlength="50" value="TodayNepal.com"><button id="fs-create-poster" type="button" class="fs-hero-btn">✦ पोस्टर स्टुडियोमा खोल्नुहोस् ↗</button><p>पोस्टर बनाउँदा तपाईंको हालको ड्राफ्ट सुरक्षित राख्न नयाँ सन्देश नयाँ सत्रमा खुल्छ।</p></div>'
 +'<div class="fs-create-preview"><div id="fs-live-preview"></div></div></section><div class="fs-section-heading"><div><span class="fs-mini-kicker">READY-TO-EDIT FESTIVAL PRESETS</span><h2>लोकप्रिय पर्वका डिजाइन</h2><p>हरेक कार्डले मौलिक शीर्षक र रंग संयोजनको स्टार्टिङ डिजाइन तयार गर्छ।</p></div></div><div class="fs-preset-grid">'+featured.map(f=>'<button type="button" class="fs-preset" data-festival-pick="'+f.id+'">'+festivalArt(f)+'<span>'+esc(f.name)+'</span><small>'+esc(f.motto)+'</small></button>').join("")+'</div><div class="fs-bottom-notice">कुनै पनि पर्वको लाइट, फोटो वा धार्मिक प्रतीक प्रयोग गर्दा सम्बन्धित समुदायको स्थानीय परम्परालाई सम्मान गर्नुहोस्।</div></div>';
}
function patroPage(){
 const events=datedEvents();
 return '<section class="fs-page-head"><div class="container"><span class="fs-mini-kicker">DATE SOURCES & VERIFICATION</span><h1>पर्व पात्रो <em>२०८३</em></h1><p>मिति अनुमान होइन — सार्वजनिक रूपमा उपलब्ध प्रकाशित स्रोतबाट सावधानीपूर्वक छानिएका नमुना अभिलेख। यो पूर्ण पञ्चाङ्ग होइन।</p></div></section>'+navLinks()
 +'<div class="container fs-container"><div class="fs-date-table"><table><thead><tr><th>पर्व / अवसर</th><th>वि.सं.</th><th>ई.सं.</th><th>स्थिति</th><th>स्रोत</th></tr></thead><tbody>'+events.map(e=>'<tr><td><a href="'+href("festivals/"+e.festival)+'" data-nav="festivals/'+e.festival+'">'+esc(e.label)+'</a></td><td>'+esc(e.bs)+'</td><td>'+esc(e.ad)+'</td><td>'+(e.days===0?"आज":e.days<0?"बितिसकेको":e.days+" दिनपछि")+'</td><td><a href="'+e.source+'" target="_blank" rel="noopener noreferrer">स्रोत ↗</a></td></tr>').join("")+'</tbody></table></div><div class="fs-bottom-notice"><strong>महत्त्वपूर्ण:</strong> तिथि, नक्षत्र, शुभसाइत र स्थानीय सार्वजनिक बिदा फरक स्रोत वा प्रदेशअनुसार बदलिन सक्छन्। वर्षबाहिर यो सूची दोहोर्‍याएर निश्चित मिति देखाइँदैन।</div><div class="fs-section-heading"><h2>प्रमाणित सन्दर्भहरू</h2></div><div class="fs-sources">'+dateSources.map(s=>'<a href="'+s.url+'" target="_blank" rel="noopener noreferrer">'+esc(s.name)+' ↗</a>').join("")+'</div></div>';
}
let selectedDaily=1, currentRoute="";
async function copy(text){try{await navigator.clipboard.writeText(text);}catch{const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();}const s=document.querySelector("#fs-feedback");if(s)s.textContent="सन्देश Copy भयो ✓";}
function themeFor(f){
 const lookup={diya:"festival",tika:"national",mandala:"mandala",sun:"sunset",mountain:"himalaya",temple:"temple",moon:"midnight",trishul:"cosmic",shakti:"royal",colors:"festival",lotus:"paper",leaf:"himalaya",book:"paper",flower:"festival"};
 return lookup[f.motif]||"royal";
}
function writePreset(f,quote,brand="TodayNepal.com",subtitle="हार्दिक मंगलमय शुभकामना"){
 const payload={title:quote||f.motto,kicker:f.name,description:subtitle,footer:"NEPAL • HERITAGE • TOGETHER",template:themeFor(f),brand,showSymbol:true,showLogo:true};
 try{sessionStorage.setItem("tn-festival-preset",JSON.stringify(payload));}catch{}
}
function navigatePoster(navigate){navigate("poster-maker");}
function initDaily(){
 const today=quoteForToday();selectedDaily=Math.min(365,today.dayNumber);
 let responseToken=0;
 const current=()=>dailyQuote(selectedDaily-1);
 const update=()=>{
  const q=document.querySelector("#fs-daily-text"),n=document.querySelector("#fs-day-label"),range=document.querySelector("#fs-day"),num=document.querySelector("#fs-day-num");
  if(q)q.textContent=current();
  if(n)n.textContent="३६५ मध्ये दिन "+selectedDaily+" · स्थानीय";
  if(range)range.value=selectedDaily;
  if(num)num.textContent=selectedDaily;
  const dt=document.querySelector("#fs-quote-date");
  if(dt)dt.textContent=selectedDaily===today.dayNumber?"आज • "+today.date:"सम्पादकीय सन्देश • दिन "+selectedDaily;
 };
 const verifyWithAPI=()=>{
  const expected=selectedDaily,token=++responseToken;
  const signal=typeof AbortSignal!=="undefined"&&AbortSignal.timeout?AbortSignal.timeout(5000):undefined;
  fetch("/api/daily?day="+expected,{signal}).then(async response=>{
   if(!response.ok||!(response.headers.get("content-type")||"").includes("application/json"))return;
   const data=await response.json();
   const q=document.querySelector("#fs-daily-text"),label=document.querySelector("#fs-day-label");
   if(token!==responseToken||expected!==selectedDaily||!q?.isConnected)return;
   if(data.day!==expected||typeof data.quote!=="string"||data.quote!==dailyQuote(expected-1))return;
   q.textContent=data.quote;
   if(label)label.textContent="३६५ मध्ये दिन "+expected+" · API";
  }).catch(()=>{/* Offline fallback deliberately stays visible. */});
 };
 const changeDay=num=>{selectedDaily=num;update();verifyWithAPI();};
 update();verifyWithAPI();
 document.querySelector("#fs-day")?.addEventListener("input",e=>{selectedDaily=Number(e.target.value);update();});
 document.querySelector("#fs-day")?.addEventListener("change",()=>verifyWithAPI());
 document.querySelector("#fs-prev")?.addEventListener("click",()=>changeDay(selectedDaily===1?365:selectedDaily-1));
 document.querySelector("#fs-next")?.addEventListener("click",()=>changeDay(selectedDaily===365?1:selectedDaily+1));
 document.querySelector("#fs-today")?.addEventListener("click",()=>changeDay(quoteForToday().dayNumber));
 document.querySelector("#fs-copy-quote")?.addEventListener("click",()=>copy(current()));
}
function initCatalog(){
 const search=document.querySelector("#fs-search"),category=document.querySelector("#fs-category"),grid=document.querySelector("#fs-grid"),count=document.querySelector("#fs-count");
 if(!grid)return;
 let dataset=festivals;
 let origin="स्थानीय";
 const filter=()=>{
  const query=search.value.trim().toLocaleLowerCase("ne"),group=category.value;
  const found=dataset.filter(f=>(group==="सबै"||group===f.category)&&[f.name,f.category,f.season,...f.quotes].join(" ").toLocaleLowerCase("ne").includes(query));
  grid.innerHTML=found.length?found.map(festivalCard).join(""):'<p class="fs-no-results">यो खोजसँग मिल्ने पर्व भेटिएन।</p>';
  count.textContent=found.length+" अवसरहरू · "+origin;
 };
 search.addEventListener("input",filter);category.addEventListener("change",filter);
 filter();
 // Same-origin Vercel API is preferred in production, but the catalog stays usable offline/in Vite preview.
 const signal=typeof AbortSignal!=="undefined"&&AbortSignal.timeout?AbortSignal.timeout(5000):undefined;
 fetch("/api/festivals?limit=75",{signal}).then(async response=>{
  if(!response.ok||!(response.headers.get("content-type")||"").includes("application/json"))throw new Error("API unavailable");
  const data=await response.json();
  if(!Array.isArray(data.festivals)||data.festivals.length!==75||
     !data.festivals.every(f=>typeof f.id==="string"&&typeof f.name==="string"&&Array.isArray(f.quotes)))throw new Error("API payload mismatch");
  if(!grid.isConnected)return;
  dataset=data.festivals;origin="API";filter();
 }).catch(()=>{if(grid.isConnected){origin="स्थानीय";filter();}});
}

function initCreator(){
 const select=document.querySelector("#fs-editor-festival"),title=document.querySelector("#fs-editor-title"),sub=document.querySelector("#fs-editor-sub"),brand=document.querySelector("#fs-editor-brand"),preview=document.querySelector("#fs-live-preview");
 if(!select)return;
 const params=new URLSearchParams(location.search);const id=params.get("festival");if(festivalById(id))select.value=id;
 const update=()=>{
  const f=festivalById(select.value)||festivals[0];
  preview.innerHTML=festivalArt(f,true)+'<div class="fs-preview-copy"><span>'+esc(brand.value)+'</span><strong>'+esc(f.name)+'</strong><h3>'+esc(title.value)+'</h3><p>'+esc(sub.value)+'</p></div>';
 };
 const pick=()=>{title.value=(festivalById(select.value)||festivals[0]).motto;update();};
 select.addEventListener("change",pick);title.addEventListener("input",update);sub.addEventListener("input",update);brand.addEventListener("input",update);
 pick();
}
export function festivalRoutePage(route){
 if(route==="festivals")return basePage();
 if(route.startsWith("festivals/"))return detailPage(route.split("/")[1]);
 if(route==="festival-studio")return festivalStudioPage();
 if(route==="daily-quotes")return dailyPage();
 if(route==="patro")return patroPage();
 return "";
}
export function initFestivalRoute(route,navigate){
 currentRoute=route;
 const root=document.querySelector("#fs-root");
 if(!root)return;
 root.addEventListener("click",e=>{
  const design=e.target.closest("[data-festival-design]");
  if(design){const f=festivalById(design.dataset.festivalDesign);if(!f)return;e.preventDefault();writePreset(f,f.quotes[Number(design.dataset.quoteIndex)||0]);navigatePoster(navigate);return;}
  const pick=e.target.closest("[data-festival-pick]");
  if(pick){const f=festivalById(pick.dataset.festivalPick);if(!f)return;e.preventDefault();navigate("festival-studio?festival="+encodeURIComponent(f.id));return;}
  const cp=e.target.closest("[data-festival-copy]");
  if(cp){const f=festivalById(cp.dataset.festivalCopy);if(f)copy(f.quotes[Number(cp.dataset.quoteIndex)||0]);return;}
  if(e.target.closest("#fs-copy-quote")){return;}
  if(e.target.closest("#fs-quote-design")){e.preventDefault();writePreset({name:"आजको सन्देश",motto:dailyQuote(selectedDaily-1),motif:"mountain"},dailyQuote(selectedDaily-1),"TodayNepal.com","हरेक दिन सिर्जनाको एउटा अवसर");navigatePoster(navigate);}
  if(e.target.closest("#fs-create-poster")){
   const f=festivalById(document.querySelector("#fs-editor-festival")?.value)||festivals[0];
   writePreset(f,document.querySelector("#fs-editor-title")?.value||f.motto,document.querySelector("#fs-editor-brand")?.value||"TodayNepal.com",document.querySelector("#fs-editor-sub")?.value||"शुभकामना");
   navigatePoster(navigate);
  }
 });
 if(route==="festivals")initCatalog();
 if(route==="daily-quotes")initDaily();
 if(route==="festival-studio")initCreator();
}
