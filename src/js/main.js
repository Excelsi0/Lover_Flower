import "/src/sass/style.scss";

try {
    // Элементы поиска
    const search = document.querySelector(".js-search");
    const openSearchBtn = document.querySelector(".js-search-trigger");
    const closeSearchBtn = document.querySelector(".js-close-search");
    const searchInput = document.querySelector(".search__input");
    const header = document.querySelector(".header");
    const sidebarContacts = document.querySelector(".sidebar__contacts");

    // Проверка всех необходимых элементов
    if (!search || !openSearchBtn || !closeSearchBtn || !searchInput || !header || !sidebarContacts) {
        const missingElements = [];
        if (!search) missingElements.push(".js-search");
        if (!openSearchBtn) missingElements.push(".js-search-trigger");
        if (!closeSearchBtn) missingElements.push(".js-close-search");
        if (!searchInput) missingElements.push(".search__input");
        if (!header) missingElements.push(".header");
        if (!sidebarContacts) missingElements.push(".sidebar__contacts");

        throw new Error(`Отсутствуют элементы: ${missingElements.join(", ")}`);
    }

    const toggleSearch = (isOpen) => {
        search.classList.toggle("active", isOpen);
        document.body.classList.toggle("search-active", isOpen); // Изменено с header на body
        if (isOpen) {
            searchInput.focus();
        } else {
            searchInput.blur();
        }
    };

    // Открытие поиска
    openSearchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSearch(true);
    });

    // Закрытие поиска
    closeSearchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSearch(false);
    });

    // Закрытие при клике вне области поиска
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search") && search.classList.contains("active")) {
            toggleSearch(false);
        }
    });

    // Закрытие по Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && search.classList.contains("active")) {
            toggleSearch(false);
        }
    });
} catch (err) {
    console.error("Ошибка в блоке поиска:", err);
    // Можно добавить обработку ошибки, например показать уведомление
}
try {
    const bgHeader = document.getElementById("header");
    const textElement = document.getElementById("hero__title");
    const sidebar = document.querySelector(".sidebar"); // Добавляем элемент sidebar

    if (!bgHeader) throw new Error("Элемент #header не найден");
    if (!textElement) throw new Error("Элемент #hero__title не найден");
    if (!sidebar) throw new Error("Элемент .sidebar не найден");

    // Настройки для заголовка
    const startTop = 14;
    const endTop = 16;
    const startSize = 50;
    const endSize = 20;
    const scrollRange = 10;

    // Настройки z-index
    const defaultZIndex = "99";
    const scrolledZIndex = "2";

    let isMobile = window.innerWidth <= 768;

    function handleScrollEffects() {
        const scrollY = window.scrollY;
        const ratio = Math.min(scrollY / scrollRange, 1);

        // Анимация заголовка
        if (isMobile) {
            const newTop = startTop + (endTop - startTop) * ratio;
            const newSize = startSize - (startSize - endSize) * ratio;

            textElement.style.top = `${newTop}px`;
            textElement.style.fontSize = `${newSize}px`;
            textElement.style.zIndex = ratio > 0 ? defaultZIndex : defaultZIndex;
        }

        // Управление z-index для sidebar
        if (scrollY > 10) {
            bgHeader.classList.add("scrolled");
            bgHeader.style.background = "#040a0a";
            sidebar.style.zIndex = scrolledZIndex;
        } else {
            bgHeader.classList.remove("scrolled");
            bgHeader.style.background = "rgba(0, 0, 0, 0)";
            sidebar.style.zIndex = defaultZIndex;
        }
    }

    function resetTitle() {
        textElement.style.removeProperty("top");
        textElement.style.removeProperty("font-size");
        textElement.style.removeProperty("z-index");
    }

    function handleResize() {
        const newIsMobile = window.innerWidth <= 768;

        if (!newIsMobile && isMobile) {
            resetTitle();
        }

        isMobile = newIsMobile;

        if (isMobile) {
            handleScrollEffects();
        } else {
            resetTitle();
        }
    }

    // Инициализация
    sidebar.style.zIndex = defaultZIndex; // Устанавливаем начальный z-index

    window.addEventListener("scroll", handleScrollEffects);
    window.addEventListener("resize", handleResize);

    // Первый запуск
    handleResize();
    handleScrollEffects();
} catch (err) {
    console.error("Ошибка:", err);
}

try {
    const header = document.querySelector(".header");
    const sidebarCart = document.querySelector(".sidebar__cart");
    const headerBtn = document.querySelector(".header__btn");
    const headerPhone = document.querySelector(".header__phone_number");

    if (!header || !sidebarCart || !headerBtn || !headerPhone) {
        throw new Error("Один из элементов не найден");
    }

    // Настройки
    const settings = {
        showDelay: 300,
        transition: "0.4s ease",
        minWidth: 1024, // Минимальная ширина экрана для работы
    };

    // Инициализация стилей
    const initStyles = () => {
        Object.assign(sidebarCart.style, {
            transition: `opacity ${settings.transition}, visibility ${settings.transition}`,
        });

        Object.assign(headerBtn.style, {
            transition: `opacity ${settings.transition}, visibility ${settings.transition}`,
            opacity: "0",
            visibility: "hidden",
        });

        Object.assign(headerPhone.style, {
            transition: `opacity ${settings.transition}, visibility ${settings.transition}`,
            opacity: "0",
            visibility: "hidden",
        });
    };

    let lastState = null;
    let isDesktop = window.innerWidth >= settings.minWidth;

    function checkSidebarPosition() {
        if (!isDesktop) return;

        const sidebarRect = sidebarCart.getBoundingClientRect();
        const shouldShowHeaderElements = sidebarRect.top <= header.offsetHeight;

        if (lastState === shouldShowHeaderElements) return;
        lastState = shouldShowHeaderElements;

        if (shouldShowHeaderElements) {
            sidebarCart.style.opacity = "0";
            sidebarCart.style.visibility = "hidden";

            setTimeout(() => {
                headerBtn.style.opacity = "1";
                headerBtn.style.visibility = "visible";
                headerPhone.style.opacity = "1";
                headerPhone.style.visibility = "visible";
            }, settings.showDelay);
        } else {
            headerBtn.style.opacity = "0";
            headerBtn.style.visibility = "hidden";
            headerPhone.style.opacity = "0";
            headerPhone.style.visibility = "hidden";

            setTimeout(() => {
                sidebarCart.style.opacity = "1";
                sidebarCart.style.visibility = "visible";
            }, settings.showDelay / 2);
        }
    }

    // Обработчик скролла с троттлингом
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkSidebarPosition();
                ticking = false;
            });
            ticking = true;
        }
    };

    // Обработчик ресайза
    const handleResize = () => {
        const newIsDesktop = window.innerWidth >= settings.minWidth;

        if (isDesktop !== newIsDesktop) {
            isDesktop = newIsDesktop;

            if (!isDesktop) {
                // На мобильных - сбросить все изменения
                sidebarCart.style.opacity = "";
                sidebarCart.style.visibility = "";
                headerBtn.style.opacity = "";
                headerBtn.style.visibility = "";
                headerPhone.style.opacity = "";
                headerPhone.style.visibility = "";
                window.removeEventListener("scroll", handleScroll);
            } else {
                // На десктопах - инициализировать
                initStyles();
                window.addEventListener("scroll", handleScroll);
                checkSidebarPosition();
            }
        }
    };

    // Первоначальная настройка
    if (isDesktop) {
        initStyles();
        window.addEventListener("scroll", handleScroll);
        checkSidebarPosition();
    }
    window.addEventListener("resize", handleResize);
} catch (err) {
    console.error("Ошибка:", err);
}
