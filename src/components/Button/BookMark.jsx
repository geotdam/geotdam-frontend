import { useCallback } from 'react'

import Icon from '../common/Icon';
import bookMark from '../../assets/icons/bookMark.svg';

const BookMark = () => {
    const onBookMarkClick = useCallback(() => {
        // 프로필 클릭
    }, []);

    return (
        <Icon src={bookMark} alt="북마크 아이콘" backgroundColor="#a5c64d" />
    );
}

export default BookMark;