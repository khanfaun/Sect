const {chromium}=require('playwright');(async()=>{const SP='/tmp/claude-0/-home-user-Sect/39a11ca4-490f-5167-be01-df13ebff6dfa/scratchpad/';const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/phu-sinh.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');
await p.evaluate(()=>{G.run.scene=null;startCombat({cnt:1},{kind:'node'});after();});
for(let i=0;i<60;i++){const st=await p.evaluate(()=>{const sc=G.run.scene;if(sc.dodge){dodgeResolve(null);after();}return !!readyPlayer(sc);});if(st)break;await p.waitForTimeout(200);}
await p.waitForTimeout(200);await p.screenshot({path:SP+'menu4.png'});
await p.click('[data-act=menu][data-arg=def]');await p.screenshot({path:SP+'menudef.png'});
await p.click('[data-act=skill][data-arg=_block]');console.log(await p.evaluate(()=>G.run.scene.log.slice(-1)[0].t),errs);await b.close();})();
