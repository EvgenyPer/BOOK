(() => {
    "use strict";

    let htmlCode = "";
    let category = "";
    
    const showcaseBooks = document.querySelector(".showecase-books");
    const loadMoreButton = document.querySelector(".btn_load-more");
    const categoryItems = document.querySelectorAll(".category-books_item");

    let buyButtonText = "buy now";
    let subjectFilter = "subject:Architecture";
    let startIndex = 0;
    let currentCategory = "";
    let booksArray = [];
    let cartItems = [];

    async function fetchBooks() {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${subjectFilter}&key=AIzaSyC8YBwRI2UO8lk5k4S31Z77MyGZr_Lu_bI&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict='en'`);
        const data = await response.json();
        const books = data.items;

        books.forEach(book => {
            let bookHtml = `
                <div class="book-position">
                    <img class="${book.volumeInfo?.imageLinks?.thumbnail ? "book-position_image" : "book-position_image-none"}" src="${book.volumeInfo?.imageLinks?.thumbnail}" alt="foto book">
                    <div class="book-position_info">
                        <h2 class="book-position_info-author">${book.volumeInfo?.authors}</h2>
                        <h2 class="book-position_info-title">${book.volumeInfo?.title}</h2>
                        <div class="${book.volumeInfo?.averageRating ? "rating-block" : "rating-block-none"}">
                            <div class="${book.volumeInfo?.averageRating ? "rating-block_stars" : ""}">
                                <div class="${book.volumeInfo?.averageRating === 1 ? "rating-block_stars__one" : ""}">
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__grey"></div>
                                    <div class="rating-block_stars__grey"></div>
                                    <div class="rating-block_stars__grey"></div>
                                    <div class="rating-block_stars__grey"></div>
                                </div>
                                <div class="${book.volumeInfo?.averageRating === 2 ? "rating-block_stars__two" : ""}">
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__grey"></div>
                                    <div class="rating-block_stars__grey"></div>
                                    <div class="rating-block_stars__grey"></div>
                                </div>
                                <div class="${book.volumeInfo?.averageRating === 3 ? "rating-block_stars__three" : ""}">
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__grey"></div>
                                    <div class="rating-block_stars__grey"></div>
                                </div>
                                <div class="${book.volumeInfo?.averageRating === 4 ? "rating-block_stars__four" : ""}">
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__grey"></div>
                                </div>
                                <div class="${book.volumeInfo?.averageRating === 5 ? "rating-block_stars__five" : ""}">
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                    <div class="rating-block_stars__yellow"></div>
                                </div>
                            </div>
                            <h2 class="${book.volumeInfo?.ratingsCount ? "rating-block_count" : "rating-block_count-none"}">${book.volumeInfo?.ratingsCount} review</h2>
                        </div>
                        <h2 class="${book.volumeInfo?.description ? "book-position_info-description" : "book-position_info-description-none"}">${book.volumeInfo?.description}</h2>
                        <h2 class="${book.saleInfo?.retailPrice?.amount ? "book-position_info-sale" : "book-position_info-sale-none"}">&#36; ${book.saleInfo?.retailPrice?.amount}</h2>
                        <button class="btn_buy-now" type="button" data-btnbuy="${book.id}">${buyButtonText}</button>
                    </div>
                </div>`;

            showcaseBooks.innerHTML += bookHtml;
        });

        booksArray.push(books);

        document.querySelectorAll(".btn_buy-now").forEach(button => {
            button.addEventListener("click", event => {
                let cartFlag = document.querySelector(".nav-info_cart-flag");
                let clickedButton = event.target.closest(".btn_buy-now");
                clickedButton.classList.toggle("btn_in_the_cart");

                if (clickedButton.classList.contains("btn_in_the_cart")) {
                    clickedButton.innerText = "In the cart";
                    handleCartAddition(event);
                    cartFlag.innerText = cartItems.length;
                } else {
                    clickedButton.innerText = "buy now";
                    handleCartRemoval(event);
                    cartFlag.innerText = cartItems.length;
                }
            });
        });
    }

    let banners = [
        { url: "./banner 1.png" },
        { url: "./banner 2.png" },
        { url: "./banner 3.png" }
    ];

    document.addEventListener("DOMContentLoaded", () => {
        (function () {
            if (!banners || !banners.length) return;

            let sliderContainer = document.querySelector(".container-slider");
            let dotsContainer = document.querySelector(".container-dots");

            function setActive(index) {
                dotsContainer.querySelector(".active").classList.remove("active");
                dotsContainer.querySelector(".n" + index).classList.add("active");

                sliderContainer.querySelector(".active").classList.remove("active");
                sliderContainer.querySelector(".n" + index).classList.add("active");
            }

            banners.forEach((banner, index) => {
                let imageHtml = `
                    <div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url('${banner.url}');" data-index="${index}"></div>`;
                sliderContainer.innerHTML += imageHtml;
            });

            banners.forEach((banner, index) => {
                let dotHtml = `<div class="dot n${index} ${index === 0 ? "active" : ""
            }" data-index="${index}"></div>`;
            dotsContainer.innerHTML += dotHtml;
        });

        dotsContainer.querySelectorAll(".dot").forEach(dot => {
            dot.addEventListener("click", function () {
                setActive(this.dataset.index);
            });
        });

        setInterval(() => {
            let currentIndex = +sliderContainer.querySelector(".active").dataset.index;
            setActive(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
        }, 5000);
    })();

    fetchBooks();

    loadMoreButton.addEventListener("click", () => {
        startIndex += 6;

        categoryItems.forEach(item => {
            if (item.classList.contains("active")) {
                currentCategory = item.innerText;
            }
        });

        subjectFilter = `subject:${currentCategory}`;
        showcaseBooks.innerHTML = "";
        fetchBooks();
        booksArray = [];
    });

    categoryItems.forEach(item => {
        item.addEventListener("click", event => {
            let clickedItem = event.target.closest(".category-books_item");
            categoryItems.forEach(item => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
            });

            clickedItem.classList.add("active");

            if (showcaseBooks.classList.contains("active")) {
                currentCategory = clickedItem.innerText;
            }

            showcaseBooks.innerHTML = "";
            subjectFilter = `subject:${currentCategory}`;
            fetchBooks();
            booksArray = [];
        });
    });
});
})();
