// ---------- màn bản đồ: thẻ trạng thái, nút bản đồ, thẻ địa điểm ----------

// biểu tượng buổi trong ngày và mùa (dùng cho cả điện thoại lẫn máy tính)
const CK_IC={
  sang:['#e0a21c','<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>','Buổi sáng'],
  chieu:['#e0742a','<path d="M6.5 16a5.5 5.5 0 0 1 11 0"/><path d="M3 16h18M12 5v2.5M4.6 9.6l1.8 1.5M19.4 9.6l-1.8 1.5M6 20h12"/>','Buổi chiều'],
  toi:['#7a5cc2','<path d="M19 14.5A8 8 0 1 1 9.5 5a6.5 6.5 0 0 0 9.5 9.5z"/>','Buổi tối'],
  dem:['#3f5aa8','<path d="M18 14.5A7.5 7.5 0 1 1 9.5 6a6 6 0 0 0 8.5 8.5z"/><path d="M19 3v4M17 5h4"/>','Ban đêm'],
  xuan:['#d4688a','<path d="M12 21v-8"/><path d="M12 13c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5zM12 15c0-3-2.2-5-5.5-5 0 3 2.2 5 5.5 5z"/>','Mùa xuân'],
  ha:['#d9552b','<path d="M3 9c2-2 3-2 5 0s3 2 5 0 3-2 5 0M3 14c2-2 3-2 5 0s3 2 5 0 3-2 5 0M3 19c2-2 3-2 5 0s3 2 5 0 3-2 5 0"/>','Mùa hạ'],
  thu:['#c0771e','<path d="M12 21V11M12 4c-4 2-6 5-6 8 2 2 4 2 6 0 2 2 4 2 6 0 0-3-2-6-6-8z"/>','Mùa thu'],
  dong:['#3f8fc4','<path d="M12 2v20M3.5 7l17 10M3.5 17l17-10M9.5 3.8 12 6l2.5-2.2M9.5 20.2 12 18l2.5 2.2"/>','Mùa đông']};
function ckIc(k){const x=CK_IC[k];return `<i class="ck-i" style="color:${x[0]}" title="${x[2]}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-label="${x[2]}">${x[1]}</svg></i>`;}
function clkStr(t){return `<b class="ck-y">Năm ${tYear(t)}</b><span class="ck-d">ngày ${Math.floor((t%HM)/HD)+1} · tháng ${tMonth(t)+1}</span><span class="ck-g">giờ ${gioName(t)}</span><span class="ck-p">${ckIc(partOf(t))}${ckIc(seasonOf(t))}</span>`;}
// thẻ thông tin quận: hiện khi chạm một ô đất trống

const WICON={ngoai:'M5 19L19 5M8 8l3 3M13 13l3 3',bong:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',gay:'M6 6l12 12M4 6a2 2 0 114 0 2 2 0 11-4 0M16 18a2 2 0 114 0 2 2 0 11-4 0M11 9l-2 2M15 13l-2 2',
  noi:'M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10zM12 8l-2 4h4l-2 4',than:'M12 4a8 8 0 100 16 8 8 0 000-16zM12 8a4 4 0 104 4M12 12h.01',doc:'M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11zM10 14h.01M14 14h.01',
  nguy:'M12 4v10M12 18v.5',mu:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM4 4l16 16',cut:'M6 4v8a4 4 0 004 4h2M14 16l5 5M19 16l-5 5',que:'M9 4v9l-3 7M9 13h5l3 7M4 20h16',
  ma:'M6 12a6 6 0 1112 0v3l-2 1v3H8v-3l-2-1zM9.5 12.5h.01M14.5 12.5h.01',na:'M5 4h14v16H5zM9 8h6M9 12h6M9 16h3',tho:'M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9',truy:'M14 4h6v6L9 21l-2-2-3 1 1-3-2-2L14 4z'};
function durShort(h){if(h<HD)return Math.max(1,Math.round(h))+' giờ';if(h<HM)return Math.round(h/HD)+' ngày';if(h<HY)return Math.round(h/HM)+' th';return numVN(h/HY)+' năm';}

const ENTER_L={tran:'Vào thôn trấn',thanh:'Vào thành',tong:'Lên sơn môn',ai:'Tới cửa ải',sao:'Vào sào huyệt',dong:'Vào hang',phe:'Vào phế tích',ma:'Vào ma địa',thien:'Bước lên',rung:'Vào rừng',nui:'Lên núi',song:'Ra bến nước',bien:'Ra bờ biển',hoang:'Vào hoang dã'};
function nodeInfo(n){const sure=n.fog>=2||n.memory;let info=`${capS(TYPE_NAME[n.type])}${sure?'':' (nghe đồn)'}`;
  const tags=[];if(n.fog>=3&&n.dp)tags.push('có động phủ');if(n.memory)tags.push('ký ức kiếp trước');if((n.vstate||'ok')==='ruin'&&n.fog>=2)tags.push('hoang tàn');if(n.fog>=2&&W().t-n.seenT>HY)tags.push('tin cũ');if(n.grave)tags.push('có mộ cũ');
  return {sure,info,tags};}

