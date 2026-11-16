// Bộ kiểm tra lõi luật chơi, chạy không cần trình duyệt (nạp core + core2 + data như bot.js).
// Dùng:  node tools/test.js            chạy tất cả
//        node tools/test.js crush ngo  chỉ chạy vài bài
//        node tools/test.js --log      in thêm nhật ký gỡ lỗi (NK) của từng bài
//        node tools/test.js --list     liệt kê tên các bài
// Thêm bài mới: viết một hàm trong TESTS ở dưới, dùng ok(điều_kiện, 'mô tả') và run('mã chạy trong game').
const vm = require('vm'), cp = require('child_process');
const core = require('./ghep').script(['core', 'core2', 'data']);
const ctx = vm.createContext({ console, Math, JSON, Date, performance: { now: () => Date.now() } });
vm.runInContext(core, ctx, { filename: 'core.js' });
const run = code => vm.runInContext(code, ctx);
const args = process.argv.slice(2), SHOWLOG = args.includes('--log');
const names = args.filter(a => !a.startsWith('--'));

// kiếp mới, thế giới mới, bật nhật ký
function fresh(patch) {
  run('G={meta:newMeta(),run:null,birth:null,over:null,screen:"title"};genBirth();newRun(G.birth.cards[0]);NK.on=true;NK.clear();G.run.scene=null;');
  if (patch) run(patch);
}
let fails = 0, cur = '';
const ok = (c, msg) => { if (!c) { fails++; console.log('   ✗ ' + msg); } else console.log('   ✓ ' + msg); };

