import drinks from "./drinks.js";
import times from "./times.js";

function getVar() {

}

function calculate(what) {
    if (what === "totalCansDrunk") {
        let total = 0;
        for (let i in times) {
            for (let j in times[i].drinks) {
                total += times[i].drinks[j];
            }
        }
        return total;
    }

    if (what === "totalMoneySpent") {
        let total = 0;
        for (let i in times) {
            for (let j in times[i].drinks) {
                total += times[i].drinks[j] * drinks[j].price;
            }
        }
        return total;
    }

    if (what === "litersDrunk") {
        let total = 0;
        for (let i in times) {
            for (let j in times[i].drinks) {
                total += times[i].drinks[j] * 0.5; // Not assuming, each can is 0.5L
            }
        }
        return total;
    }
}

function notation(number, decpoint) {
    if (!decpoint) decpoint = 0;
    number = number.toFixed(decpoint);
    if (number < 1000) {
        return number;
    }
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { calculate, notation };