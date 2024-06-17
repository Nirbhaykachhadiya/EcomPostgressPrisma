import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInSignUp from "./components/LogInSignUp.jsx";
import HomeListing from "./components/HomeListing.jsx";
import YourOrder from "./components/YourOrder.jsx";
import YourSellerAccount from "./components/YourSellerAccount.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeListing />} />
            <Route path="/LogInSignUp" element={<LogInSignUp />} />
            <Route path="/YourOrder" element={<YourOrder />} />
            <Route path="/YourSellerAccount" element={<YourSellerAccount />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
