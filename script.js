function handleFormSubmit(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const releaseYear = document.querySelector('#releaseYear').value;
    const isWatched = document.querySelector('#isWatched').checked;


    const film = {
        title,
        genre,
        releaseYear,
        isWatched,
        id:Date.now()
    }


    addFilmToLocaleStorage(film)
}


function addFilmToLocaleStorage(film) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    films.push(film)
    localStorage.setItem('films', JSON.stringify(films));
    
    renderTable();
}

function renderTable() {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmTableBody = document.querySelector('#film-tbody');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    deleteButton.textContent = 'Удалить';

    filmTableBody.innerHTML = "";

    films.forEach((film) => {
        const arrayUserInput = Object.values(film);
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td class="buttons-action">
            <button class="edit-film">Редактировать</button>
            <button class="remove-film" data-id="${film.id}">Удалить</button>
            </td>
        `;

        filmTableBody.appendChild(row);
        console.log(film.id);
    });

    document.querySelectorAll('.remove-film').forEach(button => {
        button.addEventListener('click', (e) => {
            const filmId = parseInt(e.target.getAttribute('data-id'));
            removeFilmFromLocaleStorage(filmId);
        });
    });

}

function removeFilmFromLocaleStorage(filmId) {
    let films = JSON.parse(localStorage.getItem('films')) || [];
    films = films.filter(film => film.id !== filmId);
    localStorage.setItem('films', JSON.stringify(films));

    renderTable();
}

document.querySelector('#film-form').addEventListener("submit", handleFormSubmit);
renderTable();

const sortButton =  document.querySelector('.sort-button');

sortButton.addEventListener('click', () => {
    const films = JSON.parse(localStorage.getItem('films'));
    const selectForm = document.querySelector('#selectSort');
    const sortBy = selectForm.value;

    if (sortBy === 'year') {
        films.sort((a, b) => a.releaseYear - b.releaseYear);
        localStorage.setItem('films', JSON.stringify(films));
        renderTable();

    } else if (sortBy === 'name') {
        films.sort((a, b) => a.title.localeCompare(b.title));
        localStorage.setItem('films', JSON.stringify(films));
        renderTable();

    } else if (sortBy === 'genre') {
        films.sort((a, b) => a.genre.localeCompare(b.genre));
        localStorage.setItem('films', JSON.stringify(films));
        renderTable();

    } else if (sortBy === 'watched') {
        films.sort((a, b) => b.isWatched - a.isWatched);
        localStorage.setItem('films', JSON.stringify(films));
        renderTable();
    }
});