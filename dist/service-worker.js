if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let o={};const d=e=>s(e,n),c={module:{uri:n},exports:o,require:d};i[n]=Promise.all(r.map((e=>c[e]||d(e)))).then((e=>(t(...e),o)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"961.js",revision:"0787c87870b06ab3fda07919da94ca4d"},{url:"index.html",revision:"d94510c208dfb33016bcb9d613b2297b"},{url:"main.js",revision:"0c463980021aab36690601d868f0bf1c"},{url:"main.js.LICENSE.txt",revision:"df32743ed051aa784d347b8223c278a1"}],{})}));