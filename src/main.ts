import "./scss/main.scss"
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

interface Game {
  name: string;
  image: string;
  alt: string;
  genre: string;
  developer: string;
  coop: boolean;
}

let games: Game[] = [];

fetch('src/json/games.json')  
  .then(res => res.json())
  .then((data: Game[]) => {
    games = data;
    displayGames(games);
  });


const genreSelect = document.getElementById('genreSelect') as HTMLSelectElement;
const devSelect = document.getElementById('devSelect') as HTMLSelectElement;
const coopCheckbox = document.getElementById('coopCheckbox') as HTMLInputElement;
const notCoopCheckbox = document.getElementById('notCoopCheckbox') as HTMLInputElement;
const searchInput = document.getElementById('serch-input') as HTMLInputElement;
const gameContainer = document.querySelector('.games') as HTMLElement;
const toggleBtn = document.getElementById('toggleFiltersBtn') as HTMLButtonElement;
const filterContainer = document.getElementById('filterContainer') as HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleFiltersBtn') as HTMLButtonElement;
  const filterContainer = document.getElementById('filterContainer') as HTMLElement;

  toggleBtn.addEventListener('click', () => {
    if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
      filterContainer.style.display = 'flex'; // show filters
    } else {
      filterContainer.style.display = 'none'; // hide filters
    }
  });
});

[
  genreSelect,
  devSelect,
  coopCheckbox,
  notCoopCheckbox,
  searchInput,
].forEach(el => {
  el.addEventListener('change', filterGames);
  if (el.tagName === 'INPUT') {
    el.addEventListener('input', filterGames);
  }
});

function filterGames() {
  const genre = genreSelect.value;
  const dev = devSelect.value;
  const coop = coopCheckbox.checked;
  const notCoop = notCoopCheckbox.checked;
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = games.filter(game => {
    if (genre && game.genre !== genre) return false;
    if (dev && game.developer !== dev) return false;
    if (coop && !game.coop) return false;
    if (notCoop && game.coop) return false;
    if (searchTerm && !game.name.toLowerCase().includes(searchTerm)) return false;
    return true;
  });

  displayGames(filtered);
}

function displayGames(gamesArr: Game[]) {
  gameContainer.innerHTML = '';
  if (gamesArr.length === 0) {
    gameContainer.innerHTML = '<p>No matching games found.</p>';
    return;
  }
  gamesArr.forEach(game => {
    const img = document.createElement('img');
    img.src = game.image;
    img.alt = game.alt;
    gameContainer.appendChild(img);
  });
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
