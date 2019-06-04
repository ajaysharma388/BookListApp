

// Book class : Represent a Book
	class Book {
		constructor(title,author,isbn) {
			this.title = title;
			this.author = author;
			this.isbn = isbn;
		}
	}


// UI Class : Handle UI Tasks


 class UI {
	static displayBook() {
	/*	const storedBooks = [
		{
			title : 'Book One',
			author : 'John Doe',
			isbn : '343553'
		},
		{
			title : 'Book Two',
			author : 'Jane Doe',
			isbn : '12234'
		},
		{
			title : 'Book Three',
			author : 'Jane Doe',
			isbn : '12234'
		}
		];
		const books = storedBooks ;
		*/
		
		const books = Store.getBooks();
		books.forEach((book) => UI.addBookToList(book));
		
	}

	

	static addBookToList(book) {
		const list = document.querySelector('#book-list');
		const row = document.createElement('tr');
		row.innerHTML = `
		<td>${book.title} </td>
		<td>${book.author} </td>
		<td>${book.isbn} </td>
		<td> <a href="#" class="btn btn-danger btn-sm delete"> X </a> </td>
		`;
		list.appendChild(row);
	}
	
	static deleteBook(el) {
		if(el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}
	static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
	
	setTimeout(() => document.querySelector('.alert').remove(),3000);
	}
	
	static clearFields() {
		document.querySelector('#title').value = '';
	    document.querySelector('#author').value = '';
	    document.querySelector('#isbn').value = '';
	}
	}

// Store Class : Handle Storage
    class Store {
	static getBooks() {
		let books;
		if(localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		
		return books;
	}
	
	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books',JSON.stringify(books));
	}
	
	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach((book, index) => {
			if(book.isbn == isbn) {
	          
			books.splice(index, 1);
			} 
		});
		localStorage.setItem('books',JSON.stringify(books));
	}
	

}


// Event Display Book

	document.addEventListener('DOMContentLoaded', UI.displayBook);
	
	
	
// Event : Add a book
document.querySelector('#book-form').addEventListener('submit',(e) => {
	// prevent actual submit
	e.preventDefault();
	
	//Get Form Values
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;
	
	// Validates
	if(title === ''|| author === '' || isbn === '') {
		//alert('Please Fill all the Fields');
		UI.showAlert('Please Fill all the Fields','danger');
	} else {
			// Instatiate a book
			const book = new Book(title,author,isbn);
		//console.log(book);
	
		// Add Book to UI
		UI.addBookToList(book);
		
		// Add Book to Local Storage
		Store.addBook(book);
		
		// Show Success Message
		UI.showAlert('Book Added','success');
		// Clear Fields 
		UI.clearFields();
	}
	
	
});

// Event : Remove a book
 document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove Book from UI	
	UI.deleteBook(e.target);
	
	// Remove Book from Local Storage
	Store.removeBook((e.target.parentElement.previousElementSibling.textContent).trim());
	
	 
	 // Show message
	 UI.showAlert('Book Removed','success');
 });

