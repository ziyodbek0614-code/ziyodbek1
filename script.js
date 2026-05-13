document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Theme Toggling
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    // Check for saved theme
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

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // AI Solver Logic
    const solveBtn = document.getElementById('solve-btn');
    const solverInput = document.getElementById('solver-input');
    const solverResult = document.getElementById('solver-result');
    const resultText = document.getElementById('result-text');

    const solutions = {
        "528": "528-misol yechimi:\n\nBerilgan: x + 25 = 100\nYechish: x = 100 - 25\nJavob: x = 75\n\nQo'shimcha: Bu chiziqli tenglama hisoblanadi.",
        "matematika": "Matematika fanidan yordam kerakmi? Iltimos, aniq misol raqamini yoki mavzuni yozing.",
        "salom": "Salom! Men Study Helper AI yordamchisiman. Sizga qanday yordam bera olaman?",
        "default": "Kechirasiz, hozircha bu so'rov bo'yicha ma'lumot topilmadi. Lekin bizning bazamiz doimiy yangilanib bormoqda!"
    };

    solveBtn.addEventListener('click', () => {
        const query = solverInput.value.toLowerCase();
        if (!query) return;

        solveBtn.disabled = true;
        solveBtn.innerHTML = '<span>O\'ylayapman...</span>';

        setTimeout(() => {
            solverResult.style.display = 'block';
            
            let found = false;
            for (const key in solutions) {
                if (query.includes(key)) {
                    resultText.innerText = solutions[key];
                    found = true;
                    break;
                }
            }

            if (!found) {
                resultText.innerText = solutions.default;
            }

            solveBtn.disabled = false;
            solveBtn.innerHTML = '<span>Yechish</span> <i data-lucide="sparkles"></i>';
            lucide.createIcons(); // Re-init icons in button
            
            // Scroll to result
            solverResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });

    // Enter key for solver
    solverInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            solveBtn.click();
        }
    });

    // --- Modal Logic ---
    const loginModal = document.getElementById('login-modal');
    const contentModal = document.getElementById('content-modal');
    const openLoginBtn = document.getElementById('open-login');
    const closeBtns = document.querySelectorAll('.close-modal');

    openLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            contentModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === contentModal) contentModal.style.display = 'none';
    });

    // --- Google Sign-In Simulation ---
    const googleBtn = document.getElementById('google-signin');
    const userInfo = document.getElementById('user-info');

    googleBtn.addEventListener('click', () => {
        googleBtn.innerHTML = '<span>Kirilmoqda...</span>';
        setTimeout(() => {
            googleBtn.style.display = 'none';
            userInfo.style.display = 'block';
            userInfo.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px;">
                    <i data-lucide="check-circle" style="color: #10b981;"></i>
                    <span>Xush kelibsiz, Foydalanuvchi!</span>
                </div>
            `;
            lucide.createIcons();
            setTimeout(() => {
                loginModal.style.display = 'none';
                openLoginBtn.innerText = 'Profil';
            }, 1500);
        }, 2000);
    });

    // --- AI Solver Image Upload ---
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = imagePreview.querySelector('img');
    const removeImgBtn = imagePreview.querySelector('.remove-img');

    if (imageUpload) {
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    previewImg.src = event.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (removeImgBtn) {
        removeImgBtn.addEventListener('click', () => {
            imageUpload.value = '';
            imagePreview.style.display = 'none';
            previewImg.src = '';
        });
    }

    // --- Content Data (Features & Subjects) ---
    const contentData = {
        // Subjects (Old data)
        math: {
            title: "Matematika fanidan misollar",
            content: `<div class="content-list">
                <div class="content-item"><h4>1-misol: Tenglama</h4><p>2x + 15 = 45 tenglamani yeching.<br><b>Yechimi:</b> 2x = 30, x = 15.</p></div>
                <div class="content-item"><h4>2-misol: Geometriya</h4><p>To'g'ri to'rtburchakning tomonlari 5 va 8 sm. Uning yuzini toping.<br><b>Yechimi:</b> S = 5 * 8 = 40 sm².</p></div>
            </div>`
        },
        physics: {
            title: "Fizika fanidan formulalar",
            content: `<div class="content-list">
                <div class="content-item"><h4>Nyutonning 2-qonuni</h4><p>F = m * a (Kuch = massa * tezlanish)</p></div>
            </div>`
        },
        english: { title: "Ingliz tili darslari", content: `<div class="content-list"><div class="content-item"><h4>Lesson 1: Present Simple</h4><p>I play football. He plays tennis.</p></div></div>` },
        native: { title: "Ona tili - Insholar", content: `<div class="content-list"><div class="content-item"><h4>Mavzu: Mening Vatanim</h4><p>O'zbekiston - mening muqaddas vatanim...</p></div></div>` },
        info: { title: "Informatika - Loyihalar", content: `<div class="content-list"><div class="content-item"><h4>Loyiha 1: Shaxsiy veb-sayt</h4><p>HTML va CSS yordamida sayt yaratish.</p></div></div>` },
        
        // Features (New data)
        "math-examples": {
            title: "Matematik misollar to'plami",
            content: `
                <div class="content-list">
                    <div class="content-item"><h4>Ko'paytirish jadvali</h4><p>7 * 8 = 56<br>9 * 9 = 81</p></div>
                    <div class="content-item"><h4>Kvadrat tenglamalar</h4><p>ax² + bx + c = 0 formulasini yechish bosqichlari...</p></div>
                    <div class="content-item"><h4>Logarifm</h4><p>logₐb = c bo'lsa, aᶜ = b</p></div>
                </div>
            `
        },
        "essay-guide": {
            title: "Insho yozishni o'rganamiz",
            content: `
                <div class="content-list">
                    <div class="content-item"><h4>1. Kirish qismi</h4><p>Mavzuga umumiy tushuncha beriladi va o'quvchi diqqati tortiladi.</p></div>
                    <div class="content-item"><h4>2. Asosiy qism</h4><p>Fikrlar dalillar bilan isbotlanadi, tahlil qilinadi.</p></div>
                    <div class="content-item"><h4>3. Xulosa</h4><p>Yozilgan fikrlar umumlashtiriladi va yakuniy xulosa beriladi.</p></div>
                </div>
            `
        },
        "formula-explain": {
            title: "Formula va qoidalar tushuntirilishi",
            content: `
                <div class="content-list">
                    <div class="content-item"><h4>Pifagor teoremasi</h4><p>a² + b² = c² (To'g'ri burchakli uchburchakda gipotenuza kvadrati katetlar kvadratlari yig'indisiga teng)</p></div>
                    <div class="content-item"><h4>Energiya saqlanish qonuni</h4><p>E = m * c² (Massa va energiya bog'liqligi)</p></div>
                    <div class="content-item"><h4>Omi qonuni</h4><p>I = U / R (Tok kuchi kuchlanishga to'g'ri, qarshilikka teskari mutanosib)</p></div>
                </div>
            `
        },
        "ai-chat": {
            title: "AI Yordamchi Chat",
            content: `
                <div class="chat-container">
                    <div class="chat-messages" id="chat-box">
                        <div class="msg ai">Salom! Men Study Helper AI yordamchisiman. Sizga qanday yordam bera olaman?</div>
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="chat-input" placeholder="Xabaringizni yozing...">
                        <button class="btn btn-primary" onclick="sendMessage()">Yuborish</button>
                    </div>
                </div>
            `
        },
        "tests": {
            title: "Testlar bo'limi",
            content: `
                <p>Iltimos, sinfingizni tanlang:</p>
                <div class="class-grid">
                    ${[1,2,3,4,5,6,7,8,9,10,11].map(n => `<button class="class-btn" onclick="startTest(${n})">${n}-sinf</button>`).join('')}
                </div>
                <div id="test-area" class="test-container"></div>
            `
        }
    };

    // --- Interactive Handling ---
    const allCards = document.querySelectorAll('.feature-card, .subject-card');
    const contentBody = document.getElementById('content-modal-body');

    allCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-feature') || card.getAttribute('data-subject');
            if (contentData[key]) {
                contentBody.innerHTML = `
                    <h2 style="margin-bottom: 20px; color: var(--primary);">${contentData[key].title}</h2>
                    ${contentData[key].content}
                `;
                contentModal.style.display = 'flex';
                lucide.createIcons();
            }
        });
    });

    // --- Global Helper Functions for Content ---
    window.sendMessage = () => {
        const input = document.getElementById('chat-input');
        const box = document.getElementById('chat-box');
        if (!input.value) return;

        box.innerHTML += `<div class="msg user">${input.value}</div>`;
        const userMsg = input.value.toLowerCase();
        input.value = '';

        setTimeout(() => {
            let response = "Kechirasiz, buni tushunmadim. Savolingizni boshqacharoq bering.";
            if (userMsg.includes('salom')) response = "Assalomu alaykum! Savolingizga javob berishga tayyorman.";
            if (userMsg.includes('matematika')) response = "Matematika fanidan misol yechishda yordam berishim mumkin.";
            
            box.innerHTML += `<div class="msg ai">${response}</div>`;
            box.scrollTop = box.scrollHeight;
        }, 1000);
    };

    window.startTest = (grade) => {
        const testArea = document.getElementById('test-area');
        testArea.innerHTML = `
            <h3>${grade}-sinf uchun testlar</h3>
            <div class="test-item">
                <p>1. ${grade}-sinf dasturi bo'yicha eng muhim fan qaysi?</p>
                <div class="options-grid">
                    <button class="option-btn" onclick="alert('To\\'g\\'ri!')">Barcha fanlar</button>
                    <button class="option-btn" onclick="alert('Xato!')">Faqat bittasi</button>
                </div>
            </div>
            <div class="test-item">
                <p>2. 100 + ${grade * 10} nechaga teng?</p>
                <div class="options-grid">
                    <button class="option-btn" onclick="alert('To\\'g\\'ri!')">${100 + grade * 10}</button>
                    <button class="option-btn" onclick="alert('Xato!')">${100 + grade * 5}</button>
                </div>
            </div>
        `;
    };

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.height = '70px';
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.height = '80px';
            navbar.style.boxShadow = 'none';
        }
    });
});

