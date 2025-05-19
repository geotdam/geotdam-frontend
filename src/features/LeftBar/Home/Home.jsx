import ReportFooter from '../../../components/ReportFooter/ReportFooter';
import RecentPlace from '../../../components/RecentPlace/RecentPlace';
import HottestRoute from '../../../components/HottestRoute/HottestRoute';

const Home = () => {
    return (
        <>
            <RecentPlace />
            <NearByBench />
            <HotRouteAround
                onMoreClick={() => onRouteSelect()}
                onRouteSelect={onRouteSelect}
            />
            <MyRoute onNewRouteClick={onNewRoute} />
            <AddFeat />
            <ReportFooter />
        </>
    );
};

export default Home;