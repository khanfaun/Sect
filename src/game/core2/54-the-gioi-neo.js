// ĐỢT 8: thế giới neo — 15 địa điểm neo (Đ8.1), vai NPC có người kế (Đ8.2), mười thế lực (Đ8.3).
// Bảng LOC_NEO, LOC_DUONG, LOC_LOI, VAI_NP, THE_LUC: content/world/the-gioi-neo.js. Chữ: content/text/the-gioi.json (khoá tg.*).
// Mọi phép ngẫu nhiên của thế giới neo dùng băm theo hạt giống thế giới (không động vào R()), để thế giới tái lập được và không xô lệch các hệ khác.
function wHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}h^=h>>>13;h=Math.imul(h,1274126177);h^=h>>>16;return (h>>>0)/4294967296;}
function wRnd(w,k){return wHash((w&&w.seed!=null?w.seed:0)+'|'+k);}
function wPick(w,L,k){return L.length?L[Math.floor(wRnd(w,k)*L.length)]:null;}

// ---------- Đ8.1: đặt 15 địa điểm neo ----------
// Chọn một nút CÓ SẴN đúng đại khu, đúng loại ưu tiên; không tạo nút mới (giữ địa hình MAPD), không dùng sơn môn (tên nút là tên tông).
// Neo nào có đường neo tới neo đã đặt thì chọn nút gần neo đó nhất, để các đường neo ngắn và đi được.
function anchorsPlace(w){if(!w||!w.regions||w.anchorsV1)return false;
  const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
  const used=new Set(all.filter(n=>n.anchor).map(n=>n.id));const at={};for(const n of all)if(n.anchor)at[n.anchor]=n;
  for(const code of Object.keys(LOC_NEO)){if(at[code])continue;const L=LOC_NEO[code];
    const pool=all.filter(n=>Math.floor(n.id/100)===L.kv&&n.type!=='tong'&&!used.has(n.id)&&!n.anchor);if(!pool.length)continue;
    const link=LOC_DUONG.filter(d=>d[0]===code||d[1]===code).map(d=>at[d[0]===code?d[1]:d[0]]).filter(Boolean);
    let cand=null;for(const t of L.t){const c=pool.filter(n=>n.type===t);if(c.length){cand=c;break;}}
    if(!cand)cand=pool.filter(n=>n.type!=='sao');if(!cand.length)cand=pool;
    let n;if(link.length){const d=x=>Math.min(...link.map(o=>Math.hypot(x.x-o.x,x.y-o.y)));n=cand.slice().sort((a,b)=>d(a)-d(b)||a.id-b.id)[0];}
    else n=wPick(w,cand.slice().sort((a,b)=>a.id-b.id),'neo:'+code);
    n.anchor=code;n.name0=n.name;n.name=L.n;n.sectFix=1;used.add(n.id);at[code]=n;dbg('neo.dat',{code,id:n.id,type:n.type});}
  w.anchorsV1=1;return true;}
// bản lưu cũ: nơi thầy dạy, nguồn cải căn, vật tư đã chốt theo loại nút → chốt lại theo neo
function anchorsRepin(w){if(!G.meta||G.meta.world!==w)return;
  if(w.ccSrc&&typeof CAI_CAN!=='undefined')for(const id in w.ccSrc){const P=CAI_CAN[id];if(P&&P.noi&&!P.noi.meta){const a=anchorOf(w,P.noi.loc);if(a)w.ccSrc[id].node=a.id;}}
  if(w.ccVtN)for(const vt in w.ccVtN){const V=typeof CC_VT!=='undefined'&&CC_VT[vt];const a=V&&anchorOf(w,V.loc);if(a)w.ccVtN[vt]=a.id;}
  if(w.tuSrc)for(const loc in w.tuSrc){const a=anchorOf(w,loc);if(a)w.tuSrc[loc]=a.id;}
  const r=G.run;if(r&&r.place){const n=nodeById2(w,r.at);if(n&&n.anchor)r.place.n=n.name;}}
function anchorOf(w,code){if(!w||!w.regions||!code)return null;for(const R0 of w.regions)for(const n of R0.nodes)if(n.anchor===code)return n;return null;}
function locNode(code){return anchorOf(W(),code);}
// tên nơi neo để viết chuyện: luôn đọc tên hiện tại trên bản đồ
function locName(code){const n=locNode(code);return n?n.name:(LOC_NEO[code]?LOC_NEO[code].n:code);}
// snapWorld chạy sau ensureCounts (đổi loại/tên nút) và sau khi tải bản lưu → đặt neo ở đây
{const _sw=snapWorld;snapWorld=function(w){_sw(w);if(w&&w.regions&&anchorsPlace(w))anchorsRepin(w);};}

