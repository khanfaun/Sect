// ---------------- LÊN LÀM NGƯỜI ĐỨNG ĐẦU THẾ LỰC (bảng DD: content/rules/dung-dau.js) ----------------
// Khoá thế lực: 'FAxx' (thế lực, Hoàng quốc) hoặc 'tong:<id nút>' (tông môn). Lên ngôi: r.chuFa thêm khoá; thế lực FAxx ghi w.fa[id].chuTa.
// Khi đã đứng đầu: thành trấn thế lực đó nắm có lựa chọn "Tiếp quản" (core2/78); sang kiếp mọi thứ về tay thế lực (core2/79).
function ddHq(id){return !!(THE_LUC[id]&&THE_LUC[id].loai==='hq');}
// trụ sở: tông môn = nút tong; thế lực = nút neo; Hoàng quốc = kinh đô (neo nếu có, không thì thành phàm lớn nhất nước đó)
function ddKinh(id){const w=W();const K=w._ddK||(Object.defineProperty(w,'_ddK',{value:{},enumerable:false,writable:true}),w._ddK);if(id in K)return K[id]==null?null:nodeById(K[id]);const n=ddKinh0(id);K[id]=n?n.id:null;return n;}
function ddKinh0(id){const D=THE_LUC[id];if(!D)return null;const a=D.noi&&anchorOf(W(),D.noi);if(a)return a;
  const L=W().regions.flatMap(R=>R.nodes).filter(n=>n.fa===id&&n.type==='thanh'&&n.state!=='ruin');return L.sort((a,b)=>((b.cells||[]).length-(a.cells||[]).length)||a.id-b.id)[0]||null;}
function ddKhoa(n){if(!n||!W()||n.state==='ruin')return null;const r=G.run;
  if(n.type==='tong')return r.flags.tongmon&&contentOwnSect(n)?'tong:'+n.id:null;
  for(const id in THE_LUC){if(!faAlive(id))continue;const k=ddKinh(id);if(k&&k.id===n.id)return id;}return null;}
function ddLoai(k){return k.startsWith('tong:')?'tong':ddHq(k)?'hq':'fa';}
function ddTen(k){if(k.startsWith('tong:')){const n=nodeById(+k.slice(5));return n?(n.owner||n.name):'';}return THE_LUC[k]?THE_LUC[k].n:k;}
function ddDanh(k){const l=ddLoai(k);if(l==='hq'){const H=typeof HQ_CHU!=='undefined'&&HQ_CHU[k];return H&&H.xh?H.xh.replace(/^./,c=>c.toUpperCase()):DD.danh.hq;}return l==='tong'?DD.danh.tong:(DD.danh[k]||DD.danh._);}
function ddLa(k){return (G.run.chuFa||[]).includes(k);}
function ddCong(k){return k.startsWith('tong:')?chGet('sect:'+contentSectName()):chGet('fa:'+k);}
function ddThanh(k){let c=0;for(const R0 of W().regions)for(const n of R0.nodes)if(n.quyen&&n.quyen.k==='ta'&&(n.quyen.fa0===k||n.fa===k))c++;return c;}
function ddDangGiu(k){if(k.startsWith('tong:'))return contentText('dd.chuCu');const f=faNow(k);return f&&f.chu||contentText('dd.chuCu');}
function ddOpts(n){const k=ddKhoa(n);if(!k)return [];const r=G.run,l=ddLoai(k),C=DD[l],me=isPham()?-1:(r.realm||0),cong=ddCong(k),dn=ddDanh(k),ten=ddTen(k),L=[];
  if(ddLa(k))return [{id:'xem',l:contentText('dd.daLa',[dn,ten]),d:contentText('dd.daLaD',[ten]),h:0,st:0,g:{},no:''}];
  const can=x=>(l==='hq'||DD.pham.includes(k)||x.realm==null)?-9:x.realm;
  const why=x=>cong<x.cong?contentText('dd.thieuCong',[cong,x.cong]):me<can(x)?contentText('dd.thieuCg',[REALM[can(x)]]):(x.thanh&&ddThanh(k)<x.thanh)?contentText('dd.thieuThanh',[ddThanh(k),x.thanh]):'';
  L.push({id:'ke',l:contentText(l==='hq'?'dd.keHq':'dd.ke',[dn,ten]),d:contentText(l==='hq'?'dd.keHqD':'dd.keD',[ten,dn,cong,C.ke.cong]),h:72,st:0,g:{txt:dn},no:why(C.ke)});
  L.push({id:'thach',l:contentText(l==='hq'?'dd.soan':'dd.thach',[ddDangGiu(k),dn]),d:contentText(l==='hq'?'dd.soanD':'dd.thachD',[ten,dn,ddDangGiu(k)]),h:6,st:0,g:{txt:dn},no:why(C.thach)});
  return L;}
