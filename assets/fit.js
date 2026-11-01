/* Scale the whole CV to fit one browser window. Never locks scrolling. */
(function(){
  var W=1600, root=document.documentElement;
  function pack(on){
    var b=document.querySelector('.cv-body'); if(!b) return;
    b.style.height=''; b.style.columnFill='';
    if(!on) return;
    b.style.columnFill='auto';
    function ok(h){b.style.height=h+'px';return b.scrollWidth<=b.clientWidth+2;}
    var lo=250,hi=3200;
    while(hi-lo>4){var m=(lo+hi)>>1; if(ok(m)) hi=m; else lo=m;}
    b.style.height=(hi+10)+'px';
  }
  function fit(){
    var s=document.querySelector('.sheet'); if(!s) return;
    var b=document.querySelector('.cv-body');
    s.style.transform=''; s.style.width=''; s.style.left=''; document.body.style.height='';
    if(window.innerWidth<900){root.classList.remove('fit');if(b)b.style.columnCount='';pack(false);return;}
    root.classList.add('fit');
    var iw=window.innerWidth, ih=window.innerHeight, best=null;
    [1200,1400,1600,1800,2000,2200].forEach(function(w){
      s.style.width=w+'px';
      if(b) b.style.columnCount=Math.max(2,Math.round(w/395));
      pack(true);
      var h=s.offsetHeight, k=Math.min(iw/w, ih/h);
      if(!best||k>best.k+0.002) best={w:w,h:h,k:k};
      if(!b) return;
    });
    var w=best.w;
    s.style.width=w+'px';
    if(b) b.style.columnCount=Math.max(2,Math.round(w/395));
    pack(true);
    var h=s.offsetHeight, k=Math.max(0.5,Math.min(best.k,1.8));
    s.style.transformOrigin='top left';
    s.style.transform='scale('+k+')';
    s.style.left=Math.max(0,(iw-w*k)/2)+'px';
    document.body.style.height=(h*k)+'px';
  }
  window.fitSheet=fit;
  window.addEventListener('resize',fit);
  window.addEventListener('load',fit);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
  document.addEventListener('DOMContentLoaded',fit);
})();

window.toggleTheme=function(){var d=document.documentElement,dark=d.dataset.theme!=='dark';
  if(dark)d.dataset.theme='dark';else delete d.dataset.theme;
  try{localStorage.cvTheme=dark?'dark':'light'}catch(e){}
  var b=document.getElementById('themeBtn');if(b)b.textContent=dark?'Light':'Dark';};
document.addEventListener('DOMContentLoaded',function(){var b=document.getElementById('themeBtn');
  if(b&&document.documentElement.dataset.theme==='dark')b.textContent='Light';});
