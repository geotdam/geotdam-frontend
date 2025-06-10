import styles from "./SearchingRoutePopup.module.css";

import RouteHeader from "../../../components/MakeRoute/RouteHeader";
import RouteStepCard from "../../../components/MakeRoute/RouteStepCard";
import RatingCard from "../../../components/Rating/RatingCard";
import ReportFooter from "../../../components/ReportFooter/ReportFooter";
import Profile from "../../../components/common/profile";
import BookMark from "../../../components/Button/BookMark";
import Likes from "../../../components/Button/likes";
import NickName from "../../../components/common/NickName";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchingRoutePopup = ({ routeId, onClose }) => {
  const [searchParams] = useSearchParams();
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchRouteDetail = async () => {
      const token = localStorage.getItem('token');
      let res;

      try {
        res = await axios.get(`${VITE_BASE_URL}/api/road/${routeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRouteData(res.data.result);
      } catch (err) {
        console.error("루트 상세 정보 불러오기 실패:", err);
      }
    };

    if (routeId) fetchRouteDetail();
  }, [routeId]);

  if (!routeData) return <div>Loading...</div>;

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
