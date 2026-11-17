// ================= THƯƠNG THẾ 3 BẬC =================
// Nhẹ: thua trận vẫn sống (gục). Nặng: thua có WT_DIE phần chết. Nguy kịch: thua là chết.
// Vết thương nặng tự lành (không chữa bằng đan hay y sư) thì có WT_PERM phần thành tật vĩnh viễn.
// Bảng WT_LV: content/rules/wt-lv.js
// Bảng WT_NAME, WT_DIE, WT_PERM: content/rules/wt-name.js
function woundLv(){let m=0;for(const x of wounds())if(!x.perm)m=Math.max(m,WT_LV[x.k]||1);return m;}
{const _wt=woundText;woundText=function(x){const lv=x.perm?0:WT_LV[x.k]||1;return (lv?'Mức '+WT_NAME[lv]+'. ':'')+_wt(x);};}
// gục thay vì chết: thương nhẹ luôn sống, thương nặng có may rủi
{const _ce=checkEnd;checkEnd=function(sc){
  if(!sc.over&&!sc.spar&&!sc.kiep&&sc.en&&sc.en.n!==contentText("core2_23-thuong-the_js.002")){const me=mainUnit(sc);
    if(me&&me.hp<=0&&injured()){const lv=woundLv();const live=lv<=1||(lv===2&&!chance(WT_DIE));
      dbg('wound.lose',{lv,live});
      if(live){me.hp=1;sc.over='lose';sc.beaten=1;clog(sc,lv<=1?contentText("core2_23-thuong-the_js.003"):contentText("core2_23-thuong-the_js.004"),'en');finishCombat(sc);return;}}}
  _ce(sc);};}
// thương nặng tự lành: có thể thành tật
// Bảng WT_SCAR: content/rules/wt-scar.js
{const _wk=woundTick;woundTick=function(){const r=G.run;if(!r)return _wk();const t=W().t;
  const due=(r.wounds||[]).filter(x=>x.until&&x.until<=t&&WT_LV[x.k]===2&&!x.treated).map(x=>x.k);
  _wk();if(!G.run)return;
  for(const k of due)if(chance(WT_PERM)){const p=pick(WT_SCAR[k]);if(!wounds().some(x=>x.k===p)){addWound(p);note(WOUND[k].n+contentText("core2_23-thuong-the_js.005")+WOUND[p].n.toLowerCase()+'.','dn');log(contentText("core2_23-thuong-the_js.006")+WOUND[p].n+'.');dbg('wound.scar',{from:k,to:p});}}};}
// chữa bằng y sư/đan: đánh dấu đã chữa (giảm thời gian thì không còn nguy cơ thành tật)
{const _hb=healBuy;healBuy=function(){const st=G.run&&G.run.st;const x=_hb.apply(this,arguments);if(G.run&&G.run.st<st)for(const w of wounds())w.treated=1;return x;};}
{const _up=usePill;usePill=function(idx,c){const p=G.run.pills[idx];const id=p&&p.id;const x=_up.apply(this,arguments);if(G.run&&id&&HEAL_PILL.includes(id))for(const w of wounds())if(WT_LV[w.k]===2)w.treated=1;return x;};}
// lời báo sau trận theo bậc
{const _fc=finishCombat;finishCombat=function(sc){const x=_fc.apply(this,arguments);if(sc&&sc.wounded&&!sc._wlv&&G.run){sc._wlv=1;const lv=woundLv();if(lv)clog(sc,contentText("core2_23-thuong-the_js.007")+WT_NAME[lv]+(lv===1?contentText("core2_23-thuong-the_js.008"):lv===2?contentText("core2_23-thuong-the_js.009"):contentText("core2_23-thuong-the_js.010")),'en');}return x;};}
