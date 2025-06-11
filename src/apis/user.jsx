import axios from "axios";

export const fetchUserById = async (userId) => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error("토큰이 없습니다.");

  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.user; // { nickname, imageUrl }
};
