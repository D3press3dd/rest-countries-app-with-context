import { useEffect, useState } from 'react';
import CountryCard from './CountryCard';
import SearchIcon from '../img/search-outline.svg';
import { region } from '../helpers/regionValues';
import useCountries from '../Providers/CountryContext';
import Loader from './Loader';
import { motion } from 'framer-motion';

const CardsContainer = () => {
  const { countries, loading, filterByRegion, filterByName } = useCountries();
  const [countriesFiltered, setCountriesFiltered] = useState([]);

  useEffect(() => {
    if (countries) setCountriesFiltered(countries);
  }, [countries]);

  const handleCountryByName = e => {
    setCountriesFiltered(filterByName(e.target.value.toLowerCase()));
  };

  const handleCountryByRegion = e => {
    setCountriesFiltered(filterByRegion(e.target.value));
  };

  return (
    <>
      <div className='navbar__container'>
        <motion.div
          className='navbar__search'
          initial={{
            translateX: -2000,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
          }}
        >
          <input
            className='navbar__search-input'
            type='text'
            placeholder='Search for a country...'
            onChange={handleCountryByName}
          />
          <img
            className='navbar__search-img'
            src={SearchIcon}
            alt='search icon'
          />
        </motion.div>
        <motion.select
          defaultValue={'selected'}
          name='countries region'
          className='navbar__select'
          initial={{
            translateX: 2000,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
          }}
          onChange={handleCountryByRegion}
        >
          <option disabled value='selected'>
            Filter by region
          </option>
          {region.map(region => {
            return (
              <option value={region.value} key={region.value}>
                {region.name}
              </option>
            );
          })}
        </motion.select>
      </div>
      <main className='container'>
        {loading === 'resolved' ? (
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
