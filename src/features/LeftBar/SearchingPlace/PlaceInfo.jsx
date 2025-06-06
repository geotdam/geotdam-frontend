import PlaceHeader from '../../../components/MakeRoute/PlaceHeader';
import Search from '../../../components/Search/Search'
import SearchingRoad from '../../../components/Button/SearchingRoad';
import TransportModes from '../../../components/MakeRoute/TransportModes';
import PlaceInfoCard from '../../../components/PlaceInfo/PlaceInfoCard';
import RatingCard from '../../../components/Rating/RatingCard';
import ReportFooter from '../../../components/ReportFooter/ReportFooter';

const PlaceInfo = () => {
  return (
    <>
      <PlaceHeader />
      <Search />
      <SearchingRoad />
      <TransportModes />
      <PlaceInfoCard />
      <RatingCard />
      <ReportFooter />
    </>
  );
};

export default PlaceInfo;