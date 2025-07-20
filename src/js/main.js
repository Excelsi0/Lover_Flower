import "/src/sass/style.scss";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

document.addEventListener("DOMContentLoaded", function () {
    try {
        // Определяем, мобильная это версия или десктопная
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const headerClass = isMobile ? ".header-mobile" : ".header";

        // Находим элементы поиска в соответствующем хедере
        const search = document.querySelector(`${headerClass} .js-search`);
        const openSearchBtn = document.querySelector(`${headerClass} .js-search-trigger`);
        const closeSearchBtn = document.querySelector(`${headerClass} .js-close-search`);
        const searchInput = document.querySelector(`${headerClass} .search__input`);

        // Проверяем, все ли элементы найдены
        if (!search || !openSearchBtn || !closeSearchBtn || !searchInput) {
            const missingElements = [];
            if (!search) missingElements.push(`${headerClass} .js-search`);
            if (!openSearchBtn) missingElements.push(`${headerClass} .js-search-trigger`);
            if (!closeSearchBtn) missingElements.push(`${headerClass} .js-close-search`);
            if (!searchInput) missingElements.push(`${headerClass} .search__input`);

            throw new Error(`Отсутствуют элементы: ${missingElements.join(", ")}`);
        }

        // Функция переключения поиска
        const toggleSearch = (isOpen) => {
            search.classList.toggle("active", isOpen);
            document.body.classList.toggle("search-active", isOpen);
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

        console.log("Скрипт поиска успешно инициализирован для", isMobile ? "мобильной" : "десктопной", "версии");
    } catch (err) {
        console.error("Ошибка в блоке поиска:", err);
    }
});

// Header Scroll Effect
function initHeaderScroll() {
    try {
        const bgHeader = document.getElementById("header");
        if (!bgHeader) return; // Выходим если header не найден

        let isMobile = window.innerWidth <= 768;

        function handleHeaderScroll() {
            const scrollY = window.scrollY;

            if (scrollY > 10) {
                bgHeader.classList.add("scrolled");
                bgHeader.style.background = "#040a0a";
            } else {
                bgHeader.classList.remove("scrolled");
                bgHeader.style.background = "rgba(0, 0, 0, 0)";
            }
        }

        window.addEventListener("scroll", handleHeaderScroll);
        handleHeaderScroll(); // Инициализация при загрузке
    } catch (err) {
        console.error("Header Scroll Error:", err);
    }
}

// Hero Title Animation (только если элемент существует)
function initHeroTitle() {
    try {
        const textElement = document.getElementById("hero__title");
        if (!textElement) return; // Выходим если элемент не найден

        const startTop = 14;
        const endTop = 16;
        const startSize = 50;
        const endSize = 20;
        const scrollRange = 10;
        const defaultZIndex = "99";

        let isMobile = window.innerWidth <= 768;

        function updateTitle() {
            if (!isMobile) return;

            const scrollY = window.scrollY;
            const ratio = Math.min(scrollY / scrollRange, 1);
            const newTop = startTop + (endTop - startTop) * ratio;
            const newSize = startSize - (startSize - endSize) * ratio;

            textElement.style.top = `${newTop}px`;
            textElement.style.fontSize = `${newSize}px`;
            textElement.style.zIndex = defaultZIndex;
        }

        function handleResize() {
            isMobile = window.innerWidth <= 768;
            if (!isMobile) {
                textElement.style.removeProperty("top");
                textElement.style.removeProperty("font-size");
                textElement.style.removeProperty("z-index");
            } else {
                updateTitle();
            }
        }

        window.addEventListener("scroll", updateTitle);
        window.addEventListener("resize", handleResize);
        handleResize(); // Инициализация
    } catch (err) {
        console.error("Hero Title Error:", err);
    }
}

// Sidebar Z-index Control
function initSidebar() {
    try {
        const sidebar = document.querySelector(".sidebar");
        if (!sidebar) return;

        const bgHeader = document.getElementById("header");
        const scrolledZIndex = "2";
        const defaultZIndex = "99";

        function updateSidebar() {
            const scrollY = window.scrollY;
            sidebar.style.zIndex = scrollY > 10 ? scrolledZIndex : defaultZIndex;
        }

        window.addEventListener("scroll", updateSidebar);
        updateSidebar(); // Инициализация
    } catch (err) {
        console.error("Sidebar Error:", err);
    }
}

// Запуск всех модулей
document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initHeroTitle();
    initSidebar();
});
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

//мобильное меню

try {
    document.addEventListener("DOMContentLoaded", function () {
        // Элементы меню
        const mobileMenu = document.querySelector(".header-mobile");
        const openButton = document.querySelector(".header-mobile__btn");
        const closeButton = document.querySelector(".header-mobile__exit");

        // Функция для открытия меню
        function openMenu() {
            mobileMenu.classList.add("active");
            document.body.classList.add("menu-open");
        }

        // Функция для закрытия меню
        function closeMenu() {
            mobileMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        }

        // Обработчики событий
        if (openButton) {
            openButton.addEventListener("click", openMenu);
        }

        if (closeButton) {
            closeButton.addEventListener("click", closeMenu);
        }

        // Закрытие при клике вне меню
        document.addEventListener("click", function (event) {
            if (mobileMenu.classList.contains("active") && !event.target.closest(".header-mobile") && !event.target.closest(".header-mobile__btn")) {
                closeMenu();
            }
        });

        // Закрытие при нажатии ESC
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
                closeMenu();
            }
        });

        // Закрытие при изменении ориентации
        window.addEventListener("orientationchange", function () {
            if (mobileMenu.classList.contains("active")) {
                closeMenu();
            }
        });

        // Закрытие при изменении размера окна (на всякий случай)
        window.addEventListener("resize", function () {
            // Проверяем, если ширина стала больше определенного значения (например, 768px)
            if (window.innerWidth > 768 && mobileMenu.classList.contains("active")) {
                closeMenu();
            }
        });
    });
} catch (err) {
    console.error("Ошибка:", err);
}

try {
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        loop: true,

        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 40,

        breakpoints: {
            769: {
                direction: "horizontal",
                slidesPerView: 2,
                spaceBetween: 5,
            },
            1290: {
                direction: "horizontal",
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        navigation: {
            nextEl: ".hits__button-next",
            prevEl: ".hits__button-prev",
        },
        modules: [Navigation],
    });
} catch (e) {
    console.e("Ошибка:", e);
}
