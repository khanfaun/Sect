// Kiểm tra cốt truyện đã nhập và các đường đi thực qua startEvent / choose.
// Chạy: node tools/kiem-tra-cot-truyen.js
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { script } = require('./ghep');
const ctx = vm.createContext({ console, performance: { now: () => Date.now() } });
vm.runInContext(script(['core', 'core2', 'data']), ctx);
const run = code => vm.runInContext(`(() => { ${code} })()`, ctx);
run(`G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);`);
ctx.storyBaseline = run('return JSON.stringify(G);');
const data = run('return JSON.parse(JSON.stringify(SU_KIEN_DATA));');
assert.equal(data.length, 200);
assert.equal(new Set(data.map(d => d.id)).size, 200);
const chains = [...new Set(data.filter(d => d.chain).map(d => d.chain))];
assert.equal(chains.length, 20);

function fresh(reg = 4) {
  run(`G=JSON.parse(storyBaseline);G.run.region=${reg};G.run.realm=${reg};G.run.st=1e8;G.run.mp=S().maxMp;G.run.hp=S().maxHp;`);
}
function conditionText(id, part, choice, ok, legacy = false) {
  fresh();
  ctx.storyCase = { id, part, choice, ok, legacy };
  return run(`
    const x=storyCase,d=SU_KIEN_DATA.find(d=>d.id===x.id);
    const c={[x.part]:x.choice};if(x.legacy&&x.part==='2b')c['2']=x.choice;
    skChains()[d.chain]={p:x.part,c,results:typeof x.ok==='boolean'?{[x.part]:x.ok}:{},v:skNames(d.roles)};
    const v=EVMAP[x.id].v(G.run);return T(d.t,v);
  `);
}
// Các lỗi ngữ nghĩa: cùng chỉ số lựa chọn không đồng nghĩa cùng quá khứ.
assert.match(conditionText('ch_cay_dau_khong_bong_3', '2b', 0), /nhận trông cây|tiền bán tơ/);
assert.doesNotMatch(conditionText('ch_cay_dau_khong_bong_3', '2b', 0), /trở về bán lứa tơ/);
assert.match(conditionText('ch_cay_dau_khong_bong_3', '2b', 1, undefined, true), /tiền bán tơ/);
assert.match(conditionText('ch_nguoi_gac_lua_3', '2b', 0), /Dân có mặt từ sớm/);
assert.match(conditionText('ch_nguoi_gac_lua_3', '2b', 1), /đợi trả lời/);
assert.match(conditionText('ch_nguoi_cho_sau_rem_than_3', '2', 1), /hỏi người giữ lò/);
assert.match(conditionText('ch_nguoi_cho_sau_rem_than_3', '2b', 0), /hỏi người giữ lò/);
assert.match(conditionText('ch_nguoi_cho_sau_rem_than_3', '2b', 1), /viết lời từ biệt/);
assert.match(conditionText('ch_mot_chu_dung_tren_van_cau_3', '2b', 0), /tự đứng vào chỗ ván cong/);
assert.match(conditionText('ch_no_mot_mua_toc_bac_3', '2', 1), /tự tới đề nghị/);
assert.match(conditionText('ch_vet_khau_duoi_lop_da_4', '3', 0, true), /tự đi tới dốc/);
assert.match(conditionText('ch_vet_khau_duoi_lop_da_4', '3', 0, false), /tháo dần vòng chỉ/);
assert.doesNotMatch(conditionText('ch_vet_khau_duoi_lop_da_4', '3', 0, false), /tự đi tới dốc/);
assert.match(conditionText('ch_vet_khau_duoi_lop_da_4', '3', 1), /thi thể thiếu phần cốt/);
// Bản lưu cũ chưa biết kết quả không bị tự suy là đã thắng.
assert.doesNotMatch(conditionText('ch_vet_khau_duoi_lop_da_4', '3', 0), /tự đi tới dốc/);
fresh();
assert.match(run(`
  const d=SU_KIEN_DATA.find(d=>d.id==='ch_cay_dau_khong_bong_3');
  skChains()[d.chain]={p:'2b',c:{'1':1,'2':0,'2b':0},v:skNames(d.roles)};
  G.run.scene={type:'event',id:d.id};
  const v=Object.assign({},skChains()[d.chain].v,{_skP:'2b',_skC:0});
  const text=T(d.t,v);if(text.includes('Nếu '))throw Error('Cảnh cũ chưa chuyển nhánh');
  return text;
`), /tiền bán tơ/);

