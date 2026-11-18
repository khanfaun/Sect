// ĐỢT 1.7: hạt quả chín (nhân quả đến trễ) và sổ Nghiệp Duyên.
// Hạt nằm ở r.qc (không lẫn vào r.seeds vì mã cũ coi mọi hạt seeds là người có tên).
function deedName(id){const k='deed.'+id;return CONTENT_TEXT[k]!=null?contentText(k):'';}
function nqSeed(id,o){const r=G.run;if(!r)return;o=o||{};r.qc=r.qc||[];
  r.qc.push({t:'qc',id,ai:o.ai||'',due:W().t+ri(6,18)*HM,done:0,at:W().t});dbg('nq.seed',{id});}
function qcDue(r){r=r||G.run;return r?(r.qc||[]).filter(s=>!s.done&&W().t>=s.due):[];}
function qcLeft(r){r=r||G.run;return r?(r.qc||[]).filter(s=>!s.done):[];}
function qcRipen(s){const r=G.run;if(!r||!s)return;const ev=(typeof KYNGO!=='undefined')&&KYNGO.find(x=>x.id==='qc_'+s.id);
  if(ev){if(r.scene||G.screen!=='map')return;s.done=1;kyStart(ev);}
  else{s.done=1;log(contentText('nq.qc.log',[deedName(s.id)||s.id]));}
  dbg('nq.qc',{id:s.id,ev:!!ev});}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(!r||!(h>0))return o;
  r.qcAcc=(r.qcAcc||0)+h;if(r.qcAcc>=HM){r.qcAcc=0;for(const s of qcDue(r)){if(!G.run)break;qcRipen(s);}
    if(G.run&&G.run.qc)G.run.qc=G.run.qc.filter(s=>!s.done);}
  return o;};}
// sổ nghiệp duyên cho giao diện: mới nhất trước, không có số
function nqSo(n){const r=G.run;if(!r)return [];nqInit(r);return r.ng.so.slice().reverse().slice(0,n||80).map(x=>({y:x.y,t:deedName(x.id)||x.why||deedName('legacy'),k:contentText('nq.so.'+(x.k==='G'?'G':'B'))}));}
// khi chết: hạt chưa chín sang kiếp sau (W().qcLeft) và hiện trên màn hết kiếp
{const _d=die;die=function(){const r=G.run;let L=[];if(r){L=qcLeft(r).map(s=>({id:s.id,ai:s.ai,qc:1,who:r.ten}));const w=W();w.qcLeft=(w.qcLeft||[]).concat(L).slice(-20);}
  const res=_d.apply(this,arguments);if(G.over)G.over.qc=L.map(x=>deedName(x.id)||x.id);return res;};}
