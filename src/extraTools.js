import QRCode from "qrcode";
import "./extraTools.css";

export const extraItems=[
 {id:"qr-maker",icon:"QR",title:"QR कोड मेकर",en:"QR Code Generator",desc:"लिंक र सन्देशबाट उच्च गुणस्तरको QR कोड PNG बनाउनुहोस्।",tag:"QR Code",category:"Utilities"},
 {id:"image-resizer",icon:"◧",title:"फोटो रिसाइज र कम्प्रेस",en:"Image Resize & Compress",desc:"आफ्नो फोटो ब्राउजरमै सानो बनाउनुहोस् वा PNG/JPG/WebP मा बदल्नुहोस्।",tag:"Image",category:"Design"},
 {id:"text-analyzer",icon:"¶",title:"शब्द, अक्षर र पढ्ने समय",en:"Text Analyzer",desc:"नेपाली लेखको शब्द, अक्षर, अनुच्छेद र अनुमानित पढ्ने समय हेर्नुहोस्।",tag:"Writing",category:"Writing"},
 {id:"emi-calculator",icon:"रू",title:"EMI किस्ता क्याल्कुलेटर",en:"Loan EMI Calculator",desc:"कर्जा रकम, ब्याज र अवधि अनुसार अनुमानित मासिक किस्ता।",tag:"Finance",category:"Utilities"},
 {id:"vat-calculator",icon:"%",title:"VAT गणना",en:"VAT Calculator",desc:"सम्पादन गर्न मिल्ने कर दरबाट VAT थप्ने वा कुलबाट छुट्याउने।",tag:"Finance",category:"Utilities"},
 {id:"json-formatter",icon:"{}",title:"JSON Formatter र Validator",en:"JSON Formatter",desc:"JSON को संरचना जाँच्नुहोस्, format/minify गरेर copy गर्नुहोस्।",tag:"Developer",category:"Utilities"},
 {id:"password-generator",icon:"✧",title:"सुरक्षित Password Generator",en:"Password Generator",desc:"ब्राउजरको सुरक्षित Random स्रोतबाट पासवर्ड सिर्जना गर्नुहोस्।",tag:"Security",category:"Utilities"},
 {id:"color-palette",icon:"◉",title:"Color Palette Studio",en:"Color Palette Generator",desc:"HEX र HSL बाट सन्तुलित रंग योजना र CSS Variables तयार गर्नुहोस्।",tag:"Design",category:"Design"},
 {id:"date-difference",icon:"▦",title:"ई.सं. मिति अन्तर",en:"AD Date Difference",desc:"दुई Gregorian मितिबीचको दिन, हप्ता र अन्तर गणना गर्नुहोस्।",tag:"Dates",category:"Utilities"}
];
const descriptions={
 "qr-maker":"लिंक, टेक्स्ट वा सम्पर्क जानकारीलाई स्क्यान गर्न मिल्ने QR मा बदल्नुहोस्। सुरक्षित स्थानीय उत्पादन, डाउनलोड PNG।",
 "image-resizer":"फोटोको आयाम र कम्प्रेसन घटाएर फाइल तयार गर्नुहोस्। तस्वीर तपाईंको ब्राउजर बाहिर पठाइँदैन।",
 "text-analyzer":"पाठमा शब्द, अक्षर, वाक्य र पढ्न लाग्ने अनुमानित समय तत्काल जाँच्नुहोस्।",
 "emi-calculator":"समतुल्य मासिक किस्ता (EMI) को गणितीय अनुमान; बैंकका शुल्क, बीमा र वास्तविक तालिकाभन्दा फरक पर्न सक्छ।",
 "vat-calculator":"VAT दर आवश्यकताअनुसार परिवर्तन गर्न मिल्छ। कर/लेखा परामर्शको विकल्प होइन।",
 "json-formatter":"JSON Syntax जाँच्नुहोस्, पढ्न सजिलो बनाउनुहोस् वा Compact गर्नुहोस्। सामग्री कुनै सर्वरमा पठाइँदैन।",
 "password-generator":"Cryptographic random प्रयोग गरिएको हो। नतिजा स्वतः ब्राउजर storage मा सुरक्षित हुँदैन।",
 "color-palette":"रंगको harmony हेर्नुहोस्, HEX Copy गर्नुहोस्, CSS Variables बनाउनुहोस्।",
 "date-difference":"ग्रेगोरियन (AD) मितिको अन्तर। यसमा विक्रम संवत् तिथि गणना समावेश छैन।"
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function button(name,text,cls="ex-btn"){return '<button type="button" class="'+cls+'" id="ex-'+name+'">'+text+'</button>';}
function input(name,label,type="text",value="",placeholder=""){
 return '<label class="ex-input"><span>'+label+'</span><input id="ex-'+name+'" type="'+type+'" value="'+esc(value)+'" placeholder="'+esc(placeholder)+'"></label>';
}
function row(content){return '<div class="ex-row">'+content+'</div>';}
function info(text){return '<div class="ex-note">'+esc(text)+'</div>';}
function toolContent(id){
 if(id==="qr-maker")return '<div class="ex-columns"><div class="ex-form">'+input("qr-text","लिंक वा टेक्स्ट","text","https://todaynepal.com","https://example.com")+input("qr-size","आकार (pixel)","number","720")+row(input("qr-foreground","QR को रंग","color","#142c5c")+input("qr-background","पृष्ठभूमि","color","#ffffff"))+button("qr-make","QR कोड बनाउनुहोस्","ex-primary")+button("qr-download","↓ PNG डाउनलोड")+info("QR स्क्यान गरेपछि खुल्ने लिंक आफैँ जाँच्नुहोस्। कोडको सामग्री ब्राउजरमै प्रशोधन हुन्छ।")+'</div><div class="ex-preview"><canvas id="ex-qr-canvas" width="400" height="400" aria-label="QR Code preview"></canvas><span>Generated locally</span></div></div>';
 if(id==="image-resizer")return '<div class="ex-columns"><div class="ex-form">'+input("image-file","छवि चयन गर्नुहोस्","file")+row(input("image-width","चौडाइ (px)","number","1080")+input("image-height","उचाइ (px)","number","1080"))+'<label class="ex-check"><input id="ex-aspect" type="checkbox" checked> अनुपात जोगाउनुहोस्</label><label class="ex-input"><span>Export format</span><select id="ex-image-type"><option value="image/webp">WebP</option><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option></select></label><label class="ex-input"><span>Quality <output id="ex-quality-number">0.84</output></span><input type="range" id="ex-quality" min=".1" max="1" step=".02" value=".84"></label>'+button("image-process","Preview बनाउनुहोस्","ex-primary")+button("image-download","↓ Image Download")+info("PNG मा Quality slider लागू हुँदैन। ठूलो तस्वीरले मोबाइलको मेमोरी धेरै प्रयोग गर्न सक्छ।")+'</div><div class="ex-preview ex-image-preview"><canvas id="ex-image-canvas" width="560" height="420" aria-label="Resized image preview"></canvas><span id="ex-image-meta">फोटो चयन गर्नुहोस्</span></div></div>';
 if(id==="text-analyzer")return '<div class="ex-form"><label class="ex-input"><span>आफ्नो लेख यहाँ राख्नुहोस्</span><textarea id="ex-text" rows="8" placeholder="नेपाली वा अंग्रेजीमा लेख्नुहोस्..."></textarea></label><div class="ex-metrics"><div><b id="ex-words">0</b><small>शब्द</small></div><div><b id="ex-characters">0</b><small>अक्षर समूह</small></div><div><b id="ex-sentences">0</b><small>वाक्य</small></div><div><b id="ex-minutes">0</b><small>पढ्ने मिनेट</small></div></div>'+row(button("text-copy","पाठ Copy")+button("text-clean","खाली"))+info("शब्द र वाक्यको सीमा भाषाअनुसार फरक पर्न सक्छ। पढ्ने गति अनुमानित २०० शब्द/मिनेट हो।")+'</div>';
 if(id==="emi-calculator")return '<div class="ex-columns"><div class="ex-form">'+input("loan","कर्जा रकम (NPR)","number","1000000")+input("rate","वार्षिक ब्याज (%)","number","12")+input("months","अवधि (महिना)","number","36")+button("emi-calc","EMI गणना","ex-primary")+info("मानक घट्दो बाँकी रकमको EMI सूत्र। अतिरिक्त शुल्क वा बैंकको परिवर्तनशील ब्याज यसमा समावेश छैन।")+'</div><div class="ex-results"><div class="ex-total"><span>मासिक किस्ता</span><strong id="ex-emi">—</strong></div><div><span>कुल ब्याज</span><strong id="ex-interest">—</strong></div><div><span>जम्मा भुक्तानी</span><strong id="ex-repay">—</strong></div></div></div>';
 if(id==="vat-calculator")return '<div class="ex-columns"><div class="ex-form">'+input("vat-price","रकम (NPR)","number","1000")+input("vat-rate","VAT दर (%)","number","13")+'<label class="ex-input"><span>गणना विधि</span><select id="ex-vat-method"><option value="add">VAT थप्नुहोस्</option><option value="extract">कुल रकमबाट VAT छुट्याउनुहोस्</option></select></label>'+button("vat-calc","VAT गणना","ex-primary")+info("१३% प्रारम्भिक उदाहरण मात्र हो। वास्तविक कारोबार र कर कानुनअनुसार दर तथा छुट जाँच्नुहोस्।")+'</div><div class="ex-results"><div><span>आधार रकम</span><strong id="ex-vat-base">—</strong></div><div><span>VAT</span><strong id="ex-vat-tax">—</strong></div><div class="ex-total"><span>कुल रकम</span><strong id="ex-vat-total">—</strong></div></div></div>';
 if(id==="json-formatter")return '<div class="ex-columns"><div class="ex-form"><label class="ex-input"><span>JSON Input</span><textarea id="ex-json-input" rows="12" spellcheck="false" placeholder=\'{"name":"Nepal","year":2083}\'></textarea></label>'+row(button("json-format","Format","ex-primary")+button("json-minify","Minify")+button("json-copy","Copy"))+'</div><div class="ex-form"><label class="ex-input"><span>Validated Output</span><textarea id="ex-json-output" rows="12" spellcheck="false" readonly></textarea></label><p id="ex-json-status" class="ex-message" role="status"></p></div></div>';
 if(id==="password-generator")return '<div class="ex-form ex-small">'+input("password-length","लम्बाइ (१२–६४)","number","20")+'<div class="ex-checks"><label class="ex-check"><input type="checkbox" id="ex-pass-upper" checked> A–Z</label><label class="ex-check"><input type="checkbox" id="ex-pass-lower" checked> a–z</label><label class="ex-check"><input type="checkbox" id="ex-pass-numbers" checked> 0–9</label><label class="ex-check"><input type="checkbox" id="ex-pass-symbols" checked> !@#$</label></div>'+button("pass-generate","नयाँ Password","ex-primary")+'<div class="ex-password"><output id="ex-password" aria-live="polite"></output>'+button("pass-copy","Copy")+'</div>'+info("निजी पासवर्ड सार्वजनिक यन्त्रमा नदेखाउनुहोस्। कपी गरिएको पासवर्ड clipboard मा रहन सक्छ।")+'</div>';
 if(id==="color-palette")return '<div class="ex-form">'+row(input("palette-seed","मुख्य रंग","color","#154fac")+button("palette-generate","रंग तयार गर्नुहोस्","ex-primary"))+'<div class="ex-palette" id="ex-palette"></div><div class="ex-form"><label class="ex-input"><span>CSS Variables</span><textarea id="ex-palette-css" rows="7" readonly></textarea></label>'+button("palette-copy","CSS Copy")+'</div></div>';
 if(id==="date-difference")return '<div class="ex-columns"><div class="ex-form">'+input("date-start","सुरुवाती ई.सं. मिति","date","2026-01-01")+input("date-end","अन्तिम ई.सं. मिति","date","2026-12-31")+'<label class="ex-check"><input type="checkbox" id="ex-date-inclusive"> अन्तिम दिन पनि समावेश गर्नुहोस्</label>'+button("date-calc","दिनको अन्तर हेर्नुहोस्","ex-primary")+info("यो ग्रेगोरियन क्यालेन्डरमा आधारित नागरिक दिनको अन्तर हो, तिथि/नक्षत्र वा नेपाली पात्रो परिवर्तन होइन।")+'</div><div class="ex-results"><div class="ex-total"><span>कुल दिन</span><strong id="ex-date-days">—</strong></div><div><span>पूरा हप्ता</span><strong id="ex-date-weeks">—</strong></div><div><span>बाँकी दिन</span><strong id="ex-date-remainder">—</strong></div></div></div>';
 return "";
}
export function extraToolPage(id){
 const item=extraItems.find(t=>t.id===id);if(!item)return "";
 const prefix=location.pathname.startsWith("/design")?"/design":"";
 return '<section class="ex-head"><div class="container"><nav class="ex-crumb"><a href="'+prefix+'/" data-nav="home">गृहपृष्ठ</a> / <a href="'+prefix+'/tools/" data-nav="tools">उपकरण</a> / '+esc(item.title)+'</nav><span>✦ TODAYNEPAL DIGITAL UTILITIES</span><h1>'+esc(item.title)+'</h1><p>'+esc(descriptions[id])+'</p></div></section><div class="container ex-container"><div class="ex-shell">'+toolContent(id)+'<p id="ex-message" role="status" class="ex-message"></p></div><div class="ex-privacy"><strong>स्थानीय प्रशोधन</strong> — यस उपकरणमा तपाईंका डेटा वा फाइलहरू हाम्रो सर्वरमा अपलोड गर्ने सुविधा छैन। आफ्नो ब्राउजरमा सबै काम गर्नुहोस्।</div></div>';
}
const $=id=>document.getElementById("ex-"+id);
function status(s,bad=false){const el=$("message");if(el){el.textContent=s;el.classList.toggle("bad",bad);}}
function formNum(id,fallback=0){const n=Number($(id)?.value);return Number.isFinite(n)?n:fallback;}
function money(n){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"NPR",maximumFractionDigits:2}).format(n);}
function saveBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
async function copy(text){try{await navigator.clipboard.writeText(text);status("Copy भयो ✓");}catch{status("Clipboard अनुमति छैन। ब्राउजरबाट चयन गरी Copy गर्नुहोस्।",true);}}
function on(id,event,cb){$(id)?.addEventListener(event,cb);}
function emi(){const p=formNum("loan"),r=formNum("rate")/1200,n=formNum("months");
 if(!(p>0&&p<1e13&&n>=1&&n<=600&&r>=0&&r<=1)){status("रकम, दर र अवधि जाँच्नुहोस्।",true);return;}
 const monthly=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
 $("emi").textContent=money(monthly);$("interest").textContent=money(Math.max(0,monthly*n-p));$("repay").textContent=money(monthly*n);status("गणना सम्पन्न।");
}
function vat(){const price=formNum("vat-price"),rate=formNum("vat-rate");if(price<0||price>1e14||rate<0||rate>100){status("रकम वा कर दर मान्य छैन।",true);return;}
 const add=$("vat-method").value==="add";const base=add?price:price/(1+rate/100),tax=base*rate/100,total=base+tax;
 $("vat-base").textContent=money(base);$("vat-tax").textContent=money(tax);$("vat-total").textContent=money(total);status("गणना सम्पन्न।");
}
function utcDays(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return null;const [y,m,d]=s.split("-").map(Number);const value=Date.UTC(y,m-1,d);const obj=new Date(value);if(obj.getUTCFullYear()!==y||obj.getUTCMonth()!==m-1||obj.getUTCDate()!==d)return null;return Math.round(value/86400000);}
function dateDiff(){const a=utcDays($("date-start").value),b=utcDays($("date-end").value);
 if(a===null||b===null){status("दुवै मिति भर्नुहोस्।",true);return;}
 const diff=Math.abs(b-a)+($("date-inclusive").checked?1:0);$("date-days").textContent=String(diff);$("date-weeks").textContent=String(Math.floor(diff/7));$("date-remainder").textContent=String(diff%7);status("गणना सम्पन्न।");
}
function textStats(){const s=$("text").value;
 const words=typeof Intl.Segmenter!=="undefined"?Array.from(new Intl.Segmenter("ne",{granularity:"word"}).segment(s)).filter(x=>x.isWordLike).length:(s.trim()?s.trim().split(/\s+/).length:0);
 const chars=typeof Intl.Segmenter!=="undefined"?Array.from(new Intl.Segmenter("ne",{granularity:"grapheme"}).segment(s)).length:Array.from(s).length;
 const sentences=s.trim()?s.split(/[।.!?]+/).filter(t=>t.trim()).length:0;
 $("words").textContent=String(words);$("characters").textContent=String(chars);$("sentences").textContent=String(sentences);$("minutes").textContent=String(Math.max(0,Math.ceil(words/200)));
}
function jsonAction(minify=false){try{const val=JSON.parse($("json-input").value);$("json-output").value=JSON.stringify(val,null,minify?0:2);$("json-status").textContent="✓ JSON मान्य छ";$("json-status").classList.remove("bad");}catch(e){$("json-output").value="";$("json-status").textContent="अमान्य JSON: "+String(e.message).slice(0,130);$("json-status").classList.add("bad");}}
function randomInt(max){const cap=2**32-(2**32%max);const a=new Uint32Array(1);let n;do{crypto.getRandomValues(a);n=a[0];}while(n>=cap);return n%max;}
function password(){const target=Math.round(formNum("password-length",20));if(target<12||target>64){status("लम्बाइ १२–६४ हुनुपर्छ।",true);return;}
 const selected=[["pass-upper","ABCDEFGHIJKLMNOPQRSTUVWXYZ"],["pass-lower","abcdefghijklmnopqrstuvwxyz"],["pass-numbers","0123456789"],["pass-symbols","!@#$%^&*_-+=?"]].filter(([id])=>$(id).checked).map(([,s])=>s);
 if(!selected.length){status("कम्तीमा एक अक्षर समूह छान्नुहोस्।",true);return;}
 if(!crypto?.getRandomValues){status("यो ब्राउजरमा सुरक्षित random उपलब्ध छैन।",true);return;}
 const all=selected.join("");const chars=selected.map(group=>group[randomInt(group.length)]);
 while(chars.length<target)chars.push(all[randomInt(all.length)]);
 for(let i=chars.length-1;i>0;i--){const j=randomInt(i+1);[chars[i],chars[j]]=[chars[j],chars[i]];}
 $("password").textContent=chars.join("");status("सुरक्षित random बाट बनाइयो।");
}
function colorFromHex(h){const m=/^#([0-9a-fA-F]{6})$/.exec(h);if(!m)return [0,0,0];const n=parseInt(m[1],16);return [(n>>16)&255,(n>>8)&255,n&255];}
function toHex(rgb){return "#"+rgb.map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,"0")).join("").toUpperCase();}
function rgbToHsl([r,g,b]){r/=255;g/=255;b/=255;const hi=Math.max(r,g,b),lo=Math.min(r,g,b),d=hi-lo;let h=0,s=0,l=(hi+lo)/2;if(d){s=d/(1-Math.abs(2*l-1));switch(hi){case r:h=((g-b)/d)%6;break;case g:h=(b-r)/d+2;break;default:h=(r-g)/d+4;}h*=60;if(h<0)h+=360;}return [h,s,l];}
function hslToRgb(h,s,l){h=((h%360)+360)%360;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let rgb=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return rgb.map(v=>(v+m)*255);}
function palette(){const seed=$("palette-seed").value;const [h,s,l]=rgbToHsl(colorFromHex(seed));const rgb=[[h,s,l],[h+30,s,l],[h+180,s,Math.min(.75,l+.08)],[h+210,s,l],[h,Math.max(.1,s*.34),Math.min(.94,l+.3)]];
 const colors=rgb.map(x=>toHex(hslToRgb(...x)));$("palette").innerHTML=colors.map((c,i)=>'<button type="button" style="background:'+c+';color:'+(rgbToHsl(colorFromHex(c))[2]>.52?"#17233c":"#fff")+'" data-color="'+c+'">'+c+'</button>').join("");
 $("palette-css").value=":root {\n"+colors.map((c,i)=>"  --color-"+(i+1)+": "+c+";").join("\n")+"\n}";
}
async function makeQR(){const content=$("qr-text").value.trim(),size=formNum("qr-size",720);if(!content||content.length>1800||size<128||size>2000){status("पाठ १–१८०० अक्षर र आकार १२८–२००० राख्नुहोस्।",true);return;}
 try{await QRCode.toCanvas($("qr-canvas"),content,{width:size,margin:3,errorCorrectionLevel:"M",color:{dark:$("qr-foreground").value,light:$("qr-background").value}});status("QR तयार भयो।");}catch(e){status("QR बनाउन सकिएन: "+e.message,true);}
}
async function loadPhoto(file){if(!file||!/^image\/(jpeg|png|webp)$/.test(file.type)||file.size>15e6){status("JPG, PNG वा WebP (१५ MB सम्म) छान्नुहोस्।",true);return;}
 const url=URL.createObjectURL(file);const image=new Image();try{await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url;});if(image.width*image.height>6e7){status("यो फोटो अत्यन्त ठूलो छ।",true);return;}
 currentImage=image;const w=Math.min(image.width,2000),h=Math.round(image.height*w/image.width);$("image-width").value=w;$("image-height").value=h;aspect=image.width/image.height;imageDraw();}catch{status("तस्बिर पढ्न सकिएन।",true);}finally{URL.revokeObjectURL(url);}
}
let currentImage=null,aspect=1;
function imageDraw(){if(!currentImage){status("पहिले फोटो छान्नुहोस्।",true);return;}const w=Math.round(formNum("image-width")),h=Math.round(formNum("image-height"));if(w<1||h<1||w>5000||h>5000||w*h>16e6){status("आकार १–५००० px र अधिकतम १६ मेगापिक्सेल हुनुपर्छ।",true);return;}
 const c=$("image-canvas");c.width=w;c.height=h;const context=c.getContext("2d");context.imageSmoothingEnabled=true;context.imageSmoothingQuality="high";context.drawImage(currentImage,0,0,w,h);
 $("image-meta").textContent=w+" × "+h+" px";status("पूर्वावलोकन तयार भयो।");
}
function imageSave(){const c=$("image-canvas");if(!currentImage){status("पहिले फोटो छान्नुहोस्।",true);return;}
 const type=$("image-type").value,quality=formNum("quality",.84);c.toBlob(blob=>{if(blob)saveBlob(blob,"todaynepal-resized."+(type==="image/jpeg"?"jpg":type==="image/png"?"png":"webp"));else status("डाउनलोड असफल भयो।",true);},type,quality);
}
export function initExtraTool(id){
 if(!extraItems.some(t=>t.id===id))return;
 if(id==="qr-maker"){on("qr-make","click",makeQR);on("qr-download","click",()=>{const c=$("qr-canvas");c.toBlob(b=>b?saveBlob(b,"todaynepal-qr.png"):status("QR फाइल असफल भयो",true));});makeQR();}
 if(id==="image-resizer"){
  on("image-file","change",e=>loadPhoto(e.target.files?.[0]));
  on("image-process","click",imageDraw);on("image-download","click",imageSave);
  on("image-width","change",()=>{if($("aspect").checked&&aspect)$("image-height").value=Math.round(formNum("image-width")/aspect);});
  on("image-height","change",()=>{if($("aspect").checked&&aspect)$("image-width").value=Math.round(formNum("image-height")*aspect);});
  on("quality","input",e=>$("quality-number").textContent=e.target.value);
 }
 if(id==="text-analyzer"){on("text","input",textStats);on("text-copy","click",()=>copy($("text").value));on("text-clean","click",()=>{$("text").value="";textStats();});textStats();}
 if(id==="emi-calculator"){on("emi-calc","click",emi);emi();}
 if(id==="vat-calculator"){on("vat-calc","click",vat);vat();}
 if(id==="date-difference"){on("date-calc","click",dateDiff);dateDiff();}
 if(id==="json-formatter"){on("json-format","click",()=>jsonAction(false));on("json-minify","click",()=>jsonAction(true));on("json-copy","click",()=>copy($("json-output").value));}
 if(id==="password-generator"){on("pass-generate","click",password);on("pass-copy","click",()=>copy($("password").textContent));password();}
 if(id==="color-palette"){on("palette-generate","click",palette);on("palette-seed","input",palette);on("palette-copy","click",()=>copy($("palette-css").value));on("palette","click",e=>{const b=e.target.closest("[data-color]");if(b)copy(b.dataset.color);});palette();}
}
