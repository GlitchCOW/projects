console.clear();

const cardsContaier = document.querySelector(".cards");
const cardsContaierInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".cards"));
const overLay = document.querySelector(".overlay");

const appLyOverMask = (e) => {
    const overLayE1 = e.currentTarget;
    const x = e.pageX - cardsContaier.offsetLeft;
    const y = e.pageY - cardsContaier.offsetTop;
    overLayE1.style = `--opacity: 1; --x: ${x}px; --y: ${y}px;`;
};
const createOverlayCta = (overlayCard, ctaE1) =>{
    const overLayCta = document.createElement("div");
    overLayCta.classList.add("cta");
    overLayCta.textContent = ctaE1.textContent;
    overLayCta.setAttribute("aria-hidden", true);
    overlayCard.append(overLayCta);
};
const observer = new ResizeObserver((entries) =>{
    entries.forEach((entry) => {
        const cardIndex = cards.indexOf(entry.target);
        let width = entry.borderBoxSize[0].inlineSize;
        let height = entry.borderBoxSize[0].blockSize;

        if(cardIndex >=0){
            overLay.children[cardIndex].style.width = `${width}px`;
            overLay.children[cardIndex].style.height = `${height}px`;
        }
    });
});

const initOverlayCard = (cardE1) =>{
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    createOverlayCta(overlayCard, cardE1.lastElementChild);
    overLay.append(overlayCard);
    observer.observe(cardE1);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", appLyOverMask);