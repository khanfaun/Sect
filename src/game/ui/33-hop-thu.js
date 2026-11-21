// Hộp thư (core2/77): mở hộp, nhận hết lời công trình.
ACT.hopThu=()=>{if(!G.run)return;UI.modal={k:'hopthu'};};
ACT.hopNhan=()=>{const T=hopNhan();UI.modal=null;if(T)note(contentText('hop.nhanLog',[[T.bac?fmtBac(T.bac):'',T.lt?T.lt+' linh thạch':''].filter(Boolean).join(', ')||contentText('hop.vat')]),'up');};
