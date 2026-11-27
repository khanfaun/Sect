cd /c/Users/My-PC/Downloads/demo/Sect
S=$(node tools/run.js "(()=>{const w=ddBoCuc(DD_HAT);return [...new Set(w.regions.flatMap(R=>R.nodes).filter(n=>O_ANH.ve.includes(n.id)).map(n=>n.type+placeCells(n).length+'@'+n.hex))].sort().join(',')})()" | tail -1)
echo "${#S} ký tự"; python -c "
import re,sys;p='tools/test-ui.js';s=open(p,encoding='utf-8').read();s=re.sub(r\"const BO_CUC_Q5 = '[^']*'\",\"const BO_CUC_Q5 = '\"+sys.argv[1]+\"'\",s,1);open(p,'w',encoding='utf-8').write(s)" "$S"
