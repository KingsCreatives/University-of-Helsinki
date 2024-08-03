import React from 'react'
import WeatherInfo from './WeatherInfo'

const CountryInfo = ({name, capital, area, languages, flag, weather}) => {
    const languageArray = [...Object.values(languages)];
  return (
    <div>
      <section>
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <b>Languages:</b>
        <ul>
          {languageArray.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={flag} alt={"Flag of" + name} />
      </section>
      <section>
        {weather && <WeatherInfo capital={capital} weather={weather} />}
      </section>
    </div>
  );
}

export default CountryInfo