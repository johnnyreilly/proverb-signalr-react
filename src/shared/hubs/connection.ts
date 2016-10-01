import $ from "jquery";
import "signalr";

let connection: SignalR.Hub.Connection;

export function getConnection() {
    if (!connection) {
        connection = $.hubConnection(__CONNECTION_URL__);
    }

    return connection;
}

export function performHubAction(action: () => void) {
    if (connection && connection.state === $.signalR.connectionState.disconnected) {
        connection.start().done(action);
    }
    else {
        action();
    }
}
