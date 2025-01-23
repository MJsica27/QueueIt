import React, { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { BASE_URL } from '../../Global_vars/Urls';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
    const [client, setClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS(`${BASE_URL}/ws`);
        const stompClient = Stomp.over(socket);
        
        stompClient.connect({}, () => {
            setClient(stompClient);
        });

        return () => {
            if (stompClient.connected) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={client}>
            {children}
        </WebSocketContext.Provider>
    );
};