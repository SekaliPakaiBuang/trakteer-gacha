// Initialize Elements
const infoText = document.querySelector("#info");
const rouletteElements = document.querySelectorAll(".result");
const spinButton = document.querySelector("#spin");

const inputChannelID = document.querySelector("input[name=channel_id]");
const inputUnitAmount = document.querySelector("input[name=unit_amount]");
const inputUnitName = document.querySelector("input[name=unit_name]");
const inputMode = document.querySelector("select[name=mode]");
const inputAutospin = document.querySelector("input[name=autospin]");

const inputList = document.querySelector("textarea[name=list]");
const selectedElement = document.querySelector(".result:nth-child(3)");

// Initialize Local Storage
if (!localStorage.unitAmount) {
    localStorage.unitAmount = inputUnitAmount.valueAsNumber;
    inputUnitAmount.valueAsNumber = 10;
} else {
    inputUnitAmount.valueAsNumber = localStorage.unitAmount;
}

if (!localStorage.unitName) {
    localStorage.unitName = "Memory Chips";
    inputUnitName.value = localStorage.unitName;
} else {
    inputUnitName.value = localStorage.unitName;
}

if (!localStorage.mode) {
    localStorage.mode = "normal";
    inputMode.value = localStorage.mode;
} else {
    inputMode.value = localStorage.mode;
}

if (!localStorage.itemList) {
    localStorage.itemList = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10"];
    inputList.value = localStorage.itemList.split(",").join("\n");
} else {
    inputList.value = localStorage.itemList.split(",").join("\n");
}

if (!localStorage.channelID) {
    localStorage.channelID = "";
    inputChannelID.value = localStorage.channelID;
} else {
    inputChannelID.value = localStorage.channelID;
    TrakteerWS.register(localStorage.channelID);
}

if (!localStorage.spinsRemaining) {
    localStorage.spinsRemaining = 0;
    spinButton.textContent = `${localStorage.spinsRemaining} Spins Left`;
} else {
    spinButton.textContent = `${localStorage.spinsRemaining} Spins Left`;
}

if (!localStorage.autospin) {
    localStorage.autospin = false;
    inputAutospin.checked = false;
} else {
    inputAutospin.checked = localStorage.autospin == "true";
}

TrakteerWS.onNewTipSuccess = ({ quantity }) => {
    switch (localStorage.mode) {
        case "normal":
            localStorage.spinsRemaining = Number(localStorage.spinsRemaining) + (quantity >= Number(localStorage.unitAmount) ? 1 : 0);
            break;
        case "stack":
            localStorage.spinsRemaining = Number(localStorage.spinsRemaining) + Math.floor(quantity / Number(localStorage.unitAmount));
            break;
        case "accumulative":
            accumulativeAmount += Number(quantity);
            if (accumulativeAmount >= Number(localStorage.unitAmount)) {
                localStorage.spinsRemaining = Number(localStorage.spinsRemaining) + Math.floor(accumulativeAmount / Number(localStorage.unitAmount));
                accumulativeAmount = accumulativeAmount % Number(localStorage.unitAmount);
            }

            break;
    }

    displayElements();
    if (localStorage.autospin) spin();
};

// TrakteerWS.onStreamTest = ({ quantity }) => {
//     switch (localStorage.mode) {
//         case "normal":
//             localStorage.spinsRemaining = Number(localStorage.spinsRemaining) + (quantity >= Number(localStorage.unitAmount) ? 1 : 0);
//             break;
//         case "stack":
//             localStorage.spinsRemaining = Number(localStorage.spinsRemaining) + Math.floor(quantity / Number(localStorage.unitAmount));
//             break;
//         case "accumulative":
//             accumulativeAmount += Number(quantity);
//             if (accumulativeAmount >= Number(localStorage.unitAmount)) {
//                 localStorage.spinsRemaining = Number(localStorage.spinsRemaining) + Math.floor(accumulativeAmount / Number(localStorage.unitAmount));
//                 accumulativeAmount = accumulativeAmount % Number(localStorage.unitAmount);
//             }

//             break;
//     }

//     displayElements();
//     if (localStorage.autospin) spin();
// };

// Initialize Variables
let pickedIndex = 0;
let accumulativeAmount = 0;
let spinning = false;

let tick = new Audio("tick.ogg");
let result = new Audio("result.ogg");

// Utility Functions
let wrapAround = (n, limit) => ((n % limit) + limit) % limit;

function randomize() {
    if (spinning) return;

    pickedIndex = 0;
    save();

    let list = inputList.value.split("\n");
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    inputList.value = list.join("\n");

    save();
}

function save() {
    if (spinning) return;

    localStorage.unitAmount = inputUnitAmount.valueAsNumber;
    localStorage.unitName = inputUnitName.value;
    localStorage.mode = inputMode.value;
    localStorage.autospin = inputAutospin.checked;

    let list = inputList.value.split("\n");
    localStorage.itemList = list;

    if (localStorage.mode == "accumulative") {
        accumulativeAmount = 0;
    }

    if (localStorage.channelID != inputChannelID.value) {
        localStorage.channelID = inputChannelID.value;
        location.reload();
    }

    displayElements();
}

function displayElements() {
    spinButton.textContent = `${localStorage.spinsRemaining} Spins Left`;

    if (localStorage.mode == "accumulative") {
        infoText.textContent = `${localStorage.unitAmount} ${localStorage.unitName} = 1 Spin (${Number(localStorage.unitAmount) - accumulativeAmount} left)`;
    } else {
        infoText.textContent = `${localStorage.unitAmount} ${localStorage.unitName} = 1 Spin`;
    }

    const itemList = localStorage.itemList.split(",");

    for (let i = 0; i < rouletteElements.length; i++) {
        rouletteElements[i].textContent = itemList[
            wrapAround(pickedIndex + i - 2, itemList.length)
        ];
    }
}

function spin() {
    if (spinning || localStorage.spinsRemaining < 1) return;

    localStorage.spinsRemaining -= 1;
    spinning = true;

    let iterationDelay = 50;
    const itemList = localStorage.itemList.split(",");

    function spinIteration(i) {
        if (i >= Math.random() * 100 + 100) {
            selectedElement.classList.add("result--selected");
            setTimeout(() => {
                selectedElement.classList.remove("result--selected");
                spinning = false;
            }, 4000 / 3);
            result.play();
            return;
        }

        tick.pause();
        tick.currentTime = 0;
        tick.play();
        pickedIndex = wrapAround(pickedIndex + 1, itemList.length);
        displayElements();

        setTimeout(() => spinIteration(i + 1), iterationDelay);
        iterationDelay += Math.random() * i * 0.05;
    }

    spinIteration(0);
}

// Main
if (localStorage.itemList) {
    displayElements();
}