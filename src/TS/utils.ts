export function descriptionProcessing(description:string) {
    let outDescription:string = '';

    if (description.length > 85) {
        outDescription += description.slice(0, 86)
    }
    if (description.length < 85) {
        return description
    }

    return `${outDescription}...`;
}

export function authorsProcessing(authors: [string]) {
    let totalAuthors:string = `${authors[0]}`;

    if (authors.length > 1) {
        authors.forEach((author) => {
            totalAuthors += `, ${author}`
        })
        return descriptionProcessing(totalAuthors);
    } else {
        return authors[0];
    }
}

export function ratingProcessing(ratingCount:number) {
    const starColor: string = '<img class="star" src="/src/images/Star-color.svg" alt="star-color">';
    const star: string = '<img class="star" src="/src/images/Star.svg" alt="star">';

    let finalStars: string = '';

    for (let i: number = 0; i < 5; i++) {
        if (i < ratingCount) {
            finalStars += starColor;
        } else {
            finalStars += star;
        }
    }
    return finalStars;
}

export function cleanPastCategory() {
    const booksPastCategory: NodeListOf<Element> = document.querySelectorAll('.book-card__universal');

    booksPastCategory.forEach((book) => {
        book.remove()
    })
}

export function clearActiveCategory() {
    document.querySelector('.list__item.list__item-active').classList.remove('list__item-active');
    document.querySelector('.active-point').remove();
}