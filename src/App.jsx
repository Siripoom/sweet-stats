import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/Page/HomePage";
import ManageDesserts from "./components/Page/ManageDesserts";
import WeightInputPage from "./components/Page/WeightInputPage";
import FoodSelectionPage from "./components/Page/FoodSelectionPage";
import ResultPage from "./components/Page/ResultPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-desserts" element={<ManageDesserts />} />
        <Route path="/weight" element={<WeightInputPage />} />
        <Route path="/food-selection" element={<FoodSelectionPage />} />
        <Route path="/results" element={<ResultPage />} />
        {/* <Route path="/health-info" element={<HealthInfoPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="*" element={<Page404 />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
