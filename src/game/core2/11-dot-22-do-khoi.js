// ================= ĐỢT 22: ĐỒ KHỞI ĐẦU NGẪU NHIÊN, CÂU CHUYỆN MỞ ĐẦU KIẾP =================
// Không còn mặc định Hồi Xuân Đan và một công pháp. Mỗi kiếp có thể có 0 tới 2 món phổ thông (thường phàm phẩm,
// hiếm lắm mới hoàng phẩm), mỗi món kèm nguồn gốc để kể trong trang mở đầu.
// Bảng START_IT: content/items/start-it.js
function startItems(){const r=G.run;const out=[];const n=chance(.55)?(chance(.25)?2:1):0;
  for(let i=0;i<n;i++){const it=wpick(START_IT.filter(x=>!out.some(o=>o.it===x)),x=>x.w);if(!it)break;const o={it,s:pick(it.s)};
    if(it.k==='pill'){r.pills.push({id:it.id,q:0});o.n=PILL[it.id].n;}
    else if(it.k==='relic'){const x=genRelic(chance(.08)?1:0);r.relics.push(x);o.n=x.name;}
    else if(it.k==='book'){const b=bookOf(genArt('cp',chance(.08)?1:0));r.relics.push(b);o.n=b.art.n;}
    else {o.v=ri(1,3);r.st+=o.v;}
    out.push(o);}
  return out;}
// ----- câu chuyện: thơ ấu tới hiện tại, dựa trên xuất thân, mệnh cách, linh căn (chỉ gợi, không gọi tên), chỉ số nổi bật, đồ mang theo -----
// Bảng LS_OG: content/characters/ls-og.js
// Bảng LS_EL: content/characters/ls-el.js
// Bảng LS_ELN: content/characters/ls-eln.js
// Bảng LS_TR: content/characters/ls-tr.js
// Bảng LS_TPG: content/characters/ls-tpg.js
function lifeStory(r,items,region){const og=ORIGIN.find(o=>o.id===r.origin);const s=S();const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const ho=h2?w.slice(0,2).join(' '):w[0],ten2=w.slice(h2?2:1).join(' ')||r.ten;
  const v={ten:r.ten,ho,que:r.que,quoc:G.meta.world.quoc};const f=t=>lsFill(t,v);const L=[];
  const O=LS_OG[r.origin]||[og.bio];L.push(f(O[0]));v.ten=ten2;
  // linh căn: chỉ gợi qua sở thích thuở nhỏ
  const els=r.root.els.filter(e=>LS_EL[e]);
  if(els.length>=4)L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.022")+els.map(e=>LS_ELN[e]).filter(Boolean).join(', ')+contentText("core2_11-dot-22-do-khoi_js.lifeStory.023")));
  else if(els.length===1)L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.024")+LS_EL[els[0]]+contentText("core2_11-dot-22-do-khoi_js.lifeStory.025")));
  else if(els.length)L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.026")+LS_EL[els[0]]+contentText("core2_11-dot-22-do-khoi_js.lifeStory.027")+LS_EL[els[1]]+'.'));
  if(O[1])L.push(f(O[1]));
  if(LS_TR[r.trait])L.push(f(LS_TR[r.trait]));
  // chỉ số nổi bật
  const tr=TRAIT.find(t=>t.id===r.trait)||{};const fx=Object.assign({},og.fx||{});for(const k in tr.fx||{})if(typeof tr.fx[k]==='number')fx[k]=(fx[k]||0)+tr.fx[k];
  const body=(fx.atkP||0)+(fx.hpP||0)+(fx.defP||0)/2;const ngo=s.ngo,tam=s.tam,van=s.van,tp=s.tp;const P=[];
  if(ngo<=9&&body>=10)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.028"));
  else if(ngo>=13&&body<0)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.029"));
  else if(ngo>=13)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.030"));
  else if(ngo<=8)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.031"));
  else if(body>=10)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.032"));
  if(tam>=12)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.033"));else if(tam<=7)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.034"));
  if(P.length<2&&van>=7)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.035"));else if(P.length<2&&tp>=9)P.push(contentText("core2_11-dot-22-do-khoi_js.lifeStory.036"));
  for(const x of P.slice(0,2))L.push(f(x));
  // đồ mang theo và nguồn gốc
  for(const a of arts()){if(a.type==='tp'){if(a.src===contentText("core2_11-dot-22-do-khoi_js.lifeStory.037")&&LS_TPG[r.origin])L.push(lsFill(LS_TPG[r.origin],Object.assign({n:a.n},v)));else if(a.src===contentText("core2_11-dot-22-do-khoi_js.lifeStory.038"))L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.039")+a.n+contentText("core2_11-dot-22-do-khoi_js.lifeStory.040")));}
    else if(a.type==='cp'){const sk=(r.skills||[]).find(k=>a.lines.some(x=>x.sk===k.id));const src=sk&&sk.src;
      if(src==='xuat')L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.041")+a.n+contentText("core2_11-dot-22-do-khoi_js.lifeStory.042")));else if(src==='ky')L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.043")+a.n+'.'));}}
  if(r.origin==='thegia')L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.044")));
  if(r.origin==='duoc')L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.045")));
  if(r.origin==='buon')L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.046")));
  if(r.origin==='khat')L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.047")));
  for(const o of items)L.push(lsFill(o.s,Object.assign({n:o.n,v:o.v},v)));
  // hiện tại
  L.push(f(contentText("core2_11-dot-22-do-khoi_js.lifeStory.048")+Math.floor(r.age)+contentText("core2_11-dot-22-do-khoi_js.lifeStory.049")+(region?' '+region.replace(/\b[Nn]gươi\b/g,ten2):'')));
  L.push(f(tuArt()?contentText("core2_11-dot-22-do-khoi_js.lifeStory.050"):contentText("core2_11-dot-22-do-khoi_js.lifeStory.051")));
  return L;}
{const _nr22=newRun;newRun=function(c){const res=_nr22(c);const r=G.run;if(!r)return res;const items=startItems();
  const reg=r.scene&&r.scene.type==='region'?r.scene.text:'';if(r.scene&&r.scene.type==='region')r.scene=null;
  r.story=lifeStory(r,items,reg);syncSkills();saveSoon();return res;};}
