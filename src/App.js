import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";

function App() {
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(
      `/hotels?destination=${destination}&checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&guests=${guests}`
    );
  };

  const handleDestinationChange = async (value) => {
    setDestination(value);

    try {
      const response = await axios.get(
        `https://api.example.com/suggestions?query=${value}`
      );
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (value, name) => {
    if (name === "checkInDate") {
      setCheckInDate(value);
    } else if (name === "checkOutDate") {
      setCheckOutDate(value);
    }
  };

  return (
    <div>
      <h2>Hotel Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="destination">Destination City:</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => handleDestinationChange(e.target.value)}
        />
        {destinationSuggestions.length > 0 && (
          <ul>
            {destinationSuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => setDestination(suggestion.name)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}

        <label htmlFor="checkInDate">Check-in Date:</label>
        <Calendar
          id="checkInDate"
          value={checkInDate}
          onChange={(value) => handleDateChange(value, "checkInDate")}
        />

        <label htmlFor="checkOutDate">Check-out Date:</label>
        <Calendar
          id="checkOutDate"
          value={checkOutDate}
          onChange={(value) => handleDateChange(value, "checkOutDate")}
        />

        <label htmlFor="guests">Guests:</label>
        <input
          type="number"
          id="guests"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <button type="submit">Search Hotels</button>
      </form>
    </div>
  );
}

export default App;
