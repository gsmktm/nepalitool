import test from "node:test";
import assert from "node:assert/strict";
import {
 festivals,festivalById,festivalCategories,verified2083,
 dailyQuote,quoteForToday,kathmanduDate,dayOfYear
} from "../src/festivalData.js";
import {GET as getStatus} from "../api/status.js";
import {GET as getFestivals} from "../api/festivals.js";
import {GET as getDaily} from "../api/daily.js";
import {GET as getDates} from "../api/festival-dates.js";

const url=(path)=>new Request("https://todaynepal-studio.vercel.app"+path);
const parse=async(r)=>({status:r.status,contentType:r.headers.get("content-type"),body:await r.json()});

test("festival catalog has 75 valid unique records",()=>{
 assert.equal(festivals.length,75);
 assert.equal(new Set(festivals.map(f=>f.id)).size,75);
 assert.ok(festivalCategories.includes("नेवार"));
 for(const f of festivals){
  assert.match(f.id,/^[a-z0-9-]+$/);
  assert.ok(f.name&&f.category&&f.season&&f.motto&&f.motif);
  assert.equal(f.quotes.length,2);
 }
 assert.equal(festivalById("non-existent"),null);
 assert.equal(festivalById("mha-puja").category,"नेवार");
});
test("365 daily quote combinations are nonempty and unique",()=>{
 const quotes=Array.from({length:365},(_,i)=>dailyQuote(i));
 assert.equal(quotes.length,365);
 assert.equal(new Set(quotes).size,365);
 assert.ok(quotes.every(x=>x.length>18));
 assert.equal(dailyQuote(-1),dailyQuote(364));
 assert.equal(dailyQuote(365),dailyQuote(0));
});
test("Kathmandu date and leap-year 365-day rotation remain valid",()=>{
 assert.equal(kathmanduDate(new Date("2026-11-07T19:00:00Z")),"2026-11-08");
 assert.equal(dayOfYear("2024-02-29"),59);
 assert.equal(quoteForToday(new Date("2024-12-31T12:00:00Z")).dayNumber,1);
 assert.equal(quoteForToday(new Date("2026-11-07T19:00:00Z")).date,"2026-11-08");
});
test("Festival date records have sources and no fabricated recurrence",()=>{
 assert.ok(verified2083.length>=6);
 assert.ok(verified2083.every(x=>/^\d{4}-\d{2}-\d{2}$/.test(x.ad)&&x.bs.includes("२०८३")&&x.source.startsWith("https://")));
 assert.equal(new Set(verified2083.map(x=>x.ad)).size,verified2083.length);
});
test("server status endpoint is JSON with no secret values",async()=>{
 const r=await parse(getStatus());
 assert.equal(r.status,200);
 assert.match(r.contentType,/application\/json/);
 assert.equal(r.body.ok,true);
 assert.deepEqual(r.body.features,["festivals","festival-dates","daily-quote"]);
});
test("festival API paginates and filters with correct payload",async()=>{
 const page=await parse(getFestivals(url("/api/festivals?page=2&limit=2")));
 assert.equal(page.status,200);assert.equal(page.body.count,75);assert.equal(page.body.festivals.length,2);
 assert.equal(page.body.festivals[0].id,festivals[2].id);
 const category=await parse(getFestivals(url("/api/festivals?category=%E0%A4%A8%E0%A5%87%E0%A4%B5%E0%A4%BE%E0%A4%B0&limit=75")));
 assert.equal(category.status,200);
 assert.ok(category.body.festivals.length>3);
 assert.ok(category.body.festivals.every(f=>f.category==="नेवार"));
 const byId=await parse(getFestivals(url("/api/festivals?id=mha-puja")));
 assert.equal(byId.body.festival.id,"mha-puja");
});
test("festival API rejects invalid input, returns 404 for missing id",async()=>{
 assert.equal((await parse(getFestivals(url("/api/festivals?limit=999")))).status,400);
 assert.equal((await parse(getFestivals(url("/api/festivals?page=0")))).status,400);
 assert.equal((await parse(getFestivals(url("/api/festivals?id=not-present")))).status,404);
 assert.equal((await parse(getFestivals(url("/api/festivals?category=unknown")))).status,400);
 assert.equal((await parse(getFestivals(url("/api/festivals?q="+encodeURIComponent("x".repeat(121)))))).status,400);
});
test("daily API validates bounds and correct quote",async()=>{
 const good=await parse(getDaily(url("/api/daily?day=365")));
 assert.equal(good.status,200);
 assert.equal(good.body.day,365);
 assert.equal(good.body.quote,dailyQuote(364));
 assert.equal(good.body.timezone,"Asia/Kathmandu");
 for(const d of ["0","366","-1","foo","1.5"]){
  assert.equal((await parse(getDaily(url("/api/daily?day="+encodeURIComponent(d))))).status,400);
 }
});
test("festival-date API respects its curated 2083 range",async()=>{
 const good=await parse(getDates(url("/api/festival-dates?bsYear=2083")));
 assert.equal(good.status,200);
 assert.equal(good.body.bsYear,2083);
 assert.ok(good.body.records.length>0);
 assert.ok(good.body.sources.length>0);
 const bad=await parse(getDates(url("/api/festival-dates?bsYear=2084")));
 assert.equal(bad.status,422);
});
