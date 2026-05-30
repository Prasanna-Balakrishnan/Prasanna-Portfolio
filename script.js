document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.innerHTML = navMenu.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 2. Cyberpunk Dark Mode Switch Logic
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Initialize state mapping
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // 3. Typing Effect for Hero Section
    const textArray = ["Software Developer", "B.Tech CSE Student", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById("typing-text");

    function type() {
        if (charIndex < textArray[textIndex].length) {
            typingElement.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex++;
            if (textIndex >= textArray.length) textIndex = 0;
            setTimeout(type, 1100);
        }
    }

    if (textArray.length) setTimeout(type, 2250);

    // 4. Scroll Reveal Animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    // 5. Highlight Active Navigation Link on Scroll
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});