// ---------- Sử lược: những chuyện lớn của thế giới (kể cả khi người chơi vắng mặt). Giữ 60 dòng, cũ thì gộp theo thế kỷ (L20) ----------
const SL_MAX=60;
function suLuocAdd(t,k,w){w=w||W();if(!w)return;const L=w.suLuoc||(w.suLuoc=[]);L.push({y:tYear(w.t),t,k:k||''});
  while(L.length>SL_MAX){let i=0;while(i<L.length&&L[i].k==='gop')i++;
    if(i>=SL_MAX/3||i>=L.length-1){L.shift();continue;} // giữ tối đa hai mươi dòng gộp (hai mươi thế kỷ gần nhất có chuyện)
    const c0=Math.floor(L[i].y/100);let j=i;while(j<L.length-1&&L[j].k!=='gop'&&Math.floor(L[j].y/100)===c0)j++;
    const grp=L.splice(i,Math.max(1,j-i));const P=i>0&&L[i-1].y===c0*100?L[i-1]:null;
    const g=P||{y:c0*100,k:'gop',gop:0,s:[]};g.gop+=grp.length;const PR={clk:0,fa:1,loc:2,vai:3};g.s=(g.s||[]).concat(grp.slice().sort((x,y)=>(PR[x.k]??4)-(PR[y.k]??4)).map(x=>x.t)).slice(0,2);
    g.t=contentText('tg.slGop',[c0-9,g.gop,g.s.join(' ')]);if(!P)L.splice(i,0,g);}
  dbg('su.luoc',{k:k||'',t:String(t).slice(0,40)});}

// ---------- Đ8.2: vai NPC có người kế (Luật 1 HN A.17) ----------
// w.vai[NPxx]={ten,g,tuoi,tho,song,doi,qh,ke:[{ten,doi,mat}],noi,the,cho}. Sự kiện cốt truyện luôn gọi vaiNow('NPxx'), không lưu tên cứng (L25).
function vaiTho(w,P,key,tuoi){if(P.bat)return null;const x=wRnd(w,'tho:'+key);
  const t=P.tu<0?60+Math.floor(x*21):Math.round(LIFE[clamp(P.tu,0,5)]*(0.8+0.2*x));return Math.max(t,Math.floor(tuoi)+5+Math.floor(x*10));}
function vaiInit(w){w=w||W();if(!w)return null;const V=w.vai||(w.vai={});
  for(const ma in VAI_NP)if(!V[ma]){const P=VAI_NP[ma];V[ma]={ten:P.ten,g:P.g,tuoi:P.tuoi,tho:vaiTho(w,P,ma+'.1',P.tuoi),song:1,doi:1,qh:null,ke:[],noi:P.noi,the:P.fa||null};}
  for(const ma in V){const v=V[ma];if(!Array.isArray(v.tui))v.tui=[];if(!(v.cua>=0))v.cua=0;} // túi đồ nhỏ gọn của NPC (Sửa-I: Ám Hội đưa đồ đang sở hữu ra đấu giá)
  return V;}
// túi đồ NPC: [{id,n,q?}] tối đa 12 món; cua = của cải (linh thạch Hạ phẩm quy đổi). Người kế là con / học trò thì nhận lại túi, người thay thì không.
const VAI_TUI_MAX=12;
function vaiTui(ma){const V=vaiInit(W());return V[ma]?V[ma].tui:[];}
function vaiTuiAdd(ma,it){const L=vaiTui(ma);if(!it||L.length>=VAI_TUI_MAX)return false;L.push(it);return true;}
function vaiTuiBo(ma,id){const L=vaiTui(ma);const i=L.findIndex(x=>x.id===id);return i<0?null:L.splice(i,1)[0];}
function vaiTenMoi(w,P,v,key){const g=wRnd(w,'g:'+key)<0.5?'nam':'nu';const ten0=v.ke.length?v.ke[v.ke.length-1].ten:v.ten;
  const ho=(v.keThay?'thay':P.ke)==='con'&&ten0?ten0.split(' ')[0]:NAME.ho[Math.floor(wRnd(w,'ho:'+key)*NAME.ho.length)];
  const L=g==='nu'?NAME.nu:NAME.nam;let ten=ho+' '+L[Math.floor(wRnd(w,'ten:'+key)*L.length)];
  if(ten===ten0)ten=ho+' '+L[(Math.floor(wRnd(w,'ten:'+key)*L.length)+1)%L.length];return {ten,g};}
