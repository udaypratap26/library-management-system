let books = [
    { id: 1, name: "Java Programming", available: true },
    { id: 2, name: "Python Basics", available: true },
    { id: 3, name: "Data Structures and Algorithms", available: true },
    { id: 4, name: "Operating System Concepts", available: true },
    { id: 5, name: "Database Management Systems", available: true },
    { id: 6, name: "Computer Networks", available: true },
    { id: 7, name: "Software Engineering", available: true },
    { id: 8, name: "Artificial Intelligence", available: true }
];

let members = [
    { id: 101, name: "Rahul Sharma" },
    { id: 102, name: "Aman Verma" },
    { id: 103, name: "Priya Singh" },
    { id: 104, name: "Neha Gupta" },
    { id: 105, name: "Rohit Kumar" },
    { id: 106, name: "Ankit Patel" },
    { id: 107, name: "Pooja Mehta" },
    { id: 108, name: "Saurabh Jain" },
    { id: 109, name: "Kunal Malhotra" },
    { id: 110, name: "Sneha Iyer" },
    { id: 111, name: "Vikas Yadav" },
    { id: 112, name: "Shubham Mishra" },
    { id: 113, name: "Nidhi Arora" },
    { id: 114, name: "Arjun Rana" },
    { id: 115, name: "Simran Kaur" }
];


let transactions = [
    {
        bookId: 1,
        bookName: "Java Programming",
        user: "Rahul Sharma",
        issueDate: new Date("2025-01-01"),
        returnDate: new Date("2025-01-05"),
        fine: 0,
        payment: "Done"
    },
    {
        bookId: 3,
        bookName: "Data Structures and Algorithms",
        user: "Priya Singh",
        issueDate: new Date("2025-01-02"),
        returnDate: null,
        fine: 0,
        payment: "Pending"
    },
    {
        bookId: 5,
        bookName: "Database Management Systems",
        user: "Aman Verma",
        issueDate: new Date("2024-12-25"),
        returnDate: new Date("2025-01-10"),
        fine: 30,
        payment: "Pending"
    },
    {
        bookId: 6,
        bookName: "Computer Networks",
        user: "Neha Gupta",
        issueDate: new Date("2025-01-03"),
        returnDate: null,
        fine: 0,
        payment: "Pending"
    },
    {
        bookId: 8,
        bookName: "Artificial Intelligence",
        user: "Rohit Kumar",
        issueDate: new Date("2024-12-28"),
        returnDate: new Date("2025-01-06"),
        fine: 10,
        payment: "Done"
    }
];

let role = "";

// ADMIN LOGIN
function adminLogin() {
    let u = document.getElementById("adminUser").value;
    let p = document.getElementById("adminPass").value;

    if (u === "admin" && p === "admin123") {
        role = "admin";
        document.querySelector(".login-container").style.display = "none";
        document.getElementById("adminPanel").classList.remove("hidden");
    } else {
        document.getElementById("adminError").innerText = "Invalid Admin Credentials";
    }
}

// USER LOGIN
function userLogin() {
    let u = document.getElementById("userUser").value;
    let p = document.getElementById("userPass").value;

    if (u === "user" && p === "user123") {
        role = "user";
        document.querySelector(".login-container").style.display = "none";
        document.getElementById("userPanel").classList.remove("hidden");
    } else {
        document.getElementById("userError").innerText = "Invalid User Credentials";
    }
}

// LOGOUT
function logout() {
    location.reload();
}

// ADD BOOK
function showAddBook() {
    document.getElementById("adminContent").innerHTML = `
        <h3>Add Book</h3>
        <input id="bookId" placeholder="Book ID">
        <input id="bookName" placeholder="Book Name">
        <button onclick="addBook()">Add</button>
        <p class="error" id="error"></p>
    `;
}

function addBook() {
    let id = document.getElementById("bookId").value;
    let name = document.getElementById("bookName").value;

    if (id === "" || name === "") {
        document.getElementById("error").innerText = "All fields are mandatory";
        return;
    }

    books.push({ id: id, name: name, available: true });
    alert("Book Added Successfully");
}

// VIEW BOOKS
function showBooks() {
    let html = "<h3>Books List</h3>";
    books.forEach(b => {
        html += `<div class="book">${b.id} - ${b.name} - ${b.available ? "Available" : "Issued"}</div>`;
    });

    if (role === "admin")
        document.getElementById("adminContent").innerHTML = html;
    else
        document.getElementById("userContent").innerHTML = html;
}

// ISSUE BOOK
function issueBook() {
    let id = prompt("Enter Book ID to Issue");

    if (!id) {
        alert("Book selection required");
        return;
    }

    for (let b of books) {
        if (b.id == id && b.available) {
            b.available = false;

            transactions.push({
                bookId: b.id,
                bookName: b.name,
                user: "User",
                issueDate: new Date(),
                returnDate: null,
                fine: 0,
                payment: "Pending"
            });

            alert("Book Issued Successfully");
            return;
        }
    }
    alert("Book not available");
}

// MEMBERS
function showMembers() {
    let html = "<h3>Members</h3>";
    members.forEach(m => {
        html += `<div>${m.id} - ${m.name}</div>`;
    });
    document.getElementById("adminContent").innerHTML = html;
}

// TRANSACTIONS
function showTransactions() {
    let html = `
        <h3>Transactions</h3>
        <table>
            <tr>
                <th>Book (ID)</th>
                <th>User</th>
                <th>Issue Date</th>
                <th>Returned</th>
                <th>Fine (₹)</th>
                <th>Payment</th>
            </tr>
    `;

    transactions.forEach(t => {
        html += `
            <tr>
                <td>${t.bookName} (${t.bookId})</td>
                <td>${t.user}</td>
                <td>${t.issueDate.toDateString()}</td>
                <td>${t.returnDate ? "Yes" : "No"}</td>
                <td>${t.fine}</td>
                <td style="color:${t.payment === "Done" ? "green" : "red"}">
                    ${t.payment === "Done" ? "Success" : "Pending"}
                </td>
            </tr>
        `;
    });

    html += "</table>";
    document.getElementById("adminContent").innerHTML = html;
}


// RETURN BOOK + FINE
function returnBook(index) {
    let t = transactions[index];
    let today = new Date();
    t.returnDate = today;

    let diffDays = Math.floor((today - t.issueDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
        t.fine = (diffDays - 7) * 10;
        t.payment = "Pending";
        alert("Returned with fine ₹" + t.fine);
    } else {
        t.fine = 0;
        t.payment = "Done";
        alert("Returned successfully. No fine.");
    }

    let book = books.find(b => b.id === t.bookId);
    if (book) book.available = true;

    showTransactions();
}
