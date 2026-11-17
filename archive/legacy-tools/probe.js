const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/phu-sinh.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');
await p.evaluate(()=>{G.run.scene=null;startCombat({cnt:2},{kind:'node'});after();});
for(let i=0;i<6;i++){await p.waitForTimeout(700);console.log(await p.evaluate(()=>{const sc=G.run.scene;return JSON.stringify({t:sc.t.toFixed(2),hold:sc.hold,cur:sc.cur,dodge:!!sc.dodge,qte:!!sc.qte,pos:sc.units.map(u=>Math.round(u.pos)+u.phase)});}));}
console.log(errs);await b.close();})();
