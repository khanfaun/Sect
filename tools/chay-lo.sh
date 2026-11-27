#!/bin/bash
# vẽ lần lượt các quận cho tới giờ HAN (epoch giây)
cd /c/Users/My-PC/Downloads/demo/Sect
export PYTHONIOENCODING=utf-8
for q in "$@"; do
  now=$(date +%s); if [ $((now+120)) -gt $HAN ]; then echo "HẾT GIỜ trước quận $q"; break; fi
  echo "=== QUẬN $q $(date +%H:%M:%S)"
  if [ ! -f work/quan-$q/lam.png ]; then python tools/quan-ve.py chuan-bi $q && cp work/quan-$q/nen.png work/quan-$q/lam.png; fi
  python tools/quan-phac.py $q ve 2>&1 | grep -v "^\s*$" | tail -40
  if [ -f work/quan-$q/ra/het-gio ]; then echo "DỪNG giữa quận $q"; break; fi
  echo "=== XONG QUẬN $q $(date +%H:%M:%S)"
done
echo "KẾT THÚC $(date +%H:%M:%S)"
