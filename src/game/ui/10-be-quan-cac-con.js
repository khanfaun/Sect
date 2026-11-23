// ---------- bế quan: các con số đổi theo thanh trượt ----------
// tu vi đã đầy (cả cảnh giới, hoặc tầng/kỳ đang ở) thì bế quan thêm chỉ mất thời gian: khóa nút Nhập định
function bqFullNow(){const r=G.run;return !!r&&(r.tv>=100||(sgOn()&&sgFull()&&!lkCapped()));}
function bqBits(y,I){I=I||bqInfo();const sp=bqSpan(y);const left=Math.max(0,I.left-y);const need=Math.max(0,bqNeedY()-y);const risk=Math.round(bqRisk(y)*100);
  const r=G.run;const P=tvPts(r.realm)/100;const e0=llEff(r.tv),e1=llEff(Math.min(100,r.tv+sp[1]/P));const cap=bqCapY();
  let st,sc;
  if(r.tv>=100){st='Tu vi đã viên mãn, bế quan thêm không tăng tu vi.';sc='';}
  else if(sgOn()&&sgFull()&&!lkCapped()){st='Tu vi '+sgName(sgTang())+' đã đầy, bế quan thêm không tăng. '+(canBreak()?'Đột phá, hoặc xung kích lên '+(lkOn()?'tầng':'kỳ')+' kế.':'Hãy xung kích lên '+(lkOn()?'tầng':'kỳ')+' kế.');sc='';}
  else if(lkCapped()){st='Tu vi dường như đã chạm tới giới hạn, không nhích thêm được nữa.';sc='mid';}
  else if(y>0&&cap!=null&&y>cap){st=`Lịch luyện không đủ: bế quan quá ${durH(cap*HY)} thì gần như không tăng thêm tu vi.`;sc='bad';}
  else if(e0<0.5){st='Bình cảnh: tu vi đã bỏ lịch luyện quá xa nên bế quan rất chậm. Hãy ra ngoài đánh trận, đi đây đó.';sc='bad';}
  else if(e0<1||e1<0.9){st='Lịch luyện hơi mỏng: bế quan càng lâu càng chậm dần. Nên xen kẽ ra ngoài lịch luyện.';sc='mid';}
  else if(e0>1){st='Lịch luyện dày dặn: bế quan nhanh hơn bình thường.';sc='ok';}
  else{st='Lịch luyện vững vàng: bế quan bình thường.';sc='ok';}
  return {g:y>0?bqGainTxt(sp[0]/P,sp[1]/P):'0% tu vi',s:st,sc:'bq-'+(sc||'n'),l:Math.floor(left)+' năm',lc:left<=10?'lv-bad':left<=30?'lv-mid':'lv-ok',
    n:I.full?(sgOn()&&G.run.tv<100?'đã đầy':'đã viên mãn'):need<=0?'viên mãn':!isFinite(need)?'chưa tới được (tu vi không tăng)':'chừng '+numVN(need)+' năm',h:(y>0?(risk?(risk<10?'Ít khi':risk<30?'Có thể':'Dễ')+' bị quấy nhiễu giữa chừng. ':'Yên ổn, không bị quấy nhiễu. '):'Chọn thời gian bế quan. ')+'Xuất quan thì khí huyết, linh lực hồi đầy.'};}
function bqUpd(y){const B=bqBits(y);const set=(id,t,c)=>{const e=document.getElementById(id);if(e){e.textContent=t;if(c!=null)e.className=c;}};
  set('bqY',y>0?durH(y*HY):'0 tháng');set('bqG',B.g);set('bqS',B.s,'bq-ll '+B.sc);set('bqL',B.l,B.lc);set('bqN',B.n);set('bqHint',B.h);const b=document.getElementById('bqGoB');if(b)b.disabled=!(y>0)||bqFullNow();
  const R=document.getElementById('bqR');if(R)R.style.setProperty('--val',(+R.max>0?y/+R.max*100:0)+'%');}
function lkTag(n){const m=LK_M[lkOf(n)]*(n&&n.dp?1.15:1)*(G.bqRoom?1.5:1);const c=m>=1.3?'lk-up':m>=0.9?'':m>=0.7?'lk-dn':'lk-bad';
  const t=LK_N[lkOf(n)]+(n&&n.dp?' · có động phủ':'')+(G.bqRoom?' · tĩnh thất tông môn':'');return `<b class="lk ${c}">${t}</b>`;}

// ---------- trà lâu, khách điếm, tửu phường: các lựa chọn ----------
function costHTML(h,st){return `${h?`<span class="cost-t">${ic('hour')}${durH(h)}</span>`:''}${st?`<span class="cost-s"><i class="rh"></i>${st}</span>`:''}`;}

