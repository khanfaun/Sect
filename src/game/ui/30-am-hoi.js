// Sửa-I câu 39: nút trong hộp thoại U Minh Ám Hội (data-act="am", data-arg = hành động của amAct)
Object.assign(ACT,{am:a=>{if(!amAct(a))note(contentText('amh.thieu'),'dn');}});
// Sửa-J câu 44: Sổ tay thẻ Mệnh thư — mở lại lời mời mốc tuyến chưa trả lời
Object.assign(ACT,{tyMoLai:id=>{UI.panel=null;if(!tuyenMoLai(id))note(contentText('ty.moXa'),'dn');}});
