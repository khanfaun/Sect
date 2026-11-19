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
// Sửa-N (câu 71): mọi NPC có tên mà người chơi từng tiếp xúc gần đều vào "Người đã gặp", không cần thiện cảm cao.
// r.gapNg={tên:{ten,y,how}} cho người không giữ vai NP; người đang giữ vai NP thì ghi vào r.gapVai như cũ. how: noi, dau, cung, tk, amhoi, tang...
function gapNguoi(ten,how){const r=G.run;if(!r||!ten||typeof ten!=='string'||ten==='???'||ten.charAt(0)==='@'||!W())return false;
  for(const ma in VAI_NP){const v=vaiNow(ma);if(v&&v.song&&v.ten===ten)return gapVai(ma,how);}
  const M=r.gapNg||(r.gapNg={});if(M[ten])return false;M[ten]={ten,y:tYear(W().t),how:how||'noi'};dbg('vai.gapNg',{ten,how:how||''});return true;}
{const _fa=favAdd;favAdd=function(n,d,why){const x=_fa.apply(this,arguments);if(n&&d)gapNguoi(n,'noi');return x;};}
{const _fg=favGift;favGift=function(n){const x=_fg.apply(this,arguments);if(x===''&&n)gapNguoi(n,'le');return x;};}
{const _me=meetEnt;meetEnt=function(e){if(e&&e.name&&['khach','tuantra','thuong','thienkieu','truysat'].includes(e.type)&&G.run)gapNguoi(e.name,e.type==='truysat'?'dau':'noi');return _me.apply(this,arguments);};}
{const _fc=finishCombat;finishCombat=function(sc){if(sc&&sc.units&&G.run)for(const u of sc.units)if(u.side==='B'&&isHumanFoe(u)){const n=u.realName||u.name;if(n&&n!=='???')gapNguoi(n,'dau');}return _fc.apply(this,arguments);};}
{const _ap=addParty;addParty=function(v){const p=_ap.apply(this,arguments);if(p&&v&&v.ten)gapNguoi(v.ten,'cung');return p;};}
{const _ae=applyE;applyE=function(e,v){const res=_ae.apply(this,arguments);if(e&&e.rival&&G.run&&v&&v.rvi!=null){const rw=(W().rivals||[])[v.rvi];if(rw&&rw.ten)gapNguoi(rw.ten,'tk');}return res;};}
// Ám Hội: người nhận ra được (không bị che mặt) tính là đã gặp
{const _as=amStart;amStart=function(n){const o=_as.apply(this,arguments);const sc=G.run&&G.run.scene;if(o&&sc&&sc.type==='amhoi')for(const p of sc.ppl)if(p.nhan){if(p.k==='vai')gapVai(p.ma,'amhoi');else{const t=amThat(p);if(t&&t.ten&&t.ten!=='?')gapNguoi(t.ten,'amhoi');}}return o;};}
// người giữ vai bị ta ra tay (tuyến) → ghi nợ cho thế lực của người ấy (câu 72)
{const _vg=vaiGiet;vaiGiet=function(ma,ly){const P=VAI_NP[ma],v=vaiNow(ma),ok=v&&v.song;const res=_vg.apply(this,arguments);if(res&&ok&&P&&P.fa&&G.run){const H=G.run.faHai||(G.run.faHai={});H[P.fa]=(H[P.fa]||0)+1;}return res;};}
function soVaiView(){const r=G.run;if(!r)return [];const M=r.gapVai||{};const L=[];
  for(const ma of Object.keys(M).sort()){const o=M[ma],v=vaiNow(ma),P=VAI_NP[ma];if(!v||!P)continue;const cung=v.doi===o.doi;
    const fv=v.song?favLv(favOf(v.ten))[1]:'';
    L.push({ma,ten:v.song?v.ten:o.ten,vai:P.vai,noi:v.noiTen,song:cung?v.song:false,
      tinh:cung?(v.song?contentText('so.vSong'):contentText('so.vMat')):contentText('so.vMat'),
      qh:cung&&v.song?fv:'',
      ke:!cung?(v.song?contentText('so.vKe',[v.ten,v.qh||contentText('so.vThay')]):contentText('so.vChuaKe',[v.thay||P.thay])):(!v.song?contentText('so.vChuaKe',[v.thay||P.thay]):''),
      gap:contentText('so.vGap',[o.y])});}
  const N=r.gapNg||{};for(const k of Object.keys(N).sort()){const o=N[k];L.push({ma:'n:'+k,ten:o.ten,vai:contentText('so.how.'+(o.how||'noi')),noi:'',song:true,tinh:'',qh:favLv(favOf(o.ten))[1],ke:'',gap:contentText('so.vGap',[o.y])});}
  return L;}
// Sửa-N (câu 72): thang quan hệ với thế lực, 7 mức bằng chữ. Điểm ngầm (không hiện) gộp: lựa chọn tuyến (r.faQh), tiếng ở căn cứ, sổ cống hiến,
// thiện cảm của người thế lực ấy đã gặp, người của họ bị ta hại (r.faHai). Mức 0..6: Tử thù, Thù địch, Bất hòa, Xa lạ, Giao hảo, Thân thiết, Chí giao.
const FA_QH_NGUONG=[-40,-20,-6,6,20,40]; // dưới ngưỡng i → mức i; từ 40 trở lên → Chí giao
function faDiem(id){const r=G.run;if(!r)return 0;const f=faNow(id);const n=f&&anchorNode(f.noi);
  let s=((r.faQh||{})[id]||0)*2+(n&&typeof danhOf==='function'?danhOf(n)*0.15:0)+Math.min(15,faCong(id)/5)-((r.faHai||{})[id]||0)*10;
  let t=0;for(const ma in r.gapVai||{}){if(VAI_NP[ma]&&VAI_NP[ma].fa===id){const v=vaiNow(ma);if(v&&v.song)t+=favOf(v.ten)/10;}}
  return s+clamp(t,-10,10);}
function faQhBac(id){const d=faDiem(id);let i=0;while(i<FA_QH_NGUONG.length&&d>=FA_QH_NGUONG[i])i++;return i;}
// "Đồng minh" là trạng thái riêng (kết minh chính thức), chỉ hiện khi có. Hiện CHƯA có cách kết minh: Đ10 / sau này gọi faKetMinh(id,true).
function faMinh(id){const r=G.run;return !!(r&&r.faMinh&&r.faMinh[id]);}
function faKetMinh(id,on){const r=G.run;if(!r||!THE_LUC[id])return false;const M=r.faMinh||(r.faMinh={});if(on)M[id]=1;else delete M[id];dbg('fa.minh',{id,on:!!on});return true;}
function soFaView(){const r=G.run;if(!r||!W())return [];
  return Object.keys(THE_LUC).sort().map(id=>{const f=faNow(id);if(!f)return null;const n=anchorNode(f.noi);
    const b=faQhBac(id);const c=faCong(id);
    return {id,n:f.n,noi:f.noiTen,trang:f.trangT,diet:f.trang==='diet'?1:0,chu:f.chu||'',danh:n&&typeof danhName==='function'?danhName(n):'',qh:contentText('so.fq.'+b),bac:b,minh:faMinh(id)?contentText('so.fqMinh'):'',cong:c>0?contentText('so.faCong',[Math.floor(c)]):contentText('so.faCong0')};}).filter(Boolean);}
