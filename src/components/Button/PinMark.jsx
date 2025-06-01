import { useCallback } from 'react'

import Icon from '../common/Icon';
import pinIcon from '../../assets/icons/pin.svg';
import BenchMark from '../Icon/BenchMark'

const PinMark = () => {
    const onPinMarkClick = useCallback(() => {
        // Nearby bench 옆의 핀 아이콘 클릭
        // 지도 상에 보여질 벤치 위치들을 가져와서
        // 벤치 아이콘들을 지도에 띄워준다.
        // (선택) 한 번 더 누르면 벤치 마킹 사라지게 -> api 추가 제작x 프론트에서 구현해주세요~ 사유: 다시 띄울 때 빨리 떠야 함

        // 벤치 아이콘은 컴포넌트로 등록해뒀습니다.
        // <BenchMark />
    }, []);

    return (
        <Icon src={pinIcon} alt="핀 아이콘" backgroundColor="#ffffff00" />
    );
}

export default PinMark;