const dots:NodeListOf<Element> = document.querySelectorAll('.slider-dots')!;
const dot01: HTMLElement = document.querySelector('.slider-dots__dot-1')!;
const dot02: HTMLElement = document.querySelector('.slider-dots__dot-2')!;
const dot03: HTMLElement = document.querySelector('.slider-dots__dot-3')!;
const banner = document.getElementById('banner') as HTMLImageElement;

const bannerSrcOne:string = '/src/images/banner-01.png';
const bannerSrcTwo:string = '/src/images/banner-02.svg';
const bannerSrcThree:string = '/src/images/banner-03.svg';

let activeSlideIndex:number = 1;

dots.forEach((dot) => {

    dot.addEventListener('click', (event) => {
        const dotObj:HTMLElement = event.target as HTMLElement;

        if (dotObj.classList.contains('slider-dots__dot-1')) {
            banner.src = bannerSrcOne;
            clearActiveEllipse();
            activeSlideIndex = 1;
            dotObj.classList.add('active-dot');
        }
        if (dotObj.classList.contains('slider-dots__dot-2')) {
            banner.src = bannerSrcTwo
            clearActiveEllipse();
            activeSlideIndex = 2;
            dotObj.classList.add('active-dot');
        }
        if (dotObj.classList.contains('slider-dots__dot-3')) {
            banner.src = bannerSrcThree
            clearActiveEllipse();
            activeSlideIndex = 3;
            dotObj.classList.add('active-dot');
        }
    });
});

function autoSwitchSlide() {

    if (activeSlideIndex === 1) {
        banner.src = bannerSrcTwo;
        clearActiveEllipse();
        dot02.classList.add('active-dot');
        activeSlideIndex = 2;
    }
    else if (activeSlideIndex === 2) {
        banner.src = bannerSrcThree;
        clearActiveEllipse();
        dot03.classList.add('active-dot');
        activeSlideIndex = 3;
    }
    else if (activeSlideIndex === 3) {
        banner.src = bannerSrcOne;
        clearActiveEllipse();
        dot01.classList.add('active-dot');
        activeSlideIndex = 1;
    }
}

setInterval(autoSwitchSlide, 5000);

function clearActiveEllipse() {
    dot01.classList.remove('active-dot');
    dot02.classList.remove('active-dot');
    dot03.classList.remove('active-dot');
};


