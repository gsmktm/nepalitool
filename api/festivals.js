import {festivals,festivalCategories,festivalById} from "../src/festivalData.js";

const json=(value,status=200)=>Response.json(value,{status,headers:{
  "Cache-Control": status===200?"public, max-age=180, s-maxage=1800":"no-store",
  "X-Content-Type-Options":"nosniff"
}});

export function GET(request){
  let url;
  try{url=new URL(request.url);}catch{return json({error:"Invalid URL"},400);}
  const query=(url.searchParams.get("q")||"").trim();
  const category=(url.searchParams.get("category")||"").trim();
  const id=(url.searchParams.get("id")||"").trim();
  const pageRaw=url.searchParams.get("page")||"1";
  const limitRaw=url.searchParams.get("limit")||"20";
  if(query.length>120||category.length>60||id.length>80||
    !/^\d{1,3}$/.test(pageRaw)||!/^\d{1,3}$/.test(limitRaw))
    return json({error:"Invalid query parameters"},400);
  const page=Number(pageRaw),limit=Number(limitRaw);
  if(page<1||page>100||limit<1||limit>75)return json({error:"Page or limit out of range"},400);
  if(id){
    if(!/^[a-z0-9-]+$/.test(id))return json({error:"Invalid festival id"},400);
    const f=festivalById(id);
    return f?json({festival:f}):json({error:"Festival not found"},404);
  }
  if(category&&!festivalCategories.includes(category))return json({error:"Unknown category"},400);
  const q=query.toLocaleLowerCase("ne");
  const matched=festivals.filter(f=>(!category||category==="सबै"||category===f.category)
    &&(!q||[f.name,f.category,f.season,...f.quotes].join(" ").toLocaleLowerCase("ne").includes(q)));
  const start=(page-1)*limit;
  return json({
    count:matched.length,
    total:festivals.length,
    page,
    limit,
    pages:Math.ceil(matched.length/limit),
    category:category||null,
    festivals:matched.slice(start,start+limit),
    note:"Editorial festival catalog; seasons are approximate, not fixed festival dates."
  });
}
