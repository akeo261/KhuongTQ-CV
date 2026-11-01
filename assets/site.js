(function(){
  var root=document.documentElement, W=794;
  if(/[?&]embed/.test(location.search))root.classList.add('embed');
  function fit(){
    var s=document.querySelector('.a4'); if(!s||root.classList.contains('embed')) return;
    s.style.transform='';s.style.left='';s.style.top='';document.body.style.height='';
    if(innerWidth<760){root.classList.remove('scaled');return;}
    root.classList.add('scaled');
    var k=Math.min(innerWidth/W,1.5), top=12;
    s.style.transformOrigin='top left';s.style.transform='scale('+k+')';
    s.style.left=Math.max(0,(innerWidth-W*k)/2)+'px';s.style.top=(top+44)+'px';
    document.body.style.height=(s.offsetHeight*k+top+44+30)+'px';
  }
  function zoomHome(){var h=document.querySelector('.home');if(!h)return;var k=innerWidth<760?1:Math.max(1,Math.min(innerWidth/1300,2.2));h.style.zoom=k;}
  window.fitSheet=fit;addEventListener('resize',zoomHome);addEventListener('load',zoomHome);document.addEventListener('DOMContentLoaded',zoomHome);addEventListener('resize',fit);addEventListener('load',fit);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
  document.addEventListener('DOMContentLoaded',function(){fit();var b=document.getElementById('themeBtn');if(b&&root.dataset.theme==='dark')b.textContent='Light';});
  window.toggleTheme=function(){var d=root,dk=d.dataset.theme!=='dark';if(dk)d.dataset.theme='dark';else delete d.dataset.theme;
    try{localStorage.cvTheme=dk?'dark':'light'}catch(e){}var b=document.getElementById('themeBtn');if(b)b.textContent=dk?'Light':'Dark';};
  window.setLang=function(l){document.body.className='lang-'+l;document.querySelectorAll('.cb[data-l]').forEach(function(b){b.classList.toggle('on',b.dataset.l===l)});root.lang=l;};
})();
