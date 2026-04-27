import fs from 'fs';
const API_KEY = process.env.SERPAPI_KEY;

async function test() {
    const url = `https://serpapi.com/search.json?engine=google_maps&q=plumber+Austin+Texas&type=search&api_key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.local_results.slice(0, 3).map(r => ({ title: r.title, rating: r.rating, website: r.website, links: r.links, phone: r.phone })));
}
test();
