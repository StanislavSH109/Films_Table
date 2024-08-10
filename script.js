const buttonSubmit = document.querySelector('#film-form');

buttonSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault()
    
    let films = { 
        title,
        genre,
        releaseYear,
    }

    const titleElement = document.querySelector('#title').value;
    const genreElement = document.querySelector('#genre').value;
    const yearElement = document.querySelector('#releaseYear').value;

    films.title = titleElement;
    films.genre = genreElement;
    films.releaseYear = yearElement;
    console.log(films);
});



// function handleFormSubmit(e) {
//     e.preventDefault();
//     const title = document.querySelector('#title').value;
//     const genre = document.querySelector('#genre').value;
//     const releaseYear = document.querySelector('#releaseYear').value;
//     const isWatched = document.querySelector('#isWatched').checked;


//     const film = {
//         title,
//         genre,
//         releaseYear,
//         isWatched
//     }


//     addFilmToLocaleStorage(film)
// }


// function addFilmToLocaleStorage(film) {
//     const films = JSON.parse(localStorage.getItem('films')) || [];
//     films.push(film)
//     localStorage.setItem('films', JSON.stringify(films));

//     renderTable();
// }

// function renderTable() {
//     const films = JSON.parse(localStorage.getItem('films')) || [];
//     const filmTableBody = document.querySelector('#film-tbody');
//     filmTableBody.innerHTML = "";

//     films.forEach((film) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `

//             <td>${film.title}</td>
//             <td>${film.genre}</td>
//             <td>${film.releaseYear}</td>
//             <td>${film.isWatched ? "Да" : "Нет"}</td>
//         `;

//         filmTableBody.appendChild(row);
//     });
// }

// document.querySelector('#film-form').addEventListener("submit", handleFormSubmit);


// renderTable();