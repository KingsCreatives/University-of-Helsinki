import React from 'react'

const CountryInfo = ({name, capital, area, languages, flag}) => {
    const languageArray = [...Object.values(languages)];
  return (
    <div>
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <b>Languages:</b>
        <ul>
            {languageArray.map(language => (<li key={language}>{language}</li>))}
        </ul>
        <img src={flag} alt={"Flag of" + name} />
    </div>
  )
}

export default CountryInfo