function lsFill(t,v){return String(t).replace(/\{(\w+)\}/g,(m,k)=>v[k]!=null?v[k]:m);}

// ================= ĐỢT 23: ĐỘT PHÁ =================
// Bỏ giới hạn cảnh giới theo phẩm tâm pháp: phẩm tâm pháp chỉ ảnh hưởng tốc độ tu luyện và tỉ lệ đột phá.
tuCapWhy=function(){return '';};
// Tu vi đầy mà lịch luyện chưa đầy: bình cảnh. Cả hai đầy: đột phá (kể cả phàm nhân dẫn khí nhập thể, không còn tự động).
function btState(){const r=G.run;if(!r||r.tv<100)return '';return canBreak()?'dp':'bc';}
{const _bt23=btTarget;btTarget=function(){return isPham()?0:_bt23();};}
{const _bs23=btStages;btStages=function(to){return isPham()?[]:_bs23(to);};}
{const _bi23=btItems;btItems=function(){return isPham()?G.run.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].bt&&PILL[x.p.id].realm==null):_bi23();};}
// Tỉ lệ thành công: cộng từ nhiều nguồn, mỗi nguồn hiện riêng trong màn chuẩn bị
// Bảng BT_ROOT, BT_LK: content/rules/bt-root.js
function btParts(slots){const r=G.run,s=S();const e=btEff(slots||[]);const to=btTarget();const n=nodeById(r.at);const L=[];const add=(t,v,tip)=>{v=Math.round(v*10)/10;if(v)L.push({t,v,tip});};
  add(isPham()?contentText("core2_11-dot-22-do-khoi_js.btParts.052"):contentText("core2_11-dot-22-do-khoi_js.btParts.053")+REALM[to],(isPham()?0.75:BT_BASE[Math.min(4,r.realm)])*100,contentText("core2_11-dot-22-do-khoi_js.btParts.054"));
  add(contentText("core2_11-dot-22-do-khoi_js.btParts.055"),(s.ngo-10)*1.2,contentText("core2_11-dot-22-do-khoi_js.btParts.056"));add(contentText("core2_11-dot-22-do-khoi_js.btParts.057"),(s.tam-10)*1.2,contentText("core2_11-dot-22-do-khoi_js.btParts.058"));
  if(r.tamma)add(contentText("core2_11-dot-22-do-khoi_js.btParts.059"),-r.tamma*0.4,contentText("core2_11-dot-22-do-khoi_js.btParts.060"));
  add(contentText("core2_11-dot-22-do-khoi_js.btParts.061"),BT_ROOT[r.root.id]||0,rootView(r.root).n);
  const a=tuArt();if(a){const d=a.tier-Math.max(0,to);add(contentText("core2_11-dot-22-do-khoi_js.btParts.062")+PHAM[a.tier],d<0?d*6:Math.min(d,3)*3,d<0?contentText("core2_11-dot-22-do-khoi_js.btParts.063"):contentText("core2_11-dot-22-do-khoi_js.btParts.064"));
    if(a.el!=='vo')add(r.root.els.includes(a.el)?contentText("core2_11-dot-22-do-khoi_js.btParts.065"):contentText("core2_11-dot-22-do-khoi_js.btParts.066"),r.root.els.includes(a.el)?4:-4,contentText("core2_11-dot-22-do-khoi_js.btParts.067")+(EL[a.el]||EL.vo).n);}
  const cps=(isPham()?[]:activeArts()).filter(x=>x.type==='cp'&&x.el!=='vo');const bad=cps.filter(x=>!r.root.els.includes(x.el)).length;
  if(cps.length)add(bad?contentText("core2_11-dot-22-do-khoi_js.btParts.068")+bad+')':contentText("core2_11-dot-22-do-khoi_js.btParts.069"),bad?-Math.min(6,bad*2):3,contentText("core2_11-dot-22-do-khoi_js.btParts.070"));
  add(contentText("core2_11-dot-22-do-khoi_js.btParts.071")+LK_N[lkOf(n)],BT_LK[lkOf(n)],contentText("core2_11-dot-22-do-khoi_js.btParts.072"));
  if(llOf()>100)add(contentText("core2_11-dot-22-do-khoi_js.btParts.073"),Math.min(10,(llOf()-100)*0.2),contentText("core2_11-dot-22-do-khoi_js.btParts.074"));
  if(r.btFail)add(contentText("core2_11-dot-22-do-khoi_js.btParts.075")+r.btFail+' lần',r.btFail*8,contentText("core2_11-dot-22-do-khoi_js.btParts.076"));
  const w=wounds().filter(x=>!x.perm).length;if(w)add(contentText("core2_11-dot-22-do-khoi_js.btParts.077"),-5*w,contentText("core2_11-dot-22-do-khoi_js.btParts.078"));
  if(r.hp<S().maxHp*0.5)add(contentText("core2_11-dot-22-do-khoi_js.btParts.079"),-5,'');
  if(e.rate)add(contentText("core2_11-dot-22-do-khoi_js.btParts.080"),e.rate,contentText("core2_11-dot-22-do-khoi_js.btParts.081"));
  return L;}
