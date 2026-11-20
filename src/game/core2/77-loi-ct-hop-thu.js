// ---------------- CÔNG TRÌNH SINH LỜI → HỘP THƯ (bảng LOI_CT: content/rules/loi-ct.js) ----------------
// Mỗi tháng (lịch thế giới), mọi ô có công trình ngươi sở hữu gửi lời về r.hopThu. Nhận ở đâu cũng được (ACT.hopNhan).
// Thư: {m: tháng, L:[{node, noi, ct, bac, lt, an:[], pill:[], vat:{}, tin:[]}]}
function hopL(r){r=r||G.run;if(!r)return [];if(!Array.isArray(r.hopThu))r.hopThu=[];return r.hopThu;}
function loiPhe(n){return isTownT(n.type)&&isTuT(n.type)||n.type==='cho'||n.type==='tong'?'tu':'pham';}
function loiDong(n,c,m){if(!c||!c.ct||LOI_CT.boQua.includes(c.ct)||!CONG_TRINH[c.ct])return null;if(c.hu>W().t)return null;
  const phe=loiPhe(n),T=(LOI_CT.them[phe]||{})[c.ct]||{};const h=k=>wHash('loi|'+n.id+'|'+c.ct+'|'+m+'|'+k);
  const goc=datCtGia(c.ct)*LOI_CT.ty*(T.x||1);const o={node:n.id,noi:n.name,ct:c.ct,bac:0,lt:0,an:[],pill:[],vat:{},tin:[]};
  if(phe==='tu')o.lt=Math.max(1,Math.round(goc/DAT.mua.lt));else o.bac=Math.max(1,Math.round(goc));
  if(T.an&&h('an')<T.an){const M=Object.keys(AN.mon||{});if(M.length)o.an.push(M[Math.floor(h('anm')*M.length)%M.length]);}
  if(T.dan&&h('dan')<T.dan){const P=Object.keys(PILL).filter(k=>PILL[k].p&&PILL[k].p<=60);if(P.length)o.pill.push(P[Math.floor(h('danm')*P.length)%P.length]);}
  if(T.vat&&h('vat')<T.vat){const K=Object.keys(MAT);const k=K[Math.floor(h('vatm')*K.length)%K.length];o.vat[k]=1;}
  if(T.tin&&h('tin')<T.tin){const L=regionOf(idReg(n.id)).nodes.filter(x=>x.fog===0);if(L.length)o.tin.push(L[Math.floor(h('tinm')*L.length)%L.length].id);}
  return o;}
function loiThang(m){const r=G.run;if(!r||!feat('dat')||typeof datCuaTa!=='function')return null;const L=[];
  for(const x of datCuaTa()){const n=nodeById(x.node);const d=n&&datStore()[n.id];const c=d&&d.o[x.i];const o=n&&loiDong(n,c,m);if(o)L.push(o);}
  if(!L.length)return null;const H=hopL(r);H.push({m,L});
  while(H.length>LOI_CT.giu){const a=H.shift();H[0].L=a.L.concat(H[0].L);}
  dbg('loi.thang',{m,n:L.length,bac:L.reduce((s,o)=>s+o.bac,0),lt:L.reduce((s,o)=>s+o.lt,0)});return H[H.length-1];}
// gộp các thư thành một bản tổng (để hiện và nhận)
function hopTong(r){const T={bac:0,lt:0,an:[],pill:[],vat:{},tin:[],noi:{}};for(const t of hopL(r))for(const o of t.L){T.bac+=o.bac;T.lt+=o.lt;T.an.push(...o.an);T.pill.push(...o.pill);
  for(const k in o.vat)T.vat[k]=(T.vat[k]||0)+o.vat[k];T.tin.push(...o.tin);const q=T.noi[o.noi+'|'+o.ct]||(T.noi[o.noi+'|'+o.ct]={noi:o.noi,ct:CONG_TRINH[o.ct]?CONG_TRINH[o.ct].n:o.ct,bac:0,lt:0,thang:0});q.bac+=o.bac;q.lt+=o.lt;q.thang++;}
  T.so=hopL(r).length;T.dong=Object.values(T.noi);return T;}
function hopNhan(){const r=G.run;if(!r)return null;const H=hopL(r);if(!H.length)return null;const T=hopTong(r);
  if(T.bac)bacAdd(T.bac,'loi.ct');if(T.lt)ltAdd(0,T.lt,'loi.ct');
  for(const id of T.an)(r.qitems||(r.qitems=[])).push(id);for(const id of T.pill)r.pills.push({id,q:0});
  for(const k in T.vat)r.mats[k]=(r.mats[k]||0)+T.vat[k];for(const id of T.tin){const n=nodeById(id);if(n)hearOf(n);}
  r.hopThu=[];if(typeof tgSweep==='function')tgSweep('hopthu');
  log(contentText('hop.nhanLog',[T.bac?fmtBac(T.bac):'',T.lt?T.lt+' linh thạch':''].filter(Boolean).join(', ')||contentText('hop.vat')));dbg('hop.nhan',{bac:T.bac,lt:T.lt,so:T.so});return T;}
{const _at=advanceTime;advanceTime=function(h){const r0=G.run,m0=r0&&W()?ncMonth():null;const o=_at.apply(this,arguments);const r=G.run;if(!r||m0==null||!(h>0))return o;
  const m1=ncMonth();if(r.loiM==null)r.loiM=m0;const den=Math.min(m1,r.loiM+1200);/* nhảy dài (bế quan nhiều năm) vẫn tính đủ, tối đa trăm năm */for(let m=r.loiM+1;m<=den;m++)loiThang(m);if(m1>r.loiM)r.loiM=m1;return o;};}
