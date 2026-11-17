// Nguồn chuẩn: WOUND. Luật xử lý ở src/game/core2/03-cong-hien-tong-mon.js.
const WOUND={
  ngoai:{n:'Ngoại thương',m:[2,6],fx:{atkP:-10,defP:-10},d:'Vết chém, vết cào ngoài da thịt.'},
  bong:{n:'Bỏng',m:[3,8],fx:{defP:-15},d:'Da thịt cháy sém.'},
  gay:{n:'Gãy xương',m:[6,14],fx:{atkP:-15,tp:-3},d:'Xương gãy, cử động khó.'},
  noi:{n:'Nội thương',m:[12,24],fx:{mpP:-20,matkP:-20},d:'Kinh mạch chấn động, chân khí tán loạn.'},
  than:{n:'Thần thức tổn thương',m:[12,30],fx:{ngo:-3,tam:-2},d:'Thức hải rạn nứt, đầu đau như búa bổ.'},
  doc:{n:'Trúng độc',m:[6,12],fx:{},d:'Mỗi giờ mất 1% khí huyết (không xuống dưới một phần mười). Giải Độc Đan trị dứt.'},
  nguy:{n:'Vết thương chí mạng',fx:{atkP:-25,defP:-25},d:'Phải dùng đan hồi khí huyết trong ba ngày, không thì chết hoặc tàn phế.'},
  mu:{n:'Mù một mắt',perm:1,fx:{dodge:-6,crit:-5},d:'Thương tật vĩnh viễn.'},
  cut:{n:'Cụt một tay',perm:1,fx:{atkP:-25},d:'Thương tật vĩnh viễn.'},
  que:{n:'Què chân',perm:1,fx:{tp:-4},d:'Thương tật vĩnh viễn.'},
};
