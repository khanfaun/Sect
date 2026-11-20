// ĐỢT 8.6: đất ma. Bảng MA_BAC, MA_CFG: content/rules/dat-ma.js. w.maVuc=[{tam,k,ma,nut:[id],bac}].
// Hóa khi Đêm Dài (CLK06) tới nấc cao mà không ai ngăn (hoặc Diệt Thế ở Đ9 gọi maVucTao); hồi theo thế kỷ; nơi lõi (LOC_LOI) không bị nuốt.
function maBac(ma){let i=MA_BAC.findIndex(b=>ma>=b.min);return i<0?MA_BAC.length-1:i;}
function maVucTao(src,k,w){w=w||W();k=k||MA_CFG.khu;const all=[];for(const R0 of w.regions)for(const n of R0.nodes)all.push(n);
  const loi=n=>n.anchor&&LOC_NEO[n.anchor]&&LOC_NEO[n.anchor].loi;const s0=src!=null&&nodeById2(w,src)||wPick(w,all.filter(n=>!loi(n)),'ma0:'+w.t);if(!s0)return [];
  const L=w.maVuc||(w.maVuc=[]);const taken=new Set(L.flatMap(x=>x.nut));const tam=[];
  const cand=all.filter(n=>!loi(n)&&!taken.has(n.id)).sort((a,b)=>Math.hypot(a.x-s0.x,a.y-s0.y)-Math.hypot(b.x-s0.x,b.y-s0.y));
  for(const n of cand){if(tam.length>=k)break;if(tam.every(t=>Math.hypot(t.x-n.x,t.y-n.y)>MA_CFG.ban*1.2))tam.push(n);}
  const out=[];for(const t of tam){const kv=idReg(t.id);
    const nut=all.filter(n=>idReg(n.id)===kv&&!loi(n)&&!taken.has(n.id)&&Math.hypot(n.x-t.x,n.y-t.y)<=MA_CFG.ban).map(n=>n.id);nut.forEach(i=>taken.add(i));
    const z={tam:t.id,k:kv,ma:MA_CFG.dau,nut,bac:-1};L.push(z);maApply(z,w);out.push(z);suLuocAdd(contentText('ma.tao',[t.name,MA_BAC[z.bac].n]),'ma',w);}
  dbg('ma.tao',{n:out.length,src:s0.id});return out;}
// áp bậc lên các nút trong khu: nguy hiểm, thôn trấn biến mất ở Ma vực
function maApply(z,w){const b=maBac(z.ma),B=MA_BAC[b];const ch=b!==z.bac;z.bac=b;const r=G.run;
  for(const id of z.nut){const n=nodeById2(w,id);if(!n)continue;if(n.dangerGoc==null)n.dangerGoc=n.danger;n.danger=clamp(n.dangerGoc+B.dg,0,3);n.maLv=b;
    if(B.mat&&isTownT(n.type)&&!(r&&r.at===n.id)){n.state='ruin';n.stateUntil=Math.max(n.stateUntil||0,w.t+2*HY);n.maRuin=1;}
    else if(n.maRuin&&!B.mat){n.stateUntil=Math.min(n.stateUntil||0,w.t);delete n.maRuin;}}
  return ch;}
function maLanh(z,w){for(const id of z.nut){const n=nodeById2(w,id);if(!n)continue;if(n.dangerGoc!=null){n.danger=n.dangerGoc;delete n.dangerGoc;}delete n.maLv;if(n.maRuin){n.stateUntil=Math.min(n.stateUntil||0,w.t);delete n.maRuin;}}}
function maRate(z,w){const t=nodeById2(w,z.tam);let m=1;if(!t)return MA_CFG.hoi;
  for(const R0 of w.regions)for(const n of R0.nodes){if(n.type!=='tong'||Math.hypot(n.x-t.x,n.y-t.y)>MA_CFG.gan)continue;const s=w.sects.find(x=>x.n===n.owner);if(!s)continue;
    if(s.al==='ma'||s.al==='ta')m=Math.min(m,MA_CFG.cham);else if(m>=1)m=MA_CFG.nhanh;}
  return MA_CFG.hoi*m;}
function maYear(w,y){if(!w.maVuc||!w.maVuc.length)return;
  for(const z of w.maVuc.slice()){z.ma=Math.max(0,z.ma-maRate(z,w));const t=nodeById2(w,z.tam);
    if(z.ma<=0){maLanh(z,w);w.maVuc.splice(w.maVuc.indexOf(z),1);suLuocAdd(contentText('ma.lanh',[t?t.name:'']),'ma',w);continue;}
    if(maApply(z,w))suLuocAdd(contentText('ma.bac',[t?t.name:'',MA_BAC[z.bac].n]),'ma',w);
    else if(MA_BAC[z.bac].mat)maApply(z,w);}}
function maAt(n){const w=W();if(!n||!w.maVuc)return null;return w.maVuc.find(z=>z.nut.includes(n.id))||null;}
// người chơi đẩy nhanh hồi phục (siêu độ, trừ tà, trận tịnh hóa, trồng linh mộc): −1 tới −5
function maTinhHoa(n,k){const z=maAt(n);if(!z)return false;z.ma=Math.max(0,z.ma-clamp(k||1,1,5));maApply(z,W());dbg('ma.tinh',{ma:z.ma});return true;}
function maLk(n){const z=maAt(n);if(!z)return 1;const B=MA_BAC[z.bac];const r=G.run;const ma=r&&typeof hdE==='function'&&hdE(r)<-0.2;return ma?B.lk.ma:B.lk.chinh;}
{const _bq=bqRate;bqRate=function(){return _bq.apply(this,arguments)*maLk(curNode());};}
{const _wy=worldYear;worldYear=function(y,o,w){_wy(y,o,w);maYear(w||W(),y);};}
// phàm nhân ở lại Ma vực: mỗi ngày 20% nhiễm ma khí (thương thế bậc một, tâm ma +2)
{const _th=timeHooks;timeHooks=function(h){const o=_th.apply(this,arguments);const r=G.run;if(!r)return o;const w=W();const n=nodeById(r.at);const z=maAt(n);
  if(!z||!MA_BAC[z.bac].nhiem||!(r.pham||isPham())){r.maT=w.t;return o;}
  const d=Math.min(30,Math.floor((w.t-(r.maT==null?w.t:r.maT))/HD));if(d<=0){if(r.maT==null)r.maT=w.t;return o;}r.maT+=d*HD;
  for(let i=0;i<d;i++)if(chance(MA_BAC[z.bac].nhiem)){addWound('ngoai');tmGain(0,2);log(contentText('ma.nhiem'));dbg('ma.nhiem',{});}
  return o;};}
