import { useCallback } from 'react'

import Icon from '../common/Icon';
import bookMark from '../../assets/icons/bookMark.svg';

// type: place 또는 route
const BookMark = ({ type = 'place', onClick }) => {
    const bgColor = '#a5c64d';
    const altText = type === 'route' ? '루트 북마크' : '장소 북마크';

    const handleClick = useCallback(async () => {
        let response;
        if (type === 'place') {
            // 장소 북마크 apia
            console.log('장소 북마크 호출');
            response = await fetch('/api/', {
                method: '',
                headers: {},
                body: JSON.stringify({ /* 리퀘스트 바디 */ }),
            });
        } else {
            // 루트 북마크 api
            console.log('루트 북마크 호출');
            response = await fetch('/api/', {
                method: '',
                headers: {},
                body: JSON.stringify({ /* 리퀘스트 바디 */ }),
            });
        }

        const data = await response.json();
        if (onClick) onClick(type, data);
    }, [type, onClick]);

    return (
        <Icon
            src={bookMark}
            alt={altText}
            backgroundColor={bgColor}
            onClick={handleClick}
        />
    );
}

export default BookMark;