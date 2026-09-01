import { useEffect } from "react";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function Notification() {

    useEffect(() => {

        const socket = new SockJS(
            "https://lostandfound-production-33dc.up.railway.app/ws"
        );

        const client = new Client({

            webSocketFactory: () => socket,

            reconnectDelay: 5000,

            onConnect: () => {

                console.log("WebSocket Connected");

                client.subscribe(
                    "/topic/notifications",

                    (message) => {

                        const notification =
                            JSON.parse(message.body);

                        console.log(notification);

                        alert(notification.message);
                    }
                );
            }
        });

        client.activate();

    }, []);

    return null;
}

export default Notification;