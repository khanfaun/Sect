// Người chơi máy cho Phù Sinh 2.
// Nạp khối lõi + dữ liệu từ src/game/ (không nạp giao diện), tự chơi bằng cách gọi thẳng hàm lõi.
// Chạy: node bot.js [số_kiếp] [--same-world] [--quiet] [--boost] [--smart]
// --smart: chiến lược có ưu tiên (sống sót > đột phá > tu luyện > tích luỹ > tiến vùng > tranh cơ duyên > khám phá), xem tools/bot-smart.js.
// --boost: cấp thêm linh thạch và hồi máu để bot sống lâu, đi sâu hơn (thử các tính năng ở cảnh giới và vùng cao).
// Cuối bản in có "Độ phủ tính năng": các tính năng bot đã/chưa từng chạy tới.
const fs=require('fs'),vm=require('vm'),path=require('path');
// Nạp thẳng từ src/game/: phần luật chơi (core, core2) và dữ liệu (data), không nạp giao diện.
const core=require('./tools/ghep').script(['core','core2','data']);
const ctx=vm.createContext({console,Math,JSON,Date,performance:{now:()=>Date.now()}});
vm.runInContext(core,ctx,{filename:'core.js'});
const run=(code)=>vm.runInContext(code,ctx);

const LIVES=+(process.argv[2]||200);
const QUIET=process.argv.includes('--quiet');
const BAD=/[{}\[\]]|undefined|NaN|null/;
const stats={early:{},lives:0,cause:{},maxRegion:[0,0,0,0,0],maxRealm:[0,0,0,0,0,0],errors:[],bad:[],steps:0,crossed:0,tvMinor:0,tvTotal:0,wins:0,fights:0,deadFights:0,bossKills:0,ages:[],years:[]};

run(fs.readFileSync(path.join(__dirname,'src','game','dev','01-bot-loi.js'),'utf8')); // não bot: dùng chung với nút Dev test

function scanTexts(){
  const t=run('botTexts()');
  for(const x of t){if(BAD.test(x)){if(stats.bad.length<30)stats.bad.push(x.slice(0,200));}}
}
const SAME=process.argv.includes('--same-world');const DBG=process.argv.includes('--debug');const BOOST=process.argv.includes('--boost');let lastSnap='';
run(fs.readFileSync(path.join(__dirname,'tools','bot-ext.js'),'utf8'));
if(process.argv.includes('--smart'))run(fs.readFileSync(path.join(__dirname,'tools','bot-smart.js'),'utf8'));
run('G={meta:newMeta(),run:null,birth:null,over:null,screen:"title"};');
// đếm đồ nhận được lúc đầu game (phàm nhân, Luyện Khí): pháp bảo, trang bị, bí tịch
run(`function botEarlyRel(){const r=G.run;const o={};if(!r)return '{}';const L=r.relics.concat(Object.values(r.eq||{}).filter(Boolean),(r.dd||[]).map(d=>d.rel));
  for(const x of L){if(!x||x._bs)continue;x._bs=1;if(r._bsInit&&(r.pham||r.realm===0)){const k=x.k==='book'?'bí tịch':(typeof isPB==='function'?isPB(x):slotOf(x)==='phapbao')?'pháp bảo':'trang bị';o[k]=(o[k]||0)+1;if(k==='pháp bảo')o['PB:'+x.name+'|req'+relReq(x)+'|'+(x.cid||x.u||'sinh')]=1;}}
  r._bsInit=1;return JSON.stringify(o);}`);
