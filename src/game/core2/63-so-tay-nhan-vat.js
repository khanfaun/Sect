// Đ9 (câu 40): Sổ tay — người đã gặp (vai NP) và mười thế lực (FA). Chỉ đọc, không hiện số nghiệp.
// r.gapVai={NPxx:{doi (đời người giữ vai lúc gặp), ten (tên lúc gặp), y (năm gặp), noi}} — mỗi kiếp riêng. Bản lưu cũ: chưa có thì rỗng.
// r.faQh={FAxx:tổng sức ngươi đã làm tăng/giảm qua lựa chọn tuyến} — chỉ để đổi ra chữ.
function gapVai(ma,how){const r=G.run;if(!r||!VAI_NP[ma])return false;const v=vaiNow(ma);if(!v||!v.song)return false;const M=r.gapVai||(r.gapVai={});
  const o=M[ma];if(o&&o.doi===v.doi)return false;M[ma]={doi:v.doi,ten:v.ten,y:tYear(W().t),how:how||''};dbg('vai.gap',{ma,doi:v.doi,how:how||''});return true;}
// mọi {NPxx} trong một đoạn chữ người chơi vừa đọc (người còn sống) tính là đã gặp
function gapVaiChu(s,how){if(typeof s!=='string')return;for(const m of s.matchAll(/\{(NP\d\d)\}/g))gapVai(m[1],how);}
// tuyến: lời mời hiện ra → người gọi + những người được nhắc là đã gặp; lựa chọn làm đổi sức thế lực → ghi quan hệ
{const _k=tyKy;tyKy=function(S,N){const ev=_k.apply(this,arguments);if(N){const L=N.loiMoi||{};const v=L.vai&&vaiNow(L.vai);if(v&&v.song){gapVai(L.vai,'tuyen');gapVaiChu(N.mo,'tuyen');}}return ev;};}
{const _e=tyE;tyE=function(e,S){if(e&&e.fa&&G.run){const Q=G.run.faQh||(G.run.faQh={});for(const f in e.fa)Q[f]=(Q[f]||0)+e.fa[f];}return _e.apply(this,arguments);};}
// thầy ở nơi neo (TU_THAY) dạy pháp môn → đã gặp
{const _t=tuThay;tuThay=function(n){const s=_t.apply(this,arguments);const ma=n&&n.anchor&&TU_THAY[n.anchor];if(s&&ma&&G.run&&G.run.at===n.id)gapVai(ma,'thay');return s;};}
function soVaiView(){const r=G.run;if(!r)return [];const M=r.gapVai||{};const L=[];
  for(const ma of Object.keys(M).sort()){const o=M[ma],v=vaiNow(ma),P=VAI_NP[ma];if(!v||!P)continue;const cung=v.doi===o.doi;
    const fv=v.song?favLv(favOf(v.ten))[1]:'';
    L.push({ma,ten:v.song?v.ten:o.ten,vai:P.vai,noi:v.noiTen,song:cung?v.song:false,
      tinh:cung?(v.song?contentText('so.vSong'):contentText('so.vMat')):contentText('so.vMat'),
      qh:cung&&v.song?fv:'',
      ke:!cung?(v.song?contentText('so.vKe',[v.ten,v.qh||contentText('so.vThay')]):contentText('so.vChuaKe',[v.thay||P.thay])):(!v.song?contentText('so.vChuaKe',[v.thay||P.thay]):''),
      gap:contentText('so.vGap',[o.y])});}
  return L;}
function soFaView(){const r=G.run;if(!r||!W())return [];const Q=r.faQh||{};
  return Object.keys(THE_LUC).sort().map(id=>{const f=faNow(id);if(!f)return null;const n=anchorNode(f.noi);const q=Q[id]||0;
    const qh=q>=3?contentText('so.faGiup'):q<=-3?contentText('so.faHai'):contentText('so.faChua');
    const c=faCong(id);
    return {id,n:f.n,noi:f.noiTen,trang:f.trangT,diet:f.trang==='diet'?1:0,chu:f.chu||'',danh:n&&typeof danhName==='function'?danhName(n):'',qh,cong:c>0?contentText('so.faCong',[Math.floor(c)]):contentText('so.faCong0')};}).filter(Boolean);}
