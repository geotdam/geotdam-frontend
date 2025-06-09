import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MakeRoutePopup from './MakeRoutePopup';
import SearchingPlace from '../SearchingPlace/SearchingPlace'; 

const MakeRoute = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');   

  return (
    <>
      <SearchingPlace
        query={query} 
        mode="embedded"
      />
      <MakeRoutePopup /> 
    </>
  );
};

export default MakeRoute;