// biểu tượng phần nhận được: chỉ biểu tượng và con số
function gainHTML(g){if(!g)return '';const P=tvPts(G.run.realm)/100;const L=[];
  if(g.hp>0)L.push(['heart','hp','+'+Math.max(1,Math.round(g.hp/Math.max(1,S().maxHp)*100))+'%','Khí huyết']);if(g.hpTxt)L.push(['heart','hp',g.hpTxt,'Khí huyết']);
  if(g.mp>0)L.push(['drop','mp','+'+Math.max(1,Math.round(g.mp/Math.max(1,S().maxMp)*100))+'%','Linh lực']);if(g.mpTxt)L.push(['drop','mp',g.mpTxt,'Linh lực']);
  if(g.tamma)L.push(['skull','tm',(g.tamma>0?'▲':'▼'),'Tâm ma']);if(g.tmTxt)L.push(['skull','tm',g.tmTxt,'Tâm ma']);
  if(g.tv)L.push(['spark','tv','+'+Math.max(1,Math.round(lkShowGain(tvGain(g.tv))))+'%','Tu vi']);if(g.ll)L.push(['sword','ll','+'+Math.max(1,Math.round(g.ll*(typeof LL_MUL==='number'?LL_MUL:1)))+'%','Lịch luyện']);
  if(g.st)L.push(['rh','st','+'+g.st,'Linh thạch']);if(g.info)L.push(['eye','in','tin tức','Biết thêm nơi chốn, tin giang hồ']);if(g.txt)L.push(['star','in',g.txt,'']);
  return `<div class="gains">${L.map(([i,c,t,tip])=>`<span class="gn ${c}"${ta(tip)}>${i==='rh'?'<i class="rh"></i>':ic(i)}${esc(t)}</span>`).join('')}</div>`;}
// giải thích các việc trong địa điểm
const PA_INFO={explore:{d:'Đi một vòng quanh đây: có thể gặp cơ duyên, chuyện lạ, hoặc kẻ địch.',g:{txt:'cơ duyên'}},
  shop:{d:'Vào phường thị xem hàng: đan dược, bí tịch, pháp bảo.'},taphoa:{d:'Vào tiệm tạp hóa xem hàng: đan dược, bí tịch, pháp bảo.'},ghost:{d:'Chợ đêm của kẻ không dám ra ánh sáng. Hàng lạ, giá lạ, người càng lạ.'},
  join:{d:'Tới sơn môn xin bái sư. Được nhận thì thành đệ tử, có chỗ tu luyện và cống hiến.'},lib:{d:'Vào Tàng Kinh Các đọc kinh thư, có thể lĩnh hội công pháp.'},
  tinh:{d:'Ngồi xuống tĩnh tọa điều tức: khí huyết hồi gần một nửa, linh lực hồi đầy, tâm ma nguôi bớt.',g:()=>{const s=S(),r=G.run;return {hp:Math.min(s.maxHp-r.hp,Math.round(s.maxHp*0.45)),mp:s.maxMp-r.mp,tamma:-4,tv:2};}},
  heal:{d:'Nằm trong động phủ tĩnh dưỡng: khí huyết, linh lực hồi đầy, thương thế lành dần.',g:()=>{const s=S(),r=G.run;return {hp:s.maxHp-r.hp,mp:s.maxMp-r.mp,tmTxt:'giảm'};}},
  boss:{d:'Bước vào sào huyệt khiêu chiến thủ lĩnh của vùng. Thắng thì có lệnh bài thông quan.'},sanyeu:{d:'Lùng yêu thú quanh đây. Thắng thì được yêu đan, đôi khi có trứng linh thú, và lịch luyện.'},
  haithuoc:{d:'Lần theo mùi thuốc trong rừng, hái linh thảo để luyện đan.',g:{txt:'linh thảo'}},daokhoang:{d:'Gõ đá đoán mạch, đào linh khoáng để luyện khí.',g:{txt:'linh khoáng'}},
  khaiphu:{d:'Đục một động phủ ở đây. Có động phủ mới bế quan, đột phá được.'},bury:{d:'Chôn vật phẩm ở đây cho kiếp sau.'},grave:{d:'Viếng mộ, thắp nén hương.'},patron:{d:'Tới thăm ân nhân.'}};

// sự kiện dọc đường của nhiệm vụ

// kỳ ngộ

// nhãn trên thanh đầu, cùng hàng tên: bình cảnh (tu vi đầy, lịch luyện chưa đầy) hoặc đột phá (cả hai đầy, nhấp nháy)

