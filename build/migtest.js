const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/build/old_l1.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');
await p.evaluate(()=>{G.run.tv=55;startCombat({},{kind:'node'});after();});
const old=await p.evaluate(()=>JSON.parse(localStorage.getItem('phusinh2_save_v1')).v);
await p.goto('file://'+process.cwd()+'/phu-sinh.html');await p.waitForTimeout(400);
await p.click('[data-act=resume]',{timeout:1500}).catch(()=>{});await p.waitForTimeout(1500);
console.log('bản lưu cũ v'+old,'→',await p.evaluate(()=>JSON.stringify({v:SAVE_V,screen:G.screen,tv:G.run.tv,scene:G.run.scene&&G.run.scene.type,q:G.run.quality,map:!!document.querySelector('#map')})),'lỗi:',errs);await b.close();})();
