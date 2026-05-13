document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Theme Toggling
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // AI Solver Logic
    const solveBtn = document.getElementById('solve-btn');
    const solverInput = document.getElementById('solver-input');
    const solverResult = document.getElementById('solver-result');
    const resultText = document.getElementById('result-text');

    const solutions = {
        "528": "528-misol yechimi:\n\nx + 25 = 100\nx = 100 - 25\nx = 75",
        "salom": "Salom! Men Study Helper AI yordamchisiman.",
        "default": "Kechirasiz, bu savolga hozircha javobim yo'q."
    };

    solveBtn.addEventListener('click', () => {
        const query = solverInput.value.toLowerCase();
        if (!query) return;
        solveBtn.disabled = true;
        solveBtn.innerHTML = '<span>O\'ylayapman...</span>';
        setTimeout(() => {
            solverResult.style.display = 'block';
            resultText.innerText = solutions[query] || solutions.default;
            solveBtn.disabled = false;
            solveBtn.innerHTML = '<span>Yechish</span> <i data-lucide="sparkles"></i>';
            lucide.createIcons();
            solverResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });

    // --- Modal Logic ---
    const loginModal = document.getElementById('login-modal');
    const contentModal = document.getElementById('content-modal');
    const openLoginBtn = document.getElementById('open-login');
    const closeBtns = document.querySelectorAll('.close-modal');

    openLoginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    closeBtns.forEach(btn => btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        contentModal.style.display = 'none';
    }));
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === contentModal) contentModal.style.display = 'none';
    });

    // --- Content Data ---
    const contentData = {
        "math-examples": {
            title: "Matematik misollar va Ko'paytirish jadvali (To'liq)",
            content: `
                <h3>Ko'paytirish jadvali (1-10)</h3>
                <div class="mult-table">
                    ${Array.from({length: 100}, (_, i) => {
                        const a = Math.floor(i / 10) + 1;
                        const b = (i % 10) + 1;
                        return `<div class="mult-cell">${a} × ${b} = ${a*b}</div>`;
                    }).join('')}
                </div>
            `
        },
        "essay-guide": {
            title: "Insho yozish san'ati",
            content: `
                <div class="content-list">
                    <div class="content-item"><h4>Kirish: Mavzuga kirish va maqsadni belgilash.</h4></div>
                    <div class="content-item"><h4>Asosiy: Argumentlar, misollar va shaxsiy fikr.</h4></div>
                    <div class="content-item"><h4>Xulosa: Yakuniy fikr va xulosaviy jumlalar.</h4></div>
                </div>
            `
        },
        "formula-explain": {
            title: "Kengaytirilgan formulalar ro'yxati",
            content: `
                <div class="content-list">
                    <div class="content-item"><h4>Geometriya</h4><p>S = a*b (To'g'ri to'rtburchak), S = 1/2*a*h (Uchburchak), S = π*r² (Doira)</p></div>
                    <div class="content-item"><h4>Fizika</h4><p>F = m*a, E = mc², U = I*R, P = m*g, Q = c*m*Δt</p></div>
                    <div class="content-item"><h4>Algebra</h4><p>(a+b)² = a²+2ab+b², x = (-b±√D)/2a</p></div>
                </div>
            `
        },
        "ai-chat": {
            title: "AI Yordamchi",
            content: `<div class="chat-container"><div class="chat-messages" id="chat-box"></div><div class="chat-input-area"><input type="text" id="chat-input"><button class="btn btn-primary" onclick="sendMessage()">Yuborish</button></div></div>`
        },
        "tests": {
            title: "Sinflar bo'yicha 15 talik testlar",
            content: `
                <div class="class-grid">
                    ${[1,2,3,4,5,6,7,8,9,10,11].map(n => `<button class="class-btn" onclick="startTest(${n})">${n}-sinf</button>`).join('')}
                </div>
                <div id="test-area"></div>
            `
        }
    };

    // Card click handling
    document.querySelectorAll('.feature-card, .subject-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-feature') || card.getAttribute('data-subject');
            if (contentData[key]) {
                document.getElementById('content-modal-body').innerHTML = `<h2>${contentData[key].title}</h2>${contentData[key].content}`;
                contentModal.style.display = 'flex';
                lucide.createIcons();
            }
        });
    });

    window.startTest = (grade) => {
        const area = document.getElementById('test-area');
        area.innerHTML = `<h3>${grade}-sinf uchun 15 ta test</h3>`;
        for(let i=1; i<=15; i++) {
            let q, a1, a2, ans;
            if(grade < 5) {
                const n1 = Math.floor(Math.random() * 20);
                const n2 = Math.floor(Math.random() * 20);
                q = `${n1} + ${n2} = ?`; ans = n1 + n2;
            } else {
                const n1 = Math.floor(Math.random() * 12);
                q = `${n1} * ${grade} = ?`; ans = n1 * grade;
            }
            area.innerHTML += `
                <div class="test-item">
                    <p>${i}. ${q}</p>
                    <div class="options-grid">
                        <button class="option-btn" onclick="alert('To\\'g\\'ri!')">${ans}</button>
                        <button class="option-btn" onclick="alert('Xato!')">${ans + 1}</button>
                    </div>
                </div>
            `;
        }
        area.scrollIntoView({behavior:'smooth'});
    };

    window.sendMessage = () => {
        const box = document.getElementById('chat-box');
        const input = document.getElementById('chat-input');
        if(!input.value) return;
        box.innerHTML += `<div class="msg user">${input.value}</div>`;
        input.value = '';
        setTimeout(() => box.innerHTML += `<div class="msg ai">Men sizga yordam berishga tayyorman!</div>`, 1000);
    };

    // Login logic
    const googleBtn = document.getElementById('google-signin');
    googleBtn.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        if(!email || !pass) { alert('Iltimos to\'ldiring!'); return; }
        googleBtn.innerText = 'Kirilmoqda...';
        setTimeout(() => {
            document.querySelector('.login-form').style.display = 'none';
            document.getElementById('user-info').style.display = 'block';
            document.getElementById('user-info').innerHTML = `<p>Xush kelibsiz!</p>`;
            setTimeout(() => { loginModal.style.display = 'none'; }, 1500);
        }, 1500);
    });

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        nav.style.height = window.scrollY > 50 ? '70px' : '80px';
    });
});

