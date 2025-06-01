import RecentPlace from '../../../components/RecentPlace/RecentPlace';
import HotRouteAround from '../../../components/HotRouteAround/HotRouteAround';
import ReportFooter from '../../../components/ReportFooter/ReportFooter';

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