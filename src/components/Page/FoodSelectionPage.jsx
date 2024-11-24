import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FoodSelectionPage() {
  const { state } = useLocation();
  const { weight } = state || {};
  const [foodCategory, setFoodCategory] = useState("");
  const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

  const handleCategoryChange = (e) => {
    setFoodCategory(e.target.value);
  };

  function calculateSugarLimit(weight) {
    // สมมุติว่าน้ำตาลควรไม่เกิน 10% ของน้ำหนักตัว
    return weight * 0.1; // คำนวณน้ำตาลไม่เกิน 10% ของน้ำหนักต่อวัน
  }

  const handleSubmit = () => {
    // Assume calculation and API fetching here
    const sugarLimit = calculateSugarLimit(weight);
    navigate("/results", { state: { sugarLimit } }); // ปรับการนำทาง
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">
        Select Food Category
      </h1>
      <div className="flex justify-center">
        <select
          value={foodCategory}
          onChange={handleCategoryChange}
          className="border rounded py-2 px-4"
        >
          <option value="">Select Category</option>
          <option value="fruits">Fruits</option>
          <option value="snacks">Snacks</option>
          <option value="drinks">Drinks</option>
        </select>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}

export default FoodSelectionPage;
