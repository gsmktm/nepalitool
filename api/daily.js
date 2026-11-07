import {dailyQuote,quoteForToday} from "../src/festivalData.js";

export function GET(request){
  let url;
  try{url=new URL(request.url);}catch{return Response.json({error:"Invalid URL"},{status:400});}
  const raw=url.searchParams.get("day");
  if(raw!==null&&(!/^\d{1,3}$/.test(raw)||+raw<1||+raw>365))
    return Response.json({error:"day must be an integer between 1 and 365"},{status:400});
  const today=quoteForToday();
  const day=raw===null?today.dayNumber:parseInt(raw,10);
  return Response.json({
    date:today.date,
    timezone:"Asia/Kathmandu",
    day,
    currentDay:today.dayNumber,
    quote:dailyQuote(day-1),
    source:"Original TodayNepal editorial quote combinations",
    automaticallyPosted:false
  },{headers:{"Cache-Control":"public, max-age=0, s-maxage=60, stale-while-revalidate=60","X-Content-Type-Options":"nosniff"}});
}
