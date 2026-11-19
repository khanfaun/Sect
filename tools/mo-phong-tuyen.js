// Đ9 (rà soát): mô phỏng mọi tuyến (content/tuyen, qua TUYEN_DATA đã ghép) tới đủ các kết.
// Chạy: node tools/mo-phong-tuyen.js [OR02 DL01 …] [--chi-tiet]
// 1) Dò tĩnh: duyệt mọi đường chọn (mỗi nút: từng lựa chọn mở được theo dấu + tự diễn), đại lộ chạy hai kiểu (đủ hồi 1 / bỏ hồi 1).
//    Báo: kết không tới được, lựa chọn không bao giờ mở, điều kiện không thể thỏa (vật không ai trao, phàm + cảnh giới…).
// 2) Chạy thật trong game: mỗi kết đi theo một đường mẫu bằng bộ máy thật (tuyenTick / tuyenGap / kyPick) — kẹt, sai nút, chữ còn mã {…}.
// 3) Vai / nơi: người tìm tới mà nơi hẹn khác nơi của vai; tin đồn ở nơi quá xa so với hạn; đại lộ kể trùng tuyến xuất thân.
// Lỗi (✗) là bộ máy hoặc nội dung chắc chắn hỏng; cảnh báo (⚠) cần người đọc xét.
const vm=require('vm');
function moPhong(ids,opt){opt=opt||{};
  const core=require('./ghep').script(['core','core2','data']);
  const ctx=vm.createContext({console,Math,JSON,Date,performance:{now:()=>Date.now()}});vm.runInContext(core,ctx,{filename:'core.js'});
  const run=c=>vm.runInContext(c,ctx,{timeout:20000});
  let seed=4100;const fresh=()=>run(`(()=>{GEO=null;RS=mul(16717);const o=genWorld;genWorld=()=>o(${++seed});
    try{G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);}finally{genWorld=o;}
    G._ngNoEv=1;NK.on=false;G.run.scene=null;G.run.rootKnown=1;FEAT.an=0;FEAT.nc=0;FEAT.no=0;FEAT.nha=0;FEAT.truy=0;G.run.bac=5e6;})()`);
  fresh();
  const DATA=JSON.parse(run('JSON.stringify(TUYEN_DATA)'));const VAI=JSON.parse(run('JSON.stringify(VAI_NP)'));const QI=new Set(JSON.parse(run('JSON.stringify(CAT.qitems.map(x=>x.id))')));
  const loi=[],cb=[],tk={tuyen:0,ket:0,ketToi:0,chay:0,chayOk:0};const L=(id,m)=>loi.push(id+': '+m),W_=(id,m)=>cb.push(id+': '+m);
  const sel=ids&&ids.length?DATA.filter(a=>ids.includes(a.id)):DATA;
  const hasAll=(F,a)=>(a||[]).every(f=>F.has(f)),hasNone=(F,a)=>!(a||[]).some(f=>F.has(f));
  const dkDau=(dk,F)=>!dk||(hasAll(F,dk.dau)&&hasNone(F,dk.khongDau));
  // ---------- dò tĩnh ----------
  function do_(A,i0){const nut=A.nut;let lv=new Map([['',{F:new Set(),p:[]}]]);const moC={};const vatCo=new Set();
    for(let i=i0;i<nut.length;i++){const N=nut[i],nx=new Map();
      for(const {F,p} of lv.values()){const opts=[];
        if(!dkDau(N.dk,F))opts.push({id:'~',dau:(N.tuDien||{}).dau});// nút khoá theo dấu → tự diễn
        else{for(const c of N.cach)if(dkDau(c.dk,F)){opts.push({id:c.id,dau:c.dau});moC[N.id+'.'+c.id]=1;}opts.push({id:'~',dau:(N.tuDien||{}).dau});}
        for(const o of opts){const F2=new Set(F);for(const f of o.dau||[])F2.add(f);const k=[...F2].sort().join(',');if(!nx.has(k))nx.set(k,{F:F2,p:p.concat([o.id])});}}
      lv=nx;for(const c of N.cach)if(c.e&&c.e.vatPham)[].concat(c.e.vatPham).forEach(x=>vatCo.add(x));}
    const ket={};for(const K of A.ket)for(const {F,p} of lv.values())if(dkDau(K.dk,F)&&!ket[K.id])ket[K.id]=p;
    let ngoai=null;for(const {F,p} of lv.values())if(!A.ket.some(K=>dkDau(K.dk,F))){ngoai=p;break;}
    return {ket,moC,ngoai,vatCo};}
  // ---------- chạy thật một đường ----------
  function chay(A,i0,path,kid){fresh();const S0=run(`(()=>{const r=G.run;r.arc=null;tySt(r);r.pham=0;r.realm=1;r.birthAge=(r.birthAge||16)-30;
      ${A.loai==='xuat_than'?`r.origin=${JSON.stringify(A.xuatThan)};tuyenTick();return !!(r.arc.xt&&r.arc.xt.id===${JSON.stringify(A.id)});`
      :`r.arc.xt={id:'__',xong:1,ket:${i0?"'A'":"'ngoai'"}};return tyDlStart(${JSON.stringify(A.id)});`}})()`);
    if(!S0)return 'không mở được tuyến';const sv=A.loai==='xuat_than'?'G.run.arc.xt':'G.run.arc.dl';
    if(run(sv+'.i')!==i0)return 'mở ở nút '+run(sv+'.i')+' (mong '+i0+')';
    for(let i=i0;i<A.nut.length;i++){const N=A.nut[i],pick=path[i-i0];
      let k=0;while(run(`${sv}.han==null&&${sv}.i===${i}`)&&k++<200)run('W().t+=HM;tuyenTick()');
      if(run(sv+'.i')!==i){if(pick==='~'&&run(sv+'.i')===i+1)continue;return N.id+': nút tự trôi qua (điều kiện nút không thỏa?)';}
      if(run(sv+'.han')==null)return N.id+': chờ hai trăm tháng vẫn không mở';
      if(pick==='~'){run(`W().t=${sv}.han+1;tuyenTick()`);if(run(sv+'.i')!==i+1&&!run(sv+'.xong'))return N.id+': lỡ hạn mà không tự diễn';continue;}
      const j=N.cach.findIndex(c=>c.id===pick);const c=N.cach[j];const dk=c.dk||{};
      const LM=N.loiMoi||{};run(`(()=>{const r=G.run;r.scene=null;${LM.noi&&LM.noi!=='here'?`const n=anchorNode(${JSON.stringify(LM.noi)});if(n)r.at=n.id;`:''}
        ${dk.pham===true?'r.pham=1;r.realm=0;':''}${dk.canhGioiTu!=null?`r.pham=0;r.realm=Math.max(r.realm||0,${dk.canhGioiTu});`:''}
        ${(dk.vatPham||[]).map(x=>`if(!hasItem(${JSON.stringify(x)}))applyE({item:${JSON.stringify(x)}});`).join('')}
        ${dk.linhThachTu?Object.entries(dk.linhThachTu).map(([q,n])=>`ltAdd(LT_KEY.${q},${n},'test');`).join(''):''}})()`);
      if(LM.noi&&LM.noi!=='here'&&!run(`!!anchorNode(${JSON.stringify(LM.noi)})`))return N.id+': không có nút neo cho '+LM.noi;
      run('tuyenGap(true)');const ev=run('G.run.scene&&G.run.scene.ev');if(ev!=='tuyen:'+A.id+':'+N.id)return N.id+': không hiện lời mời (thấy '+ev+')';
      const tx=run('G.run.scene.text');if(/\{|undefined|NaN/.test(tx))return N.id+': chữ còn mã "'+tx.match(/\{[^}]*\}|undefined|NaN/)[0]+'"';
      const no=run(`kyOpts(G.run.scene)[${j}].no`);if(no)return N.id+'.'+pick+': lựa chọn bị khoá trong game ("'+no+'")';
      run(`kyPick(${j})`);const rt=run('G.run.scene&&G.run.scene.res&&G.run.scene.res.t||""');if(/\{|undefined/.test(rt))return N.id+'.'+pick+': lời kết quả còn mã';run('G.run.scene=null');
      if(!run(`${sv}.i>${i}||${sv}.xong`))return N.id+'.'+pick+': chọn xong mà không sang nút sau';}
    if(run(sv+'.chonKet')){run('G.run.scene=null;tuyenGap(true)');const ten=run(`G.run.scene&&KYNGO.find(x=>x.id===G.run.scene.ev).c.map(c=>c.l)`)||[];
      const want=run(`tyT(${JSON.stringify((A.ket.find(K=>K.id===kid)||{}).ten||'')})`);const j=ten.indexOf(want);if(j<0)return 'không thấy kết '+kid+' trong hộp chọn kết';run(`kyPick(${j});G.run.scene=null`);}
    const got=run(sv+'.ket');if(!run(sv+'.xong'))return 'đi hết năm nút mà tuyến chưa xong';if(got!==kid)return 'ra kết '+got+' (mong '+kid+')';return '';}
  // ---------- rà từng tuyến ----------
  for(const A of sel){tk.tuyen++;
    const modes=A.loai==='dai_lo'&&A.nut[0].boQuaNeuXuatThan?[0,1]:[0];
    for(const i0 of modes){const R=do_(A,i0);const tag=i0?' (đại lộ mở từ hồi 2)':'';
      for(const K of A.ket){if(!i0)tk.ket++;if(R.ket[K.id]){if(!i0)tk.ketToi++;}else (i0?W_:L)(A.id,'kết '+K.id+' "'+K.ten+'" không đường nào tới'+tag+' (cần dấu '+JSON.stringify(K.dk.dau)+(K.dk.khongDau?' và không '+JSON.stringify(K.dk.khongDau):'')+')');}
      if(!i0)for(const N of A.nut)for(const c of N.cach)if(!R.moC[N.id+'.'+c.id])L(A.id,N.id+'.'+c.id+' không bao giờ mở được (dấu cần chưa ai đặt trước nút này)');
      if(!i0&&!R.ngoai&&opt.chiTiet)W_(A.id,'mọi đường đều ra một kết (không có kết đứng ngoài)');
      // điều kiện ngoài dấu: vật phải có người trao trước, phàm + cảnh giới, linh thạch với phàm
      const allDk=[A.mo&&A.mo.dk,...A.nut.flatMap(N=>[N.dk,...N.cach.map(c=>c.dk)]),...A.ket.map(K=>K.dk)].filter(Boolean);
      if(!i0)for(const dk of allDk){for(const x of dk.vatPham||[])if(!R.vatCo.has(x)&&String(x).startsWith('vt_'))L(A.id,'đòi vật "'+x+'" nhưng trong tuyến không lựa chọn nào trao');
        if(dk.pham===true&&dk.canhGioiTu!=null)L(A.id,'điều kiện vừa đòi phàm nhân vừa đòi cảnh giới');if(dk.tuoiDen!=null&&dk.tuoiDen<(A.mo&&A.mo.tuoiTu||16))L(A.id,'tuoiDen '+dk.tuoiDen+' nhỏ hơn tuổi mở tuyến');
        if(dk.vaiMat&&dk.vaiMat.length&&!A.nut.some(N=>N.cach.some(c=>c.e&&dk.vaiMat.includes(c.e.giet))))W_(A.id,'đòi '+dk.vaiMat.join(',')+' đã mất mà tuyến không có đường giết: chỉ thỏa khi người ấy chết tự nhiên');
        if(dk.clkDang)W_(A.id,'đòi đồng hồ '+dk.clkDang.join(',')+' đang diễn ra: chỉ thỏa đúng lúc');}
      // chạy thật mỗi kết (và một đường đứng ngoài)
      if(opt.chay!==false){const want=Object.entries(R.ket);if(R.ngoai)want.push(['ngoai',R.ngoai]);
        for(const [kid,p] of want){tk.chay++;let m;try{m=chay(A,i0,p,kid);}catch(e){m='lỗi chạy: '+e.message;}
          if(m)L(A.id,'chạy thật'+tag+' đường '+p.join('>')+' → '+kid+': '+m);else tk.chayOk++;}}}
    // vai / nơi
    A.nut.forEach((N,i)=>{const LM=N.loiMoi||{};const P=LM.vai&&VAI[LM.vai];
      if(P&&LM.cach!=='nguoi'&&LM.noi&&LM.noi!=='here'&&P.noi!==LM.noi)W_(A.id,N.id+': '+LM.vai+' ('+P.vai+', ở '+P.noi+') giao việc ở '+LM.noi+' — xem có đúng vai không');
      for(const m of (N.mo+' '+(N.thayThe||'')).matchAll(/\{(NP\d\d)\}/g))if(LM.vai&&m[1]!==LM.vai&&m[1]==='NP30')W_(A.id,N.id+': nhắc NP30 (ký ức kết tụ) như người sống');});
  }
  // tin đồn quá xa so với hạn (đo đi bộ của Luyện Khí tầng thấp, từ nơi hẹn nút trước)
  fresh();run('G.run.pham=0;G.run.realm=0');
  for(const A of sel){let prev=null;A.nut.forEach((N,i)=>{const LM=N.loiMoi||{};const noi=LM.noi&&LM.noi!=='here'?LM.noi:null;if(!noi)return;
    if(prev&&prev!==noi){const h=run(`(()=>{const a=anchorNode(${JSON.stringify(prev)}),b=anchorNode(${JSON.stringify(noi)});return a&&b?travelHours([a.id,b.id]):-1;})()`);
      const m=((N.cho||{}).nam||0)*12+((N.cho||{}).thang||0)+((N.han||{}).nam||0)*12+((N.han||{}).thang||0);if(h>0&&h/720>m*0.6+Math.min(36,h/720))W_(A.id,N.id+': từ '+prev+' tới '+noi+' đi bộ chừng '+Math.round(h/24)+' ngày, mà chờ + hạn chỉ '+m+' tháng');}
    prev=noi;});}
  // đại lộ kể trùng tuyến xuất thân gợi ý nó (giống chữ trong đoạn mở)
  const big=s=>{const w=String(s).toLowerCase().replace(/\{[^}]*\}/g,' ').split(/[^\p{L}]+/u).filter(Boolean);const S=new Set();for(let i=0;i+2<w.length;i++)S.add(w[i]+' '+w[i+1]+' '+w[i+2]);return S;};
  const jac=(a,b)=>{let n=0;for(const x of a)if(b.has(x))n++;return n/Math.max(1,Math.min(a.size,b.size));};
  for(const D of sel.filter(a=>a.loai==='dai_lo'))for(const X of DATA.filter(a=>a.loai==='xuat_than'&&(a.goiYDaiLo||[]).includes(D.daiLo)))
    D.nut.forEach(N=>X.nut.forEach(M=>{const s=jac(big(N.mo),big(M.mo));if(s>=0.15)W_(D.id,N.id+' giống '+X.id+'.'+M.id+' ('+Math.round(s*100)+'% cụm ba chữ) — kiểm khacVoi');}));
  return {loi,cb,tk};}
module.exports={moPhong};
if(require.main===module){const a=process.argv.slice(2);const r=moPhong(a.filter(x=>!x.startsWith('-')),{chiTiet:a.includes('--chi-tiet')});
  for(const c of r.cb)console.log('  ⚠ '+c);for(const l of r.loi)console.log('  ✗ '+l);
  console.log(`\n${r.tk.tuyen} tuyến; kết tới được ${r.tk.ketToi}/${r.tk.ket}; chạy thật ${r.tk.chayOk}/${r.tk.chay} đường đạt; ${r.loi.length} lỗi, ${r.cb.length} cảnh báo.`);
  if(r.loi.length)process.exitCode=1;}
