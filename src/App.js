import { BrowserRouter as Router ,Route ,Routes } from "react-router-dom";
import Write from "./components/write"
import Read from "./components/read";
import UpdateRead from "./components/UpdateRead"
import UpdateWrite from "./components/UpdateWrite";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Read/>}/>
          <Route path="/write" element={<Write/>}/>
          <Route path="/read" element={<Read/>}/>
          <Route path="/updateread" element={<UpdateRead/>}/>
          <Route path="/updatewrite/:firebaseId" element={<UpdateWrite/>}/>
          <Route path="/uploadimg" element={<ImageUpload/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
