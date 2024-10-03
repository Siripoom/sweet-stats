import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/Page/HomePage";
import ManageDesserts from "./components/Page/ManageDesserts";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-desserts" element={<ManageDesserts />} />
        {/* <Route path="/health-info" element={<HealthInfoPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="*" element={<Page404 />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
