const CartEvent = {
    System: 'system',
    cartUpdate: 'cartUpdate',
}

class EventMessage {
    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class CartEventNotifier {
    events = [];
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('Kingsland', CartEvent.System, { msg: 'connected' }));
        };
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('Kingsland', CartEvent.System, { msg: 'disconnected' }));
        };
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    }

    receiveEvent(event) {
        this.events.push(event);

        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }

    broadcastEvent(from, type, value) {
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }
}

const CartNotifier = new CartEventNotifier();
export { CartNotifier, CartEvent };