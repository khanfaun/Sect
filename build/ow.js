const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});
await p.goto('file://'+process.cwd()+'/phu-sinh.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');
const chk=async(t)=>console.log(t,await p.evaluate(()=>{const W=document.documentElement.clientWidth;return [document.documentElement.scrollWidth,[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>W+1).slice(0,4).map(e=>e.tagName+'.'+e.className.baseVal!==undefined?e.tagName:e.tagName+'.'+e.className)]}));
await chk('map');await p.evaluate(()=>{die('combat',{n:'Sói',k:'lang'});after();});await chk('over');
await b.close();})();
