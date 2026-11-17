// Nguồn chuẩn: BOSS. Luật xử lý ở src/game/core/03-dan-duoc-phu-luc.js.
const BOSS = [
  [
    {id:'traichu',i:'🪓',n:'Trại chủ {$nick}',sub:'Thủ lĩnh {$trai}',el:'tho',pat:['atk','rage','charge','heavy','multi','block'],hp:4.2,atk:1.25,def:1.2,
      t:['Hắn ngồi trên chiếc ghế phủ da hổ, đao dựng bên cạnh còn dính máu chưa khô. “Lại một đứa muốn làm anh hùng.”','Sau lưng hắn là ba mươi tên lâu la, trước mặt là đống lửa nướng nửa con trâu. Hắn chùi mỡ lên áo, đứng dậy.']},
    {id:'thuyeu',i:'🌳',n:'Thụ Yêu Ngàn Năm',sub:'Linh thụ hóa yêu',el:'moc',pat:['poison','block','drain','charge','heavy','heal'],hp:4.6,atk:1.1,def:1.3,
      t:['Cây hòe già trước miếu bỗng mở mắt. Hàng nghìn rễ cây trồi lên khỏi mặt đất, trên đó còn vướng xương người.','Lá cây xào xạc thành tiếng người: “Ngàn năm… ngươi là kẻ thứ bao nhiêu nhỉ?”']},
    {id:'huyetlang',i:'🐺',n:'Huyết Lang Vương',sub:'Yêu thú nhị giai',el:'am',pat:['multi','rage','multi','charge','heavy'],hp:4.0,atk:1.3,def:1,
      t:['Tiếng tru vang dội cả thung lũng. Con sói đầu đàn to như con trâu, lông đỏ như nhuộm máu.','Bầy sói rẽ ra hai bên. Lang Vương bước tới, mỗi bước để lại một vết chân cháy đen.']},
  ],
  [
    {id:'phando',i:'🧔',n:'{$ten}',sub:'Phản đồ {$sect}',el:'kim',pat:['weak','atk','charge','heavy','drain','block'],hp:4.2,atk:1.25,def:1.1,
      t:['“{$sect} đuổi ta ba nghìn dặm, rốt cuộc lại sai một đứa ranh đến?” Hắn cười, kiếm quang quấn quanh người như rắn.','Áo đệ tử của hắn đã rách tả tơi, nhưng ánh mắt vẫn kiêu ngạo như ngày còn là chân truyền.']},
    {id:'hacgiao',i:'🐉',n:'Hắc Giao',sub:'Yêu giao trăm năm',el:'thuy',pat:['atk','poison','charge','heavy','block','multi'],hp:4.6,atk:1.2,def:1.2,
      t:['Mặt đầm sủi bọt. Một cái đầu to như cái chum nhô lên, sừng mới nhú, mắt vàng như hai ngọn đèn.','Nước rút xuống đột ngột. Giữa đáy đầm lộ ra một thân rắn đen bóng, vảy dày như mai rùa.']},
    {id:'giadan',i:'😈',n:'{$nick} Ma Quân',sub:'Ma tu giả đan',el:'am',pat:['drain','vuln','multi','charge','heavy','rage'],hp:4.0,atk:1.3,def:1,
      t:['Ma khí cuồn cuộn. Lão tóc trắng xóa mà mặt như đứa trẻ. “Giả đan cũng là đan. Huyết nhục của ngươi sẽ giúp ta thành thật.”','Trong động là chín cái đỉnh đồng, cái nào cũng sôi sùng sục thứ nước đỏ sệt.']},
  ],
  [
    {id:'ngunhantl',i:'🧜',n:'Ngư Nhân Thống Lĩnh',sub:'Chúa tể rạn san hô',el:'thuy',pat:['multi','block','charge','heavy','weak','atk'],hp:4.3,atk:1.25,def:1.2,
      t:['Tiếng tù và vỏ ốc rúc lên ba hồi. Thống lĩnh ngư nhân cưỡi trên lưng cá mập trắng, đinh ba xanh lè ánh độc.','Biển rẽ đôi. Kẻ cầm đầu tộc ngư nhân bước ra, cao gấp rưỡi người thường, vảy lấp lánh như giáp bạc.']},
    {id:'cuuvi',i:'🦊',n:'Cửu Vĩ Yêu Hồ',sub:'Yêu vương Thanh Khâu',el:'hoa',pat:['weak','drain','multi','heal','charge','heavy'],hp:4.0,atk:1.3,def:1,
      t:['Chín cái đuôi xòe ra như quạt lửa. Nàng cười, và ngươi bỗng quên mất mình đến đây làm gì.','Trên ngai bằng xương, một nữ tử áo trắng gác chân. “Người tu tiên các ngươi, thịt có vị khác hẳn.”']},
    {id:'haitroc',i:'🐙',n:'Hải Trọc Lão Yêu',sub:'Yêu vật biển sâu',el:'thuy',pat:['weak','multi','drain','block','charge','heavy'],hp:4.8,atk:1.15,def:1.3,
      t:['Những xúc tu to như cột đình trồi lên quanh thuyền. Ở giữa là một con mắt duy nhất, to bằng cái nong.','Nước biển đen lại như mực. Thứ gì đó dưới kia vừa thức giấc sau năm trăm năm.']},
  ],
  [
    {id:'maton',i:'👹',n:'{$nick} Ma Tôn',sub:'Chủ nhân một phương ma vực',el:'am',pat:['rage','drain','vuln','charge','heavy','multi'],hp:4.3,atk:1.3,def:1.1,
      t:['Ngai đá đen dựng trên núi xương. Người ngồi trên đó mỉm cười, giọng ôn hòa như thầy đồ: “Ngồi đi. Trước khi chết, nói chuyện chút đã.”','Huyết vân che kín trời. Ma Tôn giơ tay, cả vạn oan hồn cùng gào lên một lúc.']},
    {id:'thivuong',i:'🧟',n:'Thi Vương',sub:'Cương thi vạn năm',el:'tho',pat:['poison','block','atk','charge','heavy','heal'],hp:5,atk:1.15,def:1.4,
      t:['Nắp quan tài bằng đồng xanh từ từ trượt ra. Bên trong là một vị tướng quân, giáp trụ còn nguyên, mắt mở trừng trừng.','Cả nghĩa địa rung chuyển. Hàng nghìn bàn tay xương thò lên khỏi mặt đất, cùng chỉ về phía ngươi.']},
    {id:'huyethai',i:'🩸',n:'Huyết Hải Lão Tổ',sub:'Kẻ uống cạn một dòng sông',el:'am',pat:['drain','drain','rage','charge','heavy','vuln'],hp:4.5,atk:1.25,def:1.1,
      t:['Biển máu sôi lên, một bóng người từ từ đứng dậy, máu chảy ròng ròng mà không dính vào áo.','“Ba nghìn năm trước ta cũng là chính đạo.” Lão nói, giọng buồn như mưa. “Rồi ta khát.”']},
  ],
  [
    {id:'thumon',i:'🗿',n:'Thủ Môn Thiên Tướng',sub:'Kẻ giữ cửa trời',el:'kim',pat:['atk','multi','stun','charge','heavy','rage','block'],hp:5.2,atk:1.25,def:1.3,esc:1,
      t:['Một pho tượng đá cao trăm trượng đứng chắn cổ lộ. Khi ngươi tới gần, đôi mắt đá từ từ mở ra.','“Vạn năm qua, chưa ai qua được cửa này.” Giọng nói vang lên từ trong đá, nặng như núi.']},
  ],
];
