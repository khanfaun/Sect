// SỬA-C (người dùng chốt câu 6, 8, 11, 18, 19). Bảng: content/rules/sua-c.js. Chữ: content/text/sua-c.json.

// ---------- C.6: đầu thai không chọn, trừ khi trước khi chết đã tu / uống / mang vật đặc biệt ----------
// Linh căn (kể cả vô căn) luôn ẩn tới khi trắc, kể cả kiếp đầu.
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r&&feat('vo')){r.rootKnown=0;delete r.dtUsed;}return res;};}
// lý do được chọn lá số (rỗng = không)
function dtPickWhy(r){r=r||G.run;if(!r)return [];const L=[];
  if((r.arts||[]).some(a=>DT_PICK.art.includes(a.n)))L.push('art');
  if((r.dtUsed||[]).some(id=>DT_PICK.pill.includes(id)))L.push('pill');
  const q=(r.qitems||[]).find(id=>DT_PICK.qi.includes(id));if(q)L.push('qi:'+q);return L;}
{const _d=die;die=function(){const r=G.run;if(r&&G.meta&&feat('vo')){const why=dtPickWhy(r);
    if(why.length){const q=why.find(x=>x.startsWith('qi:'));if(q){const id=q.slice(3);r.qitems.splice(r.qitems.indexOf(id),1);}
      G.meta.pick=(G.meta.pick||0)+1;dbg('dt.pickSrc',{why:why.join(','),pick:G.meta.pick});}}
  return _d.apply(this,arguments);};}
// Luân Hồi Đan: ghi đã uống
{const _up=usePill;usePill=function(idx,inC){const r=G.run;const it=r&&r.pills&&r.pills[idx];const id=it&&it.id;const m=_up.apply(this,arguments);
  if(m!=null&&id&&DT_PICK.pill.includes(id)&&G.run){(G.run.dtUsed=G.run.dtUsed||[]).push(id);note(contentText('dt.pill'),'up');dbg('dt.pill',{id});}return m;};}
// Luân Hồi Kinh (bản chép): dùng trong túi để học tâm pháp
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);for(const it of L)if(it.ref&&it.ref.t==='qi'&&it.ref.id==='luan_hoi_kinh')it.use=1;return L;};}
{const _bu=bagUse;bagUse=function(key,n){if(key==='vluan_hoi_kinh'){const r=G.run;const i=(r.qitems||[]).indexOf('luan_hoi_kinh');if(i<0)return 0;
    if((r.arts||[]).some(a=>DT_PICK.art.includes(a.n))){note(contentText('dt.kinhDa'),'');return 0;}
    r.qitems.splice(i,1);tpLearn(1,{n:DT_PICK.art[0],src:contentText('dt.kinhSrc')});if(typeof syncSkills==='function')syncSkills();note(contentText('dt.kinh'),'up');dbg('dt.kinh',{});return 1;}
  return _bu.apply(this,arguments);};}
// chợ phiên tu sĩ: đôi khi bày một món luân hồi
{const _se=shopExtra;shopExtra=function(items,n){const res=_se.apply(this,arguments);
  if(G.run&&!isPham()&&n&&n.type==='cho'&&Array.isArray(items)&&chance(0.08)){const id=pick(['luanhoi','luan_hoi_kinh','luan_hoi_ngoc']);
    if(id==='luanhoi')items.push({k:'pill',id,p:PILL.luanhoi.p});else items.push({k:'qi',id,p:id==='luan_hoi_ngoc'?160:110});dbg('dt.shop',{id});}return res;};}