let routes = 0;
for (const chain of chains) {
  for (const first of [0, 1]) for (const second of [0, 1]) for (const third of [0, 1]) {
    const ending = data.find(d => d.chain === chain && d.part === '3');
    const results = ending.c[third].chk ? [true, false] : [undefined];
    for (const ok of results) for (const last of [0, 1]) {
      fresh(ending.reg);
      ctx.storyRoute = { chain, first, second, third, last, ok };
      run(`
        const x=storyRoute,find=p=>SU_KIEN_DATA.find(d=>d.chain===x.chain&&d.part===p);
        const p2=x.first===0?'2':'2b';
        const steps=[['1',x.first],[p2,x.second],['3',x.third],['4',x.last]];
        let names;
        for(const [part,j] of steps){
          const d=find(part),ev=EVMAP[d.id];
          if(part!=='1'){
            W().t+=d.wait; if(!ev.cond(G.run))throw Error('Không mở được '+d.id);
          }
          G.run.mp=S().maxMp;G.run.st=1e8;
          startEvent(d.id);
          const sc=G.run.scene;
          if(/Nếu |undefined|\{\$/.test(sc.story.join(' ')))throw Error('Lời kể chưa giải nghĩa '+d.id);
          const savedNames=JSON.stringify(skChains()[x.chain].v);
          if(names&&names!==savedNames)throw Error('Đổi tên giữa chuỗi');names=savedNames;
          const prevChance=chkChance;
          try{if(d.c[j].chk)chkChance=()=>x.ok?1:0;choose(j);}finally{chkChance=prevChance;}
          if(G.run.scene.phase!=='done')throw Error('Lựa chọn không thực hiện '+d.id);
          const state=skChains()[x.chain];
          if(state.c[part]!==j)throw Error('Không lưu lựa chọn '+d.id);
          if(d.c[j].chk&&state.results[part]!==x.ok)throw Error('Không lưu kết quả '+d.id);
          // Lịch sử và kết quả phải tồn tại sau lưu/tải, không phụ thuộc scene.lastOk.
          G=JSON.parse(JSON.stringify(G));
        }
        if(!skChains()[x.chain].end)throw Error('Chuỗi không kết thúc');
      `);
      routes++;
    }
  }
}
// Bỏ đi khép lại chuỗi tại mọi phần; chưa tới thời gian hẹn thì không mở cảnh sau.
for (const d of data.filter(d => d.chain)) {
  fresh(d.reg);
  ctx.storyScene = d;
  run(`const d=storyScene;startEvent(d.id);choose(d.c.findIndex(c=>c.leave));
       if(!skChains()[d.chain].end)throw Error('Bỏ đi chưa khép '+d.id);`);
}
for (const chain of chains) {
  fresh();
  ctx.storyChain = chain;
  run(`const d=SU_KIEN_DATA.find(d=>d.chain===storyChain&&d.part==='2');
       skChains()[storyChain]={p:'1',c:{'1':0},t:W().t};
       if(skOkPart(d,skChains()[storyChain]))throw Error('Mở cảnh trước hẹn');`);
}
// Đọc mọi cảnh và mọi lựa chọn để bắt biến tên/địa điểm không được giải nghĩa.
for (const d of data) {
  fresh(d.reg);
  ctx.storyScene = d;
  run(`const d=storyScene;startEvent(d.id);const v=G.run.scene.v;
    const text=[...G.run.scene.story,...d.c.flatMap(c=>[c.l,c.t,c.ok&&c.ok.t,c.no&&c.no.t]).filter(Boolean).map(t=>T(t,v))].join(' ');
    if(/undefined|\{\$/.test(text))throw Error('Thiếu biến '+d.id);`);
}
const byId = Object.fromEntries(data.map(d => [d.id, d]));
assert.ok(byId.gk_tro_giu_am.c[0].cost.st > 0);
assert.equal(byId.gk_tro_giu_am.c[0].e.dropPill, undefined);
assert.ok(byId.ch_hinh_nguoi_nam_ngoai_ao_1.c[0].cost.st > 0);
assert.ok(byId.ch_no_mot_mua_toc_bac_3.c[1].e.life > 0);
assert.equal(byId.ch_nua_dau_tay_4.c[1].e.karma, undefined);
assert.equal(byId.ch_mot_chu_dung_tren_van_cau_2b.c[0].e.tp, -1);
console.log('Đạt: 200 cảnh, 20 chuỗi, '+routes+' đường đi đến kết thúc, 100 cách bỏ đi, lưu/tải và các ca sai nhánh.');
