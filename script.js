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
    const subjectModal = document.getElementById('subject-modal');
    const openLoginBtn = document.getElementById('open-login');
    const closeBtns = document.querySelectorAll('.close-modal');

    openLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            subjectModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === subjectModal) subjectModal.style.display = 'none';
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

    removeImgBtn.addEventListener('click', () => {
        imageUpload.value = '';
        imagePreview.style.display = 'none';
        previewImg.src = '';
    });

    // --- Subject Content Data ---
    const subjectData = {
        math: {
            title: "Matematika fanidan misollar",
            content: `
                <div class="content-list">
                    <div class="content-item">
                        <h4>1-misol: Tenglama</h4>
                        <p>2x + 15 = 45 tenglamani yeching.<br><b>Yechimi:</b> 2x = 30, x = 15.</p>
                    </div>
                    <div class="content-item">
                        <h4>2-misol: Geometriya</h4>
                        <p>To'g'ri to'rtburchakning tomonlari 5 va 8 sm. Uning yuzini toping.<br><b>Yechimi:</b> S = 5 * 8 = 40 sm².</p>
                    </div>
                    <div class="content-item">
                        <h4>3-misol: Foizlar</h4>
                        <p>500 ning 20 foizini toping.<br><b>Yechimi:</b> 500 * 0.2 = 100.</p>
                    </div>
                </div>
            `
        },
        physics: {
            title: "Fizika fanidan formulalar",
            content: `
                <div class="content-list">
                    <div class="content-item">
                        <h4>Nyutonning 2-qonuni</h4>
                        <p>F = m * a (Kuch = massa * tezlanish)</p>
                    </div>
                    <div class="content-item">
                        <h4>Tezlik formulasi</h4>
                        <p>v = s / t (Tezlik = masofa / vaqt)</p>
                    </div>
                    <div class="content-item">
                        <h4>Zichlik</h4>
                        <p>ρ = m / V (Zichlik = massa / hajm)</p>
                    </div>
                </div>
            `
        },
        english: {
            title: "Ingliz tili darslari",
            content: `
                <div class="content-list">
                    <div class="content-item">
                        <h4>Lesson 1: Present Simple</h4>
                        <p>I play football. He plays tennis. (Kundalik ish-harakatlar uchun)</p>
                    </div>
                    <div class="content-item">
                        <h4>Lesson 2: Vocabulary</h4>
                        <p>Education - Ta'lim<br>Knowledge - Bilim<br>Success - Muvaffaqiyat</p>
                    </div>
                </div>
            `
        },
        native: {
            title: "Ona tili va adabiyot - Insholar",
            content: `
                <div class="content-list">
                    <div class="content-item">
                        <h4>Mavzu: Mening Vatanim</h4>
                        <p>O'zbekiston - mening muqaddas vatanim. Uning boy tarixi va madaniyati...</p>
                    </div>
                    <div class="content-item">
                        <h4>Mavzu: Kitob - bilim manbai</h4>
                        <p>Kitob mutolaasi inson ma'naviyatini yuksaltiradi. Har bir yosh kitob o'qishi shart...</p>
                    </div>
                </div>
            `
        },
        info: {
            title: "Informatika - Loyihalar",
            content: `
                <div class="content-list">
                    <div class="content-item">
                        <h4>Loyiha 1: Shaxsiy veb-sayt</h4>
                        <p>HTML va CSS yordamida o'zingiz haqingizda sayt yaratish.</p>
                    </div>
                    <div class="content-item">
                        <h4>Loyiha 2: Kalkulyator</h4>
                        <p>JavaScript yordamida oddiy arifmetik kalkulyator dasturini tuzish.</p>
                    </div>
                </div>
            `
        }
    };

    // --- Subject Card Click Handling ---
    const subjectCards = document.querySelectorAll('.subject-card');
    const modalBody = document.getElementById('modal-body');

    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.getAttribute('data-subject');
            if (subjectData[subject]) {
                modalBody.innerHTML = `
                    <h2 style="margin-bottom: 20px; color: var(--primary);">${subjectData[subject].title}</h2>
                    ${subjectData[subject].content}
                `;
                subjectModal.style.display = 'flex';
                lucide.createIcons();
            }
        });
    });

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

