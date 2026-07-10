document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Navigation Menu Toggle ---
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNavMenu = document.getElementById("mobile-nav-menu");
    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {
        const isOpen = mobileNavMenu.classList.toggle("open");
        
        // Toggle icon between bars and xmark
        if (isOpen) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });

    // Close menu when a navigation item is clicked
    const mobileLinks = document.querySelectorAll(".mobile-nav-item, #mobile-nav-cta");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNavMenu.classList.remove("open");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });

    // Close mobile nav drawer when resizing to desktop width
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && mobileNavMenu.classList.contains("open")) {
            mobileNavMenu.classList.remove("open");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });

    // --- FAQ Accordions ---
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentNode;
            const answer = item.querySelector(".faq-answer");
            const isActive = item.classList.contains("active");

            // Close other active FAQ items (accordion behavior)
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".faq-answer").style.maxHeight = null;
                }
            });

            // Toggle current FAQ item
            if (!isActive) {
                item.classList.add("active");
                // Animate to scrollHeight
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                item.classList.remove("active");
                answer.style.maxHeight = null;
            }
        });
    });

    // --- Copy Code to Clipboard ---
    const copyBtn = document.getElementById("btn-copy-cmd");
    const codeText = "chmod +x nordsonic_launcher.sh && ./nordsonic_launcher.sh";

    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(codeText)
            .then(() => {
                // Change icon to checkmark for success feedback
                const icon = copyBtn.querySelector("i");
                icon.classList.remove("fa-copy", "fa-regular");
                icon.classList.add("fa-check", "fa-solid");
                
                // Reset icon after 2 seconds
                setTimeout(() => {
                    icon.classList.remove("fa-check", "fa-solid");
                    icon.classList.add("fa-copy", "fa-regular");
                }, 2000);
            })
            .catch(err => {
                console.error("Could not copy text: ", err);
            });
    });

    // --- Pricing Toggle Switch ---
    const pricingToggle = document.getElementById("pricing-toggle");
    const labelMonthly = document.getElementById("billing-monthly");
    const labelYearly = document.getElementById("billing-yearly");
    
    const homeAmount = document.getElementById("home-amount");
    const homePeriod = document.getElementById("home-period");
    const proAmount = document.getElementById("pro-amount");
    const proPeriod = document.getElementById("pro-period");
    
    function setBilling(isYearly) {
        if (isYearly) {
            pricingToggle.classList.add("yearly-active");
            labelMonthly.classList.remove("active");
            labelYearly.classList.add("active");
        } else {
            pricingToggle.classList.remove("yearly-active");
            labelMonthly.classList.add("active");
            labelYearly.classList.remove("active");
        }
        
        // Update pricing cards with a quick smooth transition
        const priceContainers = document.querySelectorAll(".tier-price");
        priceContainers.forEach(container => {
            container.style.opacity = "0";
        });
        
        setTimeout(() => {
            if (isYearly) {
                homeAmount.textContent = homeAmount.getAttribute("data-yearly-price");
                homePeriod.textContent = homePeriod.getAttribute("data-yearly-period");
                proAmount.textContent = proAmount.getAttribute("data-yearly-price");
                proPeriod.textContent = proPeriod.getAttribute("data-yearly-period");
            } else {
                homeAmount.textContent = homeAmount.getAttribute("data-monthly-price");
                homePeriod.textContent = homePeriod.getAttribute("data-monthly-period");
                proAmount.textContent = proAmount.getAttribute("data-monthly-price");
                proPeriod.textContent = proPeriod.getAttribute("data-monthly-period");
            }
            
            priceContainers.forEach(container => {
                container.style.opacity = "1";
            });
        }, 150);
    }
    
    pricingToggle.addEventListener("click", () => {
        const isYearly = !pricingToggle.classList.contains("yearly-active");
        setBilling(isYearly);
    });
    
    labelMonthly.addEventListener("click", () => {
        setBilling(false);
    });
    
    labelYearly.addEventListener("click", () => {
        setBilling(true);
    });

    // --- Screenshot Gallery Carousel ---
    const slides = document.querySelectorAll(".gallery-slide");
    const thumbs = document.querySelectorAll(".gallery-thumb");
    const prevBtn = document.getElementById("gallery-prev");
    const nextBtn = document.getElementById("gallery-next");
    
    let currentSlideIndex = 0;
    
    function showSlide(index) {
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        
        slides.forEach((slide, idx) => {
            if (idx === currentSlideIndex) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });
        
        thumbs.forEach((thumb, idx) => {
            if (idx === currentSlideIndex) {
                thumb.classList.add("active");
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove("active");
            }
        });
    }
    
    prevBtn.addEventListener("click", () => {
        showSlide(currentSlideIndex - 1);
    });
    
    nextBtn.addEventListener("click", () => {
        showSlide(currentSlideIndex + 1);
    });
    
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", () => {
            const index = parseInt(thumb.getAttribute("data-slide-index"));
            showSlide(index);
        });
    });
});
