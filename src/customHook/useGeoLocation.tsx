import { useState, useEffect } from "react";
import { errorHandler } from "utils/toaster/toaster";
import axios from "axios";
import { geoLocationAddress } from "types";

const useGeoLocation = () => {
  const [geoLocation, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<geoLocationAddress | null>(null);

  const handleError = () => {
    setAddress({
      country: "India",
      state: "Telangana",
      city: "Hyderabad",
    });
  };

  const handleSuccess = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const data = response.data;
      const country = data.address.country || "";
      const state = data.address.state || "";
      const city =
        data.address.city || data.address.town || data.address.village || "";
      const postalCode = data.address.postcode || "";

      setAddress({ country, state, city, postalCode });
    } catch (error) {
      errorHandler("Error fetching address information.");
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      errorHandler("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { geoLocation, address };
};

export default useGeoLocation;
