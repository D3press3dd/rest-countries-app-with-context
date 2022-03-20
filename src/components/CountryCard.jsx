import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const CountryCard = ({ country, index }) => {
  const {
    name: { common },
    population,
    region,
    capital,
    flags: { svg },
  } = country;

  return (
    <motion.div
      className="country-card__container"
      initial={{
        opacity: 0,
        translateX: -500,
        rotate: 10,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        rotate: 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
      }}
    >
      <div className="country-card__image">
        <Link to={`country/${common}`}>
          <img loading="lazy" src={svg} alt={`${common} flag`} />
        </Link>
      </div>

      <div className="country-card__details">
        <p className="country-card__name">{common}</p>
        <p>
          Population:<span> {Intl.NumberFormat().format(population)}</span>
        </p>
        <p>
          Region:<span> {region}</span>
        </p>
        <p>
          Capital:<span> {capital || "Not Capital Found"}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default CountryCard;
