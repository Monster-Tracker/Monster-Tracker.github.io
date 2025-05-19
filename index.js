import { notation, calculate } from "./main.js";
import drinks from "./drinks.js";
import times from "./times.js";

const decpoints = {
    totalCansDrunk: 0,
    totalMoneySpent: 2,
    litersDrunk: 1,
}

function typewriter(element) {
    const text = element.innerHTML;
    element.innerHTML = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }

    type();
}

function observeTypewriter(selector) {
    const elements = document.querySelectorAll(selector);

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typewriter(entry.target);
                observer.unobserve(entry.target); // Stop observing after the first trigger
            }
        });
    });

    elements.forEach(element => observer.observe(element));
}

function countUp(element, number, decpoint) {
    element.innerHTML = '0';
    let index = 0;

    function type() {
        if (index < number) {
            index += number / 20;
            if (index >= number) {
                index = number; // Ensure it ends exactly at the target
            }
            element.innerHTML = notation(index, decpoint);
            if (index < number) {
                setTimeout(type, 50);
            }
        }
    }

    type();
}

function observeCountUp(selector) {
    const elements = document.querySelectorAll(selector);

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target, calculate(entry.target.id), decpoints[entry.target.id]);
                observer.unobserve(entry.target); // Stop observing after the first trigger
            }
        });
    });

    elements.forEach(element => observer.observe(element));
}

function getFlavorCounts() {
    const counts = {};
    for (const drink in drinks) {
        counts[drink] = 0;
    }
    for (const entry of times) {
        for (const flavor in entry.drinks) {
            if (counts.hasOwnProperty(flavor)) {
                counts[flavor] += entry.drinks[flavor];
            }
        }
    }
    return counts;
}

function renderFlavorChart() {
    const counts = getFlavorCounts();
    // Filter out flavors with 0 count
    const filtered = Object.entries(counts).filter(([key, value]) => value > 0);
    const labels = filtered.map(([key]) => drinks[key].name);
    const data = filtered.map(([, value]) => value);

    const ctx = document.getElementById('flavorChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cans Drunk',
                data: data,
                backgroundColor: 'rgba(145, 145, 145, 0.7)',
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    observeTypewriter('.typewriter');
    observeCountUp('.countup');
    renderFlavorChart(); // <-- Add this line
});