btRate=function(slots){return clamp(btParts(slots).reduce((a,x)=>a+x.v,0)/100,0.05,0.97);};
// Đạo cơ (phẩm chất cảnh giới): ngoài đạo cơ tích lũy và linh dược, lúc đột phá còn cộng thêm
function daoParts(){const r=G.run;if(isPham())return [];const to=btTarget();const L=[];const a=tuArt();const n=nodeById(r.at);
  if(a&&a.tier>=to+1)L.push({t:contentText("core2_11-dot-22-do-khoi_js.daoParts.082")+PHAM[a.tier]+contentText("core2_11-dot-22-do-khoi_js.daoParts.083"),v:a.tier>=to+2?2:1});
  if(['thien','dia','bien'].includes(r.root.id))L.push({t:rootView(r.root).n,v:1});
  if(lkOf(n)>=3)L.push({t:contentText("core2_11-dot-22-do-khoi_js.daoParts.084"),v:1});
  if(llOf()>=130)L.push({t:contentText("core2_11-dot-22-do-khoi_js.daoParts.085"),v:1});
  if(!r.tamma)L.push({t:contentText("core2_11-dot-22-do-khoi_js.daoParts.086"),v:1});
  return L;}
{const _be23=btEff;btEff=function(slots){const o=_be23(slots);o.dao+=daoParts().reduce((a,x)=>a+x.v,0);return o;};}
// phàm nhân: đột phá thành dẫn khí nhập thể, không có thiên kiếp, không có phẩm chất
{const _ps23=prepStart;prepStart=function(){const r=G.run,sc=r&&r.scene;if(!isPham())return _ps23();if(!sc||sc.type!=='prep'||!canBreak())return;
  const p=btRate(sc.slots);const idx=sc.slots.slice().sort((a,b)=>b-a);const used=idx.map(i=>r.pills[i]).filter(Boolean).map(x=>PILL[x.id].n);for(const i of idx)r.pills.splice(i,1);sc.slots=[];
  advanceTime(7*HD);if(!G.run)return;const back=sc.back;r.bt={to:0,stages:[],si:0,used};
  if(R()<p){r.bt=null;phamUp();r.scene={type:'btres',back,ok:true,done:1,text:contentText("core2_11-dot-22-do-khoi_js.087"),
    chips:used.map(n=>chip('⚗️',n,contentText("core2_11-dot-22-do-khoi_js.088"),'')).concat([chip('☯️',contentText("core2_11-dot-22-do-khoi_js.089"),contentText("core2_11-dot-22-do-khoi_js.090"),'up')])};}
  else btFail(back,used);};}
// phàm nhân dẫn khí nhập thể ở đâu cũng được, không cần động phủ
{const _pa23=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;if(a==='bt'&&isPham()&&canBreak()&&sc&&sc.type==='place'){openPrep(nodeById(sc.id));return;}return _pa23(a);};}
