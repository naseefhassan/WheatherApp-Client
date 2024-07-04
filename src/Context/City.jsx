import { createContext, useState } from 'react';

const PlaceContext = createContext();

const PlaceProvider = ({ children }) => {
  const [place, setPlace] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [Favorite, setFavorite]= useState([])


  return (
    <PlaceContext.Provider value={{ place, setPlace , searchTrigger, setSearchTrigger, Favorite, setFavorite }}>
      {children}
    </PlaceContext.Provider>
  );
};

export { PlaceContext, PlaceProvider };
