import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const CountryContext = createContext({});

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState("loading");

  const filterByRegion = region => {
    if (region === "") {
      return countries;
    } else {
      if (countries) {
        return countries.filter(country => country.region === region);
      }
    }
  };

  const filterByName = name => {
    if (countries) {
      const country = countries.filter(country =>
        country.name.common.toLowerCase().includes(name)
      );

      return country;
    }
  };

  const filterDetails = filterCountry => {
    if (countries) {
      const country = countries.filter(
        country => country.name?.common?.toLowerCase() === filterCountry
      );

      return country;
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();

      const sortedByPopulation = data.sort(
        (a, b) => b.population - a.population
      );
      setCountries(sortedByPopulation);
      setLoading("resolved");
    } catch (err) {
      setLoading("error");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <CountryContext.Provider
      value={{
        countries,
        filterByRegion,
        loading,
        filterByName,
        filterDetails,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

const useCountries = () => {
  const { countries, filterByRegion, loading, filterByName, filterDetails } =
    useContext(CountryContext);

  return {
    countries,
    filterByRegion,
    loading,
    filterByName,
    filterDetails,
  };
};

export default useCountries;
