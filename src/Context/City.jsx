import { createContext, useState } from 'react';

const PlaceContext = createContext();

const PlaceProvider = ({ children }) => {
  const [place, setPlace] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(false);

  console.log(searchTrigger,'context');


  return (
    <PlaceContext.Provider value={{ place, setPlace , searchTrigger, setSearchTrigger }}>
      {children}
    </PlaceContext.Provider>
  );
};

export { PlaceContext, PlaceProvider };
