// ---------- màn bản đồ: thẻ trạng thái, nút bản đồ, thẻ địa điểm ----------

function clkStr(t){return `<span>ngày ${Math.floor((t%HM)/HD)+1} · tháng ${tMonth(t)+1}</span><b class="ck-y">Năm ${tYear(t)}</b><span>giờ ${gioName(t)}</span>`;}
// thẻ thông tin quận: hiện khi chạm một ô đất trống

const WICON={ngoai:'M5 19L19 5M8 8l3 3M13 13l3 3',bong:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',gay:'M6 6l12 12M4 6a2 2 0 114 0 2 2 0 11-4 0M16 18a2 2 0 114 0 2 2 0 11-4 0M11 9l-2 2M15 13l-2 2',
  noi:'M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10zM12 8l-2 4h4l-2 4',than:'M12 4a8 8 0 100 16 8 8 0 000-16zM12 8a4 4 0 104 4M12 12h.01',doc:'M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11zM10 14h.01M14 14h.01',
  nguy:'M12 4v10M12 18v.5',mu:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM4 4l16 16',cut:'M6 4v8a4 4 0 004 4h2M14 16l5 5M19 16l-5 5',que:'M9 4v9l-3 7M9 13h5l3 7M4 20h16',
  ma:'M6 12a6 6 0 1112 0v3l-2 1v3H8v-3l-2-1zM9.5 12.5h.01M14.5 12.5h.01',tho:'M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9',truy:'M14 4h6v6L9 21l-2-2-3 1 1-3-2-2L14 4z'};
function durShort(h){if(h<HD)return Math.max(1,Math.round(h))+' giờ';if(h<HM)return Math.round(h/HD)+' ngày';if(h<HY)return Math.round(h/HM)+' th';return numVN(h/HY)+' năm';}

const ENTER_L={tran:'Vào thôn trấn',thanh:'Vào thành',tong:'Lên sơn môn',ai:'Tới cửa ải',sao:'Vào sào huyệt',dong:'Vào hang',phe:'Vào phế tích',ma:'Vào ma địa',thien:'Bước lên',rung:'Vào rừng',nui:'Lên núi',song:'Ra bến nước',bien:'Ra bờ biển',hoang:'Vào hoang dã'};
function nodeInfo(n){const sure=n.fog>=2||n.memory;let info=`${capS(TYPE_NAME[n.type])}${sure?'':' (nghe đồn)'}`;
  const tags=[];if(n.fog>=3&&n.dp)tags.push('có động phủ');if(n.memory)tags.push('ký ức kiếp trước');if((n.vstate||'ok')==='ruin'&&n.fog>=2)tags.push('hoang tàn');if(n.fog>=2&&W().t-n.seenT>HY)tags.push('tin cũ');if(n.grave)tags.push('có mộ cũ');
  return {sure,info,tags};}

