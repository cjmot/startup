import React from 'react';

import { CartEvent, CartNotifier } from "./cartNotifier";

export function CartNotifications(props) {

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        CartNotifier.addHandler(handleCartEvent);

        return () => {
            CartNotifier.removeHandler(handleCartEvent);
        };
    });

    function handleCartEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';
            if (event.type === CartEvent.cartUpdate) {
                message = `added ${event.value} to their cart`;
                console.log(event.from)
            } else if (event.type === CartEvent.System) {
                message = event.value.msg;
            }

            messageArray.unshift(
                <div key={i} className='text-sm'>
                    <span className='font-bold'>{event.from} </span>
                    {message}
                </div>
            );
        }
        return messageArray;
    }

    return (
        <div id='users' className='absolute top-0 self-start justify-self-start w-1/3 '>
            <div id='messages' className='hover:overflow-y-auto hover:h-48 overflow-hidden h-20'>{createMessageArray()}</div>
        </div>
    );
}
