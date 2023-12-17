import './interfaces';
import { addBookInBasket, deleteBookFromBasket, totalCountBooks } from './BookInBasket';
import { descriptionProcessing, authorsProcessing, ratingProcessing, cleanPastCategory, clearActiveCategory } from './utils';

const loadMoreBtn: HTMLElement = document.querySelector('.load-more__btn')!;
const bookCard: HTMLElement = document.querySelector('.book-cards')!;
const categoryList: NodeListOf<Element> = document.querySelectorAll('.list__item')!;

export let subject: string = '';
export let startIndex: number = 0;

export let books: { 
    dataIndex: string,
    authors: string, 
    title: string, 
    averageRating: NodeListOf<Element>, 
    ratingsCount: Element, 
    description: string, 
    imageLinks: Element
}[] = [];

loadBooks();

function loadBooks() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
    drawBookCard();
    totalCountBooks();
    console.log(books)
}

loadMoreBtn.addEventListener('click', drawBookCard);

categoryList.forEach((category) => {
    category.addEventListener('click', (event) => {
        const categoryObj: HTMLElement = event.target as HTMLElement;
        clearActiveCategory();

        categoryObj.classList.add('list__item-active');

        const activePoint = document.createElement('div');
        activePoint.classList.add('active-point');

        categoryObj.appendChild(activePoint);

        subject = `subject:${categoryObj.textContent}`;
        startIndex = 0;
        cleanPastCategory();
        drawBookCard();
        books = [];
        localStorage.clear();
        totalCountBooks();
    });
});

async function apiRequests() {
    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q="${subject ? subject :'subject:Architecture'}"&key=AIzaSyCkmsYtqK_Z-5kvEdmYoDq372osdOunrLA&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

export async function drawBookCard() {
    const data: BookVolume = await apiRequests();
    const dataItems = data.items;
    let out: string = '';

    dataItems.forEach(function (item: BookItem) {
        out += `<div class="book-card__universal" data-index="${item.id}">
        <img class="book-card__main-photo" 
        src="${
            item.volumeInfo?.imageLinks?.thumbnail
                ? item.volumeInfo.imageLinks.thumbnail
                : '/src/images/universal-cover.png'
        }" alt="book-cover">
        <div class="book-card-info">
        <p class="book-card-info__author">
        ${item.volumeInfo?.authors ? authorsProcessing(item.volumeInfo?.authors) : 'No authors available'}
        </p>
        <h3 class="book-card-info__book-name">${item.volumeInfo?.title
            ? descriptionProcessing(item.volumeInfo.title)
            : 'No title'}</h3>
        <div class="book-card-info__rating"> 
        ${
            item.volumeInfo?.averageRating
                ? ratingProcessing(item.volumeInfo.averageRating)
                : '<span class="no-rating">No rating</span>'
        }
        <span class="reviews">${item.volumeInfo?.ratingsCount ? item.volumeInfo.ratingsCount : 14} review</span></div>
        <p class="book-card-info__description">${
            item.volumeInfo?.description
                ? descriptionProcessing(item.volumeInfo.description)
                : 'No description available'
        }</p>
        <span class="book-card-info__price">${
            typeof item.saleInfo?.retailPrice === 'number' ? item.saleInfo.retailPrice : '12.35$'
        }</span>
        <button class="book-card-info__button" data-index="${item.id}">buy now</button>
        </div>
    </div>`;
    });

    bookCard.insertAdjacentHTML('beforeend', out);
    startIndex += 7;
}

document.addEventListener('click', (event) => {
    const btnObj: HTMLElement = event.target as HTMLElement;

    if (btnObj.classList.contains('book-card-info__button')) {

        if (btnObj.textContent === 'In the Cart') {
            btnObj.innerText = 'buy now';
            deleteBookFromBasket(btnObj);
            totalCountBooks();
        }else {
            btnObj.innerText = 'In the Cart';
            addBookInBasket(btnObj);
            totalCountBooks();
        }
    }
})
