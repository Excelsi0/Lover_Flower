import "/src/sass/style.scss";

try {
    // Элементы поиска
    const search = document.querySelector(".js-search");
    const openSearchBtn = document.querySelector(".js-search-trigger");
    const closeSearchBtn = document.querySelector(".js-close-search");
    const searchInput = document.querySelector(".search__input");
    const header = document.querySelector(".header");

    if (!search || !openSearchBtn || !closeSearchBtn || !searchInput || !header) {
        throw new Error("Некоторые элементы поиска не найдены.");
    }

    const toggleSearch = (isOpen) => {
        search.classList.toggle("active", isOpen);
        header.classList.toggle("search-active", isOpen);
        if (isOpen) searchInput.focus();
    };

    openSearchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSearch(true);
    });

    closeSearchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSearch(false);
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search")) {
            toggleSearch(false);
        }
    });
} catch (err) {
    console.error("Ошибка в блоке поиска:", err);
}

try {
    const bgHeader = document.getElementById("header");

    if (!bgHeader) throw new Error("Элемент #header не найден");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            bgHeader.classList.add("scrolled");
            bgHeader.style.background = "#040a0a"; // fallback
        } else {
            bgHeader.classList.remove("scrolled");
            bgHeader.style.background = "rgba(0, 0, 0, 0)"; // fallback
        }
    });
} catch (err) {
    console.error("Ошибка при окрашивании header:", err);
}

try {
    const textElement = document.getElementById("hero__title");
    if (!textElement) throw new Error("Элемент #hero__title не найден");

    const startTop = 14;
    const endTop = 16;
    const startSize = 50;
    const endSize = 20;
    const scrollRange = 10;

    let isMobile = window.innerWidth <= 768;

    function animateTitle() {
        if (!isMobile) return;

        const scrollY = window.scrollY;
        const ratio = Math.min(scrollY / scrollRange, 1);

        const newTop = startTop + (endTop - startTop) * ratio;
        const newSize = startSize - (startSize - endSize) * ratio;

        textElement.style.top = `${newTop}px`;
        textElement.style.fontSize = `${newSize}px`;
    }

    function resetTitle() {
        textElement.style.removeProperty("top");
        textElement.style.removeProperty("font-size");
    }

    function handleResize() {
        const newIsMobile = window.innerWidth <= 768;

        if (!newIsMobile && isMobile) {
            // Перешли с мобилки на десктоп — очищаем изменения
            resetTitle();
        }

        isMobile = newIsMobile;

        if (isMobile) {
            animateTitle(); // актуализируем размер
        } else {
            resetTitle(); // вдруг пользователь просто ресайзит браузер
        }
    }

    window.addEventListener("scroll", animateTitle);
    window.addEventListener("resize", handleResize);

    // Первый запуск
    handleResize();
    animateTitle();
} catch (err) {
    console.error("Ошибка в анимации заголовка:", err);
}
