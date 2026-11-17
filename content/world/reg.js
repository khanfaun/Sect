// Nguồn chuẩn: REG. Luật xử lý ở src/game/core/03-dan-duoc-phu-luc.js.
const REG = [
  {n:'Phàm Trần',seal:'壹',sub:'Biên thùy {$quoc}',types:['tran','rung','nui','song','phe','thanh'],tint:['#C9B98E','#A99A72','#8A7F62'],sky:'#F6ECD2',
    intro:['Ngươi rời {$que} vào một sớm sương mù. Phía trước là núi, sau lưng là khói bếp. Đường tiên dài lắm, nhưng bước đầu tiên chỉ cần một bước.','Người trong làng tiễn ngươi đến đầu đường. Có người dúi vào tay ngươi gói xôi, có người lắc đầu. Ngươi không ngoảnh lại.']},
  {n:'Linh Sơn Vạn Lĩnh',seal:'貳',sub:'Đất của tông môn',types:['tong','nui','rung','thanh','dong','phe'],tint:['#A9BFA2','#7F9E86','#5F7E6A'],sky:'#EEF0DE',
    intro:['Trúc Cơ rồi, ngươi mới thấy được thế giới thật sự. Những ngọn núi ở đây lơ lửng trên mây, mỗi ngọn là một tông môn, mỗi tông môn là một vương quốc.','Phàm trần ở lại sau lưng như một giấc mơ cũ. Linh khí nơi đây đặc như sương, và người tu tiên ở đây nhìn nhau bằng ánh mắt dò xét.']},
  {n:'Đông Hải Yêu Vực',seal:'參',sub:'Vạn đảo, vạn yêu',types:['bien','song','dong','rung','hoang','thanh'],tint:['#9FB8BE','#7899A3','#566F7E'],sky:'#E8EEE8',
    intro:['Biển. Ngươi chưa từng thấy nhiều nước đến thế. Ngàn hòn đảo rải rác như sao, đảo nào cũng có chủ, chủ nào cũng không phải người.','Gió mặn thổi rát mặt. Ở Đông Hải, luật lệ duy nhất là sức mạnh, và yêu tộc nhớ dai hơn con người.']},
  {n:'Cửu U Ma Vực',seal:'肆',sub:'Nơi mặt trời không chiếu tới',types:['ma','hoang','phe','dong','thanh'],tint:['#B49A9A','#8A6F78','#5E4A5A'],sky:'#F0E2DA',
    intro:['Ranh giới ma vực là một con sông đen. Bên này còn có tiếng chim, bên kia chỉ còn tiếng gió. Ngươi bước qua cầu đá, và nghe thấy tiếng cười đâu đó.','Nghe nói ba nghìn năm trước, nơi đây là một thiên đường. Rồi có người mở một cánh cửa không nên mở.']},
  {n:'Cửu Thiên Cổ Lộ',seal:'伍',sub:'Con đường cuối cùng',types:['thien','phe','hoang','nui'],tint:['#D8CFB2','#BFB38F','#A29673'],sky:'#FBF6E6',
    intro:['Phía trên mây còn có mây. Con đường cổ bằng ngọc vắt qua hư không, trên đó rải rác di cốt của những kẻ đi trước.','Ở đây, thời gian trôi chậm như mật. Mỗi bước chân đều là một lần hỏi lại chính mình: vì sao ta tu tiên?']},
];
