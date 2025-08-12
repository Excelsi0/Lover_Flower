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

// стоимость в фильтре
document.querySelectorAll(".slider").forEach((slider) => {
    const rangeMin = slider.querySelector(".range-min");
    const rangeMax = slider.querySelector(".range-max");
    const minValue = slider.querySelector(".min-value");
    const maxValue = slider.querySelector(".max-value");
    const sliderRange = slider.querySelector(".slider__range");
    const minGap = 10;

    function updateSlider(event) {
        const min = parseInt(rangeMin.value);
        const max = parseInt(rangeMax.value);

        if (max - min < minGap) {
            if (event.target === rangeMin) {
                rangeMin.value = max - minGap;
            } else {
                rangeMax.value = min + minGap;
            }
        }

        const percentMin = ((rangeMin.value - 50) / (400 - 50)) * 100;
        const percentMax = ((rangeMax.value - 50) / (400 - 50)) * 100;

        sliderRange.style.left = percentMin + "%";
        sliderRange.style.width = percentMax - percentMin + "%";

        minValue.textContent = `${parseFloat(rangeMin.value).toFixed(2)} ₽`;
        maxValue.textContent = `${parseFloat(rangeMax.value).toFixed(2)} ₽`;
    }

    rangeMin.addEventListener("input", updateSlider);
    rangeMax.addEventListener("input", updateSlider);
    updateSlider({ target: rangeMin });
});
// сброс фильтров

try {
    document.addEventListener("DOMContentLoaded", function () {
        const resetButton = document.querySelector(".filter__btn");
        const checkboxes = document.querySelectorAll('.filter__input[type="checkbox"]');
        const rangeMin = document.getElementById("range-min");
        const rangeMax = document.getElementById("range-max");
        const minValueSpan = document.getElementById("min-value");
        const maxValueSpan = document.getElementById("max-value");

        resetButton.addEventListener("click", function (e) {
            e.preventDefault(); // чтобы кнопка не перезагружала страницу

            // Снимаем все чекбоксы
            checkboxes.forEach((cb) => (cb.checked = false));

            // Сбрасываем диапазон цен
            rangeMin.value = rangeMin.min;
            rangeMax.value = rangeMax.max;

            // Обновляем текстовое отображение значений
            minValueSpan.textContent = `${rangeMin.value} ₽`;
            maxValueSpan.textContent = `${rangeMax.value} ₽`;

            // При необходимости, вызовите функцию для обновления визуального диапазона слайдера
            updateSliderRange();
        });

        function updateSliderRange() {
            const min = parseInt(rangeMin.value);
            const max = parseInt(rangeMax.value);
            const range = document.getElementById("slider__range");
            const trackWidth = rangeMin.offsetWidth;

            const minPercent = ((min - rangeMin.min) / (rangeMin.max - rangeMin.min)) * 100;
            const maxPercent = ((max - rangeMin.min) / (rangeMin.max - rangeMin.min)) * 100;

            range.style.left = `${minPercent}%`;
            range.style.width = `${maxPercent - minPercent}%`;
        }

        // Добавляем обработчики для обновления значений при изменении диапазона
        rangeMin.addEventListener("input", () => {
            if (parseInt(rangeMin.value) > parseInt(rangeMax.value)) {
                rangeMin.value = rangeMax.value;
            }
            minValueSpan.textContent = `${rangeMin.value} ₽`;
            updateSliderRange();
        });

        rangeMax.addEventListener("input", () => {
            if (parseInt(rangeMax.value) < parseInt(rangeMin.value)) {
                rangeMax.value = rangeMin.value;
            }
            maxValueSpan.textContent = `${rangeMax.value} ₽`;
            updateSliderRange();
        });
    });
} catch (e) {
    console.error("Ошибка:", e);
}

// выбор сортировки

try {
    document.addEventListener("DOMContentLoaded", function () {
        const sortButtons = document.querySelectorAll(".hero__category-btn");
        const activeSortText = document.getElementById("catalog__active-text");
        const clearSortButton = document.getElementById("catalog__clear");

        activeSortText.textContent = "";
        clearSortButton.style.display = "none";

        sortButtons.forEach((button) => {
            button.addEventListener("click", function () {
                activeSortText.textContent = this.textContent;
                clearSortButton.style.display = "inline";

                sortButtons.forEach((btn) => btn.classList.remove("hero__category-btn_active"));

                this.classList.add("hero__category-btn_active");
            });
        });

        clearSortButton.addEventListener("click", function () {
            activeSortText.textContent = "";
            this.style.display = "none";

            sortButtons.forEach((btn) => btn.classList.remove("hero__category-btn_active"));
        });
    });
} catch (e) {
    console.error("Ошибка:", e);
}

// Смена заголовка фильтра при выборе сортировки

try {
    document.addEventListener("DOMContentLoaded", function () {
        const sortInputs = document.querySelectorAll(".catalog__filter-input");
        const headerTitle = document.querySelector(".catalog__filter-header-title");

        sortInputs.forEach((input) => {
            input.addEventListener("change", function () {
                if (this.checked) {
                    headerTitle.textContent = this.value;
                }
            });
        });
    });
} catch (e) {
    console.error("Ошибка:", e);
}

// прокркутка вниз
try {
    const container = document.querySelector(".catalog__content");
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    let page = 1;
    let isLoading = false;
    let hasLoadedMore = false;

    function createCard(item) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <div class="card__wrapper">
        <div class="card__badge card__badge_sale${item.saleActive ? " card__badge_sale-active" : ""}">SALE</div>
        <div class="card__badge card__badge_new${item.newActive ? " card__badge_new-active" : ""}">NEW</div>
        <img src="${item.img}" alt="bouquet" class="card__img">
        <div class="card__name">${item.name}</div>
        <div class="card__price">
          ${item.price} ₽
          <span class="card__price_old">${item.saleActive ? item.oldPrice : ""}</span>
        </div>
        <button class="card__btn btn">В корзину</button>
      </div>
    `;
        return card;
    }

    function loadCards() {
        if (isLoading) return;
        isLoading = true;

        setTimeout(() => {
            const data = Array.from({ length: 6 }).map((_, i) => {
                const imgNumber = (((page - 1) * 6 + i) % 12) + 1;
                const saleActive = Math.random() < 0.1;
                const price = 167000;
                const oldPrice = saleActive ? price + Math.floor(Math.random() * 50000 + 10000) : "";

                return {
                    img: `/src/image/bouquet/bouquet${imgNumber}.jpg`,
                    name: "лучшее утро",
                    price: price.toLocaleString("ru-RU"),
                    oldPrice: oldPrice ? oldPrice.toLocaleString("ru-RU") : "",
                    saleActive,
                    newActive: Math.random() < 0.1,
                };
            });

            data.forEach((item) => {
                const card = createCard(item);
                container.appendChild(card);
            });

            page++;
            isLoading = false;

            if (page > 2 && !hasLoadedMore) {
                scrollTopBtn.style.display = "block";
                hasLoadedMore = true;
            }
        }, 1000);
    }

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadCards();
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        const headerOffset = 150;
        const elementPosition = container.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    });

    loadCards();
} catch (e) {
    console.error("Ошибка:", e);
}
