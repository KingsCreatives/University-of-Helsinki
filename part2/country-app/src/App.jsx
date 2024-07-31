import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [matchingCountries, setMatchingCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  const performSearch = async () => {
    setIsLoading(true)
    setError(null)
    try{
      const res = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`)
      
      if(res.data.length > 10){
        setMatchingCountries([])
        setError('Too many matches, please be more specific')
      }else if(res.data.length > 1){
        setMatchingCountries(res.data)
        setSelectedCountry(null)
      }else if(res.data.length === 1){
        setSelectedCountry(res.data[0])
        setMatchingCountries([])
      }
    }
    catch(err){
      setError('Failed to fetch contries')
      setMatchingCountries([])
      setSelectedCountry(null)
    }

    setIsLoading(false)
  }

 useEffect(() => {
  if(searchQuery){
    const timeoutId = setTimeout(performSearch,300)
    return () => clearTimeout(timeoutId)
  }else{
    setMatchingCountries([])
    setSelectedCountry(null)
  }
 }, [searchQuery])

 const renderResult = () => {
  if(isLoading) return <p>Loading....</p>
  if(error) return <p>{error}</p>
  if(selectedCountry){
  
    return (
      <div>
        <Country
          name={selectedCountry.name.common}
          capital={selectedCountry.capital[0]}
          area={selectedCountry.area}
          flag={selectedCountry.flags.png}
          languages={selectedCountry.languages}
        />
      </div>
    );
  }
  if(matchingCountries.length > 0){
    return (
      <ul>
        {matchingCountries.map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    );
  }

  return null
 }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        Find countries <input value={searchQuery} onChange={handleSearchChange} />
      </form>
      {renderResult()}
    </div>
  );
    
}

export default App
