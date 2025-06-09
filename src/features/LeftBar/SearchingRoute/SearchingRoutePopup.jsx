import styles from "./SearchingRoutePopup.module.css";

import RouteHeader from "../../../components/MakeRoute/RouteHeader";
import RouteStepCard from "../../../components/MakeRoute/RouteStepCard";
import RatingCard from "../../../components/Rating/RatingCard";
import ReportFooter from "../../../components/ReportFooter/ReportFooter";
import Profile from "../../../components/common/profile";
import BookMark from "../../../components/Button/BookMark";
import Likes from "../../../components/Button/likes";
import NickName from "../../../components/common/NickName";

const routeSteps = [
  {
    step: 1,
    color: "pink",
    name: "byTOFU",
    time: "9:00 - 15:00",
    address: "123 Hansik-ro, Eumsik-si, Seoul, 444555",
    phone: "+375 (17) 327-10-45",
  },
  {
    step: 2,
    color: "gray",
    name: "가게 이름",
    time: "10:00 - 14:00",
    address: "456 Food Rd, Seoul",
    phone: "+82-10-1234-5678",
  },
];

const SearchingRoutePopup = () => {
  return (
    <div className={styles.route}>
      <div className={styles.scroll}>
        <RouteHeader />
        <div className={styles.div}>
          <Profile /> 
          <NickName />
          <BookMark type="route" />
          <Likes type="route" />
        </div>
        {routeSteps.map((stepData, idx) => (
          <RouteStepCard key={idx} {...stepData} />
        ))}
        <RatingCard averageRating={4.2} userRating={3} onRate={(rating) => {}} />  
        <ReportFooter />
      </div>
    </div>
  );
};

export default SearchingRoutePopup;