let life=0,stepsLife=0;
const t0=Date.now();
while(life<LIVES){
  try{
    const scr=run('G.screen');
    if(scr==='over'||scr==='title'||scr==='meta'||!run('!!G.run')){
      if(scr==='over'){
        if(DBG)console.log('kiếp',life+1,'trước khi chết:',lastSnap);
        const L=run('G.over.life');const c=run('G.over.cause');stats.cause[c]=(stats.cause[c]||0)+1;stats.ages.push(L.tuoi);life++;const rn=L.realm.replace(/^(Nhân|Địa|Thiên) Đạo /,'');stats.rc=stats.rc||{};stats.rc[rn]=(stats.rc[rn]||0)+1;stats.rg=stats.rg||[0,0,0,0,0];stats.rg[L._mr||0]++;
      }
      if(!SAME&&life%25===0&&life>0&&scr==='over')run('G.meta=newMeta();');
      if(life>=LIVES)break;
      run('G.over=null;genBirth();newRun(G.birth.cards[Math.floor(Math.random()*G.birth.cards.length)]);');stepsLife=0;continue;
    }
    if(BOOST)run('botBoost()');run('botManage();if(G.run){if(G.run.scene)botScene();else botPlan();}'); // chết trong lúc quản lý (làm thuê, đi đường…) là chết thường, không phải lỗi
    if(DBG&&run('!!G.run'))lastSnap=run('JSON.stringify({pham:!!G.run.pham,tp:typeof tuArt==="function"&&tuArt()?tuArt().n:null,tv:Math.round(G.run.tv),ll:Math.round(G.run.ll||0),age:Math.floor(G.run.age),realm:G.run.realm,bt:typeof canBreak==="function"&&canBreak(),noi:(G.run.llP||[]).length,nguoi:(G.run.llN||[]).length,dich:Object.keys(G.run.llSeen||{}).length,tran:Object.values(G.run.llSeen||{}).reduce((a,b)=>a+b,0),soNoi:regionOf(G.run.region).nodes.length,bq:typeof bqCan==="function"?bqCan():"",goal:G.run._goal,khihai:(G.run.chu||[]).filter(Boolean).length,arts:(G.run.arts||[]).map(a=>a.type).join("")})');
    stats.steps++;stepsLife++;
    if(run('!!G.run')){
      scanTexts();
      {const e=JSON.parse(run('botEarlyRel()'));for(const k in e)stats.early[k]=(stats.early[k]||0)+e[k];}
      const mr=run('G.run.region'),re=run('G.run.realm');stats.maxRegion[mr]=Math.max(1,stats.maxRegion[mr]);
      
    }
    if(stepsLife>30000){stats.errors.push('kiếp kẹt quá 30000 bước: '+run('JSON.stringify({sc:G.run&&G.run.scene&&G.run.scene.type,at:G.run&&G.run.at,mv:G.run&&G.run.moving})'));run('die("toahoa")');}
  }catch(e){
    stats.errors.push(String(e.message)+' @ '+(String(e.stack||'').split('\n').filter(l=>/^\s+at /.test(l)).slice(0,3).map(l=>l.trim().slice(0,90)).join(' < ')));
    if(stats.errors.length>20)break;
    try{run('if(G.run)die("toahoa");else G.screen="title";');}catch(e2){run('G.run=null;G.screen="title";');}
  }
}
// thống kê thêm từ tiểu sử
const lives=run('G.meta.lives');
const sz=Buffer.byteLength(run('JSON.stringify({meta:G.meta,run:G.run})'));
const realmCount={};for(const L of lives){realmCount[L.realm]=(realmCount[L.realm]||0)+1;}
console.log('Số kiếp:',life,'| bước:',stats.steps,'| thời gian:',((Date.now()-t0)/1000).toFixed(1)+'s');
console.log('Nguyên nhân chết:',stats.cause);
console.log('Đồ nhận lúc đầu game (phàm nhân, Luyện Khí), cộng mọi kiếp:',stats.early);
console.log('Cảnh giới khi chết:',stats.rc);console.log('Vùng xa nhất mỗi kiếp (vùng 1..5):',stats.rg);
console.log('Vùng xa nhất từng tới:',run('G.meta.lives.length'),'kiếp; vùng có mặt:',stats.maxRegion.map((x,i)=>x?i:null).filter(x=>x!=null).join(','));
console.log('Tuổi chết trung bình:',(stats.ages.reduce((a,b)=>a+b,0)/Math.max(1,stats.ages.length)).toFixed(1));
console.log('Năm thế giới hiện tại:',run('tYear(W().t)'),'| cỡ bản lưu:',(sz/1024).toFixed(1)+' KB');
if(stats.bad.length){console.log('CHUỖI LỖI ('+stats.bad.length+'):');stats.bad.forEach(x=>console.log('  ',x));}
if(stats.errors.length){console.log('LỖI ('+stats.errors.length+'):');stats.errors.slice(0,10).forEach(x=>console.log('  ',x));}
if(typeof run('typeof botReport')==='string'&&run('typeof botReport')==='function')console.log(run('botReport()'));
process.exitCode=(stats.errors.length||stats.bad.length)?1:0;
