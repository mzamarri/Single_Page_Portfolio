// This code is for the project section of the portfolio page

// arrow buttons to shift cards
const arrowBtn = document.querySelectorAll('.wrapper > button');
const arrowBtnArray = [...arrowBtn];
const carousel = document.querySelector('.projects-content');
const cards = document.querySelectorAll('.card');

// Page number for pagination and max page number
let pageNum = 1, maxPageNum;

// The following if statement checks if the number of cards is divisible by 3
if (cards.length % 3 !== 0) {
    const remainingCards = 3 - (cards.length % 3);
    console.log("Number of remaining cards: " + remainingCards);
    maxPageNum = (cards.length + remainingCards) / 3;
    console.log("Max Page Number: " + maxPageNum);
    // The following for loop creates the remaining cards to fill the carousel
    for (let i = 1; i <= remainingCards; i++) {
        let card = document.createElement('li');
        card.style.visibility = "hidden";
        card.className = "card";
        card.textContent = `Card ${cards.length + i}`;
        carousel.appendChild(card);
    }
}

// Utility function for scrolling page in slider
function scrollPage() {
    carousel.scrollLeft = cards[(pageNum-1)*3].offsetLeft;
}

arrowBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.id === "left" && pageNum > 1) {
            pageNum--;
            scrollPage();
        } else if (btn.id ==="right" && pageNum < maxPageNum) {
            pageNum++;
            scrollPage();
        }
        console.log("Button Clicked");
        console.log("Page Number: " + pageNum);
    });
});

// The following code is for the drag functionality
let isDragging = false, startX, finalX, startScrollLeft;

function startDrag(e) {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
    if (!isDragging) return; // if not dragging, do nothing
    finalX = (e.pageX - startX) * 0.7;
    carousel.scrollLeft = startScrollLeft - finalX;
}

function stopDrag(e) {
    // console.log(e.target);
    // if (arrowBtnArray.includes(e.target)) {
    //     console.log("Arrow Button Clicked");
    //     return; // if arrow button is clicked, do nothing
    // }

    isDragging = false;
    carousel.classList.remove('dragging');
    // variable for slider indicating switch point, which is half the width of a card
    let sliderSwitchX = cards[0].offsetWidth / 2;
    console.log("Slider Switch X: " + sliderSwitchX);
    // Log the final position of the mouse from the start of the drag
    console.log("Final X: " + finalX);
    // Change page if carousel is dragged more than half of a card's width

    // first if statement checks if the carousel is dragged more than half of a card's width, if so then go forward a page
    if (-sliderSwitchX > finalX && pageNum < maxPageNum) {
        pageNum++;
        console.log("Shift right")
        console.log("Page Number: " + pageNum);
        scrollPage();
    }
    // second if statement checks if the carousel is dragged less than half of a card's width, if so then go back a page
    else if (sliderSwitchX < finalX && pageNum > 1) {
        pageNum--;
        console.log("Shift left")
        console.log("Page Number: " + pageNum);
        scrollPage();
    } 
    // else statement resets the carousel to the original position if the carousel is dragged less than half of a card's width
    else {
        console.log("Reset")
        console.log("Page Number: " + pageNum)
        scrollPage();
    }
    // Reset finalX to 0
    finalX = 0;
}

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', stopDrag);