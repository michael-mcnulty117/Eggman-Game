let eggCount = 0;
let purchasedEggs = 0;
let displayCount = 0;
const eggPerson = document.getElementById('egg-person');
const eggBasket = document.getElementById('egg-basket');
const dragEgg = document.getElementById('drag-egg');
const eggCounter = document.getElementById('egg-counter');
const outOfEggsSound = document.getElementById('out-of-eggs-sound');
const winnerSound = document.getElementById('winner-sound');

let isDragging = false;

eggBasket.addEventListener('mousedown', startDraggingEgg);
document.addEventListener('mousemove', moveEgg);
document.addEventListener('mouseup', dropEgg);

function startDraggingEgg(event) { 
    if (purchasedEggs > 0 && purchasedEggs <= 39) {
        // Already in winning phase, no more dragging allowed until logic completes
        return;
    }
    isDragging = true;
    dragEgg.style.display = 'block';
    dragEgg.style.left = `${event.pageX - 25}px`;
    dragEgg.style.top = `${event.pageY - 25}px`;
    event.preventDefault();
}

function moveEgg(event) {
    if (isDragging) {
        dragEgg.style.left = `${event.pageX - 25}px`;
        dragEgg.style.top = `${event.pageY - 25}px`;
    }
}

function dropEgg(event) {
    if (!isDragging) return;

    isDragging = false;
    const rect = eggPerson.getBoundingClientRect();
    const x = event.pageX;
    const y = event.pageY;

    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        eggCount++;
        
        if (eggCount <= 10) {
            // First 5-10 eggs: normal behavior with popup every 5 eggs
            if (eggCount % 5 === 0) {
                alert(`Eggs fed: ${eggCount}`);
            }
        } else if (eggCount <= 15) {
            // Next phase: allow up to 15 eggs with no popups
            // Do nothing until 15
        } else if (eggCount === 16) {
            // After 15 eggs, lie and say 2 eggs fed
            alert("Eggs fed: 2");
        } else if (eggCount === 17 && purchasedEggs === 0) {
            // Next egg triggers out-of-eggs prompt
            outOfEggsSound.play();
            let response = prompt("Dude, you ran out of eggs. Would you like to buy an 80 pack of eggs?");
            if (response && response.toLowerCase() === "yes") {
                purchasedEggs = 80;
                eggCounter.style.display = 'block';
                eggCounter.textContent = `EGGS: ${purchasedEggs}`;
            }
        } else if (purchasedEggs > 0) {
            // After purchase, handle the next egg
            purchasedEggs--;
            eggCounter.textContent = `EGGS: ${purchasedEggs}`;
            if (purchasedEggs === 79) {
                // First egg after purchase drops to 40
                purchasedEggs = 40;
                eggCounter.textContent = `EGGS: ${purchasedEggs}`;
                alert("40 eggs");
            } else if (purchasedEggs === 39) {
                // Next egg triggers win condition
                alert("41 EGGS");
                winnerSound.play();
                alert("Congrats big boy");
            }
        }
    }

    dragEgg.style.display = 'none';
}
