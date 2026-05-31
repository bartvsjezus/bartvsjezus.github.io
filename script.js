
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const isOpen = nav.classList.contains('open');

        if (isOpen) {
            mobileToggle.innerHTML = '<i data-lucide="x"></i>';
        } else {
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${activeId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const discordCopyBtn = document.querySelector('.copy-discord-nick');
    if (discordCopyBtn) {
        discordCopyBtn.addEventListener('click', () => {
            const nickname = 'bartvsbj';
            navigator.clipboard.writeText(nickname).then(() => {
                const valueEl = discordCopyBtn.querySelector('.contact-item-value');
                const originalText = valueEl.innerHTML;

                valueEl.innerHTML = 'Username Copied! <i data-lucide="check" style="color: #10b981;"></i>';
                if (typeof lucide !== 'undefined') { lucide.createIcons(); }

                setTimeout(() => {
                    valueEl.innerHTML = originalText;
                    if (typeof lucide !== 'undefined') { lucide.createIcons(); }
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
});
