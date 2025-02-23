// src/components/Quotable.jsx
// TODO: Import the necessary hooks from React.
import React, { useState, useEffect } from "react";
import "./quote.css"; // Ensure you have your CSS set up for styling

function Quotable() {
  // Step 1: Initialize state variables.
  // - "quotes" will hold an array of fetched quote objects.
  // - "loading" tracks whether a fetch request is in progress.
  // - "error" stores any error messages encountered.
  // - "selectedCategory" is for consistency, although ZenQuotes doesn't support categories directly.
  // Array to hold fetched quotes
  // Loading state indicator
  // Error message state

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Step 2: Create a function "updateQuote" to fetch a random quote from the ZenQuotes API.
  // Hints:
  // - Use fetch() to request "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
  // - ZenQuotes returns an array with one object; extract the first element.
  // - Append the new quote to the "quotes" array.
  const updateQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Make a GET request to the ZenQuotes API using a CORS proxy.
      // Hint: Use the fetch() method with the URL "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random".
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"
      );


      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await response.json();
      setQuotes((quotes)=> [...quotes, data[0]]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Use useEffect to fetch an initial quote when the component mounts.
  useEffect(() => {
    // TODO: Call updateQuote() so that a quote is fetched on component mount.
    updateQuote();
  }, []);

  // Step 4: Create a function "deleteQuote" to delete a single quote.
  // Hints:
  // - Use the filter() method to remove the quote at the given index.
  const deleteQuote = (indexToDelete) => {
    // TODO: Update the quotes state by filtering out the quote at indexToDelete.
    setQuotes((prevQuotes) =>
      prevQuotes.filter((quote, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="app-container">
      <h1 className="title">Random Quote Generator</h1>

      <button className="btn1" onClick={updateQuote}>New Quote</button>

      {/* Step 6: Display loading and error messages if applicable */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Step 7: Display the list of fetched quotes */}
      <div className="quotes-container">
        {quotes.length === 0 && !loading ? (
          <p>No quotes available. Click "New Quote" to fetch one.</p>
        ) : (
          quotes.map((quote, index) => (
            <div key={quote._id ? quote._id : index} className="quote-card">
              <p className="quote-content">{quote.q}</p>
              {quote.a && <p className="quote-author">- {quote.a}</p>}
              <button className="delete-btn" onClick={()=>deleteQuote(index)}>Delete Quote</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Quotable;
