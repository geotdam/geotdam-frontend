import styles from './LeftBar.module.css';

import Search         from '../../components/Search/Search';
import RecentPlace    from '../../components/RecentPlace/RecentPlace';
import NearByBench    from '../../components/NearByBench/NearbyBench';
import HotRouteAround from '../../components/HotRouteAround/HotRouteAround';
import MyRoute        from '../../components/MyRoute/MyRoute';
import AddFeat        from '../../components/Button/AddFeat';
import ReportFooter   from '../../components/ReportFooter/ReportFooter';

import SearchingRoute from './SearchingRoute/SearchingRoute';
import MakeRoute      from './MakeRoute/MakeRoute';

const Leftbar = ({ view, onAction }) => {
  return (
    <div className={`${styles.leftbar} leftbar`}>
      <Search />

      <div className={styles.scroll}>
        {view === 'home' && (
          <>
            <RecentPlace />
            <NearByBench />
            {/* "More" 클릭 시 */}
            <HotRouteAround onMoreClick={() => onAction('MORE_ROUTES')} />
            {/* "Make Route" 클릭 시 */}
            <MyRoute onNewRouteClick={() => onAction('NEW_ROUTE')} />
            <AddFeat />
            <ReportFooter />
          </>
        )}

        {view === 'makeRoute' && (
          <MakeRoute onBack={() => onAction('BACK')} />
        )}

        {view === 'searchingRoute' && (
          <SearchingRoute onBack={() => onAction('BACK')} />
        )}
      </div>
    </div>
  );
};

export default Leftbar;
