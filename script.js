function handleFormSubmit(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const releaseYear = document.querySelector('#releaseYear').value;
    const isWatched = document.querySelector('#isWatched').checked;
    const filmId = document.querySelector('#filmId').value;

    const films = JSON.parse(localStorage.getItem('films')) || [];

    if (filmId) {
        // Редактирование существующего фильма
        const filmIndex = films.findIndex(f => f.id === parseInt(filmId));
        films[filmIndex] = {
            title,
            genre,
            releaseYear,
            isWatched,
            id: parseInt(filmId)
        };
    } else {
        // Добавление нового фильма
        const film = {
            title,
            genre,
            releaseYear,
            isWatched,
            id: Date.now()
        };
        films.push(film);
    }

    localStorage.setItem('films', JSON.stringify(films));
    renderTable();
    clearForm();
}

function renderTable() {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmTableBody = document.querySelector('#film-tbody');

    filmTableBody.innerHTML = "";

    films.forEach((film) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td class="buttons-action">
                <button class="edit-film" data-id="${film.id}">Редактировать</button>
                <button class="remove-film" data-id="${film.id}">Удалить</button>
            </td>
        `;
        filmTableBody.appendChild(row);
    });

    // Добавляем обработчики событий для кнопок "Редактировать" и "Удалить"
    document.querySelectorAll('.edit-film').forEach(button => {
        button.addEventListener('click', (e) => {
            const filmId = parseInt(e.target.getAttribute('data-id'));
            fillFormForEdit(filmId);
        });
    });

    document.querySelectorAll('.remove-film').forEach(button => {
        button.addEventListener('click', (e) => {
            const filmId = parseInt(e.target.getAttribute('data-id'));
            removeFilmFromLocalStorage(filmId);
        });
    });
}

function fillFormForEdit(filmId) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(f => f.id === filmId);

    if (film) {
        document.querySelector('#title').value = film.title;
        document.querySelector('#genre').value = film.genre;
        document.querySelector('#releaseYear').value = film.releaseYear;
        document.querySelector('#isWatched').checked = film.isWatched;
        document.querySelector('#filmId').value = film.id; // Скрытое поле для хранения ID фильма

        // Меняем текст кнопки на "Обновить"
        document.querySelector('#btn-add').textContent = 'Обновить';

    }
}

function removeFilmFromLocalStorage(filmId) {
    let films = JSON.parse(localStorage.getItem('films')) || [];
    films = films.filter(film => film.id !== filmId);
    localStorage.setItem('films', JSON.stringify(films));

    renderTable();
}

function clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#genre').value = '';
    document.querySelector('#releaseYear').value = '';
    document.querySelector('#isWatched').checked = false;
    document.querySelector('#filmId').value = '';

    // Меняем текст кнопки обратно на "Добавить фильм"
    document.querySelector('#btn-add').textContent = 'Добавить фильм';
}

document.querySelector('#film-form').addEventListener("submit", handleFormSubmit);
renderTable();

const sortButton = document.querySelector('.sort-button');

sortButton.addEventListener('click', () => {
    const films = JSON.parse(localStorage.getItem('films'));
    const selectForm = document.querySelector('#selectSort');
    const sortBy = selectForm.value;

    if (sortBy === 'year') {
        films.sort((a, b) => a.releaseYear - b.releaseYear);
    } else if (sortBy === 'name') {
        films.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'genre') {
        films.sort((a, b) => a.genre.localeCompare(b.genre));
    } else if (sortBy === 'watched') {
        films.sort((a, b) => b.isWatched - a.isWatched);
    }

    localStorage.setItem('films', JSON.stringify(films));
    renderTable();
});
