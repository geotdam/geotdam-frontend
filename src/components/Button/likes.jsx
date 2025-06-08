import { useCallback } from "react";

import Icon from "../common/Icon";
import heartMark from "../../assets/icons/heartMark.svg";

// 루트 좋아요
// type: route
const Likes = ({ type = "route", onClick }) => {
  const bgColor = "#a5c64d";
  const altText = "루트 좋아요";

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; // .env에서 베이스 url 불러오기
  const token = localStorage.getItem("token"); // 토큰 가져오기

  const handleClick = useCallback(async () => {
    let response;
    // 루트 좋아요 api
    console.log("루트 좋아요 호출");
    response = await fetch(`${VITE_BASE_URL}api/likes/${routeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    if (onClick) onClick(type, data);
  }, [type, onClick]);

  return (
    <Icon
      src={heartMark}
      alt={altText}
      backgroundColor={bgColor}
      onClick={handleClick}
    />
  );
};

export default Likes;
