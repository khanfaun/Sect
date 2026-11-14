// ================= THƯƠNG THẾ 3 BẬC =================
// Nhẹ: thua trận vẫn sống (gục). Nặng: thua có WT_DIE phần chết. Nguy kịch: thua là chết.
// Vết thương nặng tự lành (không chữa bằng đan hay y sư) thì có WT_PERM phần thành tật vĩnh viễn.
const WT_LV={ngoai:1,bong:1,doc:1,gay:2,noi:2,than:2,nguy:3};
const WT_NAME=['','nhẹ','nặng','nguy kịch'],WT_DIE=0.4,WT_PERM=0.15;
function woundLv(){let m=0;for(const x of wounds())if(!x.perm)m=Math.max(m,WT_LV[x.k]||1);return m;}
{const _wt=woundText;woundText=function(x){const lv=x.perm?0:WT_LV[x.k]||1;return (lv?'Mức '+WT_NAME[lv]+'. ':'')+_wt(x);};}
// gục thay vì chết: thương nhẹ luôn sống, thương nặng có may rủi
{const _ce=checkEnd;checkEnd=function(sc){
  if(!sc.over&&!sc.spar&&!sc.kiep&&sc.en&&sc.en.n!=='Tâm Ma'){const me=mainUnit(sc);
    if(me&&me.hp<=0&&injured()){const lv=woundLv();const live=lv<=1||(lv===2&&!chance(WT_DIE));
      dbg('wound.lose',{lv,live});
      if(live){me.hp=1;sc.over='lose';sc.beaten=1;clog(sc,lv<=1?'Ngươi gục xuống. Thương cũ còn nhẹ, may mà giữ được mạng.':'Ngươi gục xuống, thương cũ vỡ ra. Vẫn còn thoi thóp.','en');finishCombat(sc);return;}}}
  _ce(sc);};}
// thương nặng tự lành: có thể thành tật
const WT_SCAR={gay:['que','cut'],than:['mu'],noi:['que']};
{const _wk=woundTick;woundTick=function(){const r=G.run;if(!r)return _wk();const t=W().t;
  const due=(r.wounds||[]).filter(x=>x.until&&x.until<=t&&WT_LV[x.k]===2&&!x.treated).map(x=>x.k);
  _wk();if(!G.run)return;
  for(const k of due)if(chance(WT_PERM)){const p=pick(WT_SCAR[k]);if(!wounds().some(x=>x.k===p)){addWound(p);note(WOUND[k].n+' không được chữa, để lại tật: '+WOUND[p].n.toLowerCase()+'.','dn');log('Thương không chữa thành tật: '+WOUND[p].n+'.');dbg('wound.scar',{from:k,to:p});}}};}
// chữa bằng y sư/đan: đánh dấu đã chữa (giảm thời gian thì không còn nguy cơ thành tật)
{const _hb=healBuy;healBuy=function(){const st=G.run&&G.run.st;const x=_hb.apply(this,arguments);if(G.run&&G.run.st<st)for(const w of wounds())w.treated=1;return x;};}
{const _up=usePill;usePill=function(idx,c){const p=G.run.pills[idx];const id=p&&p.id;const x=_up.apply(this,arguments);if(G.run&&id&&HEAL_PILL.includes(id))for(const w of wounds())if(WT_LV[w.k]===2)w.treated=1;return x;};}
// lời báo sau trận theo bậc
{const _fc=finishCombat;finishCombat=function(sc){const x=_fc.apply(this,arguments);if(sc&&sc.wounded&&!sc._wlv&&G.run){sc._wlv=1;const lv=woundLv();if(lv)clog(sc,'Thương thế mức '+WT_NAME[lv]+(lv===1?': thua nữa vẫn giữ được mạng.':lv===2?': thua nữa có thể chết.':': thua nữa là chết.'),'en');}return x;};}
