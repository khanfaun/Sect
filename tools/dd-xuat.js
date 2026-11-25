// Xuất bố cục địa điểm (loại, cụm ô, hình mẫu) của một hạt giống ra JSON cho tools/dd-ve-ban-do.py
// node tools/dd-xuat.js <hạt giống> > tệp.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = vm.createContext({ console, Math, JSON, Date, performance: { now: () => Date.now() } });
vm.runInContext(require('./ghep').script(['core', 'core2', 'data']), ctx, { filename: 'luat-choi.js' });
const h = +process.argv[2] || 20261125;
console.log(vm.runInContext(`(()=>{const w=ddBoCuc(${h});const g=geoFor(w);const L=[];
  for(const R0 of w.regions)for(const n of R0.nodes){const cs=placeCells(n);L.push({id:n.id,t:n.type,h:n.hinh||'1',quy:n.quy||0,hex:n.hex,cells:cs,
    xy:cs.map(c=>hexCenter(c).map(v=>Math.round(v*10)/10)),ter:g.ter[n.hex],phang:cs.filter(c=>O_PHANG[c]==='1').length});}
  return JSON.stringify({hat:${h},hexw:HEXW,ww:WORLD_W,wh:WORLD_H,noi:L});})()`, ctx));
