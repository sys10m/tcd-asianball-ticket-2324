import React, { useEffect, useState } from 'react';
import Link from '../components/Link';

export default function StatPage(){

    const [checkedIn, setCheckedIn] = useState(0)

    useEffect(() => {
        // fetch all data

        setCheckedIn(150)
        
        // do the stats
    }, [])

    return (
        <div className="StatPage">
            <div className="Stats">
                <div>
                    <h1>Checked in</h1>
                    <p>{checkedIn}</p>
                </div>
                <div>
                    <h1>Left</h1>
                    <p>{187-checkedIn}</p>
                </div>

            </div>
            <Link to='/scan'>
                <button className="themed-btn">Go Back</button>
            </Link>
            <button className="themed-btn">refresh</button>
        </div>
    )
}