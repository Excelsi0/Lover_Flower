import "/src/sass/style.scss";

const search = document.querySelector(".search");
const icon = document.querySelector(".search__icon");
const searchInput = document.getElementById("mySearch");

icon.addEventListener("click", function () {
    search.classList.toggle("active");

    // Фокусируемся на поле ввода при открытии
    if (search.classList.contains("active")) {
        setTimeout(() => {
            searchInput.focus();
        }, 300); // Ждем завершения анимации
    }
});

// Закрываем поиск при клике вне его области
document.addEventListener("click", function (e) {
    if (!e.target.closest(".search")) {
        search.classList.remove("active");
    }
});

// Закрываем поиск при нажатии Escape
searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        search.classList.remove("active");
    }
});
