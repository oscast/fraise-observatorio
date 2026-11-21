const data = [['Forward deployed engineer',361],['Security engineer',34],['Platform engineer',30],['Embedded systems engineer',25],['Member of Technical Staff',11],['Backend engineer',4.2],['Mobile engineer',-39],['iOS engineer',-46],['Android engineer',-47],['Front-end engineer',-51]];
const chart = document.querySelector('#chart');
function render(sort) {
  const rows = sort === 'ascending' ? [...data].sort((a,b)=>a[1]-b[1]) : data;
  chart.replaceChildren(...rows.map(([name,value])=>{
    const row=document.createElement('div'); row.className='chart-row';
    const label=document.createElement('span'); label.textContent=name;
    const track=document.createElement('div'); track.className='track';
    const bar=document.createElement('div'); bar.className='bar'+(value<0?' neg':'');
    // A shared linear scale with zero at 20% and room for +361%.
    const width=Math.abs(value)/460*100; bar.style.width=`${width}%`; bar.style.left=`${value<0?20-width:20}%`;
    track.append(bar);
    const result=document.createElement('span'); result.className='chart-value'; result.textContent=(value>0?'+':'−')+String(Math.abs(value)).replace('.',',')+'%';
    row.append(label,track,result); return row;
  }));
}
document.querySelectorAll('[data-sort]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-sort]').forEach(b=>b.setAttribute('aria-pressed',String(b===button))); render(button.dataset.sort)}));
render('original');
