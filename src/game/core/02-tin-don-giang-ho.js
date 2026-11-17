// ---------- tin đồn giang hồ (thế giới)
// Bảng RUMOR: content/narration/rumor.js

// ================= DỮ LIỆU TRÒ CHƠI =================
// Bảng EL: content/rules/el.js
// Bảng KHAC: content/rules/khac.js
// Bảng NGUHANH: content/rules/nguhanh.js

// Bảng REALM: content/rules/realm.js
// Bảng TIEU: content/rules/tieu.js
// Bảng LIFE: content/rules/life.js
// Bảng TAB: content/rules/tab.js
// Bảng TS: content/rules/ts.js         // nhịp thời gian theo vùng
// hệ số linh thạch theo vùng. Linh thạch quý: cả trăm là cả một gia tài, chừng 40 đã là nhiều.
const ECON=0.15,SC=[1,2.2,4.8,10,20].map(x=>x*ECON);
// Bảng EH: content/rules/eh.js     // khí huyết yêu ma thường
// Bảng EA: content/rules/ea.js
// Bảng ED: content/rules/ed.js

// Bảng ROOT: content/characters/root.js

// Bảng ORIGIN: content/characters/origin.js

// Bảng TRAIT: content/characters/trait.js

// ---- Công pháp / pháp thuật: [id, tên, hệ, bậc, linh lực, hiệu ứng, câu tả]
// Bảng SK_RAW: content/items/sk-raw.js
const SK = {};
// Bảng SK_PHYS: content/items/sk-phys.js
// Bảng SK_CHARGE: content/items/sk-charge.js
// Bảng SK_AOE: content/items/sk-aoe.js
// Bảng SK_DAO: content/items/sk-dao.js
SK_RAW.forEach(([id,n,el,t,c,fx,f])=>{fx=Object.assign({},fx);
  if(SK_CHARGE.includes(id)){fx.charge=true;if(fx.p)fx.p=Math.round(fx.p*1.35*100)/100;}
  if(SK_AOE.includes(id))fx.aoe=true;
  SK[id]={id,n,el,t,c,fx,f,dao:SK_DAO.includes(id)?1:0,dt:SK_PHYS.includes(id)?'vl':'phep'};});
// Bảng BASIC: content/rules/basic.js

// ---- Pháp bảo: nguyên mẫu hiệu ứng + tên gốc
// Bảng RELIC_K: content/items/relic-k.js
// Bảng RELIC_PRE: content/items/relic-pre.js
// Bảng GRADE: content/rules/grade.js
// Bảng TM: content/rules/tm.js
// Bảng RELIC_LORE: content/items/relic-lore.js
// Bảng RELIC_UNIQUE: content/items/relic-unique.js
