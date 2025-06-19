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

const searchBtn = document.querySelector(".js-search-button");
const searchBlock = document.querySelector(".js-search");
const phoneBlock = document.querySelector(".js-phone");
const closeSearch = document.querySelector(".js-search-close");

searchBtn.addEventListener("click", () => {
    searchBlock.classList.add("active");
    phoneBlock.style.opacity = "0";
});

closeSearch.addEventListener("click", () => {
    searchBlock.classList.remove("active");
    phoneBlock.style.opacity = "1";
});
