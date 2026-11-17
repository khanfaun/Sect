const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/phu-sinh.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');
await p.evaluate(()=>{die('toahoa');after();});const h1=await p.textContent('h1');
await p.click('[data-act=screen]');await p.click('[data-act=birth]');await p.click('[data-act=born]');
const y=await p.evaluate(()=>[G.screen,tYear(W().t),regionOf(0).nodes.filter(n=>n.memory).length]);
console.log(h1,y,errs);await b.close();})();
