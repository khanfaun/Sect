// SỬA-C (người dùng chốt câu 6, 8, 11, 18, 19). Bảng: content/rules/sua-c.js. Chữ: content/text/sua-c.json.

// ---------- C.6: đầu thai không chọn, trừ khi trước khi chết đã tu / uống / mang vật đặc biệt ----------
// Linh căn (kể cả vô căn) luôn ẩn tới khi trắc, kể cả kiếp đầu.
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r&&feat('vo')){r.rootKnown=0;delete r.dtUsed;}return res;};}
// lý do được chọn lá số (rỗng = không)
function dtPickWhy(r){r=r||G.run;if(!r)return [];const L=[];
  if((r.arts||[]).some(a=>DT_PICK.art.includes(a.n)))L.push('art');
  if((r.dtUsed||[]).some(id=>DT_PICK.pill.includes(id)))L.push('pill');
  const q=(r.qitems||[]).find(id=>DT_PICK.qi.includes(id));if(q)L.push('qi:'+q);return L;}
{const _d=die;die=function(){const r=G.run;if(r&&G.meta&&feat('vo')){const why=dtPickWhy(r);
    if(why.length){const q=why.find(x=>x.startsWith('qi:'));if(q){const id=q.slice(3);r.qitems.splice(r.qitems.indexOf(id),1);}
      G.meta.pick=(G.meta.pick||0)+1;dbg('dt.pickSrc',{why:why.join(','),pick:G.meta.pick});}}
  return _d.apply(this,arguments);};}
// Luân Hồi Đan: ghi đã uống
{const _up=usePill;usePill=function(idx,inC){const r=G.run;const it=r&&r.pills&&r.pills[idx];const id=it&&it.id;const m=_up.apply(this,arguments);
  if(m!=null&&id&&DT_PICK.pill.includes(id)&&G.run){(G.run.dtUsed=G.run.dtUsed||[]).push(id);note(contentText('dt.pill'),'up');dbg('dt.pill',{id});}return m;};}
// Luân Hồi Kinh (bản chép): dùng trong túi để học tâm pháp
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);for(const it of L)if(it.ref&&it.ref.t==='qi'&&it.ref.id==='luan_hoi_kinh')it.use=1;return L;};}
{const _bu=bagUse;bagUse=function(key,n){if(key==='vluan_hoi_kinh'){const r=G.run;const i=(r.qitems||[]).indexOf('luan_hoi_kinh');if(i<0)return 0;
    if((r.arts||[]).some(a=>DT_PICK.art.includes(a.n))){note(contentText('dt.kinhDa'),'');return 0;}
    r.qitems.splice(i,1);tpLearn(1,{n:DT_PICK.art[0],src:contentText('dt.kinhSrc')});if(typeof syncSkills==='function')syncSkills();note(contentText('dt.kinh'),'up');dbg('dt.kinh',{});return 1;}
  return _bu.apply(this,arguments);};}
// chợ phiên tu sĩ: đôi khi bày một món luân hồi
{const _se=shopExtra;shopExtra=function(items,n){const res=_se.apply(this,arguments);
  if(G.run&&!isPham()&&n&&n.type==='cho'&&Array.isArray(items)&&chance(0.08)){const id=pick(['luanhoi','luan_hoi_kinh','luan_hoi_ngoc']);
    if(id==='luanhoi')items.push({k:'pill',id,p:PILL.luanhoi.p});else items.push({k:'qi',id,p:id==='luan_hoi_ngoc'?160:110});dbg('dt.shop',{id});}return res;};}
