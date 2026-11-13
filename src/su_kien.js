// ================= SỰ KIỆN TỪ FILE CỐT TRUYỆN =================
// Dữ liệu: SU_KIEN_DATA (src/data/su_kien.js, sinh từ docs/nhap/phu-sinh-su-kien.md bằng tools/su_kien_chuyen.py).
// Sự kiện lẻ: mỗi kiếp gặp một lần, ở vùng của nó, tại loại nơi phù hợp.
// Chuỗi: phần 1 gặp như sự kiện thường; phần sau chỉ hiện khi lần trước đã chọn đúng hướng và đủ thời gian.
// Chọn "Bỏ đi" thì chuỗi khép lại. Tên nhân vật giữ nguyên suốt chuỗi.
function skChains(){const r=G.run;return r.chainSt||(r.chainSt={});}
function skNames(roles){const o={};for(const [k,g] of Object.entries(roles||{}))o[k]={ten:genName(g),hn:g==='nu'?'nàng':'hắn',g};return o;}
function skOkPart(d,s){if(!s||s.end)return false;const r=G.run;if(r.region<d.reg)return false;if(W().t-(s.t||0)<(d.wait||0))return false;
  if(d.part==='2'||d.part==='2b')return s.p==='1'&&(d.need||[]).includes(s.c['1']);
  if(d.part==='3')return (s.p==='2'||s.p==='2b');
  if(d.part==='4')return s.p==='3'&&(d.need||[]).includes(s.c['3']);
  return false;}
function skChoice(d,x,j){
  const mark={chainMark:d.chain?[d.chain,d.part,j]:null};
  const addE=e=>{const o=Object.assign({},e||{});if(mark.chainMark)o.chainMark=mark.chainMark;return o;};
  const c={i:x.i,l:x.l};
  if(x.leave){c.t=x.t;if(d.chain)c.e={chainMark:[d.chain,d.part,-1]};return c;}
  if(x.cost)c.cost=x.cost;
  if(x.chk){c.chk=x.chk;c.ok={t:x.ok.t,e:addE(x.ok.e)};c.no={t:x.no.t,e:addE(x.no.e)};return c;}
  c.t=x.t;c.e=addE(x.e);return c;}
for(const d of SU_KIEN_DATA){
  const o={id:d.id,n:d.n,tg:d.tg,w:1,once:1,t:[d.t],c:d.c.map((x,j)=>skChoice(d,x,j))};
  if(!d.chain){o.r=[d.reg];o.v=()=>skNames(d.roles);}
  else{
    o.v=r=>{const S=skChains();const s=S[d.chain]||(S[d.chain]={p:null,c:{},t:0,v:skNames(d.roles)});
      // phần 3 và 4 có những câu "Nếu ngươi từng…" viết theo thứ tự lựa chọn ở phần trước: ghi lại để chỉ giữ câu đúng
      const k=d.part==='4'?{p:'3',c:s.c['3']}:d.part==='3'?{p:s.p,c:s.c['2']}:null;
      return k?Object.assign({},s.v,{_skP:k.p,_skC:k.c}):s.v;};
    if(d.part==='1'){o.r=[d.reg];o.cond=()=>!skChains()[d.chain];}
    else{o.spec=1;o.cond=()=>skOkPart(d,skChains()[d.chain]);}
  }
  ev(o);
}
// ghi lại lựa chọn của chuỗi
{const _ae=applyE;applyE=function(e,v){const ch=_ae(e,v);if(e&&e.chainMark&&G.run){const [cid,part,j]=e.chainMark;const S=skChains();const s=S[cid]||(S[cid]={c:{},v:v});
  if(j<0)s.end=true;else{s.p=part;s.c[part==='2b'?'2':part]=j;s.c[part]=j;s.t=W().t;if(part==='4')s.end=true;}}return ch;};}

// chỉ giữ câu "Nếu…" khớp với lựa chọn trước đó, bỏ vế điều kiện; không khớp câu nào thì bỏ cả cụm
function skCond(t,v){
  if(typeof t!=='string'||t.indexOf('Nếu ')<0||v._skC==null)return t;
  const parts=t.split(/(?<=[.!?…”])\s+/);const out=[];let run=[];
  const flush=()=>{if(!run.length)return;const n=run.length;const c=+v._skC;
    const k=v._skP==='2b'?(n>=3?2:c):(c<n?c:-1);
    if(k>=0&&k<n){let x=run[k].replace(/^Nếu [^,]*,\s*/,'');x=x.charAt(0).toUpperCase()+x.slice(1);out.push(x);}run=[];};
  for(const p of parts){if(/^Nếu /.test(p))run.push(p);else{flush();out.push(p);}}
  flush();return out.join(' ');}
{const _T0=T;T=function(s,v){if(v&&v._skC!=null){if(Array.isArray(s))s=s.map(x=>skCond(x,v));else s=skCond(s,v);}return _T0(s,v);};}
