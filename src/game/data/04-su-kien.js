// ================= SỰ KIỆN TỪ FILE CỐT TRUYỆN =================
// Dữ liệu chuẩn: content/events/. SU_KIEN_DATA là lớp tương thích do tools/content-build.js sinh.
// Sự kiện lẻ: mỗi kiếp gặp một lần, ở vùng của nó, tại loại nơi phù hợp.
// Chuỗi: phần 1 gặp như sự kiện thường; phần sau chỉ hiện khi lần trước đã chọn đúng hướng và đủ thời gian.
// Chọn "Bỏ đi" thì chuỗi khép lại. Tên nhân vật giữ nguyên suốt chuỗi.
function skChains(){const r=G.run;return r.chainSt||(r.chainSt={});}
function skChainNames(roles){const v=baseV();return Object.assign({sect:v.sect,sect2:v.sect2,sectC:v.sectC,sectM:v.sectM,sectP:v.sectP,que:v.que},skNames(roles));}
function skNames(roles){const o={};for(const [k,g] of Object.entries(roles||{}))o[k]={ten:genName(g),hn:g==='nu'?'nàng':'hắn',g};return o;}
function skOkPart(d,s){if(!s||s.end)return false;const r=G.run;if(rT()<d.reg)return false;if(W().t-(s.t||0)<(d.wait||0))return false;
  if(d.part==='2'||d.part==='2b')return s.p==='1'&&(d.need||[]).includes(s.c['1']);
  if(d.part==='3')return (s.p==='2'||s.p==='2b');
  if(d.part==='4')return s.p==='3'&&(d.need||[]).includes(s.c['3']);
  return false;}
function skChoice(d,x,j){
  const mark={chainMark:d.chain?[d.chain,d.part,j]:null};
  const addE=(e,ok)=>{const o=Object.assign({},e||{});if(mark.chainMark)o.chainMark=typeof ok==='boolean'?mark.chainMark.concat(ok):mark.chainMark;return o;};
  const c={i:x.i,l:x.l};
  if(x.leave){c.t=x.t;if(d.chain)c.e={chainMark:[d.chain,d.part,-1]};return c;}
  if(x.cost)c.cost=x.cost;
  if(x.fight){c.fight=x.fight;if(x.t)c.t=x.t;c.win={t:x.win.t,e:addE(x.win.e,true)};c.lose={t:x.lose.t,e:addE(x.lose.e,false)};return c;}
  if(x.chk){c.chk=x.chk;c.ok={t:x.ok.t,e:addE(x.ok.e,true)};c.no={t:x.no.t,e:addE(x.no.e,false)};return c;}
  c.t=x.t;c.e=addE(x.e);return c;}
for(const d of SU_KIEN_DATA){
  const o={id:d.id,n:d.n,tg:d.tg,w:1,once:1,t:[d.t],c:d.c.map((x,j)=>skChoice(d,x,j))};
  o.content=d;
  if(!d.chain){o.r=[d.reg];o.v=()=>skNames(d.roles);o.cond=()=>contentTriggerOk(d);}
  else{
    o.v=r=>{const S=skChains();const s=S[d.chain]||(S[d.chain]={p:null,c:{},t:0,v:skChainNames(d.roles)});
      // Chụp lịch sử trước cảnh này để kết quả lựa chọn không đổi lời kể của cảnh.
      return d.paths?Object.assign({},s.v,{_skPaths:d.paths,_skHistory:{c:Object.assign({},s.c),results:Object.assign({},s.results)}}):s.v;};
    if(d.part==='1'){o.r=[d.reg];o.cond=()=>contentTriggerOk(d)&&!skChains()[d.chain];}
    else{o.spec=1;o.cond=()=>contentTriggerOk(d)&&skOkPart(d,skChains()[d.chain]);}
  }
  ev(o);
}
// ghi lại lựa chọn của chuỗi
{const _ae=applyE;applyE=function(e,v){const ch=_ae(e,v);if(e&&e.chainMark&&G.run){const [cid,part,j,ok]=e.chainMark;const S=skChains();const s=S[cid]||(S[cid]={c:{},v:v});
  if(j<0)s.end=true;else{s.p=part;s.c[part]=j;if(typeof ok==='boolean')(s.results||(s.results={}))[part]=ok;s.t=W().t;if(part==='4')s.end=true;}}return ch;};}

// Chọn câu bằng đường dẫn đã khai báo trong dữ liệu, kể cả thắng/thua phép thử.
function skPathOk(path,h){
  const [part,j,result]=path.split(':');
  // Bản lưu cũ từng chép lựa chọn 2b đè sang khóa 2: không coi đó là đã đi phần 2.
  if(part==='2'&&h.c['2b']!=null)return false;
  if(h.c[part]!==+j)return false;
  return result==null||((h.results||{})[part]===(result==='ok'));
}
function skCond(t,v){
  if(typeof t!=='string'||t.indexOf('Nếu ')<0||!v._skPaths||!v._skHistory)return t;
  const parts=t.split(/(?<=[.!?…”])\s+/);const out=[];let run=[];
  const flush=()=>{if(!run.length)return;
    const k=v._skPaths.findIndex(paths=>paths.some(path=>skPathOk(path,v._skHistory)));
    if(k>=0&&k<run.length){let x=run[k].replace(/^Nếu [^,]*,\s*/,'');x=x.charAt(0).toUpperCase()+x.slice(1);out.push(x);}run=[];};
  for(const p of parts){if(/^Nếu /.test(p))run.push(p);else{flush();out.push(p);}}
  flush();return out.join(' ');}
{const _T0=T;T=function(s,v){
  // Cảnh đang mở trong bản lưu cũ chưa có đường dẫn: bổ sung từ lịch sử chuỗi.
  if(v&&v._skC!=null&&!v._skPaths&&G.run&&G.run.scene){
    const d=SU_KIEN_DATA.find(d=>d.id===G.run.scene.id);
    const h=d&&d.paths&&skChains()[d.chain];
    if(h)Object.assign(v,{_skPaths:d.paths,_skHistory:{c:Object.assign({},h.c),results:Object.assign({},h.results)}});
  }
  if(v&&v._skPaths){if(Array.isArray(s))s=s.map(x=>skCond(x,v));else s=skCond(s,v);}return _T0(s,v);};}
