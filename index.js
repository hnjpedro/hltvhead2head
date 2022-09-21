const majorButton = document.getElementById('stats-major');
const popup = document.querySelector('.popup');
const mainPopup = document.querySelector('.main-popup')
const body = document.body

majorButton.addEventListener("click", () => {
    popup.style.display = 'flex';
    mainPopup.style.cssText = 'animation:slide-in .5s; animation-fill-mode: forwards';
    body.style.overflow = 'hidden';
    window.scroll(0,0)
})

popup.addEventListener('click', event => {
    const classNameOfClickedElement = event.target.classList[0];
    const classNames = ['close-btn', 'popup-overlay']
    const shouldClosePopUp = classNames.some(className => className === classNameOfClickedElement)

    if (shouldClosePopUp) {
        mainPopup.style.cssText = 'animation:slide-out .5s; animation-fill-mode: forwards';
        setTimeout(() => {
            popup.style.display = 'none'
        },500)
    }
    body.style.overflow = 'auto';
})