document.addEventListener("DOMContentLoaded", () => {
	const bookContainer = document.querySelector("#bookContainer");
	const addNewBookBtn = document.querySelector("#addNewBookBtn");
	let myLibrary = [];

	function Book(id, title, author, pages, price, url, imgurl) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.price = price;
		this.url = url;
		this.imgurl = imgurl;
	}

	function addBookToLibrary(title, author, pages, price, url, imgurl) {
		let bookId = crypto.randomUUID();
		myLibrary.push(new Book(bookId, title, author, pages, price, url, imgurl));
	}

	addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 842, 49.99, "https://thegreatestbooks.org/books/38", "https://images.thegreatestbooks.org/ymseqoyhkyhpho50rs2jdjmi2gnn");
	addBookToLibrary("Ulysses", "James Joyce", 1240, 69.99, "https://thegreatestbooks.org/books/122", "https://images.thegreatestbooks.org/sbd37b2dsyuw15cv63l87biw63kv");
	addBookToLibrary("In Search of Lost Time", "Marcel Proust", 381, 29.99, "https://thegreatestbooks.org/books/225", "https://images.thegreatestbooks.org/myvbhitdua7h1etye2hvfjej2p4j");
	addBookToLibrary("One Hundred Years of Solitude", "Gabriel García Márquez", 837, 49.99, "https://thegreatestbooks.org/books/266", "https://images.thegreatestbooks.org/fzce7ac1jcmx6fi8ppnea65ct3u9");

	const displayBooks = () => {
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

	// Displays books on page load
	displayBooks();

	addNewBookBtn.addEventListener("click", () => {
		console.log("Works");
	});

	const removeBook = (bookId) => {
		const bookToRemove = myLibrary.find((book) => book.id == bookId);
		myLibrary = myLibrary.filter((book) => book !== bookToRemove);
	};

	bookContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("removeBookButton")) {
			const bookCard = e.target.closest(".bookCard");
			const bookId = bookCard.dataset.id;

			removeBook(bookId);
			displayBooks();
		}
	});
});
