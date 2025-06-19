import "/src/sass/style.scss";

document.querySelector(".search__icon").addEventListener("click", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active");

    if (search.classList.contains("active")) {
        document.querySelector(".search__input input").focus();
    }
});

// Закрытие при клике вне области
document.addEventListener("click", function (e) {
    if (!e.target.closest(".search")) {
        document.querySelector(".search").classList.remove("active");
    }
});
