import styles from "./LeftBar.module.css";

import Search from "../../components/Search/Search";
import RecentPlace from "../../components/RecentPlace/RecentPlace";
import NearByBench from "../../components/NearByBench/NearbyBench";
import HotRouteAround from "../../components/HotRouteAround/HotRouteAround";
import MyRoute from "../../components/MyRoute/MyRoute";
import AddFeat from "../../components/Button/AddFeat";
import ReportFooter from "../../components/ReportFooter/ReportFooter";

<<<<<<< HEAD
import SearchingRoute from "./SearchingRoute/SearchingRoute";
import MakeRoute from "./MakeRoute/MakeRoute";
import Mypage from "./MyPage/MyPage";
=======
import SearchingRoute from './SearchingRoute/SearchingRoute';
import MakeRoute      from './MakeRoute/MakeRoute';
import SearchingPlace from './SearchingPlace/SearchingPlace';
>>>>>>> b1ed7aae699e36ae1f106376a793b14309cf7926

const Leftbar = ({ view, onAction }) => {
  return (
    <div className={styles.leftbar}>
      <Search />

      <div className={styles.scroll}>
        {view === "home" && (
          <>
            <RecentPlace />
            <NearByBench />
            {/* “More” 클릭 시 */}
            <HotRouteAround onMoreClick={() => onAction("MORE_ROUTES")} />
            {/* “Make Route” 클릭 시 */}
            <MyRoute onNewRouteClick={() => onAction("NEW_ROUTE")} />
            <AddFeat />
            <ReportFooter />
          </>
        )}

        {view === "makeRoute" && <MakeRoute onBack={() => onAction("BACK")} />}

        {view === "searchingRoute" && (
          <SearchingRoute onBack={() => onAction("BACK")} />
        )}

        {view === "searchingPlace" && (
          <SearchingRoute onBack={() => onAction("BACK")} />
        )}

<<<<<<< HEAD
        {view === "mypage" && <Mypage onBack={() => onAction("BACK")} />}
=======
        {view === 'searchingPlace' && (
          <SearchingPlace onBack={() => onAction('BACK')} /> 
        )}
>>>>>>> b1ed7aae699e36ae1f106376a793b14309cf7926
      </div>
    </div>
  );
};

export default Leftbar;
