import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";

function App() {
  // const getHelloWorld = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/cars");
  //     console.log(response);
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // };
  //
  // getHelloWorld();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
