import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import ReportFooter from '../../../components/ReportFooter/ReportFooter';
import RecentPlace from '../../../components/RecentPlace/RecentPlace';
import PlaceInfoSimple from '../../../components/PlaceInfo/PlaceInfoSimple';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; // .env에서 베이스 url 불러오기

const useQuery = () => {
  const { search } = useLocation();
  return new URLSearchParams(search);
};

const SearchingPlace = () => {
  const query = useQuery().get('query');
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${VITE_BASE_URL}/api/places`, {
          params: { query }
        });

        console.log(res);

        if (res.data?.isSuccess && Array.isArray(res.data.result)) {
          setPlaces(res.data.result);
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

  return (
    <>
      <RecentPlace />

      {places.length > 0 && (
        <div>
          {places.map((place, index) => {
            const label = String.fromCharCode(65 + index); // 65 = 'A'
            return (
              <PlaceInfoSimple key={place.id} place={place} label={label} />
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