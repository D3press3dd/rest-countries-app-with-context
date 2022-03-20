import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBack from "../img/arrow-back-outline.svg";
import useCountries from "../Providers/CountryContext";
import Loader from "./Loader";
import { motion, AnimatePresence } from "framer-motion";

const CountryDetails = () => {
  const [singleCountry, setSingleCountry] = useState([]);
  const { country } = useParams();
  let navigate = useNavigate();
  const countryLowerCase = country.toLowerCase();
  const { countries, filterDetails } = useCountries();

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (countries) {
      setSingleCountry(filterDetails(countryLowerCase));
    }
  }, [countries]);

  return (
    <>
      <motion.div
        className="back-btn"
        initial={{
          opacity: 0,
          translateX: -2000,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
        }}
      >
        <img src={ArrowBack} alt="Arrow back " />
        <Link onClick={handleBackButton} className="back-btn__link" to="/">
          Back
        </Link>
      </motion.div>
      <AnimatePresence>
        <div className="country__container">
          <motion.img
            src={singleCountry[0]?.flags?.svg}
            alt={singleCountry[0]?.name?.common + " flag"}
            initial={{
              opacity: 0,
              translateX: -500,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              duration: 0.5,
              translateX: -500,
            }}
            exit={{
              opacity: 0,
              translateX: -500,
            }}
          />

          {singleCountry[0] ? (
            <div className="country__data">
              <div className="country__name">
                <h1>{singleCountry[0]?.name?.common}</h1>
              </div>
              <div className="country__bothsides-data">
                <div className="country__left-data">
                  <p>
                    Native Name:
                    <span>{singleCountry[0]?.name?.common}</span>
                  </p>
                  <p>
                    Population:
                    <span>
                      {Intl.NumberFormat().format(singleCountry[0]?.population)}
                    </span>
                  </p>
                  <p>
                    Region:<span> {singleCountry[0].region}</span>
                  </p>
                  <p>
                    Sub Region:<span> {singleCountry[0].subregion}</span>
                  </p>
                  <p>
                    Capital:<span> {singleCountry[0].capital}</span>
                  </p>
                </div>
                <div className="country__right-data">
                  <p>
                    Top Level Domain:<span> {singleCountry[0].tld.join()}</span>
                  </p>
                  <p>
                    Currencies:
                    <span>
                      {singleCountry[0].currencies === undefined
                        ? " No currencies Found"
                        : Object.values(singleCountry[0]?.currencies)[0]?.name}
                    </span>
                  </p>
                  <p>
                    Languages:
                    <span>
                      {singleCountry[0].languages === undefined
                        ? " No languages found"
                        : Object.values(singleCountry[0].languages).join()}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <div className="country__borders">
                  <p>Border Countries:</p>
                  <div className="country__borders-text">
                    {singleCountry[0]?.borders
                      ? singleCountry[0]?.borders.map((border, index) => (
                          <motion.span
                            key={border + 1}
                            initial={{
                              opacity: 0,
                              translateY: -50,
                            }}
                            animate={{
                              opacity: 1,
                              translateY: 0,
                            }}
                            transition={{
                              duration: 0.2,
                              delay: index * 0.2,
                            }}
                          >
                            {border}
                          </motion.span>
                        ))
                      : " No borders found"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default CountryDetails;