const TESTS = {
  // nghiền ép: bên bị nghiền ép không né, không đỡ được dù bấm né hoàn hảo
  crush() {
    fresh('startCombat({},{kind:"node"});');
    const r = JSON.parse(run(`(()=>{const sc=G.run.scene,me=mainUnit(sc),foe=sc.units.find(u=>u.side==='B');
      const sk=BASIC;let hitsCrush=0,dodgeCtl=0;const N=30;
      for(let i=0;i<N;i++){ // nghiền ép: foe mạnh gấp 100 lần
        me._lc=1;foe._lc=100;me.hp=me.max=1e6;me.st.stance=1;me.tl=100;const h0=me.hp;resolveSkill(sc,foe,sk,1,[me],1,[0]);if(me.hp<h0)hitsCrush++;}
      for(let i=0;i<N;i++){ // đối chứng: ngang sức, né hoàn hảo
        me._lc=foe._lc=10;me.hp=me.max=1e6;me.st.stance=0;me.tl=100;const h0=me.hp;resolveSkill(sc,foe,sk,1,[me],1,[0]);if(me.hp===h0)dodgeCtl++;}
      return JSON.stringify({N,hitsCrush,dodgeCtl});})()`));
    ok(r.hitsCrush === r.N, `nghiền ép: ${r.hitsCrush}/${r.N} đòn đều trúng (né hoàn hảo cũng vô dụng)`);
    ok(r.dodgeCtl === r.N, `đối chứng ngang sức: né hoàn hảo né được ${r.dodgeCtl}/${r.N}`);
    ok(run('NK.count("combat.crushed")') > 0, 'nhật ký ghi combat.crushed');
  },
  // cảm ngộ: đủ CN_MAX lần thất bại thì chắc chắn qua
  camngo() {
    fresh();
    const a = +run('G.run.btFail=4;btRate([])'), b = +run('G.run.btFail=CN_MAX;btRate([])');
    ok(a < 1, `4 lần thất bại: tỉ lệ ${a.toFixed(2)} (chưa chắc chắn)`);
    ok(b === 1, `${run('CN_MAX')} lần thất bại: tỉ lệ ${b} (chắc chắn)`);
    ok(run('btParts([]).some(x=>/Cảm ngộ/.test(x.t))'), 'bảng tỉ lệ có dòng Cảm ngộ khi đầy');
  },
  // chiêu dùng một lần: dùng xong mất, mặc định bị khoá khỏi tự đánh, khoá bật tắt được
  skillonce() {
    fresh(`globalThis.__aa=activeArts;globalThis.__as=artSk;globalThis.__sl=skLvOf;activeArts=()=>[{zz:1}];artSk=a=>a.zz?['zz_once','zz_norm']:[];skLvOf=()=>1;
      SK.zz_once={id:'zz_once',n:'Kích Sát Thử',el:'vo',t:2,c:0,fx:{p:2},f:'',rec:1,once:1};SK.zz_norm={id:'zz_norm',n:'Chiêu Thường',el:'vo',t:1,c:0,fx:{p:1},f:'',rec:1};
      G.run.skills.push({id:'zz_once',lv:1},{id:'zz_norm',lv:1});if(G.run.kn){G.run.kn.atk.push('zz_once','zz_norm');}G.run.atkSlots=(G.run.atkSlots||[]).concat(['zz_once','zz_norm']);G.run.pham=0;syncSkills();`); // pham=0: không còn là phàm nhân nên dùng được chiêu
    ok(run('skLocked("zz_once")') === true, 'chiêu một lần mặc định khoá');
    ok(run('skLocked("zz_norm")') === false, 'chiêu thường mặc định không khoá');
    run('skLockToggle("zz_once")'); ok(run('skLocked("zz_once")') === false, 'bấm ổ khoá thì mở');
    run('startCombat({},{kind:"node"});const sc=G.run.scene;for(const u of sc.units){if(u.side==="B"){u.atk=0;u.matk=0;}else{u.hp=u.max=1e6;}}for(let i=0;i<4000&&!readyPlayer(sc);i++){if(sc.dodge)dodgeResolve(null);else if(sc.qte)qteResolve(null);else if(sc.done)break;else combatStep(0.05);}'); // kẻ địch không đánh được: bài kiểm tra không phụ thuộc may rủi
    ok(run('!!readyPlayer(G.run.scene)'), 'tới lượt người chơi');
    ok(run('playerAct("zz_once")') === true, 'dùng được chiêu một lần');
    ok(run('!G.run.skills.find(k=>k.id==="zz_once")') === true, 'dùng xong chiêu biến mất khỏi danh sách');
    ok(run('!!G.run.skills.find(k=>k.id==="zz_norm")') === true, 'chiêu thường vẫn còn');
    ok(run('NK.count("skill.once")') === 1, 'nhật ký ghi skill.once.consumed');
    // công pháp vẫn chứa chiêu đó: đồng bộ lại không được trả chiêu về
    run('syncSkills()');
    ok(run('!G.run.skills.find(k=>k.id==="zz_once")') === true, 'đồng bộ chiêu từ công pháp không trả lại chiêu đã dùng');
    ok(run('!!G.run.skills.find(k=>k.id==="zz_norm")') === true, 'chiêu thường vẫn còn sau đồng bộ');
    run('activeArts=__aa;artSk=__as;skLvOf=__sl;'); // trả lại hàm gốc cho các bài sau
  },
  // ngộ tính → lịch luyện, khí vận → kỳ ngộ
  ngovan() {
    fresh();
    const lo = +run('G.run.base.ngo=-100;ngoLlMul()'), hi = +run('G.run.base.ngo=30;ngoLlMul()');
    ok(lo === 1, `ngộ tính thấp: hệ số ${lo}`); ok(hi > 1 && hi <= 1.5, `ngộ tính cao: hệ số ${hi.toFixed(2)} (tối đa 1.5)`);
    const l0 = +run('G.run.ll=0;G.run.base.ngo=30;llAdd(10,"thử");G.run.ll');
    ok(l0 > 0, `llAdd có tác dụng (ll=${l0})`);
    const k1 = +run('G.run.base.van=1;kyMul()'), k2 = +run('G.run.base.van=20;kyMul()');
    ok(k1 >= 0.6 && k1 < 1, `khí vận thấp: ×${k1.toFixed(2)}`); ok(k2 > 1 && k2 <= 3, `khí vận cao: ×${k2.toFixed(2)}`);
    ok(run('G.run.base.van=1;kyBigOpen()') === false, 'khí vận thấp: kỳ ngộ lớn đóng');
    ok(run('G.run.base.van=KY_BIG_VAN+5;kyBigOpen()') === true, 'khí vận cao: kỳ ngộ lớn mở');
  },
  // bản đồ mới: 5 đại khu vực, địa hình theo ảnh, đi bộ chỉ trên đất, tầm nhìn theo địa hình, độ khó theo cảnh giới
  bando() {
    fresh();
    ok(+run('W().regions.length') === 5, 'có 5 đại khu vực');
    ok(run('W().regions.every(R0=>{const n=R0.nodes.filter(x=>x.type==="tong").length;return n>=6&&n<=8;})'), 'mỗi khu 6–8 tông môn');
    ok(run('new Set(W().sects.map(s=>s.sz)).size>=2'), 'tông môn có lớn có nhỏ');
    ok(run('allNodes().every(n=>walkable(geo().ter[n.hex]))'), 'mọi địa điểm nằm trên đất liền');
    ok(run('allNodes().every(n=>n.type!=="ai")'), 'không còn quan ải');
    ok(run('KHU.map(k=>k.n).join(",")') === 'Trung Châu,Đông Hoang,Nam Lĩnh,Tây Nhạc,Bắc Vân', 'tên năm khu');
    // đường đi bộ không lội nước, không qua mây
    const p = JSON.parse(run(`(()=>{const a=regionOf(3).nodes[0],b=regionOf(1).nodes[0];const hp=hexPath(a.hex,b.hex,false);return JSON.stringify({n:hp.cells.length,bad:hp.cells.filter(c=>!walkable(geo().ter[c])).length,end:hp.cells[hp.cells.length-1]===b.hex});})()`));
    ok(p.bad === 0 && p.end, `đi bộ từ Tây Nhạc sang Đông Hoang: ${p.n} ô, không ô nào là nước/mây`);
    // ngự kiếm (Kết Đan) bay được qua sông hồ, nhanh hơn
    const f = JSON.parse(run(`(()=>{const a=regionOf(3).nodes[0],b=regionOf(1).nodes[0];return JSON.stringify({w:hexPath(a.hex,b.hex,false).len,f:hexPath(a.hex,b.hex,true).len});})()`));
    ok(f.f < f.w, `ngự kiếm ít công sức hơn đi bộ (${Math.round(f.f)} < ${Math.round(f.w)})`);
    // lên dốc tốn hơn xuống dốc
    ok(run('(()=>{for(let i=0;i<HN;i++){if(geo().ter[i]!==1)continue;for(const j of hexNb(i))if(geo().ter[j]===4)return stepCost(i,j,false)>stepCost(j,i,false);}return false;})()'), 'lên núi tốn hơn xuống núi');
    // tầm nhìn: núi chắn, mặt nước nhìn xa
    const v = JSON.parse(run(`(()=>{const g=geo();let plain=-1,lake=-1;for(let i=0;i<HN;i++){if(g.ter[i]!==1)continue;const nb=hexNb(i);if(plain<0&&nb.every(j=>g.ter[j]===1))plain=i;if(lake<0&&nb.some(j=>g.ter[j]===6))lake=i;}return JSON.stringify({p:visCalc(plain,200).length,l:visCalc(lake,200).length});})()`));
    ok(v.p > 20 && v.l > 20, `tầm nhìn tính theo ô (đồng bằng ${v.p}, ven hồ ${v.l})`);
    const blk = JSON.parse(run(`(()=>{const g=geo();let p=-1;for(let i=3000;i<HN;i++){if(g.ter[i]===1&&hexNb(i).every(j=>g.ter[j]===1)){p=i;break;}}
      const before=visCalc(p,300).length;const ring=new Set();for(const a of hexNb(p))for(const b of hexNb(a))if(b!==p&&!hexNb(p).includes(b))ring.add(b);
      const old=[...ring].map(b=>[b,g.ter[b]]);for(const b of ring)g.ter[b]=4;const after=visCalc(p,300).length;for(const [b,t] of old)g.ter[b]=t;return JSON.stringify({before,after});})()`));
    ok(blk.after < blk.before / 2, `vòng núi quanh chỗ đứng chắn tầm nhìn (${blk.before} ô → ${blk.after} ô)`);
    // thấy rồi thì ghi vào bản lưu
    run('sense()'); ok(run('typeof G.run.vis==="string"&&G.run.vis.length>100'), 'ô đã thấy lưu vào r.vis');
    // độ khó theo cảnh giới
    run('G.run.realm=2;advanceTime(1)'); ok(+run('G.run.region') === 2, 'bậc độ khó = cảnh giới (Kết Đan → 2)');
    ok(+run('G.run.khu') === +run('khuOfId(G.run.at)'), 'r.khu là khu đang đứng');
    // sào huyệt: hạ một nơi chỉ nơi đó trống
    run('G.run.bossAt={};G.run.bossAt[regionOf(0).lair]=1;');
    ok(run('placeActs(nodeById(regionOf(0).lair)).find(a=>a.a==="boss").dis===true&&placeActs(nodeById(regionOf(1).lair)).find(a=>a.a==="boss").dis===false'), 'sào huyệt tính riêng từng nơi');
    // bản lưu cũ: dựng lại thế giới theo bản đồ mới
    run('globalThis.__d={meta:JSON.parse(JSON.stringify(G.meta)),run:JSON.parse(JSON.stringify(G.run))};__d.meta.world.mapV=1;__d.run.at=123;migrateX(__d);');
    ok(run('__d.meta.world.mapV===MAP_V&&__d.meta.world.regions[khuOfId(__d.run.at)].nodes[__d.run.at%100].type==="tran"'), 'bản lưu cũ: dựng lại bản đồ, đặt về một thôn trấn');
  },
  // thương thế 3 bậc: nhẹ thua vẫn sống, nguy kịch thua là chết
  thuongthe() {
    const lose = k => { fresh(`(()=>{addWound('${k}');startCombat({},{kind:"node"});const sc=G.run.scene;mainUnit(sc).hp=0;checkEnd(sc);if(G.run&&G.run.scene&&G.run.scene.over)combatContinue();})();`); return run('G.run?"song":"chet"'); };
    ok(lose('ngoai') === 'song', 'thương nhẹ thua vẫn sống');
    ok(lose('nguy') === 'chet', 'nguy kịch thua là chết');
    let d = 0; for (let i = 0; i < 30; i++) if (lose('gay') === 'chet') d++;
    ok(d > 3 && d < 25, `thương nặng thua: chết ${d}/30 lần (khoảng 40%)`);
    fresh("addWound('gay');"); ok(run('woundLv()') === 2, 'gãy xương là thương nặng');
  },
  // hồi phục: theo tháng, cộng dồn, đầy thì dừng, bế quan nhiều năm không treo
  hoiphuc() {
    fresh('G.run.hp=1;G.run.rgStreak=0;G.run.rgLost=0;G.run._hpLast=1;');
    const h0 = +run('G.run.hp'); run('advanceTime(HM)'); const h1 = +run('G.run.hp');
    ok(h1 > h0, `một tháng hồi được ${h1 - h0} khí huyết`);
    run('advanceTime(3*HM)'); ok(+run('G.run.rgStreak') >= 3, 'cộng dồn tăng theo tháng: ' + run('G.run.rgStreak'));
    run('addWound("ngoai")'); ok(+run('G.run.rgStreak') === 0, 'bị thương thì cộng dồn về 0');
    run('cureWound(["ngoai"]);G.run.hp=S().maxHp;G.run._hpLast=G.run.hp;');
    const t0 = Date.now(); run('advanceTime(40*HY)'); ok(Date.now() - t0 < 5000 && +run('G.run?G.run.hp:0') <= +run('G.run?S().maxHp:1'), 'trôi 40 năm: không treo, không vượt tối đa');
    fresh(); ok(run('rgTurnRate()') === 0.5, 'phàm nhân trong trận 0,5%/lượt');
  },
  // tĩnh toạ: không tăng tu vi, hồi nhanh hơn để yên
  tinhtoa() {
    fresh('G.run.hp=1;G.run._hpLast=1;'); const tv = +run('G.run.tv'); const a0 = +run('G.run.age');
    ok(run('tinhToa(6)') === true, 'tĩnh toạ 6 tháng'); ok(+run('G.run.tv') - tv < 5, 'tu vi gần như không đổi (chỉ thổ nạp tự nhiên): +' + (+run('G.run.tv') - tv).toFixed(1));
    ok(+run('G.run.age') - a0 >= 0.49, 'tuổi tăng nửa năm'); ok(+run('G.run.hp') > 1 + 6, 'khí huyết hồi: ' + run('G.run.hp'));
    ok(run('ttPreview(ttLeftM()+5).over') === true, 'vượt thọ nguyên thì có cảnh báo');
  },
  // đối thủ dưới 30% khí huyết thì dùng chiêu mạnh nhất, một lần
  doithu() {
    fresh('startCombat({},{kind:"node"});');
    const r = JSON.parse(run(`(()=>{const sc=G.run.scene,f=sc.units.find(u=>u.side==='B');f.pat=['atk','multi','heavy'];f.hp=Math.floor(f.max*0.2);nextIntent(f);const a=f.intent;nextIntent(f);return JSON.stringify({a,once:f._desp,best:foeBest(f)});})()`));
    ok(r.a === r.best, 'máu thấp thì chọn chiêu mạnh nhất (' + r.a + ')'); ok(r.once === 1, 'chỉ liều mạng một lần');
  },
  // tâm ma: đạo tâm thấp thì đến nhiều, chống được thì đạo tâm tăng
  tamma() {
    fresh('G.run.pham=0;');
    const lo = +run('G.run.base.tam=0;tmChance()'), hi = +run('G.run.base.tam=30;G.run.tamma=0;tmChance()');
    ok(lo > hi, `đạo tâm thấp ${lo.toFixed(3)} > đạo tâm cao ${hi.toFixed(3)}`);
    run('G.run.base.tam=40;G.run.tamma=20;kyStart(KYNGO.find(x=>x.id==="tm_du"));kyPick(0);');
    ok(+run('G.run.base.tam') === 41 && +run('G.run.tamma') === 14, 'chống được: đạo tâm +1, tâm ma −6');
    run('G.run.scene=null;const k=G.run.karma||0;globalThis.__k=k;kyStart(KYNGO.find(x=>x.id==="tm_du"));kyPick(1);');
    ok(+run('G.run.karma') < +run('__k'), 'nghe theo: nhân quả xấu đi');
    ok(run('KYNGO.filter(x=>!x.paid&&!x.joke&&!x.sp).every(x=>!x.id.startsWith("tm_"))'), 'không lẫn vào kỳ ngộ ngẫu nhiên');
  },
  // rớt cảnh giới: thọ giảm, thọ cạn thì chọn chết hoặc sống tạm mất khí huyết tối đa
  rotcanh() {
    fresh('G.run.pham=0;G.run.realm=2;G.run.birthAge=200;G.run.age=200;');
    ok(+run('S().life') > 200, 'Kết Đan sống được tới ' + run('S().life'));
    run('realmDrop("thử")'); ok(+run('G.run.realm') === 1 && +run('S().life') <= 200, 'rớt xuống Trúc Cơ, thọ còn ' + run('S().life'));
    ok(run('G.run.scene&&G.run.scene.ev') === 'tho_can', 'hiện lựa chọn thọ cạn');
    run('kyPick(1);G.run.scene=null;'); ok(!!run('!!G.run.borrow'), 'chọn sống tạm');
    const m0 = +run('S().maxHp'); run('advanceTime(3*HM)'); ok(run('!!G.run') && +run('S().maxHp') < m0, 'sau 3 tháng khí huyết tối đa giảm: ' + m0 + ' → ' + run('G.run?S().maxHp:0'));
    run('advanceTime(40*HM)'); ok(run('!G.run'), 'cạn khí huyết thì chết');
    fresh('G.run.pham=0;G.run.realm=0;'); run('realmDrop("thử")'); ok(+run('G.run.pham') === 1, 'Luyện Khí rớt về phàm nhân');
  },
  // che giấu tu vi: chỉ đổi thứ người khác thấy; kẻ thần thức cao nhìn thấu
  chegiau() {
    fresh('G.run.pham=0;G.run.realm=2;');
    run('hideCycle()'); ok(run('shownRealm()') === 1 && run('G.run.realm') === 2, 'che xuống Trúc Cơ, cảnh giới thật vẫn Kết Đan');
    const r = JSON.parse(run(`(()=>{startCombat({},{kind:"node"});const sc=G.run.scene;for(const u of sc.units)if(u.side==='B'){u.f='nhan';u.than=0;}const me=mainUnit(sc);const p0=me.pos||0;combatStep(0.01);return JSON.stringify({d:(me.pos||0)-p0,sub:me.sub});})()`));
    ok(r.d >= 50, 'kẻ địch coi thường, ra tay trước (+' + Math.round(r.d) + ')'); ok(/ẩn/.test(r.sub), 'thẻ trong trận hiện ' + r.sub);
    fresh('G.run.pham=0;G.run.realm=2;hideCycle();');
    const s = JSON.parse(run(`(()=>{startCombat({},{kind:"node"});const sc=G.run.scene;for(const u of sc.units)if(u.side==='B'){u.f='nhan';u.than=9999;}const me=mainUnit(sc);const p0=me.pos||0;combatStep(0.01);return JSON.stringify({d:(me.pos||0)-p0});})()`));
    ok(s.d < 50, 'kẻ thần thức cao nhìn thấu: không được ra tay trước');
    run('hideCycle();hideCycle();hideCycle();'); ok(run('G.run.hide') === null, 'bấm tiếp thì thôi che giấu');
  },
  // thần thức: tầm nhìn theo chỉ số, nút phóng thần thức, giao tranh
  thanthuc() {
    fresh('G.run.pham=0;G.run.mp=S().maxMp;');
    const a = +run('G.run.base.ngo=0;senseR()'), b = +run('G.run.base.ngo=200;senseR()');
    ok(b > a, `thần thức cao nhìn xa hơn: ${a} → ${b}`);
    const c0 = +run('senseR()'); ok(run('tkUse()') === true, 'phóng thần thức'); ok(+run('senseR()') > c0, 'tầm nhìn tăng khi phóng: ' + run('senseR()'));
    ok(run('tkUse()') === false, 'đang chờ thì không dùng lại được');
    run('advanceTime(3*HD)'); ok(+run('senseR()') === c0 || run('!tkActive()'), 'hết hiệu lực sau 2 ngày');
    run('for(let i=0;i<20;i++)gtSpawn();'); const e = run('(W().ents.find(e=>e.type==="giaotranh")||{}).id');
    ok(!!e, 'có giao tranh gần đó');
    if (e) { run(`meetEnt(W().ents.find(e=>e.type==="giaotranh"))`); ok(run('G.run.scene&&G.run.scene.id') === 'tranh_bao', 'tới nơi thì vào chuyện tranh bảo vật'); }
  },
  // lịch luyện nhận nhiều hơn
  llboost() {
    fresh('G.run.pham=0;G.run.base.ngo=-100;G.run.ll=0;');
    const g = +run('llAdd(2,"thử");G.run.ll'); ok(g >= 2 * 3 * 0.99, `nhận 2 điểm gốc được ${g.toFixed(1)} (gấp ${run('LL_BOOST')} lần)`);
  },
  // bế quan: linh lực hồi nhanh hơn khí huyết, không hồi đầy cả hai
  bequanhoi() {
    fresh('G.run.pham=0;G.run.realm=0;G.run.age=20;G.run.birthAge=20;const dp=regionOf(0).nodes.find(n=>n.dp)||nodeById(G.run.at);dp.dp=1;G.run.at=dp.id;arrive(dp.id);openPlace(dp.id);');
    run('G.run.hp=1;G.run.mp=1;G.run._hpLast=1;');
    run('globalThis.__bc=bqCan;bqCan=()=>"";'); const okBq = run('bqCustom(0.5)'); run('bqCan=__bc;'); ok(okBq === true, 'bế quan chạy được');
    const hp = +run('G.run.hp'), mp = +run('G.run.mp'), mh = +run('S().maxHp'), mm = +run('S().maxMp');
    ok(hp < mh, `khí huyết không hồi đầy: ${hp}/${mh}`);
    ok(mp / mm > hp / mh, `linh lực hồi nhanh hơn khí huyết: ${(mp / mm * 100).toFixed(0)}% so với ${(hp / mh * 100).toFixed(0)}%`);
  },
  // túi trữ vật: 10 ô khởi đầu, túi mở thêm ô, khoá khi hết linh lực, không mất đồ
  tuitruvat() {
    fresh('G.run.pham=0;G.run.mp=S().maxMp;G.run.pills=[];G.run.relics=[];');
    ok(+run('bagCap()') === 10, 'chưa có túi: 10 ô mang trên người');
    run('eqOf().tuivat={k:"tui",name:"Túi thử",tier:0,fx:{},slots:0};'); ok(+run('bagCap()') === 10 + 10, 'đeo túi bậc 0: thêm 10 ô → ' + run('bagCap()'));
    run('for(let i=0;i<16;i++)G.run.pills.push({id:"hoixuan",q:0});');
    const L = JSON.parse(run('JSON.stringify(bagLayout())')); const tui = L.slots.filter(s => s.src === 'tui' && s.unit).length;
    ok(tui === 6, 'ô túi chứa ' + tui + ' viên (16 viên − 10 ô người), đánh dấu src:tui'); ok(L.slots.every(s => !s.locked), 'còn linh lực: không ô nào khoá');
    run('G.run.mp=0;');
    ok(run('unitLocked("p",15)') === true, 'linh lực = 0: viên nằm trong ô túi bị khoá'); ok(run('unitLocked("p",0)') === false, 'viên trên người không bị khoá');
    ok(run('usePill(15,false)') === false && +run('G.run.pills.length') === 16, 'không uống được viên bị khoá, đồ không mất');
    run('G.run.mp=S().maxMp;'); ok(+run('G.run.pills.length') === 16 && run('usePill(15,false)') !== false, 'có linh lực lại: dùng được');
    run('G.run.mp=0;G.run.pham=1;'); ok(run('tuiOn()') === false, 'phàm nhân: không mở được túi');
    fresh('G.run.pham=0;G.run.mp=0;'); run('G.run.pills=[];for(let i=0;i<5;i++)G.run.pills.push({id:"hoixuan",q:0});'); ok(run('unitLocked("p",4)') === false, 'chưa đeo túi: không gì bị khoá dù linh lực = 0');
  },
  // máy tự chơi 15 kiếp: không lỗi, không chữ hỏng
  smoke() {
    const o = cp.spawnSync('node', ['bot.js', '15', '--quiet'], { cwd: require('path').join(__dirname, '..'), encoding: 'utf8', timeout: 420000 });
    const out = (o.stdout || '') + (o.stderr || '');
    ok(o.status === 0, 'bot.js thoát bình thường'); ok(!/Lỗi|Error|TypeError|ReferenceError/.test(out.replace(/Nguyên nhân/g, '')), 'không có lỗi trong đầu ra');
    console.log(out.split('\n').filter(l => /Số kiếp|Nguyên nhân|Cảnh giới khi chết|^LỖI|^CHUỖI|^   /.test(l)).slice(0,14).map(l => '     ' + l).join('\n'));
  },
};

if (args.includes('--list')) { console.log(Object.keys(TESTS).join('\n')); process.exit(0); }
for (const k of (names.length ? names : Object.keys(TESTS))) {
  if (!TESTS[k]) { console.log('Không có bài: ' + k); fails++; continue; }
  cur = k; console.log('▶ ' + k); const f0 = fails;
  try { TESTS[k](); } catch (e) { fails++; console.log('   ✗ NGOẠI LỆ: ' + e.message.split('\n')[0]); }
  if (SHOWLOG || fails > f0) { try { console.log('   --- nhật ký ---\n' + run('NK.dump(25)').split('\n').map(l => '   ' + l).join('\n')); } catch (e) {} }
}
console.log(fails ? `\n${fails} lỗi` : '\nTất cả đạt'); process.exit(fails ? 1 : 0);
