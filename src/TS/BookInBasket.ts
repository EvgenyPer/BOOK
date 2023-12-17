import { books} from './apiRequests';

export function addBookInBasket(btnObj: HTMLElement) {
    const bookCard = btnObj.parentNode.parentNode;

    btnObj.classList.add('active-button');

    const dataIndex = btnObj.getAttribute('data-index');

    const bookAuthors = bookCard.querySelector('.book-card-info__author');
    const bookTitle = bookCard.querySelector('.book-card-info__book-name');
    const bookAverRating = bookCard.querySelectorAll('.star');
    const bookRatingCount = bookCard.querySelector('.reviews');
    const bookDescription = bookCard.querySelector('.book-card-info__description');
    const bookImageLinks = bookCard.querySelector('.book-card__main-photo');

    let book = {
        dataIndex: dataIndex,
        authors: bookAuthors.textContent,
        title: bookTitle.textContent,
        averageRating: bookAverRating,
        ratingsCount: bookRatingCount,
        description: bookDescription.textContent,
        imageLinks: bookImageLinks
    } 

    books.push(book);
    saveBooks();
    console.log(localStorage)
}

export function deleteBookFromBasket(btnObj: HTMLElement) {
    const dataIndex = btnObj.getAttribute('data-index');
    const indexToDelete = books.findIndex(book => book.dataIndex === dataIndex); 

    // Удаление книги из массива
    if (indexToDelete > -1) {
        books.splice(indexToDelete, 1);
        saveBooks();
    }

    // Удаление класса 'active-button'
    btnObj.classList.remove('active-button');
    console.log(localStorage)
}

export function totalCountBooks() {
    const containerCount: HTMLElement = document.querySelector('.container-basket')!;
    let totalCount: HTMLElement | null = containerCount.querySelector('.active-basket');
    let booksCount = books.length;

    if (booksCount >= 1) {
        if (!totalCount) {
            totalCount = document.createElement('span');
            totalCount.classList.add('active-basket');
            containerCount.appendChild(totalCount);
        }
        totalCount.textContent = booksCount.toString();
    } else if (totalCount) {
        totalCount.remove();
    }
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}



