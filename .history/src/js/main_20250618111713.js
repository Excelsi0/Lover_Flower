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

const search = document.querySelector(".js-search");
const openSearchBtn = document.querySelector(".js-search-trigger");
const closeSearchBtn = document.querySelector(".js-close-search");
const searchInput = document.querySelector(".search__input");

openSearchBtn.addEventListener("click", () => {
    search.classList.add("active");
    searchInput.focus();
});

closeSearchBtn.addEventListener("click", () => {
    search.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".search")) {
        search.classList.remove("active");
    }
});
