
const $=s=>document.querySelector(s);
let mx=innerWidth/2,my=innerHeight/2;addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
// theme
const rt=document.documentElement;try{rt.dataset.theme=localStorage.th||'dark'}catch(e){}
$('#th').onclick=e=>{const f=()=>{rt.dataset.theme=rt.dataset.theme=='dark'?'light':'dark';try{localStorage.th=rt.dataset.theme}catch(e){}};
 if(!document.startViewTransition)return f();const x=e.clientX,y=e.clientY,rad=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
 document.startViewTransition(f).ready.then(()=>rt.animate({clipPath:[`circle(0 at ${x}px ${y}px)`,`circle(${rad}px at ${x}px ${y}px)`]},{duration:800,easing:'cubic-bezier(.6,0,.2,1)',pseudoElement:'::view-transition-new(root)'}))};
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target,ix=[...t.parentElement.children].indexOf(t);t.style.transitionDelay=Math.min(ix,5)*90+'ms';setTimeout(()=>t.style.transitionDelay='',1800);t.classList.add('in');const n=e.target.querySelector('[data-n]')||(e.target.dataset.n&&e.target);n&&count(n);io.unobserve(e.target)}),{threshold:.2});
document.querySelectorAll('.rv').forEach(x=>io.observe(x));
function count(el){if(el.done)return;el.done=1;const t=+el.dataset.n,d=+el.dataset.d||0,s=el.dataset.s||'',t0=performance.now();
 (function f(n){const k=Math.min((n-t0)/1800,1),v=t*(1-Math.pow(1-k,3));el.textContent=v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,',')+s;k<1&&requestAnimationFrame(f)})(t0)}
// animated background: twinkling stars, drifting dust, shooting stars
const bc=$('#bg'),bx=bc.getContext('2d');let W,H,SP=[],SH=[],SW=[];
function bs(){W=bc.width=innerWidth;H=bc.height=innerHeight;SP=Array.from({length:Math.round(W*H/7000)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,p:Math.random()*6.3,s:Math.random()*.02+.005,v:Math.random()*.15+.03}))}
addEventListener('resize',bs);bs();
let AR='94,225,255';
(function bl(){requestAnimationFrame(bl);bx.clearRect(0,0,W,H);const c=getComputedStyle(rt).getPropertyValue('--st');AR=getComputedStyle(rt).getPropertyValue('--acr').trim()||AR;
 SP.forEach(o=>{o.p+=o.s;o.y-=o.v;o.x+=o.v*.4;o.vx=(o.vx||0)*.93;o.vy=(o.vy||0)*.93;const dx=o.x-mx,dy=o.y-my,d=Math.hypot(dx,dy);if(d<160&&d>0){const q=(1-d/160)*.9;o.vx+=dx/d*q;o.vy+=dy/d*q;bx.strokeStyle=`rgba(${AR},${(1-d/160)*.5})`;bx.lineWidth=.6;bx.beginPath();bx.moveTo(o.x,o.y);bx.lineTo(mx,my);bx.stroke()}o.x+=o.vx;o.y+=o.vy;if(o.y<0)o.y=H;if(o.y>H)o.y=0;if(o.x>W)o.x=0;if(o.x<0)o.x=W;bx.fillStyle=`rgba(${c},${.25+.6*Math.abs(Math.sin(o.p))})`;bx.beginPath();bx.arc(o.x,o.y,o.r,0,6.3);bx.fill()});
 SW=SW.filter(w=>w.r<340);SW.forEach(w=>{w.r+=9;bx.strokeStyle=`rgba(${AR},${1-w.r/340})`;bx.lineWidth=1.5;bx.beginPath();bx.arc(w.x,w.y,w.r,0,6.3);bx.stroke()});
 if(Math.random()<.004)SH.push({x:Math.random()*W,y:Math.random()*H*.5,l:0});
 SH=SH.filter(o=>o.l<40);SH.forEach(o=>{o.l++;o.x+=16;o.y+=8;const g=bx.createLinearGradient(o.x,o.y,o.x-120,o.y-60);g.addColorStop(0,`rgba(${c},.9)`);g.addColorStop(1,`rgba(${c},0)`);bx.strokeStyle=g;bx.lineWidth=1.5;bx.beginPath();bx.moveTo(o.x,o.y);bx.lineTo(o.x-120,o.y-60);bx.stroke()})})();
