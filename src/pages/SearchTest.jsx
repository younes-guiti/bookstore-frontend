import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";

function SearchTest() {
  const [search, setSearch] = useState("");

  const books = [
    { id: 1, title: "React" },
    { id: 2, title: "Node.js" },
    { id: 3, title: "Express" },
    { id: 4, title: "JavaScript" },
    { id: 5, title: "Docker" },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Test</h1>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTest;