// ---------- C.8: già theo tỉ lệ tuổi / thọ nguyên ----------
// Từ GIA.tu × thọ (Trường thọ: muộn 10%) là già: khí huyết tối đa −10%, chỉ số chiến đấu −0,5–1% tùy loại, né/đỡ tốn thêm thể lực.
// Thay cho tuổi già dần từng năm của Đ2.7 (hpOld/tpOld); bệnh già từ TUE_OLD.sick × thọ vẫn giữ.
function giaAt(r,life){let at=life*GIA.tu;if(typeof tueSrc==='function'&&tueSrc(r).some(x=>{const D=tueDef(x.id)[1];return D&&D.oldMul;}))at*=1.1;return at;}
function giaOn(r,s){r=r||G.run;if(!r||!feat('gia'))return false;const life=s?s.life:S().life;return life>0&&r.age>=giaAt(r,life);}
FEAT.gia=1;
tueOldAt=function(r,s){return giaAt(r,s.life);};
tueOld=function(r,age,s){if(r.age>=s.life*TUE_OLD.sick&&chance(TUE_OLD.pSick))addWound('ngoai','gia');clampHp();};
{const _S=S;S=function(){const s=_S.apply(this,arguments);const r=G.run;if(r&&giaOn(r,s)){s.gia=1;s.maxHp=Math.round(s.maxHp*(1-GIA.hp));
    for(const [k,v] of Object.entries(GIA.cs))if(typeof s[k]==='number')s[k]=['ne','crit'].includes(k)?+(s[k]*(1-v)).toFixed(3):Math.round(s[k]*(1-v));}return s;};}
{const _d=tlD;tlD=function(u){return _d(u)+(u&&u.isMain&&G.run&&giaOn(G.run)?GIA.st:0);};}
{const _b=tlB;tlB=function(u){return _b(u)+(u&&u.isMain&&G.run&&giaOn(G.run)?GIA.st:0);};}
// vừa bước vào tuổi già: báo một lần, kẹp khí huyết
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(r&&!r.giaN&&giaOn(r)){r.giaN=1;clampHp();log(contentText('gia.log'));note(contentText('gia.note'),'dn');dbg('gia.on',{age:Math.floor(r.age)});}return o;};}
// bản lưu cũ: bỏ phần già dần của Đ2.7
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._giaV1){r._giaV1=1;const T=r.tue&&r.tue.sum;if(T){delete T.hpOld;delete T.tpOld;}}return r;};}

// ---------- C.11: săn bắt / hái lượm ở hoang dã — có hạn mỗi nút, hồi đầu mỗi năm ----------
function sbLeft(n){const r=G.run;const y=Math.floor(W().t/HY);const c=n.sb&&n.sb.y===y&&n.sb.k===r.kiep?n.sb.c:0;return Math.max(0,SAN.hai-c);}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(G.run&&n&&isWild(n)&&n.state!=='ruin'){const left=sbLeft(n);
    L.push({a:'sanbat',i:'',l:left>0?contentText('sb.l',[left]):contentText('sb.het'),h:SAN.h,tip:contentText('sb.tip'),dis:left<=0,x:left<=0?contentText('sb.hetTip'):''});}return L;};}
{const _p=placeAct;placeAct=function(a){if(a!=='sanbat')return _p.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return;
  const n=nodeById(sc.id);if(!n||!isWild(n)||sbLeft(n)<=0)return;const y=Math.floor(W().t/HY);if(!n.sb||n.sb.y!==y||n.sb.k!==r.kiep)n.sb={y,k:r.kiep,c:0};n.sb.c++;
  sc.msg=[];sc.chips=[];advanceTime(SAN.h);if(!G.run||G.run.scene!==sc)return;
  const d=ri(SAN.an[0],SAN.an[1]);G.run.anLk=(G.run.anLk||0)+d;const ch=[chip('🍖',contentText('sb.chip',[d]),contentText('sb.chipTip'),'up')];
  if(chance(SAN.thao)){run2().mats.thao+=1;ch.push(chip(MAT.thao.i,'+1 '+MAT.thao.n.toLowerCase(),'','up'));}
  ch.push(chip('⏳',SAN.h+' giờ','',''));sc.msg=[pick([contentText('sb.m1'),contentText('sb.m2'),contentText('sb.m3')])];sc.chips=ch;
  if(typeof tutTick==='function')tutTick('sanbat');dbg('sb.do',{n:n.id,left:sbLeft(n),d});};}

