// ĐỢT 2.5: đầu thai ngẫu nhiên; còn lượt chọn (G.meta.pick) thì hiện màn chọn lá số. Luật nguồn lượt chọn ở core2/37-linh-can.js.
{const _b=ACT.birth;ACT.birth=function(){const M=G.meta;if(M&&(M.pick||0)>0){M.pick--;genBirth();UI.sel=null;UI.panel=null;dbg('dt.pick',{left:M.pick});return;}return _b.apply(this,arguments);};}
