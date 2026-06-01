(function(){
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let cur = 0;

  // build dots
  const dotsWrap = document.getElementById('dots');
  slides.forEach((_,i)=>{
    const d=document.createElement('i');
    d.addEventListener('click',()=>goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  const progress = document.getElementById('progress');
  const slideId = document.getElementById('slideId');

  function render(){
    slides.forEach((s,i)=>{
      s.classList.remove('active','prev');
      if(i===cur) s.classList.add('active');
      else if(i<cur) s.classList.add('prev');
    });
    dots.forEach((d,i)=>d.classList.toggle('on',i===cur));
    progress.style.width = ((cur+1)/total*100)+'%';
    slideId.textContent = String(cur+1).padStart(2,'0')+' / '+total;
    loadStageFrame(slides[cur]);
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
    const f = slide.querySelector('iframe');
    if(f && f.getAttribute('src')==='about:blank' && f.dataset.src){
      f.setAttribute('src', f.dataset.src);
    }
  }

  function goTo(i){
    if(i<0||i>=total||i===cur) return;
    cur=i;
    resetReveals();
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
    if(hidden.length){ hidden[0].classList.add('shown'); return true; }
    return false;
  }

  // tab clicks switch demo stages directly
  document.querySelectorAll('.demo-tab').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const slide = btn.closest('.slide');
      setStage(slide, parseInt(btn.dataset.stage,10));
    });
  });

  // keyboard: arrows navigate (stage-aware)
  document.addEventListener('keydown',e=>{
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
    if(e.target.closest('.dots')||e.target.closest('.demo-tab')||e.target.closest('iframe')||e.target.closest('.frame-wrap')||e.target.closest('a')) return;
    revealNext();
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
    if(e.target.closest('.dots')||e.target.closest('.demo-tab')||e.target.closest('iframe')||e.target.closest('.frame-wrap')||e.target.closest('a')){
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

    // TAP: quase sem movimento → revela a próxima animação (igual ao clique no desktop)
    if(absX<=TAP_MAX && absY<=TAP_MAX){
      suppressClick=true;           // evita que o clique fantasma revele de novo
      revealNext();
    }
  }, {passive:true});

  render();
  // gently reveal the opening subtitle after load
  setTimeout(()=>{ if(cur===0) revealNext(); }, 700);
})();
