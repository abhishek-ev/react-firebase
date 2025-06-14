import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Dashbord from "./components/Dashboard";
import MenuList from "./components/MenuList";
import Posters from "./components/Posters";
import Gallery from "./components/Gallery";
import Offers from "./components/Offers";
import Write from "./components/write"
import Login from "./components/login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={<Login onLogin={() => console.log('Login success')} />}
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard/menulist" />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashbord />
              </PrivateRoute>
            }
          >
            <Route path="menulist" element={<MenuList />} />
            <Route path="posters" element={<Posters />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="offers" element={<Offers />} />
          </Route>

          <Route
            path="/write"
            element={
              <PrivateRoute>
                <Write />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
