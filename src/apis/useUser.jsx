import { useEffect, useState } from "react";
import { fetchUserById } from "./user.jsx";
import profileImage from "../assets/mock/profile.svg";

const useUser = (userId) => {
  const [user, setUser] = useState({
    profileImage: profileImage,
    nickname: "알 수 없음",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUserById(userId);
        setUser({
          profileImage: data.imageUrl || profileImage,
          nickname: data.nickname || "알 수 없음",
        });
      } catch (err) {
        console.error("작성자 정보 불러오기 실패:", err);
      }
    };

    if (userId) getUser();
  }, [userId]);

  return user;
};

export default useUser;
