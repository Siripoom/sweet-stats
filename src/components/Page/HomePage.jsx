import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dessertsRef = collection(db, "desserts");
    const q = query(dessertsRef, where("name", "==", searchTerm));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">
        Welcome to the Dessert Finder!
      </h1>
      <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto my-8">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search desserts..."
            aria-label="Search desserts"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center text-lg">Loading...</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="max-w-6xl p-4">
            {searchResults.map((dessert) => (
              <div
                key={dessert.id}
                className="card bg-base-100 shadow-xl flex flex-col items-center"
              >
                <figure className="px-8 pt-8 w-full flex justify-center">
                  {dessert.imageUrl && (
                    <img
                      src={dessert.imageUrl}
                      alt="Dessert"
                      className="rounded-xl"
                      style={{ width: "200px", height: "auto" }} // Adjusted size
                    />
                  )}
                </figure>
                <div className="card-body text-center w-full">
                  <h2 className="card-title text-2xl">{dessert.name}</h2>
                  <p className="text-xl">
                    Sugar Content: {dessert.sugarContent}%
                  </p>
                  <div className="card-actions justify-center">
                    <button className="btn btn-primary">More Info</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
