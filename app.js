document.addEventListener("DOMContentLoaded", () => {
	const app = document.querySelector("body");
	let myLibrary = [];

	const LibraryController = (() => {
		const qs = (target) => {
			return document.querySelector(target);
		};
		const sidebar = qs("#sidebar");

		const displayBooks = () => {
			const bookContainer = qs("#bookContainer");
			bookContainer.innerHTML = "";
			myLibrary.forEach((book) => {
				let bookCard = `
                    <article class="bookCard" data-id="${book.id}">
                        <a href="${book.url}">
                            <div class="imgContainer">
                                <img src="${book.imgurl}" alt="${book.title}">
                                <p>$${book.price}</p>
                            </div>
                        </a>
                        <a href="${book.url}">
                            <h3>${book.title}</h3>
                        </a>
                        <p>Author: ${book.author}</p>
                        <p>Pages: ${book.pages}</p>
                        <button class="removeBookButton" type="button">Remove Book</button>
                    </article>
            `;
				bookContainer.innerHTML += bookCard;
			});
		};

		const addNewBook = (event) => {
			const inputFields = document.querySelectorAll("input");
			const bookTitle = qs("#bookTitle");
			const bookAuthor = qs("#bookAuthor");
			const bookPages = qs("#bookPages");
			const bookPrice = qs("#bookPrice");
			const bookUrl = qs("#bookUrl");
			let bookImgUrl = qs("#bookImgUrl");
			let hasEmptyFields = false;

			inputFields.forEach((field) => {
				field.required && !field.value ? alert(`You have to enter a ${field.name} in order to submit the form!`) : (hasEmptyFields = false);
			});

			if (hasEmptyFields) return;

			imgUrl = bookImgUrl.value || "https://images.thegreatestbooks.org/ymseqoyhkyhpho50rs2jdjmi2gnn";
			if (!hasEmptyFields) {
				myLibrary.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookPrice.value, bookUrl.value, imgUrl));
				console.log(myLibrary);
				displayBooks();
			}

			sidebar.classList.toggle("hide");
		};

		const removeBook = (bookId) => {
			const bookToRemove = myLibrary.find((book) => book.id == bookId);
			myLibrary = myLibrary.filter((book) => book !== bookToRemove);
		};

		const togglePopup = () => {
			sidebar.classList.toggle("hide");
		};

		return { displayBooks, addNewBook, removeBook, togglePopup };
	})();

	class Book {
		constructor(title, author, pages, price, url, imgurl) {
			this.id = crypto.randomUUID();
			this.title = title;
			this.author = author;
			this.pages = pages;
			this.price = price;
			this.url = url;
			this.imgurl = imgurl;
		}
	}

	app.addEventListener("click", (event) => {
		event.preventDefault();

		// Opens Sidebar
		if (event.target.classList.contains("sideBarBtn")) {
			LibraryController.togglePopup();
		}

		// Submits Book
		if (event.target.classList.contains("submitBookBtn")) {
			LibraryController.addNewBook(event);
		}

		// Removes Book
		if (event.target.classList.contains("removeBookButton")) {
			const bookCard = event.target.closest(".bookCard");
			const bookId = bookCard.dataset.id;

			LibraryController.removeBook(bookId);
			LibraryController.displayBooks();
		}
	});

	const book1 = myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 842, 49.99, "https://thegreatestbooks.org/books/38", "https://images.thegreatestbooks.org/ymseqoyhkyhpho50rs2jdjmi2gnn"));
	const book2 = myLibrary.push(new Book("Ulysses", "James Joyce", 1240, 69.99, "https://thegreatestbooks.org/books/122", "https://images.thegreatestbooks.org/sbd37b2dsyuw15cv63l87biw63kv"));
	const book3 = myLibrary.push(new Book("Lost Time", "Marcel Proust", 381, 29.99, "https://thegreatestbooks.org/books/225", "https://images.thegreatestbooks.org/myvbhitdua7h1etye2hvfjej2p4j"));
	const book4 = myLibrary.push(new Book("One Hundred Years", "Gabriel García Márquez", 837, 49.99, "https://thegreatestbooks.org/books/266", "https://images.thegreatestbooks.org/fzce7ac1jcmx6fi8ppnea65ct3u9"));

	console.log(book1);

	LibraryController.displayBooks();
});
