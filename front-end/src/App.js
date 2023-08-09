import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateItem from "./components/createItem/CreateItem";
import ItemsList from "./components/itemsList/ItemsList";
import Registration from "./components/registration/Registration";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import UpdateItem from "./components/updateItem/UpdateItem";

const Protected = ({ children }) => {
   const token = localStorage.getItem("token");
  if(!token) {
    return <Navigate to="/" replace/>;
  }
  return children
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/add" element={<Protected><CreateItem /></Protected>}/>
          <Route path="/items" element={<Protected><ItemsList /></Protected>} />
          <Route path="/item/:id" element={<Protected><UpdateItem /></Protected>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
