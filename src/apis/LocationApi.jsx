import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// 환경변수에서 BASE_URL을 가져오거나, 기본값 사용
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log('🌐 API Base URL:', BASE_URL);

// 토큰을 가져오는 함수
const getToken = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
};

let socket;
try {
    const token = getToken();
    if (token) {
        socket = io(BASE_URL, {
            withCredentials: true,
            transports: ['websocket'],
            auth: {
                token: token // 소켓 연결 시 토큰 전달
            }
        });
        
        socket.on('connect', () => {
            console.log('🔌 Socket connected successfully');
        });

        socket.on('connect_error', (error) => {
            console.error('🔌 Socket connection error:', error);
        });
    } else {
        console.error('🔌 Socket initialization failed: No token available');
    }
} catch (error) {
    console.error('🔌 Socket initialization error:', error);
}

export const useLocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendLocation = async (position) => {
        console.log('📍 Getting current position:', position);
        const token = getToken();
        if (!token) {
            const error = '토큰이 없습니다.';
            console.error('🔑 Authorization error:', error);
            setError(error);
            return;
        }

        const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
        console.log('📍 Location data to send:', locationData);

        try {
            // Socket으로 실시간 전송
            if (socket && socket.connected) {
                socket.emit('sendLocation', locationData);
                console.log('📡 Location sent via socket');
            } else {
                console.warn('📡 Socket not connected, skipping socket emission');
            }

            // HTTP로 서버에 저장
            console.log('🌐 Sending HTTP request to:', `${BASE_URL}/api/location`);
            const response = await fetch(`${BASE_URL}/api/location`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token // Bearer 토큰 포함
                },
                body: JSON.stringify(locationData)
            });

            const data = await response.json();
            console.log('✅ Server response:', data);
            
            if (!data.isSuccess) {
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
                console.log('📍 Location saved to localStorage:', locationInfo);
            }

            setCurrentLocation(data.result);
            return data;
        } catch (err) {
            console.error('❌ Error in sendLocation:', err);
            setError(err.message);
            throw err;
        }
    };

    const getCurrentLocation = () => {
        console.log('📍 Getting current location...');
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            const error = 'Geolocation이 지원되지 않습니다.';
            console.error('❌ Geolocation error:', error);
            setError(error);
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    await sendLocation(position);
                    console.log('✅ Location process completed successfully');
                } catch (err) {
                    console.error('❌ Location process failed:', err);
                } finally {
                    setIsLoading(false);
                }
            },
            (err) => {
                const error = '위치 정보를 가져올 수 없습니다: ' + err.message;
                console.error('❌ Geolocation error:', error);
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
            socket.on('receiveLocation', (data) => {
                console.log('📡 다른 유저 위치 수신:', data);
            });

            return () => {
                console.log('🔌 Cleaning up socket listeners');
                socket.off('receiveLocation');
            };
        }
    }, []);

    return {
        currentLocation,
        error,
        isLoading,
        getCurrentLocation
    };
}; 