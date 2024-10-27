import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import sweetStatsLogo from "../../../public/logo.png";

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

  const handleCategoryClick = async (category) => {
    setLoading(true);
    const dessertsRef = collection(db, "desserts");
    const q = query(dessertsRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setSearchResults(results);
    setLoading(false);
  };

  return (
    <div
      className="container mx-auto px-4"
      style={{
        margin: "0",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={sweetStatsLogo}
        alt="Sweet Stats Logo"
        style={{
          maxWidth: "300px", // Adjust size as needed
          // marginBottom: "10px", // Adjust spacing as needed
        }}
      />
      <h1
        className="text-3xl font-bold text-center my-4"
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#ff69b4",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          margin: "0",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: "20px 30px",
          borderRadius: "25px",
          border: "3px solid #ffd700",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        งดทานหวานเพราะน้ำตาลแพงมาก!
      </h1>

      <div className="flex justify-center">
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl"
          style={{
            margin: "20px auto",
            width: "100%",
            maxWidth: "600px",
            padding: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "15px",
            boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none text-center"
              type="text"
              placeholder="Search desserts..."
              aria-label="Search desserts"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                appearance: "none",
                backgroundColor: "#f9fafb",
                border: "2px solid #e0e0e0",
                width: "100%",
                padding: "12px 20px",
                marginRight: "10px",
                borderRadius: "10px",
                fontSize: "1rem",
                textAlign: "center",
                color: "#333",
                transition: "border 0.3s ease-in-out",
              }}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
              style={{
                backgroundColor: "#ff69b4",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "10px",
                transition: "background-color 0.3s ease-in-out",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff85c4")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff69b4")}
            >
              ค้นหา
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => handleCategoryClick("ผลไม้")}
          className="bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full"
          style={{
            backgroundColor: "#ff69b4",
            borderRadius: "50px",
            padding: "10px 20px",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          ผลไม้
        </button>
        <button
          onClick={() => handleCategoryClick("เครื่องดื่ม")}
          className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          เครื่องดื่ม
        </button>
        <button
          onClick={() => handleCategoryClick("ขนม")}
          className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
        >
          ขนม
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center text-lg">Loading...</p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="max-w-6xl p-4">
            {searchResults.map((dessert) => (
              <motion.div
                key={dessert.id}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="card bg-base-100 shadow-xl flex flex-col items-center"
              >
                <figure className="px-8 pt-8 w-full flex justify-center">
                  {dessert.imageUrl && (
                    <img
                      src={dessert.imageUrl}
                      alt="Dessert"
                      className="rounded-xl"
                      style={{ width: "200px", height: "auto" }}
                    />
                  )}
                </figure>
                <div className="card-body text-center w-full">
                  <h2 className="card-title text-2xl">{dessert.name}</h2>
                  <p className="text-xl">
                    Sugar Content: {dessert.sugarContent}%
                  </p>
                  <p className="text-lg">Category: {dessert.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
