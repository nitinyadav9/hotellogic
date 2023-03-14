import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function HotelResults() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const destination = params.get("destination");
      const checkInDate = params.get("checkInDate");
      const checkOutDate = params.get("checkOutDate");
      const guests = params.get("guests");

      try {
        const response = await axios.get(
          `https://api.example.com/hotels?destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`
        );
        setHotels(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div>
      <h2>Hotel Results</h2>
      {hotels.length === 0 && <p>No hotels found for the selected criteria.</p>}
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.name}</h3>
          <p>{hotel.address}</p>
          <p>{hotel.price}</p>
        </div>
      ))}
    </div>
  );
}

export default HotelResults;
