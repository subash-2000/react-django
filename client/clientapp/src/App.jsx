import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [Books, setBook] = useState([]);
  const [title, settitle] = useState("");
  const [releaseYear, setyear] = useState(0);
  const [NewTitle, setNewTilte] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get/");
      const data = await response.json();
      setBook(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_date: releaseYear,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/create/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBook((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk, release_date) => {
    const bookData = {
      title: NewTitle,
      release_date,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/details/${pk}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBook((prev) =>
        prev.map((book) => {
          if (book.id === pk) {
            return data;
          } else {
            return book;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (pk) => {
    try {
      await fetch(`http://127.0.0.1:8000/details/${pk}`, {
        method: "DELETE",
      });
      setBook((prev) => prev.filter((book) => book.id !== pk));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Books</h1>
      <div>
        <form>
          <input
            type="text"
            placeholder="Book Title"
            onChange={(e) => settitle(e.target.value)}
          />
          <br />
          <br />
          <input
            type="Number"
            placeholder="Release Date"
            onChange={(e) => setyear(e.target.value)}
          />
          <br />
          <br />
          <button type="button" onClick={addBook}>
            ADD-Book
          </button>
        </form>
        <div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Release-year</th>
                <th>Edit-Delete</th>
              </tr>
            </thead>
            <tbody>
              {Books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.release_date}</td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => setNewTilte(e.target.value)}
                    />
                    <button
                      onClick={() => updateTitle(book.id, book.release_date)}
                    >
                      Add-TITLE
                    </button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
