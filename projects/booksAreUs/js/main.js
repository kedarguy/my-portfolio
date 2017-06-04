'use strict';

var gBooks = [
    {
        id: 1,
        title: 'Learning Laravel',
        price: 18.9,
        rating: 0,
        numOfRatings: 0
    },
    {
        id: 2,
        title: 'Adavnced Laravel',
        price: 28.9,
        rating: 0,
        numOfRatings: 0
    }
];
var gCurrBookIdShowing;

function init() {
    renderAllBooks();

}

function renderBook(i_book) {
    var elTable = document.querySelector('table');
    var strHtml = `<tr class="bookId-${i_book.id}">
                            <td>${i_book.id}</td>
                            <td>${i_book.title}</td>
                            <td class="priceId-${i_book.id}">${i_book.price}</td>
                            <td>
                                <div>
                                    <button class="btn btn-primary" onclick="read(${i_book.id})">Read</button>
                                    <button class="btn btn-warning" onclick="readAndUpdateBook(${i_book.id})">Update</button>
                                   <button class="btn btn-danger"   onclick="deleteBook(${i_book.id})">Delete</button>
                                </div>   
                            </td>
                        </tr>`;

    elTable.innerHTML += strHtml;
}

function renderAllBooks() {
    gBooks.forEach(function (book) {
        renderBook(book);
    });
}

function openNewBookForm() {
    var elFormDiv = document.querySelector('.save-new-book-form');
    elFormDiv.classList.toggle('open-form');
}

function saveNewBook() {

    var elNewId = document.querySelector('#bookId');
    var newId = parseInt(elNewId.value);

    var isIdExist = gBooks.some(function (book) {
        return newId === book.id
    });
    if (isIdExist) {
        alert('Book Id Already exists, Please enter different book Id');
        return
    }

    var elNewTitle = document.querySelector('#bookTitle');
    var newTitle = elNewTitle.value;

    var elNewPrice = document.querySelector('#bookPrice');
    var newPrice = parseFloat(elNewPrice.value);

    var newBook = {
        id: newId,
        title: newTitle,
        price: newPrice,
        rating: 0,
        numOfRatings: 0
    };

    gBooks.push(newBook);
    renderBook(newBook);
}

function deleteBook(i_bookId) {
    var bookToDeleteIdx = gBooks.findIndex(function (book) {
        return book.id === i_bookId
    });
    gBooks.splice(bookToDeleteIdx, 1);
    var selector = '.bookId-' + i_bookId;
    var elBookRow = document.querySelector(selector);
    elBookRow.innerHTML = '';
}

function readAndUpdateBook(i_bookId) {
    var newPrice = prompt('Please enter new price');
    updateBook(i_bookId, newPrice);
}

function updateBook(i_bookId, i_newPrice) {
    var bookToChange = gBooks.find(function (book) {
        return book.id === i_bookId;
    });

    bookToChange.price = i_newPrice;

    renderUpdateBook(i_bookId, i_newPrice);
}

function renderUpdateBook(i_bookId, i_newPrice) {
    var selector = '.priceId-' + i_bookId;
    var elPriceCell = document.querySelector(selector);
    elPriceCell.innerHTML = i_newPrice;

}

function read(i_bookId) {
    var currBookIdx;
    var currBook = gBooks.find(function (book, idx) {
        if (book.id === i_bookId) {
            currBookIdx = idx;
            return book
        }
    });
    var elbookDetails = document.querySelector('.book-details');
    if (elbookDetails.classList.value === 'book-details open-section' && i_bookId === gCurrBookIdShowing) {
        elbookDetails.classList.remove('open-section');
    } else {
        elbookDetails.classList.add('open-section');
        elbookDetails.innerHTML = `
        <h3>Book Details</h3>
        <div class="row">
          <div class="section-description">Book Id - ${currBook.id}</div>
          <div class="section-description">Title - ${currBook.title}</div>
          <div class="section-description">Price - $${currBook.price}</div>
        </div>
        <img class="book-img img-rounded" src="img/${currBook.id}.jpg" alt="img of  ${currBook.title}">
            <div class="rating">
                    <div class="curr-rating">Book Rating: <span>${Math.round(currBook.rating)}</span>, Rated by: <span>${currBook.numOfRatings}</span> users</div>
                    <div class="rating-buttons">
                        <span class="glyphicon glyphicon-thumbs-up" onclick="rateBook(1, ${currBookIdx})"></span>
                        <span class="glyphicon glyphicon-thumbs-down" onclick="rateBook(0, ${currBookIdx})"></span>
                    </div>
            </div>`;
        gCurrBookIdShowing = i_bookId;
    }

}

function rateBook(i_rating, i_bookIdx) {
    var currBook = gBooks[i_bookIdx];
    currBook.rating = ((currBook.rating * currBook.numOfRatings) + i_rating * 10) / (currBook.numOfRatings + 1);
    currBook.numOfRatings++
    var elBookRatingDiv = document.querySelector('.curr-rating');
    elBookRatingDiv.firstElementChild.innerHTML = Math.round(currBook.rating);
    if (currBook.rating > 5) elBookRatingDiv.firstElementChild.style.color = 'green';
    else                     elBookRatingDiv.firstElementChild.style.color = 'red';
    elBookRatingDiv.lastElementChild.innerHTML = currBook.numOfRatings;

}

function reRenderAllBooksTable() {
    var elTable = document.querySelector('table');
    var elTableHeader = elTable.firstElementChild.outerHTML;
    elTable.innerHTML = elTableHeader;
    renderAllBooks();
}

function sortById() {
    gBooks.sort(function (bookA, bookB) {
        return bookA.id - bookB.id
    });
    reRenderAllBooksTable();
}
function sortByTitle() {
    gBooks.sort(function (bookA, bookB) {
        if (bookA.title < bookB.title) {
            return -1;
        }
        if (bookA.title > bookB.title) {
            return 1;
        }
        return 0;
    });

    reRenderAllBooksTable();
}
function sortByPrice() {
    gBooks.sort(function (bookA, bookB) {
        return bookA.price - bookB.price
    });
    reRenderAllBooksTable();
}