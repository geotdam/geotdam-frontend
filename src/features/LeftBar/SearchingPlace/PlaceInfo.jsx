import PlaceHeader from '../../../components/MakeRoute/PlaceHeader';
import StartSearch from '../../../components/Search/StartSearch'
import SearchingRoad from '../../../components/Button/SearchingRoad';
import TransportModes from '../../../components/MakeRoute/TransportModes';
import PlaceInfoCard from '../../../components/PlaceInfo/PlaceInfoCard';
import RatingCard from '../../../components/Rating/RatingCard';
import ReportFooter from '../../../components/ReportFooter/ReportFooter';

const PlaceInfo = ( { place } ) => {
  return (
    <>
      <PlaceHeader place={place} />
      <StartSearch />
      <SearchingRoad />
      <TransportModes />
      <PlaceInfoCard place={place} />
      <RatingCard />
      <ReportFooter />
    </>
  );
};

export default PlaceInfo;