// ĐỢT 1.9: hoàn cảnh đầu thai theo nghiệp duyên kiếp trước (đọc theo BẬC: NQ_BAC_HC, content/rules/nghiep.js).
{const _d=die;die=function(){const r=G.run;if(r&&G.meta){G.meta.lastNq={B:ngB(r),G:ngG(r)};dbg('nq.lastNq',G.meta.lastNq);}return _d.apply(this,arguments);};}
// xác suất [bấp bênh, được nâng đỡ] cho kiếp tới
function hcRate(){const L=(G.meta&&G.meta.lastNq)||{B:0,G:0};const net=clamp(ngBac(L.G)-ngBac(L.B),-5,5);let [bap,nang]=NQ_BAC_HC[String(net)]||[0.25,0.25];
  const s=bap+nang;if(s>0.9){bap*=0.9/s;nang*=0.9/s;}return {bap,nang,net};}
function hcPickOrigin(grp){const L=ORIGIN.filter(o=>(o.grp||'thuong')===grp);return L.length?pick(L):null;}
{const _gb=genBirth;genBirth=function(){const res=_gb.apply(this,arguments);if(!feat('nq')||!G.birth)return res;const R=hcRate();
  for(const c of G.birth.cards){const x=RS?RS():Math.random();c.hc=x<R.bap?'bap':x<R.bap+R.nang?'nang':'binh';
    const grp=c.hc==='bap'?'kho':c.hc==='nang'?'kha':'thuong';const og=ORIGIN.find(o=>o.id===c.origin);
    if(!og||(og.grp||'thuong')!==grp){const o2=hcPickOrigin(grp);if(o2)c.origin=o2.id;}}
  dbg('nq.hc',{net:R.net,bap:R.bap,cards:G.birth.cards.map(c=>c.hc).join(',')});return res;};}
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r&&c&&c.hc){r.hc=c.hc;if(c.hc==='bap')r.st=Math.round(r.st*0.75);else if(c.hc==='nang')r.st=Math.round(r.st*1.25);}return res;};}