function ddLen(k,cach){const r=G.run;r.chuFa=r.chuFa||[];if(!r.chuFa.includes(k))r.chuFa.push(k);
  if(!k.startsWith('tong:')){const F=faInit(W());const cu=F[k].chu;if(cach==='thach'&&cu&&typeof vaiGiet==='function')vaiGiet(cu,'thach');F[k].chuTa={ten:r.ten,kiep:r.kiep||0};}
  const t=contentText('dd.len',[r.ten,ddDanh(k),ddTen(k)]);note(t,'up');log(t);suLuocAdd(t,'vai');dbg('dd.len',{k,cach});}
function ddDo(id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const k=ddKhoa(n);const o=ddOpts(n).find(x=>x.id===id);if(!k||!o||o.no||id==='xem')return false;
  if(id==='ke'){advanceTime(72);if(!G.run)return true;ddLen(k,'ke');if(G.run.scene===sc){sc.msg=[contentText('dd.keXong',[ddDanh(k),ddTen(k)])];sc.chips=[];sc.venue=null;sc.seq=(sc.seq||0)+1;}return true;}
  advanceTime(6);if(!G.run)return true;const C=DD[ddLoai(k)].thach;dbg('dd.thachDanh',{k});startCombat({elite:true,boss:true,cnt:C.cnt},{kind:'node',ddThach:k});return true;}
{const _fc=finishCombat;finishCombat=function(sc){const first=sc&&!sc._ddC;if(sc)sc._ddC=1;const res=_fc.apply(this,arguments);const r=G.run;
  if(first&&r&&sc&&sc.after&&sc.after.ddThach&&sc.over==='win'){const k=sc.after.ddThach;ddLen(k,'thach');
    if(ddHq(k)){r.karma=(r.karma||0)-DD.hq.soanKarma;const n=ddKinh(k);if(n&&typeof tnaBao==='function')try{tnaBao(tnaK(n),1,{});}catch(e){}}}
  return res;};}
VENUE_N.dungdau=contentText('dd.n');VENUE_IN.dungdau=[contentText('dd.in1'),contentText('dd.in2')];
{const _vo=venueOpts;venueOpts=function(n,v){if(v==='dungdau')return ddOpts(n);return _vo.apply(this,arguments);};}
{const _vd=venueDo;venueDo=function(v,id){if(v==='dungdau')return ddDo(id);return _vd.apply(this,arguments);};}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(G.run&&ddKhoa(n)&&!L.some(a=>a.a==='dungdau'))L.push({a:'dungdau',i:'👑',l:contentText('dd.n'),h:0,tip:contentText('dd.tip',[ddDanh(ddKhoa(n)),ddTen(ddKhoa(n))]),dis:false,x:''});return L;};}
// faNow: người đứng đầu là ngươi (trong kiếp này)
{const _fn=faNow;faNow=function(id){const o=_fn.apply(this,arguments);const r=G.run;const f=W()&&W().fa&&W().fa[id];if(o&&f&&f.chuTa&&r&&f.chuTa.kiep===(r.kiep||0))o.chu=r.ten;return o;};}
// sang kiếp: thế lực chọn người mới; tông môn giao cho môn hạ
{const _d=die;die=function(){const r=G.run;try{if(r&&W()&&W().fa)for(const id in W().fa)if(W().fa[id].chuTa&&W().fa[id].chuTa.kiep===(r.kiep||0))delete W().fa[id].chuTa;}catch(e){}return _d.apply(this,arguments);};}
{const _cm=tcChuMoi;tcChuMoi=function(r,n){const fa=(r.chuFa||[])[0];if(fa&&fa.startsWith('tong:'))return {k:'tong',n:ddTen(fa)};return _cm.apply(this,arguments);};}
