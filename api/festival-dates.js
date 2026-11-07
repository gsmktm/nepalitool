import {verified2083,dateSources} from "../src/festivalData.js";

export function GET(request){
  let url;
  try{url=new URL(request.url);}catch{return Response.json({error:"Invalid URL"},{status:400});}
  const year=url.searchParams.get("bsYear");
  if(year!==null&&year!=="2083")
    return Response.json({error:"Only curated BS 2083 records are available; this is not a complete Panchang."},{status:422});
  return Response.json({
    bsYear:2083,
    records:verified2083,
    sources:dateSources,
    coverage:"Selected published dates only; not comprehensive and not automatically projected into other years."
  },{headers:{"Cache-Control":"public, max-age=120, s-maxage=3600","X-Content-Type-Options":"nosniff"}});
}
