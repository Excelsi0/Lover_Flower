import "/src/sass/style.scss";

document.querySelector(".search-trigger").addEventListener("click", function (e) {
    e.preventDefault(); // Отменяем переход по ссылке

    const searchBox = document.querySelector(".search-box");
    searchBox.classList.toggle("active");

    // Если поиск открыт - фокусируемся на поле ввода
    if (searchBox.classList.contains("active")) {
        document.querySelector(".search-input").focus();
    }
});

// Закрывать поиск при клике вне его области
document.addEventListener("click", function (e) {
    if (!e.target.closest(".search")) {
        document.querySelector(".search__box").classList.remove("active");
    }
});
