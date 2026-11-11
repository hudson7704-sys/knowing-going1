const T={
'discount':['Discount','Money & Finance',['price','Original price','number'],['rate','Discount %','number']],
'tip':['Tip Calculator','Money & Finance',['bill','Bill amount','number'],['rate','Tip %','number'],['people','People','number']],
'percentage':['Percentage','Money & Finance',['part','Part','number'],['total','Total','number']],
'sales-tax':['Sales Tax','Money & Finance',['price','Price','number'],['rate','Tax %','number']],
'markup':['Markup','Money & Finance',['cost','Cost','number'],['rate','Markup %','number']],
'loan':['Loan Calculator','Money & Finance',['principal','Loan amount','number'],['rate','Annual interest %','number'],['years','Term (years)','number']],
'mortgage':['Mortgage Calculator','Money & Finance',['price','Home price','number'],['down','Down payment','number'],['rate','Annual interest %','number'],['years','Term (years)','number']],
'paycheck':['Paycheck Calculator','Money & Finance',['rate','Hourly rate','number'],['hours','Regular hours','number'],['overtime','Overtime hours','number'],['deductions','Deductions','number']],
'compound-interest':['Compound Interest','Money & Finance',['principal','Starting amount','number'],['rate','Annual rate %','number'],['years','Years','number'],['n','Compounds per year','number']],
'ratio':['Ratio','Money & Finance',['a','A','number'],['b','B','number'],['c','C','number']],
'tax-refund':['Tax & Refund Estimate','Money & Finance',['income','Annual income','number'],['withheld','Tax withheld','number'],['tax','Estimated tax owed','number']],
'temperature':['Temperature','Conversions',['value','Temperature','number'],['from','From','select:Celsius|Fahrenheit|Kelvin'],['to','To','select:Celsius|Fahrenheit|Kelvin']],
'miles':['Miles to Kilometers','Conversions',['miles','Miles','number']],
'pounds':['Pounds to Kilograms','Conversions',['pounds','Pounds','number']],
'fraction':['Fraction Calculator','Conversions',['a','Numerator 1','number'],['b','Denominator 1','number'],['c','Numerator 2','number'],['d','Denominator 2','number'],['op','Operation','select:+|-|*|/']],
'kg-to-pounds':['Kilograms to Pounds','Conversions',['kg','Kilograms','number']],
'feet-to-inches':['Feet to Inches','Conversions',['feet','Feet','number']],
'age':['Age Calculator','Date & Time',['birth','Birth date','date'],['asof','As of','date']],
'days-between':['Days Between Dates','Date & Time',['start','Start date','date'],['end','End date','date']],
'business-days':['Business Days','Date & Time',['start','Start date','date'],['end','End date','date']],
'gas-mileage':['Gas Mileage','Automotive',['miles','Miles driven','number'],['gallons','Gallons used','number'],['price','Price per gallon','number']],
'tire-size':['Tire Size Comparison','Automotive',['w1','Original width (mm)','number'],['a1','Original aspect ratio','number'],['r1','Original wheel (in)','number'],['w2','New width (mm)','number'],['a2','New aspect ratio','number'],['r2','New wheel (in)','number']],
'flooring':['Flooring Estimator','Home Improvement & Estimating',['length','Room length (ft)','number'],['width','Room width (ft)','number'],['waste','Waste %','number'],['price','Material price / sq ft','number']],
'painting':['Painting Estimator','Home Improvement & Estimating',['length','Room length (ft)','number'],['width','Room width (ft)','number'],['height','Wall height (ft)','number'],['openings','Doors/windows area (sq ft)','number'],['coverage','Coverage per gallon (sq ft)','number'],['price','Price per gallon','number']],
'estimating':['General Estimating Tool','Home Improvement & Estimating',['materials','Materials','number'],['laborHours','Labor hours','number'],['laborRate','Labor rate / hour','number'],['overhead','Overhead %','number'],['markup','Markup %','number']],
'invoice':['Invoice Generator','Business Tools',['business','Your business','text'],['customer','Customer','text'],['number','Invoice #','text'],['items','Items / description','textarea'],['subtotal','Subtotal','number'],['tax','Tax %','number']],
'receipt':['Receipt Generator','Business Tools',['business','Business','text'],['customer','Customer','text'],['items','Items / description','textarea'],['total','Total','number'],['date','Date','date']],
'pdf-document':['PDF / Document Builder','Business Tools',['title','Document title','text'],['author','Author / business','text'],['body','Document text','textarea']],
'lead-generator':['Lead Generator','Business & Leads',['name','Name','text'],['phone','Phone','text'],['email','Email','text'],['project','Project type','select:Flooring|Painting|Remodeling|Auto|Other'],['details','Project details','textarea']]
};
const money=x=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(x));
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
function calc(id,v){switch(id){
case'discount':{let s=v.price*v.rate/100;return`You save <b>${money(s)}</b><br>Sale price: <b>${money(v.price-s)}</b>`}
case'tip':{let t=v.bill*v.rate/100;return`Tip: <b>${money(t)}</b><br>Total: <b>${money(v.bill+t)}</b><br>Per person: <b>${money((v.bill+t)/v.people)}</b>`}
case'percentage':return`${(v.part/v.total*100).toFixed(2)}%`;
case'sales-tax':{let t=v.price*v.rate/100;return`Tax: <b>${money(t)}</b><br>Total: <b>${money(v.price+t)}</b>`}
case'markup':{let m=v.cost*v.rate/100;return`Markup: <b>${money(m)}</b><br>Selling price: <b>${money(v.cost+m)}</b>`}
case'loan':{let n=v.years*12,r=v.rate/1200,p=r===0?v.principal/n:v.principal*r/(1-Math.pow(1+r,-n));return`Monthly payment: <b>${money(p)}</b><br>Total paid: ${money(p*n)}<br>Total interest: ${money(p*n-v.principal)}`}
case'mortgage':{let p=v.price-v.down,n=v.years*12,r=v.rate/1200,x=r===0?p/n:p*r/(1-Math.pow(1+r,-n));return`Loan amount: <b>${money(p)}</b><br>Monthly principal & interest: <b>${money(x)}</b><br>Total paid: ${money(x*n)}`}
case'paycheck':{let g=v.rate*v.hours+v.rate*1.5*v.overtime;return`Gross pay: <b>${money(g)}</b><br>After listed deductions: <b>${money(g-v.deductions)}</b>`}
case'compound-interest':{let a=v.principal*Math.pow(1+v.rate/100/v.n,v.n*v.years);return`Future value: <b>${money(a)}</b><br>Interest earned: ${money(a-v.principal)}`}
case'ratio':return`${v.a} : ${v.b} = ${v.c} : <b>${(v.c*v.b/v.a).toFixed(4)}</b>`;
case'tax-refund':{let d=v.withheld-v.tax;return d>=0?`Estimated refund: <b>${money(d)}</b>`:`Estimated amount due: <b>${money(-d)}</b>`}
case'temperature':{let c=v.from==='Celsius'?v.value:v.from==='Fahrenheit'?(v.value-32)*5/9:v.value-273.15;let r=v.to==='Celsius'?c:v.to==='Fahrenheit'?c*9/5+32:c+273.15;return`<b>${r.toFixed(4)}</b> ${v.to}`}
case'miles':return`<b>${(v.miles*1.609344).toFixed(4)}</b> kilometers`;
case'pounds':return`<b>${(v.pounds*.45359237).toFixed(4)}</b> kilograms`;
case'fraction':{if(v.b===0||v.d===0)throw Error('Denominators cannot be zero.');let n=v.op==='+'?v.a*v.d+v.c*v.b:v.op==='-'?v.a*v.d-v.c*v.b:v.op==='*'?v.a*v.c:v.a*v.d,q=v.op==='+'||v.op==='-'?v.b*v.d:v.op==='*'?v.b*v.d:v.b*v.c,g=gcd(n,q);return`Result: <b>${n/g}/${q/g}</b> (${(n/q).toFixed(4)})`}
case'kg-to-pounds':return`<b>${(v.kg*2.2046226218).toFixed(4)}</b> pounds`;
case'feet-to-inches':return`<b>${(v.feet*12).toFixed(2)}</b> inches`;
case'age':{let a=new Date(v.birth+'T00:00:00'),b=new Date(v.asof+'T00:00:00');if(a>b)throw Error('Birth date cannot be after the as-of date.');let y=b.getFullYear()-a.getFullYear(),m=b.getMonth()-a.getMonth(),d=b.getDate()-a.getDate();if(d<0){m--;d+=new Date(b.getFullYear(),b.getMonth(),0).getDate()}if(m<0){y--;m+=12}return`<b>${y}</b> years, <b>${m}</b> months, <b>${d}</b> days`}
case'days-between':return`<b>${Math.round(Math.abs(new Date(v.end)-new Date(v.start))/86400000)}</b> days`;
case'business-days':{let a=new Date(v.start+'T00:00:00'),b=new Date(v.end+'T00:00:00');if(a>b)[a,b]=[b,a];let n=0;while(a<=b){if(a.getDay()>0&&a.getDay()<6)n++;a.setDate(a.getDate()+1)}return`<b>${n}</b> business days`}
case'gas-mileage':return`Fuel economy: <b>${(v.miles/v.gallons).toFixed(2)} MPG</b><br>Fuel cost: <b>${money(v.gallons*v.price)}</b>`;
case'tire-size':{let d1=2*(v.w1*v.a1/100)/25.4+v.r1,d2=2*(v.w2*v.a2/100)/25.4+v.r2,delta=d2-d1;return`Original diameter: <b>${d1.toFixed(2)} in</b><br>New diameter: <b>${d2.toFixed(2)} in</b><br>Difference: <b>${delta.toFixed(2)} in</b><br>Change: <b>${(delta/d1*100).toFixed(2)}%</b>`}
case'flooring':{let a=v.length*v.width,n=a*(1+v.waste/100);return`Room area: <b>${a.toFixed(2)} sq ft</b><br>Order with waste: <b>${n.toFixed(2)} sq ft</b><br>Estimated material: <b>${money(n*v.price)}</b>`}
case'painting':{let area=Math.max(0,2*(v.length+v.width)*v.height-v.openings),g=Math.ceil(area/v.coverage);return`Paintable area: <b>${area.toFixed(2)} sq ft</b><br>Estimated gallons: <b>${g}</b><br>Estimated paint cost: <b>${money(g*v.price)}</b>`}
case'estimating':{let d=v.materials+v.laborHours*v.laborRate,o=d*v.overhead/100,total=(d+o)*(1+v.markup/100);return`Direct cost: <b>${money(d)}</b><br>Overhead: ${money(o)}<br>Suggested estimate: <b>${money(total)}</b>`}
case'invoice':{let t=v.subtotal*v.tax/100,total=v.subtotal+t;return`<div class="printable"><h2>${esc(v.business)}</h2><p>Invoice # ${esc(v.number)}<br>Customer: ${esc(v.customer)}</p><p>${esc(v.items).replace(/\n/g,'<br>')}</p><hr>Subtotal: <b>${money(v.subtotal)}</b><br>Tax: <b>${money(t)}</b><br>Total: <b>${money(total)}</b></div><button onclick="window.print()">Print / Save PDF</button>`}
case'receipt':return`<div class="printable"><h2>Receipt</h2><p>${esc(v.business)}<br>${esc(v.date)}<br>Customer: ${esc(v.customer)}</p><p>${esc(v.items).replace(/\n/g,'<br>')}</p><h3>Total: ${money(v.total)}</h3></div><button onclick="window.print()">Print / Save PDF</button>`;
case'pdf-document':return`<div class="printable"><h2>${esc(v.title)}</h2><p class="muted">${esc(v.author)}</p><hr><div>${esc(v.body).replace(/\n/g,'<br>')}</div></div><button onclick="window.print()">Print / Save PDF</button>`;
case'lead-generator':return`<div class="printable"><h3>Lead captured</h3><p><b>Name:</b> ${esc(v.name)}<br><b>Phone:</b> ${esc(v.phone)}<br><b>Email:</b> ${esc(v.email)}<br><b>Project:</b> ${esc(v.project)}</p><p>${esc(v.details)}</p><p class="muted">Connect this form to an email/CRM service before collecting real customer leads.</p></div>`;
default:throw Error('Tool not found.')}}
function form(slug){let t=T[slug];return`<h2>${t[0]}</h2><p class="muted">${t[1]}</p><form id="f">${t.slice(2).map(([k,l,type])=>type.startsWith('select:')?`<div class="field"><label>${l}</label><select name="${k}">${type.slice(7).split('|').map(x=>`<option>${x}</option>`).join('')}</select></div>`:`<div class="field"><label>${l}</label><${type==='textarea'?'textarea':`input type="${type}" step="any"`} name="${k}">${type==='textarea'?'':''}${type==='textarea'?'</textarea>':''}</div>`).join('')}<button>Calculate / Generate</button><button type="button" id="clear" class="secondary">Clear</button><div id="result" class="result" aria-live="polite"></div></form>`}
function init(){let slug=location.pathname.split('/').pop().replace('.html','');if(slug==='index'||slug===''){let a=document.querySelector('#app'),g={};Object.entries(T).forEach(([s,t])=>(g[t[1]]??=[]).push([s,t]));a.innerHTML=Object.entries(g).map(([c,x])=>`<section><h2>${c}</h2><div class="grid">${x.map(([s,t])=>`<article class="card"><h3>${t[0]}</h3><p>Free Knowing & Going tool.</p><a href="${s}.html" class="btn">Open tool</a></article>`).join('')}</div></section>`).join('');document.querySelector('#search').addEventListener('input',e=>{let q=e.target.value.toLowerCase();document.querySelectorAll('.card').forEach(c=>c.hidden=!c.innerText.toLowerCase().includes(q))});return}if(!T[slug])return;document.querySelector('#tool').innerHTML=form(slug);let f=document.querySelector('#f');f.addEventListener('submit',e=>{e.preventDefault();let v={};for(let el of f.elements)if(el.name)v[el.name]=el.type==='number'?Number(el.value):el.value;try{for(let x of T[slug].slice(2))if(x[2]==='number'&&!Number.isFinite(v[x[0]]))throw Error('Please enter valid numbers.');document.querySelector('#result').innerHTML=calc(slug,v)}catch(err){document.querySelector('#result').textContent=err.message||'Please check your entries.'}});document.querySelector('#clear').onclick=()=>{f.reset();document.querySelector('#result').textContent=''}}document.addEventListener('DOMContentLoaded',()=>{document.querySelector('#year').textContent=new Date().getFullYear();init()});
