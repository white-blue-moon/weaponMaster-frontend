import { writable } from 'svelte/store';

export const publisherLogo = writable(
    JSON.parse(localStorage.getItem("publisherLogo")) || null
);

publisherLogo.subscribe((value) => {
    localStorage.setItem("publisherLogo", JSON.stringify(value));
});