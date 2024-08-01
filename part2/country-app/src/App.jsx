import { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";
import Country from "./components/Country";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingCountries, setMatchingCountries] = useState([]);
  const [clickedCountry, setClickedCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCountryClick = (countryCode) => {
    setClickedCountry(countryCode);
  };

  const fetchClickedCountry = async (countryCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );
      setSelectedCountry(response.data[0]);
    } catch (err) {
      setError("Failed to fetch country details");
      setSelectedCountry(null);
    }
    setIsLoading(false);
  };

  const performSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${searchQuery}`
      );

      if (res.data.length > 10) {
        setMatchingCountries([]);
        setError("Too many matches, please be more specific");
      } else if (res.data.length > 1) {
        setMatchingCountries(res.data);
        setSelectedCountry(null);
      } else if (res.data.length === 1) {
        setSelectedCountry(res.data[0]);
        setMatchingCountries([]);
      }
    } catch (err) {
      setError("Failed to fetch countries");
      setMatchingCountries([]);
      setSelectedCountry(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(performSearch, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setMatchingCountries([]);
      setSelectedCountry(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (clickedCountry) {
      fetchClickedCountry(clickedCountry);
    }
  }, [clickedCountry]);

  const renderResult = () => {
    if (isLoading) return <p>Loading....</p>;
    if (error) return <p>{error}</p>;

    return (
      <div>
        {matchingCountries.length > 0 && (
          <ul>
            {matchingCountries.map((country) => (
              <Country
                key={country.cca3}
                name={country.name.common}
                onClick={() => handleCountryClick(country.cca3)}
              />
            ))}
          </ul>
        )}
        {selectedCountry && (
          <div>
            <CountryInfo
              name={selectedCountry.name.common}
              capital={selectedCountry.capital[0]}
              area={selectedCountry.area}
              flag={selectedCountry.flags.png}
              languages={selectedCountry.languages}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        Find country <input value={searchQuery} onChange={handleSearchChange} />
      </form>
      {renderResult()}
    </div>
  );
}

export default App;
