const {chromium}=require('playwright');
(async()=>{const SP='/tmp/claude-0/-home-user-Sect/39a11ca4-490f-5167-be01-df13ebff6dfa/scratchpad/';
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+process.cwd()+'/phu-sinh.html');await p.evaluate(()=>localStorage.clear());await p.reload();
 await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');
 await p.evaluate(()=>{G.run.scene=null;startCombat({cnt:2},{kind:'node'});after();});
 let shots=0,dodges=0,acts=0;
 for(let i=0;i<400;i++){
  const st=await p.evaluate(()=>{const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat')return 'x';if(sc.done)return 'done';if(sc.dodge)return 'dodge';if(sc.qte)return 'qte';if(readyPlayer(sc))return 'me';return 'wait';});
  if(st==='x'||st==='done')break;
  if(st==='dodge'){dodges++;if(shots<1){await p.waitForTimeout(300);await p.screenshot({path:SP+'dodge.png'});shots++;}await p.waitForTimeout(450);await p.locator('#dodgeBtn').dispatchEvent('pointerdown',{},{timeout:800}).catch(()=>{});await p.waitForTimeout(500);continue;}
  if(st==='qte'){await p.waitForTimeout(550);await p.locator('#qte').dispatchEvent('pointerdown',{},{timeout:800}).catch(()=>{});continue;}
  if(st==='me'){acts++;if(acts===2)await p.screenshot({path:SP+'combat.png'});await p.click('[data-act=skill][data-arg=_atk]',{timeout:2000}).catch(()=>{});const t=await p.$('[data-act=tgt]');if(t)await t.click();continue;}
  await p.waitForTimeout(150);
 }
 const end=await p.evaluate(()=>G.run?G.run.scene&&[G.run.scene.type,G.run.scene.over,G.run.scene.log.slice(-4).map(l=>l.t)]:G.screen);
 console.log('lượt ta:',acts,'lần né:',dodges,'kết quả:',JSON.stringify(end));
 await p.evaluate(()=>{if(!G.run)return;G.run.scene=null;G.run.tv=100;G.run.hp=S().maxHp;gainPill('trucco',0);gainPill('homach',0);const n=regionOf(0).nodes.find(n=>n.dp);G.run.at=n.id;openPlace(n.id);after();});
 if(await p.$('[data-act=pact][data-arg=bt]')){await p.click('[data-act=pact][data-arg=bt]');for(let k=0;k<2;k++)await p.click('.list button[data-act=prep]:not(.taken)');await p.screenshot({path:SP+'prep.png'});await p.click('[data-act=prepGo]');console.log('sau đột phá:',await p.evaluate(()=>G.run&&[G.run.scene.type,G.run.scene.text,realmLabel()]));}
 console.log('lỗi:',errs);await b.close();})();
