import axios from "axios";
import "./App.css";

function App() {
  const getHelloWorld = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cars");
      console.log(response);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  getHelloWorld();
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold underline">Welcome to Car Rental</h1>
    </div>
  );
}

export default App;
