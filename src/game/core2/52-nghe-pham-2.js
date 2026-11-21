// ĐỢT 7.3: mười sáu nghề phàm còn lại (bảng NGHE ở content/rules/nghe.js, sự kiện content/events/nghe/<mã>.json).
// Việc của nghề có thể mang nghiệp (deed: móc túi, trộm nhà phú hộ, cứu tế…): làm xong thì ghi vào Hành Đạo / Nghiệp Duyên như sự kiện.
{const _nd=ngDo;ngDo=function(ma,aid){const ok=_nd.apply(this,arguments);const a=ok&&G.run&&ngAct(ma,aid);
  if(a&&a.deed&&typeof deed==='function'){deed(a.deed,{src:'nghe:'+ma});dbg('nghe.deed',{ma,id:aid,deed:a.deed});}return ok;};}
