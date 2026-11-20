// ----- Thú triều -----
// Nội dung sự kiện: content/events/ (tra ID tt_chan).
// Nội dung sự kiện: content/events/ (tra ID tt_vua).
// Nội dung sự kiện: content/events/ (tra ID tt_dan).
// Nội dung sự kiện: content/events/ (tra ID tt_bay).
// Nội dung sự kiện: content/events/ (tra ID tt_cuu).
// Nội dung sự kiện: content/events/ (tra ID tt_tron).
// ----- Đệ tử tuần tra -----
// Nội dung sự kiện: content/events/ (tra ID tr_hoi).
// Nội dung sự kiện: content/events/ (tra ID tr_luan).
// Nội dung sự kiện: content/events/ (tra ID tr_bat).
// Nội dung sự kiện: content/events/ (tra ID tr_giup).
// Nội dung sự kiện: content/events/ (tra ID tr_moi).
// Nội dung sự kiện: content/events/ (tra ID tr_kiem).
// ----- Thiên kiêu (ngoài sự kiện gặp thiên kiêu có sẵn) -----
const RVV=r=>{const w=W();let i=r.metRival;let rv=r.rivals.find(x=>x.i===i&&x.alive)||pick(r.rivals.filter(x=>x.alive));const m=clamp(1.05+(rv.realm-r.realm)*0.45,0.85,1.8);return {rv:rivalView(rv),rvi:rv.i,rvm:m};};
// Nội dung sự kiện: content/events/ (tra ID tk_ruou).
// Nội dung sự kiện: content/events/ (tra ID tk_thach).
// Nội dung sự kiện: content/events/ (tra ID tk_dong).
// Nội dung sự kiện: content/events/ (tra ID tk_tranh).
// Nội dung sự kiện: content/events/ (tra ID tk_dau).
// ----- Kẻ truy sát -----
// Nội dung sự kiện: content/events/ (tra ID ts_phuc).
// Nội dung sự kiện: content/events/ (tra ID ts_dam).
// Nội dung sự kiện: content/events/ (tra ID ts_doc).
// Nội dung sự kiện: content/events/ (tra ID ts_bay).
// Nội dung sự kiện: content/events/ (tra ID ts_dau).
// ----- Dị tượng thêm -----
// Nội dung sự kiện: content/events/ (tra ID dt_khi).
// Nội dung sự kiện: content/events/ (tra ID dt_sao).
// Nội dung sự kiện: content/events/ (tra ID dt_dau).
// ----- Chỉ có ban đêm -----
// Nội dung sự kiện: content/events/ (tra ID d_hon).
// Nội dung sự kiện: content/events/ (tra ID d_dom).
// Nội dung sự kiện: content/events/ (tra ID d_trom).
// Nội dung sự kiện: content/events/ (tra ID d_sao).
// Nội dung sự kiện: content/events/ (tra ID d_quan).
// Nội dung sự kiện: content/events/ (tra ID d_lua).
// Nội dung sự kiện: content/events/ (tra ID d_trang).
// Nội dung sự kiện: content/events/ (tra ID d_ca).
// Nội dung sự kiện: content/events/ (tra ID d_mong).
// Nội dung sự kiện: content/events/ (tra ID d_soi).
// ----- Theo mùa -----
// Nội dung sự kiện: content/events/ (tra ID m_xuan1).
// Nội dung sự kiện: content/events/ (tra ID m_xuan2).
// Nội dung sự kiện: content/events/ (tra ID m_ha1).
// Nội dung sự kiện: content/events/ (tra ID m_ha2).
// Nội dung sự kiện: content/events/ (tra ID m_thu1).
// Nội dung sự kiện: content/events/ (tra ID m_thu2).
// Nội dung sự kiện: content/events/ (tra ID m_dong1).
// Nội dung sự kiện: content/events/ (tra ID m_dong2).
// ----- Cố nhân kiếp trước -----
// Nội dung sự kiện: content/events/ (tra ID bao_an_co).


// lời kể bế quan theo chỗ ngồi: giữa thành trấn (chưa có động phủ) thì là phòng trọ, không phải vách đá
function bqText(){const r=G.run;const n=r&&nodeById(r.at);return n&&!n.dp&&(isTownT(n.type)||n.type==='cho')?REST_T.bqTown:REST_T.bq;}

// câu mở đầu {mo} (thời tiết, thời khắc) phải hợp giờ và mùa đang có: không "giữa trưa" lúc nửa đêm, không "tuyết đầu mùa" giữa hè
{const MO0=P.mo.slice();const PART={sang:[5,11],chieu:[4,9,18,22],toi:[0,10],dem:[3,7,13,19,23]};const ANY=[1,2,8,12,14,16,17];const SEA={dong:[6,15],thu:[20],xuan:[21],ha:[9]};
 const dayAll=[16];let key='';
 Object.defineProperty(P,'mo',{configurable:true,get(){if(!G.run||!G.meta||!G.meta.world)return MO0;const t=W().t,pt=partOf(t),se=seasonOf(t);
   const ok=new Set(ANY.concat(PART[pt]||[],SEA[se]||[]));if(pt==='dem'||pt==='toi')ok.delete(16);for(const [k,L] of Object.entries(SEA))if(k!==se)L.forEach(i=>ok.delete(i));
   const k=pt+se;if(k!==key){key=k;delete BAG.mo;}return MO0.filter((x,i)=>ok.has(i));}});}