// người giữ vai mất: ghi người trước, chờ một hai năm rồi có người kế (thế lực đã tan thì vai trống tới khi có người dựng lại)
function vaiMat(ma,ly,w){w=w||W();const V=vaiInit(w),v=V[ma],P=VAI_NP[ma];if(!v||!v.song||P.bat)return false;
  v.ke.push({ten:v.ten,doi:v.doi,mat:tYear(w.t),ly:ly||'tho'});if(v.ke.length>8)v.ke.shift();
  const n=anchorOf(w,P.noi);if((P.lead||P.tu>=1)&&ly&&ly!=='tho'&&ly!=='fa')suLuocAdd(contentText('tg.vaiMat',[v.ten,P.vai,n?n.name:LOC_NEO[P.noi].n]),'vai',w);
  v.song=0;v.ten=null;v.cho=tYear(w.t)+1+Math.floor(wRnd(w,'cho:'+ma+v.doi)*2);dbg('vai.mat',{ma,ly:ly||'tho'});return true;}
function vaiKe(ma,w){const V=w.vai,v=V[ma],P=VAI_NP[ma];const key=ma+'.'+(v.doi+1);const nm=vaiTenMoi(w,P,v,key);const truoc=v.ke.length?v.ke[v.ke.length-1].ten:null;
  const x=wRnd(w,'tuoi:'+key);const tuoi=P.tu<1?(P.ke==='con'?18+Math.floor(x*18):22+Math.floor(x*20)):Math.round(P.tuoi*(0.35+0.4*x));
  if(v.keThay||P.ke==='thay'){v.tui=[];v.cua=Math.floor((v.cua||0)/3);}Object.assign(v,{ten:nm.ten,g:nm.g,tuoi,tho:vaiTho(w,P,key,tuoi),song:1,doi:v.doi+1,qh:truoc?contentText('tg.vaiQh.'+(v.keThay?'thay':P.ke),[truoc]):null,cho:null,keThay:0});
  const n=anchorOf(w,P.noi);if(P.lead)suLuocAdd(contentText('tg.vaiKe',[v.ten,v.qh||P.vai,P.vai,n?n.name:LOC_NEO[P.noi].n]),'vai',w);dbg('vai.ke',{ma,doi:v.doi});}
function vaiYear(w,y,n){const V=vaiInit(w);n=n||1;
  for(const ma in V){const v=V[ma],P=VAI_NP[ma];if(!P||P.bat)continue;
    if(v.song){v.tuoi+=n;if(v.tuoi>=v.tho)vaiMat(ma,'tho',w);continue;}
    const F=P.fa&&w.fa&&w.fa[P.fa];if(F&&F.trang==='diet')continue; // thế lực đã tan: vai trống
    if(v.cho!=null&&y>=v.cho)vaiKe(ma,w);}}
// người đang giữ vai; vai trống → người / vật chứng thay thế (C: mọi nút phải có)
function vaiNow(ma){const w=W();if(!w)return null;const V=vaiInit(w),v=V[ma],P=VAI_NP[ma];if(!v||!P)return null;
  const truoc=v.ke.length?v.ke[v.ke.length-1]:null;
  return {ma,ten:v.ten,g:v.g,tuoi:v.song?Math.floor(v.tuoi):null,song:!!v.song,doi:v.doi,qh:v.qh,vai:P.vai,noi:P.noi,noiTen:locName(P.noi),the:P.fa,thay:v.song?null:P.thay,truoc:truoc&&truoc.ten,muc:P.muc};}
// người chơi giết / làm mất người giữ vai (Đ9 dùng)
function vaiGiet(ma,ly){return vaiMat(ma,ly||'giet');}

// ---------- Đ8.3: mười thế lực ----------
// w.fa[FAxx]={tien,quan,dan,suc,chu,trang:'song'|'suy'|'diet',tDiet,lap}. Sức duy trì kéo về mức gốc, cộng lai mỗi năm, nhiễu nhỏ; đồng hồ thế giới đẩy lên / xuống.
function faInit(w){w=w||W();if(!w)return null;const F=w.fa||(w.fa={});
  for(const id in THE_LUC)if(!F[id]){const D=THE_LUC[id];F[id]={tien:D.tien,quan:D.quan,dan:D.dan,suc:D.suc,chu:D.chu,trang:'song',tDiet:null,lap:1};}return F;}
function faTrang(f){return f.suc<=0?'diet':f.suc<30?'suy':f.trang==='suy'&&f.suc<40?'suy':'song';} // hồi phải lên 40 mới tính là vững lại
function faSet(id,f,w,y){const D=THE_LUC[id],t0=f.trang,t1=t0==='diet'?'diet':faTrang(f);if(t0===t1)return;f.trang=t1;const n=anchorOf(w,D.noi);const nt=n?n.name:LOC_NEO[D.noi].n;
  if(t1==='diet'){f.tDiet=y;f.suc=0;suLuocAdd(contentText('tg.faDiet',[D.n,nt]),'fa',w);
    for(const ma in VAI_NP)if(VAI_NP[ma].fa===id&&VAI_NP[ma].lead&&w.vai&&w.vai[ma]&&w.vai[ma].song)vaiMat(ma,'fa',w);}
  else if(t1==='suy')suLuocAdd(contentText('tg.faSuy',[D.n]),'fa',w);
  else if(t0==='suy')suLuocAdd(contentText('tg.faHoi',[D.n]),'fa',w);dbg('fa.trang',{id,t:t1});}
