// Bộ ảnh giao diện mới (lấy từ bản mẫu Ngọc Hành Trình): src/assets/ui/*.webp, nhúng thẳng vào trang khi build.
// Gắn ảnh vào bảng ASSET của game (vật phẩm, đan dược, kẻ địch, phương tiện, địa điểm, chân dung) và ảnh chiêu thức.
const M = import.meta.glob('../../assets/ui/*.webp', { eager: true, query: '?url', import: 'default' });
export const IMG = {};
for (const [p, u] of Object.entries(M)) IMG[p.split('/').pop().replace(/\.webp$/, '')] = u;
// Ảnh nhân vật (nv-<tuổi>-…, vài trăm ảnh) KHÔNG nhúng vào trang: để thành tệp riêng, chỉ tải ảnh đang dùng.
// Chạy thử (npm run dev): src/assets/nv/; bản build: thư mục anh-nv/ cạnh phu-sinh.html (tools/build.js chép sang).
const NV = /^nv-(teen|young|middle|elder)-/;
export const I = k => IMG[k] || (NV.test(k) ? (import.meta.env.DEV ? '/assets/nv/' : 'anh-nv/') + k + '.webp' : '');

// loại pháp bảo → ảnh
const ITEM = {
  kiem: 'it-kiem', dao: 'it-kiem', giap: 'it-ao-lam', bao: 'it-ao-tim', boi: 'it-ngoc-boi', ngoa: 'it-giay', nhan: 'it-nhan', hoan: 'it-dai',
  thap: 'it-thap', lenh: 'it-lenh-bai', phu: 'it-bua', book: 'it-bi-kip', dinh: 'it-lo-dan', phien: 'it-co', huyet: 'it-huyet-ngoc', tui: 'it-ruong',
  gian: 'it-truc-thu', chau: 'it-dan-trang', an: 'it-lenh-ngoc', phap: 'it-long-vu', hotam: 'it-luc-bao', but: 'it-long-vu',
  non: 'it-non', dai: 'it-dai-lung', gang: 'it-gang', hap: 'it-hap', hoa: 'it-hoa', tran: 'it-tran',
};
const MAT = { thao: 'it-thao-lam', khoang: 'it-quang-lam', dan: 'cau-ma' };
// đan dược: chọn viên theo màu
function pillOf(hex) {
  const n = parseInt(String(hex || '#e0b04a').slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (mx - mn < 40) return 'it-dan-trang';
  let h = 0;
  if (mx === r) h = ((g - b) / (mx - mn)) * 60; else if (mx === g) h = (2 + (b - r) / (mx - mn)) * 60; else h = (4 + (r - g) / (mx - mn)) * 60;
  if (h < 0) h += 360;
  if (h < 20 || h >= 330) return 'it-dan-do';
  if (h < 65) return 'it-dan-vang';
  if (h < 170) return 'it-dan-luc';
  if (h < 255) return 'it-dan-lam';
  return 'it-dan-tim';
}
const PILLC = { hoixuan: '#4fbf6a', tukhi: '#4a8fe0', baohuyet: '#d9402e', giaidoc: '#e8e8e8', dinhthan: '#9a6ad6', tinhnguyen: '#f0c840', phacanh: '#f2d36b', homach: '#6fa0c8', duongnguyen: '#7fc49b', taytuy: '#ece4d0', khaitri: '#4fc0c0', trucco: '#e08a2a', ngungkim: '#e8c040', phaanh: '#c0507a', hoathan: '#4a5ac8' };
// địa điểm theo loại nơi
const PLACE = {
  nui: 'dd-thanh-son', rung: 'dd-ha-lam', duoc: 'dd-ha-lam', song: 'dd-thac', linhdia: 'dd-thac', bien: 'dd-nguyet-ho', dam: 'dd-nguyet-ho',
  thien: 'dd-tuyet', khoang: 'dd-hoa-diem', sao: 'dd-hoa-diem', dong: 'dd-u-coc', ma: 'dd-u-coc', phe: 'nen-tran', ai: 'nen-nui-xanh',
  hoang: 'nen-thung-lung', tong: 'nen-tu-luyen', tran: 'nen-thung-lung', thanh: 'nen-thung-lung', cho: 'nen-thung-lung', ancu: 'nen-thung-lung',
};
// chiêu thức theo hệ
const SK_EL = { kim: 'sk-sword', moc: 'sk-heal', thuy: 'sk-qi', hoa: 'sk-fire', tho: 'sk-meteor', loi: 'sk-thunder', bang: 'sk-ice', phong: 'sk-wind', am: 'sk-illusion', phat: 'sk-palm', vo: 'sk-palm', doc: 'sk-poison', huyet: 'sk-blood' };
const CP = ['it-bi-kip', 'it-truc-thu', 'it-ban-do'];
function hsh(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

// nguyên liệu: chọn ảnh theo tiền tố mã (thao_linh_hoa_…, khoang_ho_phach_…, vl_da_…); không khớp thì dùng ảnh chung của loại
const MAT_TT = {
  thao: [['thao_huyetsam', 'it-nhan-sam'], ['thao_linh_hoa', 'mat-hoa'], ['thao_linh_qua', 'mat-qua'], ['thao_linh_diep', 'mat-diep'], ['thao_linh_chung', 'mat-chung'], ['thao_chi_', 'it-linh-chi'], ['thao_duoc_', 'it-nhan-sam'], ['thao_co_', 'it-thao-lam']],
  khoang: [['khoang_hanthiet', 'mat-thiet'], ['khoang_tinh_', 'it-quang-lam'], ['khoang_linh_sa', 'mat-sa'], ['khoang_linh_nham', 'mat-nham'], ['khoang_linh_kim', 'mat-kim'], ['khoang_ho_phach', 'mat-phach'], ['khoang_ngoc_', 'mat-ngoc']],
  dan: [['vl_langnha', 'mat-nanh'], ['vl_da_', 'mat-da'], ['vl_xuong_', 'mat-xuong'], ['vl_vay_', 'mat-vay'], ['vl_gan_', 'mat-gan'], ['vl_sung_', 'mat-sung'], ['vl_mau_', 'mat-mau'], ['vl_yeu_', 'mat-yeu'], ['vl_trung_', 'mat-trung'], ['vl_long_', 'mat-long'], ['vl_nanh_', 'mat-nanh']],
};
function matImg(m) { const L = MAT_TT[m.cat]; if (!L) return ''; for (const [p, k] of L) if (String(m.id).startsWith(p) && IMG[k]) return IMG[k]; return ''; }

// nền trận đánh theo loại nơi đang đứng (nen-tran-<nhóm>); không có thì dùng nen-tran cũ
const TRAN_NHOM = { rung: 'rung', ancu: 'rung', duoc: 'rung', nui: 'nui', song: 'nuoc', bien: 'nuoc', dam: 'dam', hoang: 'hoang', dong: 'hang', khoang: 'hang', sao: 'hang', yeusao: 'hang', phe: 'phe', ditich: 'phe', como: 'phe',
  tran: 'pho', thanh: 'pho', cho: 'pho', tutran: 'pho', tuthanh: 'pho', tong: 'tong', ma: 'ma', thien: 'tien', bicanh: 'tien', dongthien: 'tien', linhdia: 'tien' };
export const nenTran = type => IMG['nen-tran-' + TRAN_NHOM[type]] || '';

export function ganAnh() {
  const PS = window.PS, A = PS && PS.ASSET;
  if (!A || A._ui) return;
  A._ui = 1;
  for (const k in ITEM) if (IMG[ITEM[k]]) A.item[k] = IMG[ITEM[k]];
  for (const k in MAT) A.item['mat:' + k] = IMG[MAT[k]];
  for (const k of Object.keys(A.item)) if (k.startsWith('pill:')) A.item[k] = IMG[pillOf(PILLC[k.slice(5)])];
  A.foe._boss = IMG['mo-huyet-ma']; A.foe._nhan = IMG['mo-kim-giap']; A.foe._quy = IMG['mo-tam-ma'];
  // kẻ địch đã gắn sẵn theo loại: người → tu sĩ áo giáp, quỷ → tâm ma
  const EN = PS.EN;
  if (EN) for (const k of Object.keys(EN)) { const f = EN[k].f; if (f === 'nhan') A.foe[k] = IMG['mo-kim-giap']; else if (f === 'quy') A.foe[k] = IMG['mo-tam-ma']; else if (f === 'boss') A.foe[k] = IMG['mo-huyet-ma']; }
  // phần F: ảnh riêng cho từng loài thú (foe-<khoá>) và từng nguyên liệu (mat-<loại>)
  if (EN) for (const k of Object.keys(EN)) { const u = IMG['foe-' + k]; if (u) A.foe[k] = u; }
  // loài chưa có ảnh riêng: mượn ảnh gần nghĩa để khỏi rơi về hình SVG
  { const M = { linhthu_dulang: 'foe-lang', tinhthu: 'foe-holy', trung: 'foe-thu_buom_bui_tram', thienma: 'mo-huyet-ma', kiemlinh: 'mo-kim-giap', khoiloi: 'mo-kim-giap' }; for (const k in M) if (EN && EN[k] && !A.foe[k] && IMG[M[k]]) A.foe[k] = IMG[M[k]]; A.foe._thu = A.foe._thu || IMG['foe-lang']; A.foe._vat = A.foe._vat || IMG['mo-kim-giap']; }
  const CATG = PS.CAT && PS.CAT.byId;
  if (CATG) for (const id of Object.keys(CATG)) { const m = CATG[id], u = m && matImg(m); if (u) A.item['mat:' + id] = u; }
  if (A.veh) { A.veh.hac = IMG['mt-crane']; A.veh.kiem = IMG['mt-sword']; A.veh.chu = IMG['mt-phoenix']; A.veh.rua = IMG['mt-boat'] || IMG['mt-turtle']; if (IMG['mt-horse']) A.veh.ngua = IMG['mt-horse']; if (IMG['mt-deer']) A.veh.loc = IMG['mt-deer']; }
  // ảnh công trình trên bản đồ (ui/05-gfx.js: mapKey/mapIc)
  A.map = {}; for (const k in IMG) if (k.startsWith('map-') || k.startsWith('o-')) A.map[k] = IMG[k];
  for (const k in PLACE) A.place[k] = IMG[PLACE[k]];
  // nền riêng cho từng loại nơi (nen-<loại>), đè lên nền chung cũ
  for (const k of ['thanh', 'tutran', 'tuthanh', 'tong', 'cho', 'ancu', 'song', 'bien', 'dam', 'rung', 'nui', 'hoang', 'duoc', 'khoang', 'linhdia', 'dong', 'dongthien', 'bicanh', 'phe', 'ditich', 'como', 'ma', 'sao', 'yeusao', 'thien']) if (IMG['nen-' + k]) A.place[k] = IMG['nen-' + k];
  if (IMG['nen-xom']) A.place.tran = IMG['nen-xom']; // nền làng (nen-tran là nền trận đánh cũ nên đặt tên khác)
  A.heroG = { nam: IMG['cd-nam'], nu: IMG['cd-nu'], lao: IMG['cd-lao'], laonu: IMG['cd-lao-nu'] || IMG['cd-nu'] };
  // chân dung nhân vật chính: nam / nữ, từ 70 tuổi trở lên dùng chân dung lão giả (nam: cd-lao, nữ: cd-lao-nu)
  Object.defineProperty(A.hero, 'me', { get() { const r = PS.G && PS.G.run; const nu = r && r.g === 'nu'; return r && r.age >= 70 ? (nu ? A.heroG.laonu : A.heroG.lao) : A.heroG[nu ? 'nu' : 'nam']; }, configurable: true, enumerable: true });
  // chân dung người khác (NPC): chọn theo giới và tên, cùng người luôn cùng mặt
  if (typeof window.npcAv === 'function') {
    const NAM = ['cd-dt3', 'cd-dt4', 'cd-dt0'], NU = ['cd-dt1', 'cd-dt2', 'cd-dt6'];
    const old = window.npcAv;
    window.npcAv = function (name, g) {
      if (g !== 'nam' && g !== 'nu') return old(name, g);
      const L = g === 'nu' ? NU : NAM, u = IMG[L[hsh(name) % L.length]];
      return u ? `<img class="asset as-hero" src="${u}" alt="">` : old(name, g);
    };
  }
  // ảnh công pháp / chiêu thức
  if (typeof window.artUri === 'function') {
    const old = window.artUri;
    window.artUri = function (name, el, kind) {
      if (kind === 'cp' || kind === 'tp') return IMG[CP[hsh(name) % CP.length]] || old(name, el, kind);
      if (kind === 'def') return IMG['sk-shield'];
      if (kind === 'move') return IMG['sk-wind'];
      return IMG[SK_EL[el] || 'sk-qi'] || old(name, el, kind);
    };
  }
}
