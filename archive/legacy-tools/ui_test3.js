const {chromium}=require('playwright');(async()=>{const SP='/tmp/claude-0/-home-user-Sect/39a11ca4-490f-5167-be01-df13ebff6dfa/scratchpad/';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
// bản lưu lần 2
await p.goto('file://'+process.cwd()+'/build/old_l2.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');await p.evaluate(()=>{advanceTime(50);saveSoon();});
await p.goto('file://'+process.cwd()+'/phu-sinh.html');await p.waitForTimeout(300);await p.click('[data-act=resume]',{timeout:1500}).catch(()=>{});
console.log('tải bản lưu lần 2:',await p.evaluate(()=>JSON.stringify({v:SAVE_V,s:G.screen,ents:W().ents.length,rs:W().rstate.length})));
await p.evaluate(()=>{UI.speed=12;});await p.waitForTimeout(6000);
await p.evaluate(()=>{if(G.run.scene)G.run.scene=null;const e=entsHere(G.run.region)[0];if(e){const n=nodeById(e.at);n.fog=Math.max(n.fog,2);G.run.reveal.push([n.x,n.y,300]);}render();});
await p.screenshot({path:SP+'map3.png'});
await p.evaluate(()=>{const n=regionOf(0).nodes.find(n=>n.type==='tran'&&n.state==='ok');G.run.at=n.id;arrive(n.id);openPlace(n.id);W().t=Math.floor(W().t/24)*24+24+10;after();});
await p.click('[data-act=pact][data-arg=board]');await p.screenshot({path:SP+'board.png'});await p.click('[data-act=quest][data-arg="0"]');
await p.evaluate(()=>{G.run.scene=null;render();});await p.click('[data-act=sheet][data-arg=journal]');await p.click('[data-act=tab][data-arg=quest]');await p.screenshot({path:SP+'quest.png'});
await p.evaluate(()=>{UI.sheet=null;die('combat',{n:'Sói',k:'lang'});after();});console.log('màn chết:',await p.textContent('.over .hint').catch(()=>'?'));
console.log('rộng trang',await p.evaluate(()=>document.documentElement.scrollWidth),'lỗi:',errs);await b.close();})();
