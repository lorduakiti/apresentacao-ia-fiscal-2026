(function(){
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let cur = 0;

  // ----- parâmetros de query string (?slide=N e ?auto=N) -----
  const params = new URLSearchParams(location.search);
  const slideParam = parseInt(params.get('slide'), 10);
  const autoParam  = parseInt(params.get('auto'), 10);
  const autoSec    = (Number.isFinite(autoParam) && autoParam > 0) ? autoParam : 0;

  // build dots
  const dotsWrap = document.getElementById('dots');
  slides.forEach((s,i)=>{
    const d=document.createElement('i');
    d.addEventListener('click',()=>goTo(i));
    // tooltip: número + título do slide (h1/h2; senão o kicker)
    const h = s.querySelector('h1,h2');
    let t = (h ? h.innerHTML : (s.querySelector('.kicker') ? s.querySelector('.kicker').textContent : ''))
              .replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
    if(!t) t = 'Slide '+(i+1);
    d.dataset.tip = String(i+1).padStart(2,'0')+' · '+t;
    d.setAttribute('aria-label', d.dataset.tip);
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  const progress = document.getElementById('progress');
  const slideId = document.getElementById('slideId');

  // botões de navegação laterais
  const navPrev = document.querySelector('.nav-prev');
  const navNext = document.querySelector('.nav-next');
  if(navPrev) navPrev.addEventListener('click', e=>{ e.stopPropagation(); prev(); });
  if(navNext) navNext.addEventListener('click', e=>{ e.stopPropagation(); next(); });

  function render(){
    slides.forEach((s,i)=>{
      s.classList.remove('active','prev');
      if(i===cur) s.classList.add('active');
      else if(i<cur) s.classList.add('prev');
    });
    dots.forEach((d,i)=>d.classList.toggle('on',i===cur));
    progress.style.width = ((cur+1)/total*100)+'%';
    slideId.textContent = String(cur+1).padStart(2,'0')+' / '+total;
    if(navPrev) navPrev.classList.toggle('hidden', cur===0);
    if(navNext) navNext.classList.toggle('hidden', cur===total-1);
    updateCue(slides[cur]);
    loadStageFrame(slides[cur]);
    if(autoSec) startAuto();
  }

  // ----- DEMO STAGES (consolidated demo slide) -----
  // A slide may contain .demo-stage panels switched by .demo-tab buttons.
  function getStages(slide){ return Array.from(slide.querySelectorAll('.demo-stage')); }
  function activeStageIndex(slide){
    const st = getStages(slide);
    return st.findIndex(s=>s.classList.contains('active'));
  }
  function setStage(slide, idx){
    const stages = getStages(slide);
    const tabs = Array.from(slide.querySelectorAll('.demo-tab'));
    if(!stages.length) return;
    idx = Math.max(0, Math.min(stages.length-1, idx));
    stages.forEach((s,i)=>s.classList.toggle('active', i===idx));
    tabs.forEach((t,i)=>t.classList.toggle('active', i===idx));
    // lazy-load the iframe of the now-visible stage
    const f = stages[idx].querySelector('iframe');
    if(f && f.getAttribute('src')==='about:blank' && f.dataset.src){
      f.setAttribute('src', f.dataset.src);
    }
  }

  // lazy-load: for normal slides load their single iframe; for demo slides load current stage
  function loadStageFrame(slide){
    const stages = getStages(slide);
    if(stages.length){
      let i = activeStageIndex(slide);
      if(i<0){ i=0; setStage(slide,0); }
      else setStage(slide,i);
      return;
    }
    // carrega o iframe do item de acordeão ativo (slide 16) ou o iframe único do slide
    const f = slide.querySelector('.acc-item.active iframe[data-src]') || slide.querySelector('iframe[data-src]');
    if(f && f.getAttribute('src')==='about:blank' && f.dataset.src){
      f.setAttribute('src', f.dataset.src);
    }
  }

  function goTo(i){
    if(i<0||i>=total||i===cur) return;
    cur=i;
    resetReveals();
    resetClouds();
    render();
  }

  // next/prev are STAGE-AWARE: inside a demo slide, arrows walk the stages first.
  function next(){
    const slide = slides[cur];
    const stages = getStages(slide);
    if(stages.length){
      const i = activeStageIndex(slide);
      if(i < stages.length-1){ setStage(slide, i+1); return; }
    }
    goTo(cur+1);
  }
  function prev(){
    const slide = slides[cur];
    const stages = getStages(slide);
    if(stages.length){
      const i = activeStageIndex(slide);
      if(i > 0){ setStage(slide, i-1); return; }
    }
    goTo(cur-1);
  }

  // click-to-reveal: each click shows the next hidden .reveal on the active slide
  function resetReveals(){
    slides.forEach(s=>s.querySelectorAll('.reveal').forEach(r=>r.classList.remove('shown')));
  }
  function revealNext(){
    const active = slides[cur];
    const hidden = Array.from(active.querySelectorAll('.reveal:not(.shown)'));
    if(hidden.length){ hidden[0].classList.add('shown'); updateCue(active); return true; }
    return false;
  }

  // a bolinha pulsante para de pulsar quando não há mais animação a revelar
  function updateCue(slide){
    if(!slide) return;
    const cue = slide.querySelector('.clickcue');
    if(!cue) return;
    const cloud = slide.querySelector('.wordcloud');
    let more;
    if(cloud){
      more = cloud.dataset.anim!=='1' || cloud.querySelectorAll('.cloud-level:not(.show)').length>0;
    } else {
      more = slide.querySelectorAll('.reveal:not(.shown)').length>0;
    }
    cue.classList.toggle('done', !more);
  }

  // ----- NUVEM DE PALAVRAS (slide 13): 1º clique mostra CONTEXTO; depois os níveis, 1,5s cada -----
  function startCloud(cloud){
    if(cloud.dataset.anim==='1') return;
    cloud.dataset.anim='1';
    const center = cloud.querySelector('.cloud-center');
    if(center) center.classList.add('show');
    const levels = Array.from(cloud.querySelectorAll('.cloud-level'))
      .sort((a,b)=>(+a.dataset.level)-(+b.dataset.level));
    const cloudSlide = cloud.closest('.slide');
    cloud._timers = levels.map((lv,i)=> setTimeout(()=>{ lv.classList.add('show'); updateCue(cloudSlide); }, (i+1)*1500));
  }
  function resetClouds(){
    document.querySelectorAll('.wordcloud').forEach(c=>{
      if(c._timers){ c._timers.forEach(clearTimeout); c._timers=[]; }
      c.dataset.anim='';
      const ce=c.querySelector('.cloud-center'); if(ce) ce.classList.remove('show');
      c.querySelectorAll('.cloud-level').forEach(l=>l.classList.remove('show'));
    });
  }
  // clique/toque: se o slide tem nuvem de palavras, dispara a sequência; senão, revela normalmente
  function tapAction(){
    const cloud = slides[cur].querySelector('.wordcloud');
    if(cloud){ startCloud(cloud); return; }
    revealNext();
  }

  // ----- ANIMAÇÃO AUTOMÁTICA (?auto=N): revela um elemento a cada N segundos -----
  // Mantém a animação por clique/toque; o auto apenas dispara a mesma ação no tempo.
  let autoTimer = null;
  function autoHasMore(slide){
    if(!slide) return false;
    const cloud = slide.querySelector('.wordcloud');
    if(cloud){
      return cloud.dataset.anim!=='1' || cloud.querySelectorAll('.cloud-level:not(.show)').length>0;
    }
    return slide.querySelectorAll('.reveal:not(.shown)').length>0;
  }
  function stopAuto(){ if(autoTimer){ clearInterval(autoTimer); autoTimer=null; } }
  function startAuto(){
    stopAuto();
    if(!autoSec) return;
    autoTimer = setInterval(()=>{
      const slide = slides[cur];
      if(autoHasMore(slide)) tapAction();
      else stopAuto();
    }, autoSec*1000);
  }

  // tab clicks switch demo stages directly
  document.querySelectorAll('.demo-tab').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const slide = btn.closest('.slide');
      setStage(slide, parseInt(btn.dataset.stage,10));
    });
  });

  // accordion: clicar no título revela o texto da demo (abre um, fecha os demais)
  document.querySelectorAll('.acc-head').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const item = btn.closest('.acc-item');
      const acc = btn.closest('.accordion');
      const wasActive = item.classList.contains('active');
      acc.querySelectorAll('.acc-item').forEach(i=>i.classList.remove('active'));
      if(!wasActive){
        item.classList.add('active');
        // se o item abre um iframe (acordeão de iframes), carrega de forma preguiçosa
        const f = item.querySelector('iframe[data-src]');
        if(f && f.getAttribute('src')==='about:blank') f.setAttribute('src', f.dataset.src);
      }
    });
  });

  // ----- CARROSSEL de imagens (click-advance OU autoplay via data-autoplay) -----
  document.querySelectorAll('[data-carousel]').forEach(car=>{
    const track    = car.querySelector('.carousel-track');
    const items    = Array.from(car.querySelectorAll('.carousel-item'));
    const dotsBox  = car.querySelector('.carousel-dots');
    const capLink  = car.querySelector('.carousel-cap-link');
    const autoplay = car.hasAttribute('data-autoplay');
    if(!track || !items.length) return;
    let idx = 0, timer = null;
    items.forEach((_,i)=>{
      const d = document.createElement('i');
      d.addEventListener('click', e=>{ e.stopPropagation(); go(i); rearm(); });
      if(dotsBox) dotsBox.appendChild(d);
    });
    const dots = dotsBox ? Array.from(dotsBox.children) : [];
    function go(i){
      idx = (i % items.length + items.length) % items.length;
      track.style.transform = 'translateX(' + (-idx*100) + '%)';
      dots.forEach((d,j)=>d.classList.toggle('on', j===idx));
      if(capLink){
        const it = items[idx];
        capLink.textContent = it.dataset.site || '';
        capLink.setAttribute('href', it.dataset.url || '#');
      }
    }
    function next(){ go(idx+1); }
    function prev(){ go(idx-1); }
    function rearm(){ if(!autoplay) return; if(timer) clearInterval(timer); timer = setInterval(next, 4500); }
    const nb = car.querySelector('.carousel-btn.next');
    const pb = car.querySelector('.carousel-btn.prev');
    if(nb) nb.addEventListener('click', e=>{ e.stopPropagation(); next(); rearm(); });
    if(pb) pb.addEventListener('click', e=>{ e.stopPropagation(); prev(); rearm(); });
    let swiped=false;
    if(!autoplay){
      // sem autoplay: clique na imagem avança (ignora setas/dots/links)
      car.addEventListener('click', e=>{
        if(e.target.closest('.carousel-btn')||e.target.closest('.carousel-dots')||e.target.closest('a')) return;
        if(swiped){ swiped=false; return; }
        next();
      });
    } else {
      // autoplay: pausa no hover, retoma ao sair
      car.addEventListener('mouseenter', ()=>{ if(timer){ clearInterval(timer); timer=null; } });
      car.addEventListener('mouseleave', rearm);
    }
    // swipe (mobile) troca a imagem
    let sx=0, sActive=false;
    car.addEventListener('touchstart', e=>{ sx=e.changedTouches[0].clientX; sActive=true; swiped=false; }, {passive:true});
    car.addEventListener('touchend', e=>{ if(!sActive) return; sActive=false;
      const dx=e.changedTouches[0].clientX - sx;
      if(Math.abs(dx)>40){ swiped=true; (dx<0?next:prev)(); rearm(); } });
    go(0); rearm();
  });

  // ----- MODAIS (zoom de imagem / iframe de link externo) -----
  const imgModal = document.getElementById('imgModal');
  const iframeModal = document.getElementById('iframeModal');
  function openImgModal(src, alt){
    if(!imgModal || !src) return;
    const mi = imgModal.querySelector('.modal-img');
    mi.setAttribute('src', src); mi.setAttribute('alt', alt || 'Imagem ampliada');
    imgModal.classList.add('open'); imgModal.setAttribute('aria-hidden','false');
  }
  function openIframeModal(url){
    if(!iframeModal || !url) return;
    iframeModal.querySelector('.modal-iframe').setAttribute('src', url);
    iframeModal.classList.add('open'); iframeModal.setAttribute('aria-hidden','false');
  }
  function modalOpen(){ return !!document.querySelector('.modal.open'); }
  function closeModals(){
    [imgModal, iframeModal].forEach(m=>{ if(m){ m.classList.remove('open'); m.setAttribute('aria-hidden','true'); } });
    if(iframeModal) iframeModal.querySelector('.modal-iframe').setAttribute('src','about:blank');
    if(imgModal) imgModal.querySelector('.modal-img').setAttribute('src','');
  }
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click', e=>{ if(e.target===m || e.target.closest('.modal-close')) closeModals(); });
  });

  // keyboard: arrows navigate (stage-aware); modal aberto só responde a Esc
  document.addEventListener('keydown',e=>{
    if(modalOpen()){ if(e.key==='Escape') closeModals(); return; }
    if(e.key==='ArrowRight'||e.key==='PageDown'){ e.preventDefault(); next(); }
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); prev(); }
    else if(e.key==='Home'){ goTo(0); }
    else if(e.key==='End'){ goTo(total-1); }
    else if(e.key===' '){ e.preventDefault(); revealNext(); }
  });

  // mouse click = trigger animations (reveals), NOT slide change.
  // ignore clicks on interactive elements (dots, tabs, iframe, links)
  // `suppressClick` evita o "clique fantasma" que o navegador dispara após um toque,
  // o que faria um único tap revelar duas animações de uma vez.
  let suppressClick = false;
  document.addEventListener('click',e=>{
    if(suppressClick){ suppressClick=false; return; }
    // ícone com modal-link → abre o modal de iframe
    const ml = e.target.closest('[modal-link]');
    if(ml){ e.stopPropagation(); openIframeModal(ml.getAttribute('modal-link')); return; }
    // imagem fora de carrossel/modal → abre o modal de zoom
    const img = e.target.closest('img');
    if(img && !img.closest('.carousel') && !img.closest('.modal')){
      openImgModal(img.getAttribute('src'), img.getAttribute('alt')); return;
    }
    if(e.target.closest('.dots')||e.target.closest('.demo-tab')||e.target.closest('.accordion')||e.target.closest('.carousel')||e.target.closest('.nav-btn')||e.target.closest('.modal')||e.target.closest('iframe')||e.target.closest('.frame-wrap')||e.target.closest('a')) return;
    tapAction();
  });

  // ---- TOUCH / SWIPE (mobile) ----
  // Distingue um "tap" (revela animação, como o clique) de um "swipe" horizontal
  // (troca de slide/etapa, como as setas). Mede o deslocamento do dedo entre
  // touchstart e touchend.
  let tStartX=0, tStartY=0, tStartT=0, tValid=false;
  const SWIPE_MIN_X = 45;   // px mínimos na horizontal para contar como swipe
  const TAP_MAX = 12;       // px máximos de movimento para ainda ser um tap
  const SWIPE_MAX_T = 800;  // ms — acima disso é considerado arraste lento, não swipe

  document.addEventListener('touchstart',e=>{
    // ignora gestos que começam sobre conteúdo interativo
    if(e.target.closest('.dots')||e.target.closest('.demo-tab')||e.target.closest('.accordion')||e.target.closest('.carousel')||e.target.closest('.nav-btn')||e.target.closest('.modal')||e.target.closest('iframe')||e.target.closest('.frame-wrap')||e.target.closest('a')){
      tValid=false; return;
    }
    const t=e.changedTouches[0];
    tStartX=t.clientX; tStartY=t.clientY; tStartT=Date.now(); tValid=true;
  }, {passive:true});

  document.addEventListener('touchend',e=>{
    if(!tValid) return;
    tValid=false;
    const t=e.changedTouches[0];
    const dx=t.clientX-tStartX;
    const dy=t.clientY-tStartY;
    const dt=Date.now()-tStartT;
    const absX=Math.abs(dx), absY=Math.abs(dy);

    // SWIPE horizontal: movimento horizontal relevante, predominante sobre o vertical
    // (o vertical costuma significar rolar a página), dentro de um tempo razoável.
    if(absX>=SWIPE_MIN_X && absX>absY && dt<=SWIPE_MAX_T){
      suppressClick=true;           // anula o clique fantasma que viria a seguir
      if(dx<0) next();              // deslize p/ esquerda = avançar (= seta direita)
      else      prev();             // deslize p/ direita  = voltar  (= seta esquerda)
      return;
    }

    // TAP: quase sem movimento → modal (img/modal-link) ou revela a próxima animação
    if(absX<=TAP_MAX && absY<=TAP_MAX){
      suppressClick=true;           // evita que o clique fantasma aja de novo
      const tgt=e.target;
      const ml = tgt.closest && tgt.closest('[modal-link]');
      if(ml){ openIframeModal(ml.getAttribute('modal-link')); return; }
      const img = tgt.closest && tgt.closest('img');
      if(img && !img.closest('.carousel') && !img.closest('.modal')){
        openImgModal(img.getAttribute('src'), img.getAttribute('alt')); return;
      }
      tapAction();
    }
  }, {passive:true});

  // slide inicial via ?slide=N (1-based); fora do intervalo é ajustado ao limite
  if(Number.isFinite(slideParam)){
    cur = Math.max(0, Math.min(total-1, slideParam-1));
  }
  render();
  // gently reveal the opening subtitle after load
  setTimeout(()=>{ if(cur===0) revealNext(); }, 700);
})();