function faAdj(id,d,ly,w){w=w||W();const F=faInit(w),f=F[id];if(!f||f.trang==='diet'||!d)return;f.suc=clamp(f.suc+d,0,100);faSet(id,f,w,tYear(w.t));dbg('fa.adj',{id,d,ly:ly||''});}
function faYear(w,y,n){const F=faInit(w);n=n||1;
  for(const id in F){const f=F[id],D=THE_LUC[id];
    if(f.trang==='diet'){if(y-f.tDiet>=D.phuc&&wRnd(w,'lap:'+id+':'+y)<0.05*n){f.suc=40;f.trang='song';f.lap++;f.tien=Math.round(D.tien*0.6);f.quan=Math.round(D.quan*0.6);f.dan=Math.round(D.dan*0.7);
      const n0=anchorOf(w,D.noi);suLuocAdd(contentText('tg.faLap',[D.n,n0?n0.name:LOC_NEO[D.noi].n]),'fa',w);dbg('fa.lap',{id});}continue;}
    const e=(wRnd(w,'fa:'+id+':'+y)-0.5)*4;f.suc=clamp(f.suc+((D.suc-f.suc)*0.03+D.lai)*n+e,0,100);
    for(const k of ['tien','quan','dan'])f[k]=clamp(Math.round(f[k]+(D[k]-f[k])*0.05*n),0,100);faSet(id,f,w,y);}}
function faNow(id){const w=W();const F=faInit(w),f=F[id],D=THE_LUC[id];if(!f)return null;const c=f.chu&&vaiNow(f.chu);
  return {id,n:D.n,noi:D.noi,noiTen:locName(D.noi),trang:f.trang,trangT:contentText('tg.trang.'+f.trang),suc:Math.round(f.suc),chu:c&&c.song?c.ten:null,lap:f.lap};}
function faAlive(id){const w=W();const F=faInit(w);return !!F[id]&&F[id].trang!=='diet';}
// sổ cống hiến (Đ3.4) theo thế lực: đứng ở nơi neo của một thế lực còn sống, không thuộc tông nào → khoá 'fa:FAxx'
function faCong(id){return chGet('fa:'+id);}
{const _ck=chKey;chKey=function(){const k=_ck.apply(this,arguments);if(k)return k;const r=G.run;const n=r&&nodeById(r.at);
  const L=n&&n.anchor&&LOC_NEO[n.anchor];return L&&L.fa&&faAlive(L.fa)?'fa:'+L.fa:null;};}

// ---------- năm thế giới: chạy mỗi năm của w.t, độc lập với tuổi nhân vật (Đ8.4 thêm đồng hồ vào đây) ----------
// o.gop: đang tua theo thập kỷ (đồng hồ ngắn chỉ chạy năm cuối thập kỷ)
function worldYear(y,o,w){w=w||W();vaiYear(w,y,1);faYear(w,y,1);}
function worldYearsTo(w,o){w=w||W();if(!w)return;const y=tYear(w.t);if(w.yLast==null){w.yLast=y;return;}
  while(w.yLast<y){w.yLast++;worldYear(w.yLast,o,w);}}
function worldNeoInit(w){if(!w||!w.regions)return;vaiInit(w);faInit(w);if(w.yLast==null)w.yLast=tYear(w.t||0);if(!w.suLuoc)w.suLuoc=[];}
{const _sw=snapWorld;snapWorld=function(w){_sw(w);worldNeoInit(w);};}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);try{worldYearsTo(W());}catch(e){dbg('tg.loi',{e:String(e)});throw e;}return o;};}

// nối Đ7: hộp Pháp môn ghi tên người dạy (người đang giữ vai ở nơi neo; vai trống thì tự học theo vật chứng)
function tuThay(n){const ma=n&&n.anchor&&TU_THAY[n.anchor];if(!ma)return '';const v=vaiNow(ma);if(!v)return '';
  return v.song?contentText('tg.tuThay',[v.ten,v.vai]):contentText('tg.tuThayTrong',[v.thay]);}
{const _to=tuOpts;tuOpts=function(n){const L=_to.apply(this,arguments);const t=tuThay(n);if(t)for(const o of L)if(/^hoc:/.test(o.id))o.d=(o.d?o.d+' ':'')+t;return L;};}