// màn chuẩn bị đột phá: tỉ lệ thành công tách theo từng nguồn, phẩm chất dự kiến cũng vậy
vPrep=function(sc){const r=G.run;const v=prepView();const to=btTarget();const ph=isPham();const P=btParts(sc.slots);const D=daoParts();const e0=btEff(sc.slots);const dD=D.reduce((a,x)=>a+x.v,0);
  let b=`<div class="story"><p>${ph?'Ngồi yên, theo tâm pháp dẫn sợi linh khí đầu tiên vào thân. Thành thì bước vào Luyện Khí; bại thì tổn thương kinh mạch, mất một phần tu vi.':'Chọn tối đa năm vật phẩm đặt vào ô chuẩn bị. Vật phẩm bị tiêu hao khi bắt đầu, dù thành hay bại.'}</p></div>`;
  b+=`<div class="slots">${[0,1,2,3,4].map(k=>{const i=sc.slots[k];const it=i!=null&&r.pills[i];return it?`<button class="slot on" data-act="prep" data-arg="${i}"${ta(pillTip(it.id,it.q))}>${PILL[it.id].i}<small>${esc(PILL[it.id].n)}</small></button>`:'<span class="slot">＋</span>';}).join('')}</div>`;
  const stg=btStages(to).map(stageName).join(' → ')||'Không có thiên kiếp';
  b+=`<div class="bt-sum"><div><small>Khả năng thành công</small><b>${btWord(v.rate)}</b></div>${ph?'':`<div${v.tcWhy?ta('Phẩm Trúc Cơ tính theo tầng Luyện Khí lúc đột phá.'+(v.tcWhy.length?'\nChưa lên phẩm cao hơn vì: '+v.tcWhy.join(', ')+'.':'')):''}><small>Phẩm chất dự kiến</small><b>${QNAME[v.q]}</b></div>`}</div>`;
  b+=`<h4 class="sgrp">Khả năng thành công</h4><div class="bt-parts">${P.map((x,i)=>`<div${ta(x.tip||'')}><span>${esc(x.t)}</span><b class="${i===0?'':x.v>0?'good':'bad'}">${i===0?btWord(x.v/100):partWord(x.v)}</b></div>`).join('')}<div class="tot"><span>Tổng</span><b>${btWord(v.rate)}</b></div></div>`;
  if(!ph){const DL=[{t:'Đạo cơ tích lũy',v:r.dao||0}].concat(e0.dao-dD?[{t:'Linh dược trong ô',v:e0.dao-dD}]:[]).concat(D);
    b+=`<h4 class="sgrp">Đạo cơ · phẩm chất</h4><div class="bt-parts">${DL.filter(x=>x.v).map(x=>`<div><span>${esc(x.t)}</span><b class="${x.v>0?'good':'bad'}">${x.v>0?'▲':'▼'}</b></div>`).join('')}<div><span>Qua thiên kiếp còn trên nửa khí huyết</span><b class="good">▲</b></div></div><p class="hint">Đạo cơ càng vững, phẩm chất càng cao: Nhân Đạo, Địa Đạo rồi Thiên Đạo. Phẩm chất càng cao, chỉ số càng mạnh, thọ nguyên càng dài.</p>`;}
  b+=`<div class="kv"><div${ta('Xung quan thành công thì các kiếp lần lượt kéo tới, từng cái một. Gục giữa kiếp là chết.')}><span>Thiên kiếp</span><b>${esc(stg)}</b></div>${v.e.guard?'<div><span>Hộ mệnh</span><b>Có</b></div>':''}</div>`;
  const L=btItems();
  b+=`<h4 class="sgrp">Túi đồ dùng được</h4><div class="rows">`+(L.length?L.map(({p,i})=>`<button class="row${sc.slots.includes(i)?' taken':''}" data-act="prep" data-arg="${i}"${ta(pillTip(p.id,p.q))}><span class="r-i">${PILL[p.id].i}</span><span class="r-t"><b>${p.q?PQ[p.q]+' ':''}${esc(PILL[p.id].n)}</b><small>${esc(PILL[p.id].d.replace('{x}',pillX(p.id,p.q)))}</small></span></button>`).join(''):'<p class="hint">Không có vật phẩm nào dùng được.</p>')+'</div>';
  return card(ph?'Xung kích Luyện Khí tầng 1':to===5?'Độ kiếp phi thăng':'Đột phá '+REALM[to],r.place.n,b,{cls:'tall',foot:`<button class="btn" data-act="next">Để sau</button><span class="grow"></span><button class="btn pri" data-act="prepGo">Bắt đầu</button>`});};

// chọn một trong ba tiên thiên khí vận sau khi đột phá đại cảnh giới

// nút xung kích tầng Luyện Khí trong bảng bế quan

// khoảng tu vi nhận được khi bế quan; ở Luyện Khí tính theo tầng (vượt tầng thì nói lên mấy tầng)
function bqGainTxt(a,b){if(!sgOn())return '~'+Math.floor(a)+'% – '+Math.ceil(b)+'% tu vi';const w=sgW();return '~'+Math.floor(a/w*100)+'% – '+Math.ceil(b/w*100)+'% tu vi';}
