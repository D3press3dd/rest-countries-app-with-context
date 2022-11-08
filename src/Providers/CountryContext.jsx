import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useDebounce } from '../hooks/useDebounce';

const CountryContext = createContext({});

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState('loading');
  const [query, setQuery] = useState('');
  const debounceQuery = useDebounce(query, 500);

  const filterByRegion = region => {
    if (region === '') {
      return countries;
    } else {
      if (countries) {
        return countries.filter(country => country.region === region);
      }
    }
  };

  const filterByName = name => {
    setQuery(name);
    if (countries) {
      return countries.filter(country =>
        country.name.common.toLowerCase().includes(name)
      );
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
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await fetch('https://restcountries.com/v3.1/all', {
        signal,
      });
      const data = await response.json();

      const sortedByPopulation = data.sort(
        (a, b) => b.population - a.population
      );
      setCountries(sortedByPopulation);
      setLoading('resolved');
    } catch (err) {
      setLoading('error');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCountries();
    return () => {
      controller.abort();
    };
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
