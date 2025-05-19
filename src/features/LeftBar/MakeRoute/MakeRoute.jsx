import PlaceHeader from '../../../components/MakeRoute/PlaceHeader';
import TransportModes from '../../../components/MakeRoute/TransportModes';
import PlaceInfoCard from '../../../components/PlaceInfo/PlaceInfoCard';
import RatingCard from '../../../components/Rating/RatingCard';
import ReportFooter from '../../../components/ReportFooter/ReportFooter';

const MakeRoute = () => {
  return (
    <>
      <PlaceHeader />
      <TransportModes />
      <PlaceInfoCard />
      <RatingCard />
      <ReportFooter />
    </>
  );
};

export default MakeRoute;