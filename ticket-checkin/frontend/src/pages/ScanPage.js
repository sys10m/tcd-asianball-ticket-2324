import React, { useState, useEffect } from 'react';
import { useZxing } from 'react-zxing';
import TicketConfirmation from '../components/TicketConfirmation';
import Link from '../components/Link';

export default function ScanPage(){
    const [camOn, setCamOn] = useState(false);
    const [manualInput, setManualInput] = useState("");
    const [currentTicket, setCurrentTicket] = useState("");
    const [currentInfo, setCurrentInfo] = useState();
    const { ref } = useZxing({
        onDecodeResult(result) {
          setCurrentTicket(result.getText());
          setCamOn(false);
        },
        paused: !camOn
      });

    const handleTextChange = (event) => {
        setManualInput(event.target.value);
    }
    const handleSubmitBtn = () => {
        setCurrentTicket(manualInput);
        setManualInput("");
        setCamOn(false);
    }
    
    useEffect(() => {
        console.log("current ticket" + currentTicket);
        const apiLink = 'https://ticket-checkin-bjpjvpbobq-nw.a.run.app/ticketinfo/'
        if (currentTicket){
            fetch(apiLink + currentTicket, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => setCurrentInfo(data.data));
        }
    }, [currentTicket])

    const clearCurrent = () => {
        setCurrentTicket("");
        setCurrentInfo();
    }
    
    const handleScanBtn = () => {
        setCamOn((prev) => !prev);
    }

    return (
        <div className="ScanPage">
            <div>
                {camOn &&
                <video className='scanbox' ref={ref} />
                }
            </div>
            {currentInfo &&
                <TicketConfirmation firstname={currentInfo.firstname} surname={currentInfo.surname} email={currentInfo.email} code={currentTicket} timestamp={currentInfo.timestamp} clearCurrent={clearCurrent}/>
            }
            <div>      
                <input className='ticket-id-input' value={manualInput} onChange={handleTextChange} type='text' placeholder='Ticket id (e.g. 12345678901)'></input>
                <button className="themed-btn" onClick={handleSubmitBtn}>Submit</button>
            </div>
            <div>
                <button className="themed-btn" onClick={handleScanBtn}>{camOn? "Camera Off": "Scan"}</button>
            </div>
        </div>
    );
}