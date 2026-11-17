const {chromium}=require('playwright');
(async()=>{
 const SP='/tmp/claude-0/-home-user-Sect/39a11ca4-490f-5167-be01-df13ebff6dfa/scratchpad/';
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+process.cwd()+'/phu-sinh.html');
 await p.click('[data-act=birth]');await p.click('[data-act=born]');await p.click('[data-act=regionGo]');
 await p.waitForTimeout(500);
 const t0=await p.evaluate(()=>W().t);await p.waitForTimeout(5000);const t1=await p.evaluate(()=>W().t);
 console.log('5s idle -> giờ:',(t1-t0).toFixed(2));
 await p.screenshot({path:SP+'map1.png'});
 // tên điểm chưa biết có lộ không
 const leak=await p.evaluate(()=>{const h=document.body.innerHTML;return regionOf(0).nodes.filter(n=>n.fog===0&&h.includes(n.name)).map(n=>n.name);});
 console.log('lộ tên:',leak);
 // chọn một điểm đã biết và đi
 const tgt=await p.evaluate(()=>{const n=regionOf(0).nodes.find(n=>n.fog>=1&&n.id!==G.run.at);return n&&n.id;});
 await p.click(`[data-act=sel][data-arg="${tgt}"]`,{force:true});await p.screenshot({path:SP+'map2.png'});
 await p.click('[data-act=go]');await p.waitForTimeout(1500);
 const mv=await p.evaluate(()=>JSON.stringify(G.run.moving));console.log('đang đi:',mv);
 await p.reload();await p.waitForTimeout(300);
 console.log('sau tải lại:',await p.evaluate(()=>JSON.stringify({s:G.screen,mv:G.run&&G.run.moving})));
 await p.click('[data-act=resume]').catch(()=>{});await p.waitForTimeout(6000);
 console.log('scene:',await p.evaluate(()=>G.run.scene&&G.run.scene.type),'at',await p.evaluate(()=>G.run.at),'tgt',tgt);
 await p.evaluate(()=>{if(G.run.scene)G.run.scene=null;openPlace(G.run.at);render();});await p.screenshot({path:SP+'place.png',fullPage:true});
 // mở bảng phụ thì dừng
 await p.evaluate(()=>{G.run.scene=null;render();});await p.click('[data-act=sheet][data-arg=char]');const a=await p.evaluate(()=>W().t);await p.waitForTimeout(2000);console.log('mở bảng phụ, giờ tăng:',(await p.evaluate(()=>W().t))-a);
 const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log('rộng trang',sw);
 console.log('lỗi:',errs);await b.close();
})();
