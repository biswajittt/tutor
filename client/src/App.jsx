import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      <div></div>
    </>
  );
}

export default App;