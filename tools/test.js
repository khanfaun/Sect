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
const run = code => vm.runInContext(code, ctx, {timeout:20000});
const args = process.argv.slice(2), SHOWLOG = args.includes('--log');
const names = args.filter(a => !a.startsWith('--'));

// Fixture có seed để phép thử không phụ thuộc vị trí sinh ngẫu nhiên.
let fixtureSeed = 1728;
function fresh(patch) {
  const seed = ++fixtureSeed;
  run(`(() => {GEO=null;RS=mul(16717);const original=genWorld;genWorld=()=>original(${seed});
    try{G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);}
    finally{genWorld=original;}
    NK.on=true;NK.clear();G.run.scene=null;FEAT.an=0; // ăn uống (Đ3.6) tắt trong bài không nói về cái ăn; com_ao bật lại
  })()`);
  if (patch) run(patch);
}
let fails = 0, cur = '';
const ok = (c, msg) => { if (!c) { fails++; console.log('   ✗ ' + msg); } else console.log('   ✓ ' + msg); };

const TESTS = {
  content() {
    const r = cp.spawnSync(process.execPath, ['tools/kiem-tra-content.js'], {cwd:require('path').join(__dirname,'..'),encoding:'utf8'});
    ok(r.status === 0, 'nguồn nội dung, mọi cảnh, danh mục và các ngữ cảnh ('+(r.stdout||r.stderr).trim()+')');
  },
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
  // thế giới mở: một bản đồ liền, năm đại khu vực, đi bộ trên cạn, tầm nhìn theo địa hình, độ khó theo cảnh giới
  themo() {
    fresh('');
    ok(run('W().mo') === 1, 'thế giới đã chuyển sang bản đồ liền');
    ok(run('W().regions.every(R0=>R0.nodes.every(n=>{const g=geo();return terWalk(g.ter[n.hex])&&g.reg[n.hex]===R0.k;}))'), 'mọi địa điểm nằm trên đất đi được, đúng đại khu vực');
    ok(run('W().regions.every(R0=>R0.nodes.every(n=>n.type!=="ai"))'), 'không còn quan ải');
    const areas = run('(()=>{const s=new Set();for(let i=0;i<60;i++)s.add(Math.floor(birthNode().id/100));return s.size;})()');
    ok(areas >= 3, `sinh ra ngẫu nhiên khắp bản đồ (${areas} đại khu vực)`);
    ok(run('REG.map(x=>x.n).join(",")') === 'Trung Châu,Đông Hoang,Nam Trạch,Tây Lĩnh,Bắc Nhạc', 'tên năm đại khu vực');
    // đường đi tránh hồ và vân hải
    const bad = run('(()=>{const g=geo();let b=0;const A=regionOf(0).nodes,B=regionOf(1).nodes.concat(regionOf(3).nodes);for(let i=0;i<8;i++){const p=hexPath(A[i].hex,B[i].hex);b+=p.cells.filter(c=>!terWalk(g.ter[c])).length;}return b;})()');
    ok(bad === 0, 'đường đi không lội qua hồ, vân hải (' + bad + ' ô)');
    ok(run('(()=>{const g=geo();let u=-1,m=-1;for(let i=0;i<HN;i++){if(u<0&&g.ter[i]===1)u=i;if(m<0&&g.ter[i]===3)m=i;}return TER_COST[3]>TER_COST[1]&&stepCost(g,u,m)>stepCost(g,m,u)-0.01;})()'), 'lên núi tốn thời gian hơn');
    // sang khu khác bằng đi bộ
    const go = run('(()=>{const r=G.run;const a=r.region;const k=(a+1)%5;const t=regionOf(k).nodes.find(n=>n.type==="tran"||n.type==="thanh")||regionOf(k).nodes[0];t.fog=Math.max(1,t.fog);let tries=0;while(G.run&&r.at!==t.id&&tries++<8){r.scene=null;travelTo(t.id);let g=0;while(G.run&&r.moving&&g++<4000){if(r.scene)r.scene=null;travelTick(6);}}return [a,G.run&&G.run.region,k];})()');
    ok(go[1] === go[2] && go[0] !== go[1], `đi bộ sang đại khu vực khác (${go[0]} → ${go[1]})`);
    const spl = run('(()=>{const g=geo(),M={};for(let i=0;i<HN;i++){if(g.reg[i]<0)continue;const d=g.dist[i];if(M[d]!=null&&M[d]!==g.reg[i])return d;M[d]=g.reg[i];}return -1;})()');
    ok(spl === -1, 'mỗi quận nằm trọn trong một đại khu vực');
    // đi tới ô đất bất kỳ (điểm hoang tạm)
    const wp = run('(()=>{const r=G.run,g=geo();const h0=nodeHex(nodeById(r.at));let c=-1;for(let i=0;i<HN&&c<0;i++){if(g.reg[i]>=0&&terWalk(g.ter[i])&&hexNode(i)==null&&Math.abs(i-h0)>25&&Math.abs(i-h0)<80)c=i;}const hrs=cellHours(c);const n=wpMake(c);let tries=0;while(G.run&&r.at!==n.id&&tries++<10){r.scene=null;travelTo(n.id);let q=0;while(G.run&&r.moving&&q++<4000){if(r.scene)r.scene=null;travelTick(6);}}const ok1=r.at===n.id&&nodeHex(nodeById(r.at))===c;const hx=hexNode(c);return [ok1,hrs>0,hx==null,nodeById(r.at).wp];})()');
    ok(wp[0] && wp[1] && wp[2] && wp[3], 'đi tới ô đất bất kỳ: đến đúng ô, có thời gian, không thành icon địa điểm ' + JSON.stringify(wp));
    // tầm nhìn: đồng bằng trống nhìn xa hơn chỗ nhiều núi
    const vv = run('(()=>{const g=geo();let a=0,na=0,b=0,nb=0;for(let i=0;i<HN;i+=7){if(g.reg[i]<0)continue;const nbs=hexNb(i);const m=nbs.filter(j=>g.ter[j]===3&&g.el[j]>=g.el[i]).length;if(g.ter[i]===1&&m===0&&na<30){a+=visCells(i,6).length;na++;}else if(g.ter[i]!==3&&m>=3&&nb<30){b+=visCells(i,6).length;nb++;}}return [a/na,b/nb];})()');
    ok(vv[0] > vv[1], `núi chặn tầm nhìn (đồng bằng ${Math.round(vv[0])} ô, kẹt giữa núi ${Math.round(vv[1])} ô)`);
    const sv = run('(()=>{sense();const n=VIS.reduce((a,b)=>a+b,0);const s=G.run.visS;visReset();G.run.visS=s;VIS=null;visLoad();return [n,VIS.reduce((a,b)=>a+b,0)];})()');
    ok(sv[0] > 0 && sv[0] === sv[1], `lưu và đọc lại vùng đã thấy (${sv[0]} ô)`);
    // độ khó theo cảnh giới, không theo nơi chốn
    const d0 = run('(()=>{G.run.realm=0;let s=0;for(let i=0;i<20;i++)s+=mkEnemy({}).hp;return s;})()'), d3 = run('(()=>{G.run.realm=3;let s=0;for(let i=0;i<20;i++)s+=mkEnemy({}).hp;return s;})()');
    ok(d3 > d0 * 2, `kẻ địch mạnh theo cảnh giới (${Math.round(d0 / 20)} → ${Math.round(d3 / 20)} khí huyết)`);
    ok(run('G.run.realm=2;rT()') === 2, 'bậc độ khó = cảnh giới');
    // chơi lại từ đầu: vùng đã mở của lượt trước không được giữ
    const ra = run('(()=>{sense();for(let i=0;i<HN;i++)VIS[i]=1;visSave();return [G.run.rid,VIS.reduce((x,y)=>x+y,0)];})()');
    fresh('');
    const rb = run('(()=>{sense();return [G.run.rid,VIS.reduce((x,y)=>x+y,0)];})()');
    ok(rb[0] !== ra[0] && rb[1] < 800, `chơi lại thì không giữ vùng đã mở (${ra[1]} → ${rb[1]} ô)`);
    const sects = run('W().regions.map(R0=>R0.nodes.filter(n=>n.type==="tong").length).join(",")');
    ok(sects.split(',').every(x => +x >= 6 && +x <= 9), 'mỗi đại khu vực 6–8 tông môn (' + sects + ')');
    const cl = run('(()=>{const g=geo();const all=[];for(const R0 of W().regions)for(const n of R0.nodes)all.push(n);const seen=new Set();let dup=0,bad=0,big=0;for(const n of all){for(const c of n.cells){if(seen.has(c))dup++;seen.add(c);if(!terWalk(g.ter[c]))bad++;}if(n.type==="tong"&&n.quy===3&&n.cells.length>=6)big++;}return [dup,bad,big];})()');
    ok(cl[0] === 0 && cl[1] === 0, `ô của các địa điểm không chồng nhau, đều trên đất (${cl})`);
    ok(cl[2] > 0, 'đại tông chiếm nhiều ô (' + cl[2] + ' đại tông ≥ 6 ô)');
    const sep = run('(()=>{const own=new Map();let adj=0,close=0;const all=[];for(const R0 of W().regions)for(const n of R0.nodes){all.push(n);for(const c of n.cells)own.set(c,n.id);} for(const n of all)for(const c of n.cells)for(const b of hexNb(c)){const o=own.get(b);if(o!=null&&o!==n.id)adj++;}return adj;})()');
    ok(sep === 0, 'các địa điểm cách nhau ít nhất một ô trống (' + sep + ' chỗ sát nhau)');
    const clk = run('(()=>{let bad=0,tot=0;for(const R0 of W().regions)for(const n of R0.nodes){n.fog=Math.max(n.fog,2);}geo().nodeAt=null;for(const R0 of W().regions)for(const n of R0.nodes){tot++;if(hexNode(n.hex)!==n)bad++;for(const c of n.cells)if(hexNode(c)!==n)bad++;}return [bad,tot];})()');
    ok(clk[0] === 0, `bấm vào bất cứ ô nào của địa điểm đều chọn đúng nó (${clk[1]} địa điểm)`);
    const th = run('W().regions.map(R0=>R0.nodes.filter(n=>n.type==="thanh").length).join(",")');
    ok(th.split(",").every(x => +x >= 3), 'mỗi đại khu vực ít nhất 3 thành (' + th + ')');
    const qt = run('(()=>{const g=geo();const m={};for(const R0 of W().regions)for(const n of R0.nodes)if(n.type==="tran"){const d=g.dist[n.hex];m[d]=(m[d]||0)+1;}let lo=99,nd=0;for(let d=0;d<g.dnames.length;d++){nd++;lo=Math.min(lo,m[d]||0);}return [lo,nd];})()');
    ok(qt[0] >= 2, `mỗi quận ít nhất 2 trấn (ít nhất ${qt[0]} trong ${qt[1]} quận)`);
    const sz = run('(()=>{const o={};for(const R0 of W().regions)for(const n of R0.nodes){const c=n.cells.length;const t=n.type;const e=o[t]||(o[t]=[99,0]);e[0]=Math.min(e[0],c);e[1]=Math.max(e[1],c);}return JSON.stringify(o);})()');
    const SZ = JSON.parse(sz);
    ok(SZ.dong[1] <= 2 && SZ.dong[0] >= 1, 'hang động chỉ 1–2 ô ' + JSON.stringify(SZ.dong));
    ok(SZ.tong[0] >= 2 && SZ.tong[1] >= 5, 'tông môn nhiều ô ' + JSON.stringify(SZ.tong));
    ok(SZ.tran[1] <= 4 && SZ.thanh[1] <= 7, 'trấn nhỏ hơn thành');
    ok(run('(()=>{const n=W().regions[0].nodes.find(x=>x.type==="tong");const s=placeScale(n);return /ô$/.test(s.txt)&&s.c===n.cells.length;})()'), 'có chữ quy mô theo số ô');
    ok(run('(()=>{const n=W().regions[0].nodes.find(x=>x.cells.length>2);n.fog=2;geo().nodeAt=null;return hexNode(n.cells[n.cells.length-1])===n;})()'), 'bấm ô phụ cũng chọn đúng địa điểm');
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
    const t0 = Date.now(); run('advanceTime(40*HY)'); ok(Date.now() - t0 < 5000 && +run('G.run?G.run.hp:0') <= +run('G.run?S().maxHp:1'), 'trôi 40 năm: không treo, không vượt tối đa ('+(Date.now()-t0)+'ms, '+run('G.run?Math.round(G.run.hp)+"/"+S().maxHp:"chết"')+')');
    fresh(); ok(run('rgTurnRate()') === 0.5, 'phàm nhân trong trận 0,5%/lượt');
  },
  // tĩnh toạ: không tăng tu vi, hồi nhanh hơn để yên
  tinhtoa() {
    fresh('G.run.hp=1;G.run._hpLast=1;G.run.arts=(G.run.arts||[]).filter(a=>a.type!=="tp");'); const tv = +run('G.run.tv'); const a0 = +run('G.run.age');
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
    // điều kiện nơi chốn/độ khó của sự kiện tùy chỗ sinh ngẫu nhiên nên bỏ qua khi gặp giao tranh
    run('for(let i=0;i<20;i++)gtSpawn();'); const e = run('(W().ents.find(e=>e.type==="giaotranh")||{}).id');
    ok(!!e, 'có giao tranh gần đó');
    if (e) { run(`const target=W().ents.find(e=>e.type==="giaotranh");G.run.at=target.at;arrive(target.at);G.run.scene=null;const _ct=contentTriggerOk;contentTriggerOk=()=>true;try{meetEnt(target);}finally{contentTriggerOk=_ct;}`); ok(run('G.run.scene&&G.run.scene.id') === 'tranh_bao', 'tới nơi thì vào chuyện tranh bảo vật '+run('G.run.scene&&(G.run.scene.id+"/"+G.run.scene.type)')); }
  },
  // lịch luyện nhận nhiều hơn
  llboost() {
    fresh('G.run.pham=0;G.run.base.ngo=-100;G.run.ll=0;G.run.realm=1;G.run.sg=3;');
    const g = +run('llAdd(2,"thử");G.run.ll'); ok(g >= 2 * 3 * +run('llRate()') * 0.99, `nhận 2 điểm gốc được ${g.toFixed(1)} (gấp ${run('LL_BOOST')} lần, nhịp ×${run('llRate()')})`);
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
  // đợt 32: lịch luyện về 0 theo tầng, chỉ số tăng từng tầng, pháp bảo, bế quan, thiên phú
  suaLoi32() {
    const L1 = (fresh(), run('LK_TH[1]'));
    fresh('G.run.pham=0;G.run.realm=0;G.run.sg=1;G.run.tv=LK_TH[1];G.run.ll=LK_TH[1]-1;');
    ok(run('llAdd(5,"thử",true);G.run.ll') <= L1 + 1e-6, 'lịch luyện không vượt đỉnh tầng đang mở');
    const a = run('S().maxHp'); run('G.run.sg=2;G.run.tv=LK_TH[1]+0.1;'); const b = run('S().maxHp');
    ok(b > a, `lên tầng 2 thì khí huyết tăng (${a} → ${b})`);
    fresh('G.run.pham=0;G.run.realm=0;G.run.sg=1;G.run.tv=LK_TH[1];G.run.ll=LK_TH[1];');
    run('lkXk()'); ok(run('sgGate()') === 2 && Math.abs(run('G.run.ll') - L1) < 1e-6 && run('llShow()') === 0, 'xung kích xong lịch luyện tầng mới về 0%');
    fresh('G.run.pham=1;G.run.tv=100;G.run.ll=100;'); run('phamUp()');
    ok(run('G.run.asc.diff.map(d=>d.k).join()').includes('maxHp'), 'bảng lên Luyện Khí có cả khí huyết');
    ok(run('!isPham()') && run('G.run.asc&&G.run.asc.k') === 'xk' && run('G.run.ll') === 0, 'phàm nhân lên Luyện Khí: có bảng lên cảnh giới, lịch luyện về 0');
    fresh('G.run.region=1;');
    const pb = JSON.parse(run('(()=>{let n=0,low=0;for(let i=0;i<2000;i++){const x=genRelic(1);if(isPB(x)){n++;if(relReq(x)<2)low++;}}return JSON.stringify({n,low});})()'));
    ok(pb.low === 0, 'không có pháp bảo yêu cầu dưới Trúc Cơ'); ok(pb.n < 200, `pháp bảo hiếm (${pb.n}/2000)`);
    fresh('G.run.pham=0;G.run.realm=0;'); ok(run('(()=>{let m=0;for(let i=0;i<300;i++){m=Math.max(m,genArt("cp",3).req,genArt("tp",3).req);}return m;})()') <= 1, 'Luyện Khí không gặp bí tịch Kết Đan');
    fresh('G.run.pham=0;G.run.realm=1;'); ok(run('Math.abs(playerTal().score-1)<0.3?playerTal().tier:1') === 1, 'lực chiến gần bằng sàn là Bình phàm');
  },
  // chữ có tham số: {{n}} phải được điền, không còn sót
  ctxt() {
    fresh();
    const k = run('Object.keys(CONTENT_TEXT).find(k=>CONTENT_TEXT[k].includes("{{0}}"))');
    ok(!!k, 'có khóa chữ dùng tham số');
    const s = run(`contentText(${JSON.stringify(k)},["A1","A2","A3","A4","A5","A6"])`);
    ok(!s.includes('{{0}}') && s.includes('A1'), 'tham số được điền: ' + s.slice(0, 60));
  },
  nen() {
    fresh();
    ok(run("feat('nq')")===true && run("feat('vo')")===true, 'feat(nq) bật từ Đ1, feat(vo) bật từ Đ2');
    ok(run("typeof migrateX")==='function', 'có migrateX');
    ok(run("(()=>{const d={meta:{}};migrateX(d);return !!d.meta.v2})()"), 'migrateX thêm meta.v2 cho bản lưu cũ');
    ok(run("ageY()")===run("Math.floor(G.run.age)"), 'ageY = năm nguyên');
    ok(run("(()=>{const n=anchorNode('LOC01');return n&&n.type})()")==='tran', 'anchorNode(LOC01) là trấn');
  },
  deed_bang() {
    fresh();
    ok(run("HD_LV.length")===5 && run("HD_W.lon")===8, 'HD_LV đủ 5 bậc');
    ok(run("NQ_MUC.mang")===15 && run("NQ_TN.dung_xem")===0, 'bảng nghiệp');
    ok(run("Object.keys(DEED).length")>=54, 'DEED đủ mục: '+run("Object.keys(DEED).length"));
    const J=x=>JSON.stringify(run('DEED.'+x));
    ok(J('cuu_nguoi')==='{"p":"vua","g":8,"seed":1}', 'cuu_nguoi đúng mẫu');
    ok(J('giet_vo_toi')==='{"t":"lon","b":15,"seed":1,"tuyen":"huyet_thu"}', 'giet_vo_toi đúng mẫu');
    ok(J('tha_ke_ac')==='{"p":"vua","seed":1}', 'tha_ke_ac đúng mẫu');
    ok(J('hiep_dao')==='{"p":"nho","t":"vua","g":3,"b":1}', 'hiep_dao đúng mẫu');
    ok(J('sam_hoi')==='{"p":"nho","bPct":-10}', 'sam_hoi đúng mẫu');
    ok(run("Object.values(DEED).every(d=>(!d.p||HD_W[d.p])&&(!d.t||HD_W[d.t])&&(!d.g||[1,3,8,15].includes(d.g))&&(!d.b||[1,3,8,15].includes(d.b)))"), 'mọi mục dùng mức hợp lệ');
  },
  nq_hd() {
    fresh();
    const L=run("HD_LV.map(x=>x.n)");
    ok(L.includes(run("hdName()")), 'hdName là một trong 5 nhãn: '+run("hdName()"));
    run("for(let i=0;i<5;i++)deed('cuu_nguoi')");
    ok(/chính/i.test(run("hdName()")), 'sau 5 lần cứu người nhãn có "chính": '+run("hdName()"));
    ok(typeof run("G.run.karma")==='number' && run("G.run.karma")>0, 'gương karma là số dương');
    fresh();
    run("for(let i=0;i<24;i++)deed('giet_vo_toi');deed('cuu_nguoi')");
    ok(run("hdName()")==='Tà niệm ăn sâu', 'vẫn Tà niệm ăn sâu: '+run("hdName()"));
    ok(run("G.run.hd.log.length")===24, 'sổ chỉ giữ 24 quyết định');
    const t0=run("G.run.tamma=0;G.run.tamma");run("deed('cuu_nguoi')");
    ok(run("G.run.tamma")>t0, 'làm trái hướng khi Tà niệm ăn sâu: tâm ma tăng');
    ok(run("NK.count('nq.deed')")>0, 'có nhật ký nq.deed');
  },
  nq_ng() {
    fresh();
    run("for(let i=0;i<24;i++)deed('giet_vo_toi')");
    ok(run("ngB()")>=15*24*0.99, 'ngB tích đủ: '+run("ngB()"));
    ok(run("ngName('B')")==='Nghiệp hải trùng trùng', 'nhãn nghiệp chướng');
    fresh('G.run.ng.G=0;G.run.ng.B=0');
    run("deed('giet_vo_toi',{yd:'tai_nan'})");
    ok(Math.abs(run("ngB()")-15*0.25)<1e-6, 'ý định tai nạn giảm nghiệp');
    run("deed('sam_hoi')");
    ok(Math.abs(run("ngB()")-15*0.25*0.9)<1e-6, 'sám hối trừ 10%');
    ok(run("deed('khong_co')").length===0 && run("NK.count('nq.deed.missing')")>0, 'mã lạ không lỗi');
    ok(run("G.run.ng.so.every(x=>typeof x.v==='number'&&'why' in x)"), 'sổ có đủ trường');
  },
  nq_legacy() {
    fresh();
    {
      const ch=run("applyE({karma:5})");
      ok(Array.isArray(ch) && ch.some(c=>c.i==='☯️'), 'applyE karma cũ ra chip');
      ok(typeof run("G.run.karma")==='number' && run("NK.count('nq.hd')")>0, 'bút toán tạm ghi Hành Đạo');
      const ch2=run("applyE({deed:'cuu_nguoi',hp:5})");
      ok(ch2.length>=1 && ch2[0].i==='☯️', 'applyE deed giữ chip');
      run("applyE({hd:{p:3},ng:{g:3,why:'x'}})");
      ok(run("ngG()")>0, 'applyE hd/ng');
      fresh('delete G.run.hd;delete G.run.ng;G.run.karma=-70;G.run._nqV1=0;run2();');
      ok(run("ngB()")>0, 'bản lưu cũ có nghiệp chướng');
      ok(/tà/i.test(run("hdName()")), 'bản lưu cũ nhãn tà: '+run("hdName()"));
      ok(run("G.run.karma")===-70, 'gương giữ đúng karma cũ');
      ok(run("questPenalty({reward:{st:10}}).deed")==='that_hua', 'phạt hủy nhiệm vụ là thất hứa');
    }
  },
  danh() {
    fresh();
    const id=run("(()=>{const n=W().regions.flatMap(x=>x.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;return n.id})()");
    ok(run(`danhOf(nodeById(${JSON.stringify(id)}))`)===0, 'danh tiếng ban đầu bằng không');
    run("for(let i=0;i<3;i++)deed('giet_vo_toi',{lo:1})");
    const v=run(`danhOf(nodeById(${JSON.stringify(id)}))`);
    ok(v<=-25, 'giết người bị lộ: tiếng xấu '+v);
    ok(run(`dangerTag(nodeById(${JSON.stringify(id)}))`)===2, 'thị trấn thù địch mức 2');
    ok(!/\d/.test(run(`danhName(nodeById(${JSON.stringify(id)}))`)), 'tên danh tiếng không có số');
    run("for(let i=0;i<3;i++)deed('giet_vo_toi',{lo:0})");
    ok(run(`danhOf(nodeById(${JSON.stringify(id)}))`)===v, 'việc kín không đổi danh tiếng');
    ok(run("NK.count('danh')")>0, 'có nhật ký danh');
  },
  nq_doc() {
    fresh('G.run.ng.B=0');
    ok(run("kiepKind()")!=='nghiep', 'không nghiệp: kiếp thường');
    run("G.run.ng.B=20");
    ok(run("kiepKind()")==='nghiep', 'nghiệp chướng từ 15: Nghiệp Hỏa kiếp');
    run("G.run.hd.log=[{p:0,t:20}];G.run.hd.lv=null");
    ok(run("(()=>{const r=G.run;delete r.hd;r.karma=-80;ttPhys(r);return hdLvIdx(r)})()")===4, 'ttPhys dựng Hành Đạo từ karma khi thiếu');
    const need=run("(()=>{const r=G.run;r.hd.log=[{p:20,t:0}];r.hd.lv=null;return needList({need:{karma:10}}).find(x=>/chính/i.test(x.t))})()");
    ok(need && need.ok===true, 'điều kiện tông theo Hành Đạo: '+(need&&need.t));
    run("G.run.hd.log=[{p:0,t:24}];G.run.hd.lv=null;G.run.ng.B=60;G.meta.ach=G.meta.ach.filter(x=>x!=='ma');deed('giet_vo_toi')");
    ok(run("G.meta.ach.includes('ma')"), 'thành tựu Ma đầu theo Hành Đạo + nghiệp');
  },
  kiep_nghiep() {
    fresh('G.run.ng.B=0');
    ok(run("nqK()")===1 && run("nqKiepBonus()")===0, 'không nghiệp: kiếp thường');
    run("G.run.ng.B=100");
    ok(run("nqK()")===1.4 && run("nqKiepBonus()")===0.1, 'B=100: sức kiếp ×1.4, thưởng 10%');
    run("G.run.ng.B=120");ok(run("nqK()")===1.4, 'cùng bậc thì như nhau');
    run("G.run.ng.B=15");ok(run("kiepKind()")==='nghiep' && run("nqKiepWarn()").length>5 && !/\d/.test(run("nqKiepWarn()")), 'B≥15: Nghiệp Hỏa, có lời báo không số');
    const once=()=>run(`(()=>{const r=G.run;r.pham=0;r.realm=0;r.tv=1e9;r.bt={to:1,dao:5,stages:[],hpLeft:1};r.scene={type:'bt',chips:[]};try{btFinish();}catch(e){return 'ERR '+e.message;}return G.run?G.run.bon.hpP:'chet';})()`);
    run("G.run.ng.B=100");const h0=run("G.run.bon.hpP");const h1=once();
    ok(typeof h1==='number' && h1>=h0+10, 'vượt kiếp nghiệp: khí huyết +10% ('+h0+' → '+h1+')');
    const h2=run(`(()=>{const r=G.run;r.realm=0;r.bt={to:1,dao:5,stages:[],hpLeft:1};r.scene={type:'bt',chips:[]};const b=r.bon.hpP;btFinish();return G.run.bon.hpP-b;})()`);
    ok(h2<10, 'cùng cảnh giới chỉ thưởng một lần');
    ok(run("NK.count('nq.kiepBon')")===1, 'nhật ký nq.kiepBon');
  },
  qua_chin() {
    fresh('G.run.qc=[]');
    run("deed('cuu_nguoi',{ai:'lão'})");
    ok(run("G.run.qc.length")===1, 'việc có quả chín gieo một hạt');
    ok(run("(()=>{const s=G.run.qc[0];return s.due>W().t+5*HM&&s.due<=W().t+18*HM})()"), 'hạn chín trong 6–18 tháng');
    run("G.run.qc[0].due=W().t;G.run.scene=null;advanceTime(HM+1)");
    ok(run("!!G.run") && run("G.run.qc.length")===0, 'đến hạn thì chín');
    ok(run("NK.count('nq.qc')")===1, 'nhật ký nq.qc');
    const so=run("nqSo(5)");
    ok(so.length>0 && so.every(x=>x.t&&!/\d/.test(x.t+x.k)), 'sổ nghiệp duyên có chữ, không số: '+(so[0]&&so[0].t));
    run("applyE({ng:{g:1,why:'chi_duong'}})");ok(!/_/.test(run('nqSo(1)[0].t')), 'sổ không hiện mã thô: '+run('nqSo(1)[0].t'));
    run("deed('giet_vo_toi')");
    run("die('combat',{n:'thử'})");
    ok(run("G.over&&G.over.qc&&G.over.qc.length")===1, 'màn hết kiếp có hạt chưa chín');
    ok(run("(W().qcLeft||[]).some(x=>x.qc===1&&x.id==='giet_vo_toi')"), 'hạt chưa chín chép sang kiếp sau');
  },
  hoancanh() {
    fresh();
    const rate=n=>run(`(()=>{let b=0,k=0;for(let i=0;i<${n};i++){genBirth();for(const c of G.birth.cards){k++;if(c.hc==='bap')b++;}}return b/k})()`);
    run("G.meta.lastNq={B:200,G:0}");
    const a=rate(200);ok(a>=0.6&&a<=0.75, 'nghiệp nặng: tỉ lệ bấp bênh '+a.toFixed(2));
    ok(run("G.birth.cards.filter(c=>c.hc==='bap').every(c=>ORIGIN.find(o=>o.id===c.origin).grp==='kho')"), 'bấp bênh thì xuất thân khốn khó');
    run("G.meta.lastNq={B:0,G:200}");
    const b=rate(100);ok(b<=0.15, 'thiện duyên dày: ít bấp bênh '+b.toFixed(2));
    run("G.meta.lastNq={B:110,G:0}");const c1=run("hcRate().bap");run("G.meta.lastNq={B:190,G:0}");
    ok(run("hcRate().bap")===c1, 'cùng bậc thì như nhau');
    run("delete G.meta.lastNq");ok(run("hcRate().bap")===0.25, 'bản lưu cũ: hoàn cảnh thường');
    run("G.meta.lastNq={B:200,G:0};genBirth()");const card=run("JSON.stringify(G.birth.cards.find(c=>c.hc==='bap')||null)");
    if(card!=='null'){const seeded=f=>`(()=>{const mr=Math.random,rs=RS;RS=()=>0.5;Math.random=()=>0.5;try{${f}}finally{Math.random=mr;RS=rs;}return G.run.bac})()`;
      const st0=run(seeded(`const c=${card};c.hc=null;newRun(c);`));const st1=run(seeded(`newRun(${card});`));
      ok(st1<st0||st0<=2, 'bấp bênh: ít tiền khởi đầu hơn ('+st0+' → '+st1+')');}
    fresh();run("die('combat',{n:'thử'})");ok(run("!!G.meta.lastNq"), 'lúc chết ghi lại nghiệp duyên');
  },
  vo_kiep1() {
    fresh();
    const n=run(`(()=>{G.meta.nlife=0;let v=0;for(let i=0;i<1000;i++)if(genRoot().id==='vo')v++;return v})()`);
    ok(n===0, 'kiếp đầu không có vô linh căn ('+n+'/1000)');
    ok(run(`(()=>{G.meta.nlife=0;for(let i=0;i<300;i++){if(ttRoll([]).includes('vo_can'))return false;}return true})()`), 'kiếp đầu không rút khí vận Vô Căn');
    ok(run(`(()=>{const q={};for(let i=0;i<2000;i++){const x=genRoot();q[x.q]=(q[x.q]||0)+1;}return q.thuong>q.khuyet&&q.khuyet>q.thuan&&!q.undefined})()`), 'linh căn có phẩm chất, Thường nhiều nhất');
    ok(run(`(()=>{const a=rootView({id:'tam',els:['kim','moc','thuy']}).m,b=rootView({id:'tam',els:['kim','moc','thuy'],q:'thuan'}).m;return b>a&&a===1})()`), 'phẩm Thuần tu nhanh hơn, bản lưu cũ không phẩm như cũ');
  },
  vo_kiep2() {
    fresh();
    const rate=(B,Gv)=>run(`(()=>{G.meta.nlife=3;G.meta.lastNq={B:${B},G:${Gv}};let v=0;for(let i=0;i<2000;i++)if(genRoot().id==='vo')v++;return v/2000})()`);
    const a=rate(0,0);ok(a>=0.40&&a<=0.50, 'kiếp 4, nghiệp trung bình: vô căn '+a.toFixed(2));
    const b=rate(100,0);ok(b<=0.65&&b>a, 'nghiệp chướng nặng: '+b.toFixed(2)+' (trần 65%)');
    const c=rate(0,100);ok(c>=0.26&&c<a, 'thiện duyên dày: '+c.toFixed(2)+' (sàn 30%)');
    ok(run("G.meta.lastNq={B:60,G:0};const x=voRate();G.meta.lastNq={B:190,G:0};x===voRate()"), 'cùng bậc nghiệp thì tỉ lệ như nhau');
    ok(run("delete G.meta.lastNq;voRate()")===45, 'bản lưu cũ: tỉ lệ gốc');
    const same=run(`(()=>{G.meta.nlife=2;G.meta.lastNq={B:0,G:0};for(let i=0;i<40;i++){genBirth();const C=G.birth.cards;if(!C.every(c=>c.root.id===C[0].root.id&&c.root.els.join()===C[0].root.els.join()))return 'khác';
      for(const c of C){if((c.root.id==='vo')!==c.kv.includes('vo_can'))return 'kv';}}return 'ok'})()`);
    ok(same==='ok', 'kiếp 3: mọi thẻ cùng linh căn, Vô Căn đi kèm vô linh căn ('+same+')');
    run("G.meta.nlife=2;genBirth();const c=G.birth.cards[0];c.root={id:'vo',els:[],q:null};c.trait='loithan';newRun(c)");
    ok(run("isVo()&&G.run.root.els.length===0"), 'vô căn không được mệnh cách thêm hệ');
  },
  vo_khoa() {
    fresh("G.run.root={id:'vo',els:[]};G.run.arts=G.run.arts.filter(a=>a.k!=='tp'&&!a.start);G.screen='map';");
    const tv0=run('G.run.tv');run('addTv(50)');ok(run('G.run.tv')===tv0, 'vô căn: tu vi không tăng');
    ok(run('canBreak()')===false, 'không đột phá được');
    ok(run('S().maxMp')===0, 'không có linh lực');
    ok(run('bqReal()')===0, 'bế quan không có tác dụng');
    run('G.run.tv=100;G.run.ll=500;phamUp()');ok(run('G.run.pham')===1, 'không dẫn khí nhập thể được');
    const ch=run("JSON.stringify(applyE({tv:20}))");ok(/Không cảm được linh khí/.test(ch), 'sự kiện cho tu vi: chip không cảm được linh khí');
    const n0=run("G.run.arts.length");
    run("for(let i=0;i<(TP_Y+1)*12;i++){G.run.scene=null;G.screen='map';advanceTime(HM);if(!G.run)break;}");
    ok(run("!!G.run")&&run("G.run.arts.length")===n0, 'qua '+(run('TP_Y')+1)+' năm không có tâm pháp mới');
    run("(()=>{G.run.scene=null;startCombat({},{kind:'node'});const sc=G.run.scene;for(let i=0;i<6000&&G.run&&G.run.scene&&!G.run.scene.done;i++){if(sc.dodge)dodgeResolve(null);else if(sc.qte)qteResolve(null);else if(readyPlayer(sc))playerAct(BASIC.id||'basic');else combatStep(0.05);}})()");
    ok(true, 'vô căn đánh một trận không lỗi');
  },
  trac_linh() {
    fresh();
    ok(run('G.run.kiep')===1&&run('G.run.rootKnown')===1, 'kiếp đầu biết ngay linh căn');
    ok(run("rootLabel(G.run)")!=='Chưa trắc', 'kiếp đầu hiện tên linh căn: '+run("rootLabel(G.run)"));
    run("G.meta.nlife=1;genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.screen='map';NK.clear()");
    ok(run('G.run.kiep')===2&&run('G.run.rootKnown')===0, 'kiếp 2: chưa trắc');
    ok(run("rootLabel(G.run)")==='Chưa trắc', 'nhãn hiển thị: Chưa trắc');
    run("for(let i=0;i<4*30&&G.run;i++){if(G.run.scene&&G.run.scene.type==='kyngo'){kyPick(0);G.run.scene=null;}G.screen='map';G.run.moving=null;advanceTime(HD);}if(G.run.scene&&G.run.scene.type==='kyngo')kyPick(0);");
    ok(run('G.run.rootKnown')===1, 'sau bốn tháng đã trắc linh');
    ok(run('NK.count("tl.done")')===1, 'trắc linh đúng một lần ('+run('NK.count("tl.done")')+')');
    // Trắc Linh Thạch
    run("G.meta.nlife=1;genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.screen='map';NK.clear();G.run.qitems=['trac_linh_thach']");
    ok(run("!!bagItems().find(x=>x.key==='vtrac_linh_thach'&&x.use)"), 'Trắc Linh Thạch dùng được trong túi');
    run("bagUse('vtrac_linh_thach',1)");ok(run("G.run.scene&&G.run.scene.ev")==='tl_thach', 'dùng đá mở trắc linh thạch');
    run("kyPick(0)");ok(run('G.run.rootKnown')===1&&run("G.run.qitems.length")===0, 'đá vỡ, đã biết linh căn');
    ok(run("(()=>{const r=G.run;delete r.rootKnown;delete r._rkV1;run2();return r.rootKnown})()")===1, 'bản lưu cũ: coi như đã biết');
  },
  dau_thai_luat() {
    fresh("G.meta.pick=0;G.run.qitems=['dinh_menh_chau']");
    run("die('combat',{n:'thử'})");ok(run('G.meta.pick')===1, 'chết mang Định Mệnh Châu: thêm một lượt chọn');
    run("G.meta.pick=0;G.meta.upg.menh=1;G.meta.nlife=3;genBirth();newRun(G.birth.cards[0])");ok(run('G.run.kiep')===4&&run('G.meta.pick')===1, 'Thiên mệnh bậc 1: kiếp 4 được chọn');
    run("G.meta.pick=0;G.meta.nlife=4;genBirth();newRun(G.birth.cards[0])");ok(run('G.meta.pick')===0, 'kiếp 5 thì không');
    run("G.meta.pick=0;G.meta.upg.menh=2;G.meta.nlife=2;genBirth();newRun(G.birth.cards[0])");ok(run('G.meta.pick')===1, 'bậc 2: kiếp 3 được chọn');
    ok(run("(()=>{G.meta.nlife=1;let n=0;for(let i=0;i<50;i++)n+=ttRoll([]).length;return n/50<=2.2})()"), 'Thiên mệnh không còn rút thêm khí vận');
  },
  quen_sach() {
    fresh();
    ok(run("!UPG.find(u=>u.id==='ky'||u.id==='kytp')"), 'không còn nâng cấp Ký ức công pháp / tâm pháp');
    const d=run(`JSON.stringify((()=>{const d={meta:{upg:{ky:2,kytp:1,hp:1},pts:5,tpMem:{n:'x',tier:1,el:'kim'}}};migrateX(d);return d.meta})())`);
    const M=JSON.parse(d);ok(M.upg.ky==null&&M.upg.kytp==null&&M.upg.hp===1, 'bản lưu cũ: xoá khoá ky, kytp, giữ nâng cấp khác');
    ok(M.pts===5+36+12, 'hoàn điểm đã mua (ky 36, kytp 12): '+M.pts);
    ok(!M.tpMem, 'xoá ký ức tâm pháp cũ');
    run("G.meta.upg={};G.meta.tpMem={n:'Cũ',tier:2,el:'kim'};genBirth();newRun(G.birth.cards[0])");
    ok(run("!G.run.skills.some(k=>k.src==='ky')"), 'kiếp mới không có chiêu ký ức');
    ok(run("!G.run.arts.some(a=>a.n==='Cũ')"), 'kiếp mới không mang tâm pháp cũ');
    // Túc Tuệ Đăng
    run("tpLearn(3,{n:'Đèn Thử Tâm Pháp',el:'kim'});G.run.qitems=['tuc_tue_dang']");const tn=run("tuOf(arts()).n");run("die('combat',{n:'thử'})");
    ok(run("G.meta.mem&&G.meta.mem.n")===tn, 'chết mang Túc Tuệ Đăng: nhớ tâm pháp '+tn);
    run("genBirth();newRun(G.birth.cards[0])");
    ok(run(`G.run.arts.some(a=>a.n===${JSON.stringify(tn)}&&a.tier===0)`)&&run("!G.meta.mem"), 'kiếp sau học lại tâm pháp ở bậc thấp nhất');
  },
  tue_bien() {
    const setup=the=>fresh(`G.run.the=${JSON.stringify(the)};G.run.kv=[];G.run.trait='none';G.run.lifeAdj=500;G.run.tue=null;tueInit(G.run);NK.clear();`);
    setup(['man_luc_the']);
    const hp0=run('S().maxHp');
    run('advanceTime(10*HY)');ok(run('G.run.tue.sum.hpP')===5, 'Man Lực Thể: mười năm khí huyết +5% ('+run('G.run.tue.sum.hpP')+')');
    ok(run('S().maxHp')>hp0, 'khí huyết tối đa thật sự tăng (khóa đúng): '+hp0+' → '+run('S().maxHp'));
    run('advanceTime(40*HY)');ok(run('G.run.tue.sum.hpP')<=0.5*25+1e-9, 'trần hai mươi lăm năm: '+run('G.run.tue.sum.hpP'));
    setup(['hoa_linh_the']);
    run('G.run.hp=1;const rs=RS;RS=()=>0.001;try{advanceTime(HY);}finally{RS=rs;}');
    ok(run('G.run.hp>1&&G.run.hp<=S().maxHp'), 'Hỏa Linh Chi Thể: biến cố hồi khí huyết ('+run('G.run.hp')+')');
    setup([]);
    run('advanceTime(30*HY)');ok(run('NK.count("tue.year")')===30, 'nhảy ba mươi năm: đủ ba mươi mốc ('+run('NK.count("tue.year")')+')');
    run('(()=>{const x=JSON.parse(JSON.stringify(G.run));G.run=x;NK.clear();advanceTime(1);})()');ok(run('NK.count("tue.year")')===0, 'tải lại không áp lại năm cũ');
    setup(['thong_tue_the']);run('advanceTime(40*HY)');ok(run('G.run.tue.sum.ngo')===4, 'Thông Tuệ Thể: ngộ tính tối đa +4');
    ok(run("Object.keys(TUE).every(k=>TT_PHYS.some(p=>p.id===k)||TT_DEST[k]||TRAIT.some(t=>t.id===k))"), 'mọi mã trong TUE đều có thật');
    ok(run("Object.values(TUE).every(d=>!/\\d/.test(d.txt||''))"), 'lời theo năm tháng không có chữ số');
    const keys=run("JSON.stringify([...new Set(Object.values(TUE).flatMap(d=>Object.keys(d.y||{}).concat([].concat(d.ev||[]).flatMap(e=>Object.keys(e.add||{}).concat((e.alt||[]).flatMap(a=>Object.keys(a.add||{})))))))])");
    const okKeys=['hpP','defP','atkP','matkP','mpP','tvP','ngo','tam','than','tp','crit','dodge','lifeY'];
    ok(JSON.parse(keys).every(k=>okKeys.includes(k)||/^elP_(kim|moc|thuy|hoa|tho|loi|bang|phong)$/.test(k)), 'mọi khóa chỉ số đều có người đọc: '+keys);
    setup(['man_luc_the']);run('G.run.root={id:"vo",els:[]};G.run.the=["thai_am_the"];advanceTime(5*HY)');ok(!run('G.run.tue.sum.mpP'), 'vô căn: tuế biến linh lực ngủ');
  },
  deed_su_kien() {
    fresh();
    const bad=run(`(()=>{const out=[];const walk=(x,id)=>{if(Array.isArray(x))return x.forEach(y=>walk(y,id));if(!x||typeof x!=='object')return;for(const k in x){if(k==='karma')out.push('karma@'+id);if(k==='deed'&&!DEED[x[k]])out.push(x[k]+'@'+id);walk(x[k],id);}};for(const e of CONTENT_EVENTS)walk(e,e.id);return out})()`);
    ok(bad.length===0, 'sự kiện không còn karma cũ, mã deed đều có: '+bad.slice(0,5).join(','));
    const n=run(`(()=>{let n=0;const walk=x=>{if(Array.isArray(x))return x.forEach(walk);if(!x||typeof x!=='object')return;for(const k in x){if(k==='deed'||k==='hd'||k==='ng')n++;walk(x[k]);}};CONTENT_EVENTS.forEach(walk);return n})()`);
    ok(n>=477, 'đủ chỗ đã chuyển: '+n);
    const ch=run("applyE({deed:'cuu_nguoi',st:1})");ok(ch.some(c=>c.i==='☯️'), 'hiệu ứng sự kiện ra chip nghiệp duyên');
  },
  // Đ3.1 bạc: đơn vị đồng/quan, tiền khởi đầu theo xuất thân, linh thạch phàm nhân về 0, bản lưu cũ
  tien_bac() {
    fresh();
    ok(run("fmtBac(3200)")==='3 quan 200 đồng'&&run("fmtBac(200)")==='200 đồng'&&run("fmtBac(5000)")==='5 quan', 'fmtBac: '+run("fmtBac(3200)"));
    const st=o=>run(`(()=>{genBirth();const k=Object.assign({},G.birth.cards[0],{origin:'${o}',hc:null});newRun(k);return JSON.stringify({st:G.run.st,bac:G.run.bac})})()`);
    run("G.meta.upg={}");
    let a=JSON.parse(st('nong'));ok(a.st===0&&a.bac>=500&&a.bac<=1500, 'con nhà nông: 0 linh thạch, bạc thường '+JSON.stringify(a));
    a=JSON.parse(st('khat'));ok(a.st===0&&a.bac<=300, 'khất cái: khốn khó '+JSON.stringify(a));
    a=JSON.parse(st('thegia'));ok(a.st>=1&&a.st<=2&&a.bac>=5000, 'con thế gia: 1–2 linh thạch, khá giả '+JSON.stringify(a));
    a=JSON.parse(st('xt_nguoi_thua_ke_sap_bac'));ok(a.bac>=5000, 'xuất thân danh mục nhóm khá giả nhận đúng nhóm '+JSON.stringify(a));
    run("G.run.bac=0;G.run.st=2;NK.clear()");ok(run("bacPay(500,'thu')")&&run("G.run.st")===1&&run("G.run.bac")===89500, 'thiếu bạc: tự đổi một linh thạch ra chín mươi quan');
    ok(run("NK.count('tien.bac')")>=2, 'nhật ký tien.bac');
    run("G.run.bac=10;G.run.st=0");ok(!run("bacPay(500,'thu')")&&run("G.run.bac")===10, 'không đủ: không trừ');
    run("delete G.run.bac;delete G.run._bacV1;G.run.st=7;run2()");ok(run("G.run.bac")===0&&run("G.run.st")===7, 'bản lưu cũ: bạc 0, giữ linh thạch');
    fresh("G.run.trait='none';G.run.the=[];G.run.kv=['gia_canh_kha_gia'];G.run.tue=null;tueInit(G.run);G.run.bac=0;G.run.st=0;");
    run("advanceTime(HY)");ok(run("G.run.bac")>=1650&&run("G.run.st")===0, 'tuế biến Gia Cảnh Khá Giả: phàm nhân nhận bạc, không nhận linh thạch ('+run("G.run.bac")+')');
  },
  // Đ3.2 quán phàm trả bạc; tâm pháp chép tay ở tạp hóa bán bằng bạc
  tien_quan() {
    fresh();
    const nid=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'||n.type==='thanh');G.run.at=n.id;openPlace(n.id);return n.id})()");
    const o=JSON.parse(run("JSON.stringify(venueOpts(nodeById(G.run.scene.id),'inn').find(x=>x.id==='phong'))"));
    ok(o.bac===12&&o.st===0, 'phòng trọ: 12 đồng, không tốn linh thạch '+JSON.stringify({bac:o.bac,st:o.st}));
    ok(run("venueOpts(nodeById(G.run.scene.id),'inn').some(x=>x.id==='giuong'&&x.bac===6)"), 'có giường tập thể 6 đồng');
    run("G.run.bac=100;G.run.st=0;G.run.hp=1");ok(run("venueDo('inn','an')")&&run("G.run.bac")===87, 'ăn một bữa: trừ 13 đồng ('+run("G.run.bac")+')');
    run("openPlace(G.run.at);G.run.bac=5;G.run.st=0");const no=run("venueOpts(nodeById(G.run.scene.id),'inn').find(x=>x.id==='phong').no");
    ok(no==='Không đủ tiền'&&!run("venueDo('inn','phong')")&&run("G.run.bac")===5, 'không tiền: khóa với chữ "Không đủ tiền"');
    run("openPlace(G.run.at);G.run.bac=0;G.run.st=1");ok(run("venueDo('inn','phong')")&&run("G.run.st")===0&&run("G.run.bac")===90000-12, 'thiếu bạc mà có linh thạch: đổi tự động');
    run("G.run.arts=(G.run.arts||[]).filter(a=>a.type!=='tp');G.run.relics=G.run.relics.filter(x=>!(x.k==='book'&&x.art&&x.art.type==='tp'));G.run.bac=1000;G.run.st=0;nodeById(G.run.at).shop=null;openShop(nodeById(G.run.at))");
    const it=JSON.parse(run("JSON.stringify(G.run.scene.items[0])"));ok(it.bac===800, 'tạp hóa: bản chép tay tâm pháp giá 800 đồng ('+it.bac+')');
    run("buy(0)");ok(run("G.run.scene.items[0].sold")&&run("G.run.bac")===200, 'phàm nhân kiếp đầu mua được tâm pháp bằng bạc');
    run("G.run.hp=1;G.run.bac=1000;G.run.st=0;G.run.scene.healed=0");ok(run("G.run.scene.healBac")===150, 'thầy lang cho phàm nhân: 150 đồng');run("healBuy()");ok(run("G.run.hp===S().maxHp&&G.run.bac===850"), 'trả bạc mời thầy lang');
    run("G.run.rootKnown=0;G.run.bac=10000;G.run.qitems=[];nodeById(G.run.at).shop=null;openShop(nodeById(G.run.at))");const k=run("G.run.scene.items.findIndex(x=>x.k==='qi'&&x.id==='trac_linh_thach')");
    ok(k>=0&&run(`G.run.scene.items[${k}].bac`)===9900, 'chưa trắc linh: phường thị bán Trắc Linh Thạch 9.900 đồng');
    run(`buy(${k})`);ok(run("G.run.qitems.includes('trac_linh_thach')")&&run("G.run.bac")===100, 'mua Trắc Linh Thạch bằng bạc');
  },
  // Đ3.3 tiền trang: mua 110 quan, bán 90 quan, tối đa ba viên mỗi tháng
  tien_trang() {
    fresh();
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='tientrang')"), 'thành có tiền trang');
    run("G.run.bac=300000;G.run.st=0");ok(run("venueDo('tientrang','mua')")&&run("G.run.st")===1&&run("G.run.bac")===190000, 'mua một viên: trừ 110 quan');
    ok(run("venueDo('tientrang','ban')")&&run("G.run.st")===0&&run("G.run.bac")===280000, 'bán một viên: nhận 90 quan');
    ok(run("venueDo('tientrang','mua')")&&!run("venueDo('tientrang','mua')")&&run("G.run.st")===1, 'tối đa ba viên mỗi tháng');
    run("advanceTime(HM)");ok(run("venueDo('tientrang','ban')"), 'sang tháng đổi lại được');
    run("G.run.bac=1000");ok(!run("venueDo('tientrang','mua')"), 'không đủ bạc thì không mua');
  },
  // Đ3.4 cống hiến theo thế lực: sổ tông A không dùng ở tông B; bản lưu cũ r.ch → sổ tông hiện tại
  tien_te() {
    fresh();
    const T=JSON.parse(run("JSON.stringify(W().regions.flatMap(R=>R.nodes).filter(n=>n.type==='tong').slice(0,2).map(n=>({id:n.id,s:n.owner||n.name})))"));
    ok(T.length===2&&T[0].s!==T[1].s, 'có hai sơn môn khác nhau: '+T.map(x=>x.s).join(' / '));
    run(`G.run.flags.tongmon=1;G.run.sectName=${JSON.stringify(T[0].s)};G.run.at=${JSON.stringify(T[0].id)};chAdd(chKey(),30)`);
    ok(run("chGet(chKey())")===30, 'đứng ở tông A: có 30 cống hiến');
    run(`G.run.at=${JSON.stringify(T[1].id)}`);ok(run("chGet(chKey())")===0, 'đứng ở tông B: không dùng được cống hiến tông A');
    ok(!run("needOk({need:{ch:10}})"), 'lựa chọn đòi cống hiến bị khóa ở tông B');
    run(`G.run.at=${JSON.stringify(T[0].id)}`);ok(run("needOk({need:{ch:10}})"), 'về tông A thì mở');
    run(`chLeave('sect:'+${JSON.stringify(T[0].s)});G.run.flags.tongmon=0`);ok(run("chGet(chKey())")===0&&run(`G.run.chMap['sect:'+${JSON.stringify(T[0].s)}].v`)===30, 'rời tông tự nguyện: sổ đóng, giữ số');
    run(`chLeave('sect:'+${JSON.stringify(T[0].s)},1)`);ok(run(`!G.run.chMap['sect:'+${JSON.stringify(T[0].s)}]`), 'bị trục xuất: xóa sổ');
    run(`G.run.flags.tongmon=1;G.run.chMap=null;delete G.run._chV1;G.run.ch=30;run2()`);
    ok(run(`G.run.chMap['sect:'+${JSON.stringify(T[0].s)}].v`)===30&&run("G.run.ch===undefined"), 'bản lưu cũ r.ch=30 → sổ tông hiện tại 30');
  },
  // Đ3.5 Thưởng Lệnh: nhận theo bậc nhiệm vụ, bỏ/trễ −1, bậc Thưởng Các, cửa hàng có giới hạn theo thành
  tien_thuong() {
    fresh();
    const nid=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);return n.id})()");
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='thuongcac')"), 'thành có bảng treo thì có Thưởng Các');
    run("openBoard(nodeById(G.run.at));takeQuest(0)");const q=JSON.parse(run("JSON.stringify(G.run.quests[0])"));ok(q.t0!=null, 'ghi lúc nhận việc');
    const g=run("tlQuest(G.run.quests[0])");run("G.run.thuongLenh=0;G.run.thuongTong=0");
    if(q.kind==='den')run(`G.run.at=G.run.quests[0].node;openPlace(G.run.at);questDo(G.run.quests[0].id)`);else run(`questWin(G.run.quests[0].id)`);
    run(`G.run.at=${JSON.stringify(nid)};openPlace(G.run.at)`);
    ok(run("G.run.thuongLenh")===g&&g>=2, 'xong sớm: nhận '+g+' thẻ (bậc + 1)');
    run("openBoard(nodeById(G.run.at));const b=nodeById(G.run.at).board;b.list.forEach(x=>x.taken=false);takeQuest(1)");const t1=run("G.run.thuongLenh");
    run("questCancel(G.run.quests.find(x=>x.state==='open').id)");ok(run("G.run.thuongLenh")===t1-1, 'bỏ nhiệm vụ: −1');
    run("G.run.quests=[];nodeById(G.run.at).board=null;openBoard(nodeById(G.run.at));takeQuest(0)");const t2=run("G.run.thuongLenh");run("G.run.qfix14=1;G.run.quests.find(x=>x.state==='open').due=W().t+1;advanceTime(5)");ok(run("G.run.thuongLenh")===Math.max(0,t2-1), 'trễ hạn: −1');
    // phàm nhân: thưởng nhiệm vụ bằng bạc
    run("G.run.pham=1;G.run.quests=[];nodeById(G.run.at).board=null;openBoard(nodeById(G.run.at));takeQuest(0);G.run.st=0;G.run.bac=0");const q2=JSON.parse(run("JSON.stringify(G.run.quests[0])"));
    run("questGive(G.run.quests[0])");ok(run("G.run.st")===0&&run("G.run.bac")===run("questRewardOf(G.run.quests[0]).st*TIEN.qBac"), 'phàm nhân nhận thưởng bằng bạc ('+run("G.run.bac")+' đồng)');
    ok(run("questRewardChips(G.run.quests[0]).some(c=>c.i==='🪙')"), 'bảng treo ghi thưởng bằng bạc cho phàm nhân');
    run("G.run.thuongTong=19");ok(run("tcBac()")===0, 'mười chín thẻ: Vô danh');run("G.run.thuongTong=20");ok(run("tcBac()")===1, 'hai mươi thẻ: Đồng bài');
    run("G.run.thuongTong=0;G.run.thuongLenh=100;G.run.pills=[];openPlace(G.run.at)");
    const i=run("THUONG_CAC.findIndex(x=>x.id==='kimcang')");ok(!run(`tcBuy(${i})`), 'Kim Cang Phù cần Đồng bài');
    const j=run("THUONG_CAC.findIndex(x=>x.id==='hoixuan')");let n=0;for(let k=0;k<6;k++)if(run(`tcBuy(${j})`))n++;
    ok(n===5&&run("G.run.thuongLenh")===90, 'Hồi Xuân Đan tối đa năm viên mỗi tháng ('+n+')');
    ok(run("tcList(nodeById(G.run.at)).every(x=>x.id!=='khai_linh_dan')")&&run("THUONG_CAC.some(x=>x.id==='manh_moi_co_duyen'&&x.p===60&&x.bac===4)"), 'bỏ Khai Linh Đan, có Manh mối cơ duyên');
    const lk=run("THUONG_CAC.findIndex(x=>x.id==='luong_kho')");run(`tcBuy(${lk})`);ok(run("G.run.qitems.includes('luong_kho')"), 'đổi lương khô');
  },
  // Đ3.6 ăn uống: phàm nhân không tiền, không lương khô ở hoang dã: 14 ngày còn sống, ngày 15 chết đói; Trúc Cơ tịch cốc
  com_ao() {
    const wild="(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&!n.dp);G.run.at=n.id;G.run.scene=null;G.run.moving=null;G.run.bac=0;G.run.st=0;G.run.qitems=[];G.run.anAcc=0;G.run.doi=0;G.run.hp=S().maxHp;})()";
    const wild0=wild;const fr=()=>{fresh(wild0);run('FEAT.an=1');};
    fr();ok(run("needFood(G.run)"), 'phàm nhân phải ăn');
    run("for(let i=0;i<14;i++)advanceTime(24)");ok(!!run("G.run")&&run("G.run.doi")===14, 'trôi 14 ngày: còn sống, đói 14 ngày ('+run("G.run&&G.run.doi")+')');
    ok(run("S().maxHp")<run("(()=>{const d=G.run.doi;G.run.doi=0;const m=S().maxHp;G.run.doi=d;return m})()"), 'đói lả: khí huyết tối đa giảm');
    ok(run("anRgMul()")<1, 'đang đói: hồi phục chậm');
    run("advanceTime(24)");ok(!run("G.run")&&run("G.over&&G.over.cause")==='doi'&&run("G.over.title")==='Chết đói', 'ngày 15: chết đói');
    fr();run("G.run.pham=0;G.run.realm=1");run("for(let i=0;i<100;i++)advanceTime(24)");ok(!!run("G.run")&&run("G.run.doi")===0, 'Trúc Cơ trôi 100 ngày: không đói');
    fr();run("G.run.qitems=['luong_kho'];advanceTime(5*24)");ok(run("G.run.doi")===0&&!run("G.run.qitems.includes('luong_kho')"), 'một gói lương khô đủ năm ngày');
    run("advanceTime(24)");ok(run("G.run.doi")===1, 'hết lương khô thì đói');
    fr();run("G.run.pham=0;G.run.realm=0;advanceTime(4*24)");ok(run("G.run.doi")===2, 'Luyện Khí ăn nửa phần: bốn ngày đói hai ('+run("G.run.doi")+')');
    fr();run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.bac=100;G.run.anMuc='thuong'})();advanceTime(3*24)");
    ok(run("G.run.doi")===0&&run("G.run.bac")===40, 'ở thành có bạc: tự mua cơm 20 đồng một ngày ('+run("G.run.bac")+')');
    fr();run("G.run.at=G.run.queAt;G.run.origin='nong';G.run.family=[{qh:'me',song:1}];advanceTime(20*24)");ok(run("G.run.doi")===0, 'ở quê còn người nhà: ăn cơm nhà');
    run("G.run.family[0].song=0;advanceTime(24)");ok(run("G.run.doi")===1, 'người nhà không còn: hết cơm nhà');
    fr();const qa=run("G.run.queAt");run("delete G.run._anV1;delete G.run.no;delete G.run.anTu;delete G.run.queAt;run2()");ok(run("G.run.no")===100&&run("G.run.anTu")===1, 'bản lưu cũ: no đủ, tự lo cơm');
    ok(run("G.run.queAt")===qa, 'bản lưu cũ: tìm lại nút quê theo tên');
    fr();run("G.run.anAcc=0;advanceTime(800*24)");ok(!run("G.run")&&run("G.over.cause")==='doi', 'nhảy dài 800 ngày không ăn: chết đói, không treo');
  },
  // Đ3.7 việc làm thuê: việc hợp nơi, tiền công bằng bạc, giới hạn 12 giờ mỗi ngày, điều kiện, nhật ký viec.xong
  viec_thue() {
    fresh();
    ok(run("VIEC_THUE.length")===14, 'đủ mười bốn việc');
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);G.run.bac=0;})()");
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='muusinh')"), 'thành có nút tìm việc');
    const L=JSON.parse(run("JSON.stringify(vtList(nodeById(G.run.at)).map(x=>x.id))"));ok(L.includes('boc_vac')&&L.includes('phu_khuan')&&!L.includes('dao_mo'), 'việc hợp nơi: '+L.join(','));
    run("G.run.lamNgay=null");const t0=run("W().t");ok(run("vtDo('phu_khuan')")&&run("G.run.bac")>=23&&run("W().t")-t0===8, 'khiêng kiệu tám giờ: công '+run("G.run.bac")+' đồng');
    ok(run("NK.count('viec.xong')")===1, 'nhật ký viec.xong');
    ok(!run("vtDo('phu_khuan')"), 'đã làm tám giờ: không làm thêm tám giờ trong ngày');
    run("G.run.lamNgay=null;G.run.base.ngo=1;G.run.bon.ngo=-50");ok(!!run("vtList(nodeById(G.run.at)).find(x=>x.id==='chep_sach').why"), 'chép sách cần ngộ tính');
    run("G.run.bon.ngo=0");
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tong');G.run.at=n.id;openPlace(n.id);G.run.bac=0;FEAT.an=1;G.run.doi=0;})()");
    const t1=run("W().t");ok(run("vtDo('tap_dich')")&&run("G.run.bac")===330&&run("W().t")-t1===720&&run("G.run.doi")===0, 'tạp dịch ngoại môn ba mươi ngày: một lượng, được ăn ở');
    run("FEAT.an=0");
  },
  // Đ3.8 gia đình cơ bản: cha mẹ, anh chị em theo xuất thân; mồ côi thì không; người già có thể mất mỗi năm
  gia_dinh() {
    fresh();
    const mk=o=>run(`(()=>{genBirth();const c=Object.assign({},G.birth.cards[0],{origin:'${o}',hc:null});newRun(c);return JSON.stringify(G.run.family)})()`);
    const F=JSON.parse(mk('nong'));ok(F.some(x=>x.qh==='cha')&&F.some(x=>x.qh==='me')&&F.length<=5, 'con nhà nông có cha mẹ: '+F.map(x=>x.qh+' '+x.tuoi).join(', '));
    const ho=run("gdHo(G.run.ten)");ok(F.find(x=>x.qh==='cha').ten.startsWith(ho), 'cha cùng họ');
    ok(JSON.parse(mk('khat')).length===0, 'khất cái: không người nhà');
    ok(JSON.parse(mk('mieu')).length===0, 'bị bỏ ở miếu: không người nhà');
    run("G.run.family=[{ten:'A',qh:'cha',tuoi:70,suc:'benh',thai:'thuong',song:1,lc:0},{ten:'B',qh:'em',tuoi:10,suc:'khoe',thai:'thuong',song:1,lc:0}];NK.clear()");
    run("G.run.lifeAdj=500;advanceTime(30*HY)");ok(run("G.run.family[1].tuoi")===40, 'mỗi năm thêm một tuổi ('+run("G.run.family[1].tuoi")+')');
    ok(run("G.run.family[0].song")===0&&run("NK.count('gd.tang')")>=1, 'người già mất, có tin tang');
    run("delete G.run.family;delete G.run._gdV1;run2()");ok(run("Array.isArray(G.run.family)"), 'bản lưu cũ: có danh sách người nhà');
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
for (const k of (names.length ? names : Object.keys(TESTS).filter(k=>k!=='smoke'))) {
  if (!TESTS[k]) { console.log('Không có bài: ' + k); fails++; continue; }
  cur = k; console.log('▶ ' + k); const f0 = fails;
  try { TESTS[k](); } catch (e) { fails++; console.log('   ✗ NGOẠI LỆ: ' + e.message.split('\n')[0]); }
  if (SHOWLOG || fails > f0) { try { console.log('   --- nhật ký ---\n' + run('NK.dump(25)').split('\n').map(l => '   ' + l).join('\n')); } catch (e) {} }
}
console.log(fails ? `\n${fails} lỗi` : '\nTất cả đạt'); process.exit(fails ? 1 : 0);
