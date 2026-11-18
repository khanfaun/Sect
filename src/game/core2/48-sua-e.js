// Sửa-E (người dùng chốt đợt 2): câu 17 cầm đồ/giá bán; 18 nguồn linh thạch phẩm cao; 19 Tích Cốc Đan; 20 trả trước nợ vay; 23 thương lượng.
// Bảng: SUAE ở content/rules/sua-e.js.

// ---------- câu 17: hiệu cầm đồ — đồ phàm trả xu, đồ tu sĩ trả linh thạch (không ra tiền phàm) ----------
function camPhamGia(id){const C=SUAE.cam;if(C.pham[id])return C.pham[id];if(String(id).startsWith('bt_')&&typeof VO_HOC!=='undefined'){const h=VO_HOC.find(x=>'bt_'+x.id===id);if(h&&h.bac)return Math.round(h.bac*C.btPer);}return 0;}
function camLt(n,it){return Math.max(1,Math.round((it.p0!=null?it.p0:it.p)*SUAE.cam.ltPer*ncGet(n.id,'cam')));}
function camPhamList(n){const r=G.run;const L=[],seen={};(r.qitems||[]).forEach((id,i)=>{const g=camPhamGia(id);if(!g||seen[id])return;seen[id]=1;
  L.push({id:'q:'+i,l:contentText('cam.l',[CAT.byId[id].n]),d:contentText('cam.dPham'),h:0,st:0,g:{txt:fmtBac(Math.max(1,Math.round(g*ncGet(n.id,'cam'))))},no:''});});return L;}
function camLeftE(n){const w=W(),m=ncMonth();const T=(w.camdo=w.camdo||{})[n.id];return Math.max(0,SUAE.cam.thang-(T&&T.m===m?T.n:0));}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='camdo')return _vo.apply(this,arguments);const left=camLeftE(n);
  const L=camPhamList(n).concat(sellList().map(it=>({id:it.k+':'+it.i,l:contentText('cam.l',[it.n]),d:contentText('cam.d'),h:0,st:0,g:{txt:'+'+camLt(n,it)+' '+ltName(0)},no:left?'':contentText('cam.het')})));
  return L.length?L:[{id:'none',l:contentText('cam.khong'),d:'',h:0,st:0,no:contentText('cam.khong')}];};}
camDo=function(n,id){const r=G.run;const [k,is]=id.split(':');
  if(k==='q'){const i=+is,qid=(r.qitems||[])[i];const g0=camPhamGia(qid);if(!g0)return false;const g=Math.max(1,Math.round(g0*ncGet(n.id,'cam')));
    r.qitems.splice(i,1);bacAdd(g,'camdo');dbg('cam.pham',{id:qid,g});return [bacChip(g)];}
  if(!camLeftE(n))return false;const it=sellList().find(x=>x.k===k&&x.i===+is);if(!it)return false;const g=camLt(n,it);
  if(k==='r'){const rel=r.relics[it.i];r.relics.splice(it.i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();}else r.pills.splice(it.i,1);
  ltAdd(0,g,'camdo');const w=W(),m=ncMonth();const T=(w.camdo=w.camdo||{});if(!T[n.id]||T[n.id].m!==m)T[n.id]={m,n:0};T[n.id].n++;ncPush(n.id,'cam',-TIEN2.nc.day);dbg('cam.do',{n:it.n,lt:g});
  return [chip('💎','+'+g+' '+ltName(0),'Linh thạch','up')];};
// binh khí phàm: bày ở tạp hóa thành; phàm nhân mang theo thì đánh mạnh hơn
{const _os=openShop;openShop=function(n){const o=_os.apply(this,arguments);const sc=G.run&&G.run.scene;
  if(sc&&sc.type==='shop'&&n&&n.type==='thanh'&&feat('tien')&&!sc._vk){sc._vk=1;const ids=Object.keys(SUAE.vk);const id=ids[Math.floor(ncHash('vk|'+n.id+'|'+ncMonth())*ids.length)];
    if(!sc.items.some(x=>x.k==='qi'&&x.id===id)){const it={k:'qi',id,bac:SUAE.vk[id].bac,p:0,qty:1,nc:'qi:'+id,b0:SUAE.vk[id].bac};shopPrice(n.id,it);sc.items.push(it);}}
  return o;};}
function vkAtkP(r){r=r||G.run;if(!r||!r.pham)return 0;let b=0;for(const id of r.qitems||[])if(SUAE.vk[id])b=Math.max(b,SUAE.vk[id].atkP);return b;}
{const _S=S;S=function(){const s=_S.apply(this,arguments);const b=vkAtkP();if(b)s.atk=Math.round(s.atk*(1+b/100));return s;};}