// ---------- C.18–19: trắc ra Địa / Thiên linh căn — dị tượng toàn màn, tông môn kinh động ----------
function tlFxKind(root){return root&&(root.id==='thien'||root.id==='dia')?root.id:null;}
// tông nơi trắc: đang đứng ở sơn môn; hoặc sơn môn tuyển đồ thì lấy sơn môn gần nhất
function tlSectIdx(cach){const r=G.run;const w=W();const here=nodeById(r.at);const idx=n=>w.sects.findIndex(s=>s.n===(n.owner||n.name));
  if(here&&here.type==='tong'&&here.state!=='ruin'){const i=idx(here);if(i>=0)return i;}
  if(cach!=='tuyendo'||!here)return -1;let best=null,bh=Infinity;
  for(const n of w.regions.flatMap(R=>R.nodes||[]))if(n.type==='tong'&&n.state!=='ruin'){const h=travelHours([here.id,n.id]);if(h<bh){bh=h;best=n;}}
  return best?idx(best):-1;}
function tlPhe(al){return al==='ma'?'ta':(al==='chinh'||al==='phat')?'chinh':'';}
function tlNpcPhe(n){const w=W();const rv=(w.rivals||[]).find(x=>x.ten===n);if(rv)return rv.tinh==='hiem'?'ta':rv.tinh==='nghia'?'chinh':'';
  const o=npcs()[favKey(n)];return o&&o.al?tlPhe(o.al):'';}
// chọn người: ưu tiên cùng phe với tông, trong mỗi nhóm thì ngẫu nhiên
function tlPickPpl(L,k,phe,pheOf){const a=shuffle(L.slice()),same=a.filter(x=>phe&&pheOf(x)===phe),rest=a.filter(x=>!(phe&&pheOf(x)===phe));return same.concat(rest).slice(0,k);}
function tlSectFav(i,kind){const w=W();const s=w.sects[i];const T=TL_FX[kind];if(!s||!T)return [];const phe=tlPhe(s.al);const out=[];
  const E=tlPickPpl(sectElders(i),T.eld,phe,()=>phe);for(const e of E){const key='@'+i+':'+e.t;favAdd(key,T.fe);out.push(e.ten);}
  const dis=()=>sectDisciples(i).filter(n=>!String(n).startsWith('@'));let D=dis();
  for(let g=0;D.length<T.de&&g<T.de;g++){const sx=chance(.5)?'nam':'nu';const ten=genName(sx);npcRec(ten,{type:'khach',g:sx,sect:i,al:s.al});D=dis();}
  for(const n of tlPickPpl(D,T.de,phe,tlNpcPhe)){favAdd(n,T.fd);out.push(n);}
  sectFavAdd(i,T.sect);dbg('tl.sectFav',{i,kind,n:out.length,phe});return out;}
{const _tr=tlResult;tlResult=function(cach){const r=G.run;const res=_tr.apply(this,arguments);if(!r||G.run!==r)return res;const k=tlFxKind(r.root);
  if(k){r.tlFx={k,id:Date.now()+Math.floor(Math.random()*1e3),cach};const si=tlSectIdx(cach);
    if(si>=0){const ppl=tlSectFav(si,k);r.tlFx.sect=W().sects[si].n;r.tlFx.ppl=ppl;
      res.ch=(res.ch||[]).concat([chip('🔔',contentText('tlfx.sectChip',[W().sects[si].n]),contentText('tlfx.sectTip',[ppl.join(', ')]),'up')]);}
    log(contentText('tlfx.log.'+k));if(typeof bio==='function')bio(contentText('tlfx.bio.'+k,[Math.floor(r.age),r.ten]));dbg('tl.fx',{k,cach,sect:si});}
  return res;};}
// lời kể dị tượng (giao diện đọc)
function tlFxLines(fx){const L=[];for(let i=1;i<=12;i++){const key='tlfx.'+fx.k+'.'+i;if(CONTENT_TEXT[key]==null)break;L.push(contentText(key));}
  if(fx.sect)L.push(contentText('tlfx.'+fx.k+'.tong',[fx.sect]));return L;}
