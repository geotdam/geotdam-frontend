import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// 환경변수에서 BASE_URL을 가져오거나, 기본값 사용
const BASE_URL = import.meta.env.VITE_BASE_URL;

// 토큰을 가져오는 함수
const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
};

let socket;
const initializeSocket = () => {
    try {
        const token = getToken();
        if (token && !socket) {
            socket = io(BASE_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling'],
                auth: {
                    token: token
                },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                timeout: 10000
            });
            
            socket.on('connect', () => {
                console.error('Socket connected successfully');
            });

            socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
                // 연결 실패 시 소켓 인스턴스 정리
                if (socket) {
                    socket.disconnect();
                    socket = null;
                }
            });

            socket.on('disconnect', (reason) => {
                console.error('Socket disconnected:', reason);
                // 의도하지 않은 연결 종료인 경우 재연결 시도
                if (reason === 'io server disconnect') {
                    socket.connect();
                }
            });
        }
    } catch (error) {
        console.error('Socket initialization error:', error);
        if (socket) {
            socket.disconnect();
            socket = null;
        }
    }
};

// 초기 소켓 연결 시도
initializeSocket();

export const useLocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [needsLogin, setNeedsLogin] = useState(false);

    const sendLocation = async (position) => {
        const token = getToken();
        if (!token) {
            setNeedsLogin(true);
            const error = '로그인이 필요합니다.';
            setError(error);
            return;
        }

        const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };

        try {
            // Socket이 연결되어 있지 않다면 재연결 시도
            if (!socket || !socket.connected) {
                initializeSocket();
            }

            // Socket으로 실시간 전송
            if (socket && socket.connected) {
                socket.emit('sendLocation', locationData);
            }

            // HTTP로 서버에 저장
            const response = await fetch(`${BASE_URL}/api/location`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(locationData)
            });

            const data = await response.json();
            
            if (!data.isSuccess) {
                // 토큰 만료 또는 인증 오류 체크
                if (data.code === 401 || data.code === 403 || data.message?.toLowerCase().includes('token')) {
                    setNeedsLogin(true);
                    throw new Error('로그인이 필요합니다.');
                }
                throw new Error(data.message);
            }

            // 서버 응답에서 위치 정보를 localStorage에 저장
            if (data.result) {
                const locationInfo = {
                    userId: data.result.userId,
                    latitude: data.result.latitude,
                    longitude: data.result.longitude,
                    lastUpdated: new Date().toISOString()
                };
                localStorage.setItem('currentLocation', JSON.stringify(locationInfo));
            }

            setCurrentLocation(data.result);
            return data;
        } catch (err) {
            // 네트워크 오류나 기타 오류에서 토큰 관련 에러 체크
            if (err.message?.includes('로그인') || err.message?.includes('token') || err.message?.includes('인증')) {
                setNeedsLogin(true);
            }
            setError(err.message);
            throw err;
        }
    };

    const getCurrentLocation = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            const error = 'Geolocation이 지원되지 않습니다.';
            setError(error);
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    await sendLocation(position);
                } finally {
                    setIsLoading(false);
                }
            },
            (err) => {
                const error = '위치 정보를 가져올 수 없습니다: ' + err.message;
                setError(error);
                setIsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    useEffect(() => {
        if (socket) {
            socket.on('receiveLocation', () => {
                // Handle received location data silently
            });

            return () => {
                socket.off('receiveLocation');
            };
        }
    }, []);

    return {
        currentLocation,
        error,
        isLoading,
        needsLogin,
        setNeedsLogin,  // setNeedsLogin 함수를 외부로 노출
        getCurrentLocation
    };
}; 