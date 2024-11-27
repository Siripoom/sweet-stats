import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WeightInputPage() {
  const [weight, setWeight] = useState("");
  const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

  const handleNext = () => {
    navigate("/food-selection", { state: { weight } }); // แก้ไขการนำทาง
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-4">Enter Your Weight</h1>
      <div className="flex justify-center">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="text-center border rounded py-2 px-4"
          placeholder="Weight in kg"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WeightInputPage;
