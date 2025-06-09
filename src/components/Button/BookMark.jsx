import { useCallback } from "react";

import Icon from "../common/Icon";
import bookMark from "../../assets/icons/bookMark.svg";

// type: place 또는 route
const BookMark = ({ type = "place", onClick }) => {
  const bgColor = "#a5c64d";
  const altText = type === "route" ? "루트 북마크" : "장소 북마크";

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; // .env에서 베이스 url 불러오기
  const token = localStorage.getItem("token"); // 토큰 가져오기

  const handleClick = useCallback(async () => {
    let response;
    if (type === "place") {
      // 장소 북마크 api
      console.log("장소 북마크 호출");
      response = await fetch(
        `${VITE_BASE_URL}/api/places/${placeId}/bookmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
    } else {
      // 루트 북마크 api
      console.log("루트 북마크 호출");
      response = await fetch(
        `${VITE_BASE_URL}/api/mypages/bookmarks/${routeId}`, // 루트 id 연결하면 마저 진행해야할듯
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );
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
};

export default BookMark;
