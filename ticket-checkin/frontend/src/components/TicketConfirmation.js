import React from 'react';

export default function TicketConfirmation(props) {
    console.log("HERE")
    const handleConfirm = () => {
        const apiLink = 'https://ticket-checkin-bjpjvpbobq-nw.a.run.app/check-in/'
        fetch(apiLink + props.code,{
            method:'POST'
        })
        props.clearCurrent();
    }

    return (
        <div className="Ticket-info">
            <div>
                <p>Name: </p>
                <p>{props.firstname + " " + props.surname}</p>
                <p>Email:</p>
                <p>{props.email}</p>
                <p>Ticket code:</p>
                <p>{props.code}</p>
            </div>
            <div>
                <button className="themed-btn" onClick={handleConfirm}>Confirm</button>
                <button className="themed-btn" onClick={props.clearCurrent}>Discard</button>
            </div>
            <div>
                { props.timestamp &&
                    <>
                        <p>Timestamp:</p>
                        <p>{props.timestamp}</p>
                    </>
                }
            </div>
        </div>
    );
}