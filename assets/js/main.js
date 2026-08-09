// Theme toggle (moved from inline)
(function(){
    const btn = document.getElementById('themeToggle');
    try{
        const isDark = localStorage.getItem('theme') === 'dark';
        if(isDark) document.body.classList.add('dark');
        btn.addEventListener('click', ()=>{
            document.body.classList.toggle('dark');
            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
    }catch(e){/* silent */}
})();

// Nav underline and interactive behavior
(function(){
    const nav = document.querySelector('.nav');
    if(!nav) return;
    const underline = document.createElement('div');
    underline.className = 'underline';
    nav.appendChild(underline);

    function position(el){
        const rect = el.getBoundingClientRect();
        const parentRect = nav.getBoundingClientRect();
        underline.style.left = (rect.left - parentRect.left) + 'px';
        underline.style.width = rect.width + 'px';
    }

    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach(l=>{
        l.addEventListener('mouseenter', ()=> position(l));
        l.addEventListener('focus', ()=> position(l));
    });

    window.addEventListener('resize', ()=>{
        const active = nav.querySelector('a.active') || links[0];
        if(active) position(active);
    });

    // move underline to active when set by intersection observer
    const observer = new MutationObserver(()=>{
        const active = nav.querySelector('a.active');
        if(active) position(active);
    });
    observer.observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});

    // initial position
    setTimeout(()=>{
        const active = nav.querySelector('a.active') || links[0];
        if(active) position(active);
    },400);
})();

// Skill bar animations on reveal
(function(){
    const rows = document.querySelectorAll('.skill-row');
    if(!rows.length) return;
    const io = new IntersectionObserver((entries)=>{
        for(const e of entries){
            if(e.isIntersecting){
                const fill = e.target.querySelector('.fill');
                const val = parseInt(fill.dataset.value||0,10);
                fill.style.width = val + '%';
                io.unobserve(e.target);
            }
        }
    },{threshold:0.25});
    rows.forEach(r=> io.observe(r));
})();

// Typing effect for subtitle
(function(){
    const el = document.getElementById('subtitle');
    if(!el) return;
    const text = el.dataset.text || el.textContent.trim();
    el.textContent = '';
    let i = 0;
    function tick(){
        if(i <= text.length){
            el.textContent = text.slice(0,i++);
            setTimeout(tick, 18 + Math.random()*25);
        }
    }
    tick();
})();

// Reveal on scroll (simple)
(function(){
    const items = document.querySelectorAll('.project-card, .card');
    const io = new IntersectionObserver((entries)=>{
        for(const e of entries){
            if(e.isIntersecting){
                e.target.style.opacity = 1;
                e.target.style.transform = 'none';
                io.unobserve(e.target);
            }
        }
    },{threshold:0.08});

    for(const it of items){
        it.style.opacity = 0;
        it.style.transform = 'translateY(8px)';
        io.observe(it);
    }
})();

// Copy email to clipboard
(function(){
    const btn = document.getElementById('copyEmail');
    if(!btn) return;
    btn.addEventListener('click', async ()=>{
        const email = btn.datasetEmail || btn.dataset.email || 'abhishekzz966@gmail.com';
        try{
            await navigator.clipboard.writeText(email);
            btn.textContent = 'Email Copied ✓';
            setTimeout(()=> btn.textContent = 'Copy Email', 1800);
        }catch(e){
            location.href = 'mailto:'+email;
        }
    });
})();

// Print / open resume
(function(){
    const pbtn = document.getElementById('printResume');
    if(!pbtn) return;
    pbtn.addEventListener('click', ()=>{
        window.print();
    });
})();

// Smooth scroll for nav links and active section highlight
(function(){
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(a=>{
        a.addEventListener('click', (e)=>{
            e.preventDefault();
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if(!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({top,behavior:'smooth'});
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const o = new IntersectionObserver((entries)=>{
        for(const e of entries){
            const id = e.target.id; 
            const link = document.querySelector('.nav a[href="#'+id+'"]');
            if(e.isIntersecting){
                navLinks.forEach(n => n.classList.remove('active'));
                if(link) link.classList.add('active');
            }
        }
    },{threshold:0.45});

    sections.forEach(s=> o.observe(s));
})();

// Back to top
(function(){
    const b = document.createElement('button');
    b.className = 'back-top';
    b.textContent = '↑ Top';
    document.body.appendChild(b);
    b.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 400) b.style.display = 'block'; else b.style.display = 'none';
    });
})();

// Project modal
(function(){
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<div class="sheet" role="dialog" aria-modal="true"><div id="modalContent"></div><div style="text-align:right;margin-top:12px"><button id="closeModal" class="btn secondary">Close</button></div></div>';
    document.body.appendChild(modal);
    const modalContent = document.getElementById('modalContent');
    const close = modal.querySelector('#closeModal');
    close.addEventListener('click', ()=> modal.classList.remove('open'));

    document.addEventListener('click', (ev)=>{
        const card = ev.target.closest('.project-card');
        if(!card) return;
        const title = card.querySelector('h3')?.textContent || '';
        const body = card.querySelector('ul')?.outerHTML || card.innerHTML;
        modalContent.innerHTML = `<h3 style="margin-top:0">${title}</h3>${body}`;
        modal.classList.add('open');
    });
})();

// profile image handling: hide avatar fallback when photo loads; hide photo if error
(function(){
    const img = document.querySelector('.profile-photo');
    const av = document.querySelector('.avatar');
    if(!img) return;
    img.addEventListener('load', ()=>{ try{ if(av) av.style.display='none'; }catch(e){} });
    img.addEventListener('error', ()=>{ img.style.display='none'; });
})();
