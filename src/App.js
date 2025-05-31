import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Write from "./components/write"

//components
import Dashbord from "./components/Dashboard";
import MenuList from "./components/MenuList";
import Posters from "./components/Posters";
import Gallery from "./components/Gallery";
import Offers from "./components/Offers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/menulist" />} />
          <Route path="/dashboard" element={<Dashbord />}>
            <Route path="menulist" element={<MenuList />} />
            <Route path="posters" element={<Posters />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="offers" element={<Offers />} />
          </Route>
          <Route path="/write" element={<Write />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
