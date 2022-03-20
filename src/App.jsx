import { Route, Routes } from "react-router-dom";
import CardsContainer from "./components/CardsContainer";
import CountryCard from "./components/CountryCard";
import CountryDetails from "./components/CountryDetails";
import Navbar from "./components/Navbar";
import { CountriesProvider } from "./Providers/CountryContext";

function App() {
  return (
    <>
      <Navbar />
      <CountriesProvider>
        <Routes>
          <Route path="/" element={<CardsContainer />} />
          <Route path="/country/:country" element={<CountryDetails />} />
          {/* <Route path="*" element={<CardsContainer />} /> */}
        </Routes>
      </CountriesProvider>
    </>
  );
}

export default App;
