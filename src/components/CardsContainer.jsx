import CountryCard from "./CountryCard";
import SearchIcon from "../img/search-outline.svg";
import { region } from "../helpers/regionValues";
import useCountries from "../Providers/CountryContext";
import Loader from "./Loader";
import { useState } from "react";
import { useEffect } from "react";

const CardsContainer = () => {
  const { countries, loading, filterByRegion, filterByName } = useCountries();
  const [countriesFiltered, setCountriesFiltered] = useState([]);

  useEffect(() => {
    if (countries) {
      setCountriesFiltered(countries);
    }
  }, [countries]);

  return (
    <>
      <div className="navbar__container">
        <div className="navbar__search">
          <input
            className="navbar__search-input"
            type="text"
            placeholder="Search for a country..."
            onChange={e => setCountriesFiltered(filterByName(e.target.value))}
          />
          <img
            className="navbar__search-img"
            src={SearchIcon}
            alt="search icon"
          />
        </div>
        <select
          defaultValue={"selected"}
          name="select"
          className="navbar__select"
          onChange={e => setCountriesFiltered(filterByRegion(e.target.value))}
        >
          <option disabled value="selected">
            Filter by region
          </option>
          {region.map(region => {
            return (
              <option value={region.value} key={region.value}>
                {region.name}
              </option>
            );
          })}
        </select>
      </div>
      <main className="container">
        {loading === "resolved" ? (
          countriesFiltered.map((country, index) => {
            return (
              <CountryCard key={country.cca3} country={country} index={index} />
            );
          })
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
};

export default CardsContainer;
