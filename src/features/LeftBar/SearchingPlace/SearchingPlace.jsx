import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import ReportFooter from '../../../components/ReportFooter/ReportFooter';
import RecentPlace from '../../../components/RecentPlace/RecentPlace';
import PlaceInfoSimple from '../../../components/PlaceInfo/PlaceInfoSimple';
import PlaceInfo from './PlaceInfo';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; // .env에서 베이스 url 불러오기

const useQuery = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

const SearchingPlace = () => {
  const query = useQuery().get('query');
  const placeId = useQuery().get('placeId');
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    setPlaces([]);
    setError(null);

    const fetchData = async () => {
      try {
        const res = await axios.get(`${VITE_BASE_URL}/api/places`, {
          params: { query }
        }); 

        if (res.data?.isSuccess && Array.isArray(res.data.result)) {
        const uniquePlaces = Array.from(
          new Map(res.data.result.map(p => [p.place_id, p])).values()
        );
        setPlaces(uniquePlaces);
      } else {
        setPlaces([]);
      }
      } catch (err) {
        console.error('검색 실패', err.message);
        setError(err.response?.data?.message || '네트워크 오류 또는 서버 응답 없음');
      }
    };

    if (query) fetchData();
  }, [query]);

  useEffect(() => {
    if (placeId && places.length > 0) {
      const foundPlace = places.find((p) => p.place_id === placeId);
      setSelectedPlace(foundPlace);
    }
  }, [placeId, places]);


  if (placeId && selectedPlace) {
    return <PlaceInfo place={selectedPlace} />;
  }

  return (
    <>
      <RecentPlace />

      {places.length > 0 && (
        <div>
          {places.map((place, index) => {
            const label = String.fromCharCode(65 + index); // 65 = 'A'
            return (
              <PlaceInfoSimple
                key={place.place_id}
                place={place}
                label={label}
                onClick={() => navigate(`?query=${query}&placeId=${place.place_id}`)}
              />
            );
          })}
        </div>
      )}

      {places.length === 0 && (
        <div style={{ padding: '1rem' }}> ...</div>
      )}

      <ReportFooter />
    </>
  );
};

export default SearchingPlace;