// polish: glow cards, tilt, cursor, ripple, wipe transitions
let cc=null;const rs0=()=>{if(cc){cc.style.transform='';cc.style.transition='';cc=null}};
document.addEventListener('pointermove',e=>{const T=e.target,c=T.closest&&T.closest('.card,#info');if(cc&&cc!==c)rs0();
 document.body.classList.toggle('hov',!!(T.closest&&T.closest('a,button,.card,input,select,#g,.act')));
 if(!c)return;const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
 if(c.id=='info')return;cc=c;c.style.transition='transform .15s ease-out,border-color .4s,box-shadow .5s';
 c.style.transform=`perspective(900px) rotateX(${(.5-y/r.height)*8}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-6px)`});
document.addEventListener('pointerout',e=>{if(!e.relatedTarget)rs0()});
if(matchMedia('(pointer:fine)').matches){document.body.classList.add('fine');let rx=mx,ry=my;
 (function f(){requestAnimationFrame(f);rx+=(mx-rx)*.16;ry+=(my-ry)*.16;$('#cr').style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;$('#cu').style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;$('#mg').style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`})()}
addEventListener('pointerdown',e=>{SP.forEach(o=>{const dx=o.x-e.clientX,dy=o.y-e.clientY,d=Math.hypot(dx,dy)||1;if(d<320){o.vx=(o.vx||0)+dx/d*(1-d/320)*14;o.vy=(o.vy||0)+dy/d*(1-d/320)*14}});SW.push({x:e.clientX,y:e.clientY,r:0});
 const b=e.target.closest&&e.target.closest('button');if(b){const r=b.getBoundingClientRect(),sp=document.createElement('span');sp.className='rp';sp.style.left=e.clientX-r.left+'px';sp.style.top=e.clientY-r.top+'px';b.append(sp);setTimeout(()=>sp.remove(),700)}});
document.querySelectorAll('.cta,#th').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
const wp=$('#wp');let busy=0;
document.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(!t||busy)return;busy=1;
 const m=t.querySelector('.mono');wp.firstChild.textContent=m?m.textContent:'';const o={duration:520,easing:'cubic-bezier(.7,0,.2,1)',fill:'forwards'};
 wp.animate([{transform:'translateX(-101%)'},{transform:'translateX(0)'}],o).finished.then(()=>{t.scrollIntoView({behavior:'instant'});return new Promise(r=>setTimeout(r,250))}).then(()=>wp.animate([{transform:'translateX(0)'},{transform:'translateX(101%)'}],o).finished).then(()=>busy=0)});
addEventListener('scroll',()=>{$('#sp').style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'});
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('cur',a.getAttribute('href')=='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(x=>sio.observe(x));

document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a.pg');if(!a)return;e.preventDefault();if(busy)return;busy=1;try{sessionStorage.wipe=1;sessionStorage.seen=1}catch(x){}
 wp.firstChild.textContent=a.dataset.t||'';wp.animate([{transform:'translateX(-101%)'},{transform:'none'}],{duration:560,easing:'cubic-bezier(.7,0,.2,1)',fill:'forwards'}).finished.then(()=>location.href=a.href)});
if(document.documentElement.classList.contains('wiped')){try{sessionStorage.removeItem('wipe')}catch(x){}wp.animate([{transform:'none'},{transform:'translateX(101%)'}],{duration:800,easing:'cubic-bezier(.7,0,.2,1)',fill:'forwards',delay:200})}
addEventListener('pageshow',e=>{if(e.persisted){busy=0;wp.getAnimations().forEach(x=>x.cancel())}});

// graceful placeholder when a photo fails to load
const EM=[['rainforest|jungle|amazon','🌴'],['polar|arctic|ice|snow|glacier|antarctica','❄️'],['lion|savanna|zebra|giraffe|safari|africa|vulture','🦁'],['coral|reef|kelp|mangrove','🪸'],['ocean|sea|wave|fish|marine|underwater|whale|plastic','🌊'],['mountain|alps|himalaya|rocky|canyon|leopard','⛰️'],['desert|sahara|dune','🏜️'],['city|paris|tokyo|sydney|london','🏙️'],['panda|bear|fox|bird|goose|caribou','🐾']];
function ph(i){if(i.dataset.ph)return;i.dataset.ph=1;const k=i.dataset.k||i.alt||'',e=(EM.find(x=>new RegExp(x[0],'i').test(k))||[0,'🌍'])[1],d=document.createElement('div');d.className='ph';d.style.height=getComputedStyle(i).height;d.setAttribute('role','img');d.setAttribute('aria-label',i.alt||'');d.innerHTML='<span>'+e+'</span>';i.replaceWith(d)}
addEventListener('error',e=>{if(e.target&&e.target.tagName=='IMG')ph(e.target)},true);
addEventListener('load',()=>document.querySelectorAll('img[src]').forEach(i=>{if(i.complete&&!i.naturalWidth)ph(i)}));
