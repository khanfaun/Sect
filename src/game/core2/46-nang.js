// ĐỢT 5.4: năng lực hỗ trợ ST23 (HN C §5.6). Bảng: content/rules/nang.js. Chữ: content/text/nang.json
// r.nang={giac,giao,thuong,canh,duoc,khao,tu,nhan} — 0–100, gốc 10, không theo cảnh giới. Bản lưu cũ: thiếu thì tạo gốc.
// Phép thử sự kiện: chk:['nang.<khoá>',độ khó] (cùng thang với tp/ngo/tam). Đạt hay hỏng đều rèn năng lực đó một chút.
FEAT.nang=1;
for(const k of NANG_K)CHKN['nang.'+k]=contentText('nang.'+k);
function nangOf(r){r=r||G.run;if(!r)return null;if(!r.nang||typeof r.nang!=='object'||Array.isArray(r.nang))r.nang={};
  for(const k of NANG_K){const v=+r.nang[k];r.nang[k]=isFinite(v)?clamp(v,0,NANG_MAX):NANG_GOC;}return r.nang;}
function nangMuc(v){let m=0;for(let i=0;i<NANG_MUC.length;i++)if(v>=NANG_MUC[i])m=i;return m;}
function nangV(k,r){const N=nangOf(r);return N?Math.floor(N[k]||0):0;}
function nangAdd(k,d,why){const r=G.run;if(!r||!NANG_K.includes(k)||!d)return 0;const N=nangOf(r);const a=Math.floor(N[k]);
  N[k]=clamp(Math.round((N[k]+d)*100)/100,0,NANG_MAX);const b=Math.floor(N[k]);
  const m=nangMuc(b);if(m>nangMuc(a))note(contentText('nang.up',[contentText('nang.'+k),contentText('nang.m.'+m).toLowerCase()]),'up');
  dbg('nang.add',{k,d,v:N[k],why:why||''});return N[k]-a;}
// phép thử năng lực
{const _cc=chkChance;chkChance=function(chk){if(chk&&typeof chk[0]==='string'&&chk[0].startsWith('nang.')){const k=chk[0].slice(5);const s=S();
    return clamp(0.5+(nangV(k)-chk[1])*0.05+s.van*0.004+((s.fx.chkP||0)/100),0.08,0.95);}return _cc(chk);};}
{const _ch=choose;choose=function(i){const r=G.run,sc=r&&r.scene;let k=null;
  if(sc&&sc.type==='event'){const e=EVMAP[sc.id];const L=resolveP(e,sc.cur)||[];const c=L[i];if(c&&c.chk&&typeof c.chk[0]==='string'&&c.chk[0].startsWith('nang.')&&costOk(c.cost)){k=c.chk[0].slice(5);sc.lastOk=undefined;}}
  const res=_ch.apply(this,arguments);
  if(k&&G.run&&sc&&sc.lastOk!=null){nangAdd(k,sc.lastOk?NANG_GAIN.ok:NANG_GAIN.no,'chk');dbg('nang.chk',{k,ok:sc.lastOk});}
  return res;};}
// hiệu ứng sự kiện: nang:{khoá:số}
{const _ae=applyE;applyE=function(e,v){const has=e&&e.nang&&typeof e.nang==='object';const ch=_ae.apply(this,[has?Object.assign({},e,{nang:undefined}):e,v]);if(!has||!G.run)return ch;
  const out=Array.isArray(ch)?ch:[];for(const k in e.nang){const d=+e.nang[k];if(nangAdd(k,d,'ev')||d)out.push(chip('🎯',(d>0?'+':'')+d,contentText('nang.'+k),d>0?'up':'dn'));}return out;};}
// rèn qua việc thường ngày
{const _nd=ngDo;ngDo=function(ma,aid){const ok=_nd.apply(this,arguments);if(ok&&G.run)for(const k of (NANG_NGHE[ma]||[]))nangAdd(k,NANG_GAIN.nghe,'nghe:'+ma);return ok;};}
{const _bp=bacPay;bacPay=function(d,why){const ok=_bp.apply(this,arguments);if(ok&&d>0&&why==='shop')nangAdd('thuong',NANG_GAIN.mua,'mua');return ok;};}
{const _sl=sellItem;sellItem=function(){const r=G.run;const b0=r&&r.bac,s0=r&&r.st;const res=_sl.apply(this,arguments);if(G.run&&(G.run.bac!==b0||G.run.st!==s0))nangAdd('thuong',NANG_GAIN.mua,'ban');return res;};}
{const _tt=tinhToa;tinhToa=function(m){const ok=_tt.apply(this,arguments);if(ok&&G.run)nangAdd('tu',NANG_GAIN.toa,'toa');return ok;};}
{const _fg=favGift;favGift=function(n){const why=_fg.apply(this,arguments);if(!why&&G.run)nangAdd('giao',NANG_GAIN.tang,'tang');return why;};}
// săn bắt, hái lượm (Sửa-C.11): một lượt thật thì bộ đếm n.sb.c của nút tăng
{const _pa=placeAct;placeAct=function(a){if(a!=='sanbat')return _pa.apply(this,arguments);const r=G.run,sc=r&&r.scene;const n=sc&&sc.type==='place'?nodeById(sc.id):null;
  const c0=n&&n.sb?n.sb.c+'/'+n.sb.y:'';const res=_pa.apply(this,arguments);
  if(G.run&&n&&n.sb&&n.sb.c+'/'+n.sb.y!==c0){nangAdd('giac',NANG_GAIN.san,'san');nangAdd('duoc',NANG_GAIN.san*0.7,'hai');}return res;};}
// kiếp mới: gốc; bản lưu cũ: bổ sung
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);if(G.run){G.run.nang=null;nangOf(G.run);}return res;};}
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r)nangOf(r);return r;};}
// bảng nhân vật: danh sách cho Đạo đồ (hiện mức bằng chữ, v chỉ để kiểm)
function nangView(){const r=G.run;if(!r)return [];const N=nangOf(r);return NANG_K.map(k=>({k,n:contentText('nang.'+k),v:Math.floor(N[k]),muc:contentText('nang.m.'+nangMuc(Math.floor(N[k]))),t:contentText('nang.tip.'+k)}));}
