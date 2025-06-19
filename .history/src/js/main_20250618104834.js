import "/src/sass/style.scss";

// // скрипт ИИ для поиска
// document.querySelector(".search__icon").addEventListener("click", function () {
//     const search = document.querySelector(".search");
//     const header = document.querySelector(".header");
//     search.classList.toggle("active");
//     header.classList.toggle("search-active");

//     if (search.classList.contains("active")) {
//         document.querySelector(".search__input input").focus();
//     }
// });

// document.addEventListener("click", function (e) {
//     const search = document.querySelector(".search");
//     const header = document.querySelector(".header");
//     if (!e.target.closest(".search")) {
//         search.classList.remove("active");
//         header.classList.remove("search-active");
//     }
// });

const searchToggle = document.querySelector(".search-toggle");
const searchBox = document.querySelector(".header__search");
const closeBtn = document.querySelector(".search-close");
const phoneBlock = document.querySelector(".header__phone");

searchToggle.addEventListener("click", () => {
    searchBox.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    searchBox.classList.remove("active");
});
