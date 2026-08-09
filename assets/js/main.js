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
        const email = btn.datasetEmail || 'abhishekzz966@gmail.com';
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
