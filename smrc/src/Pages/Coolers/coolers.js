import { useState } from 'react';
import './coolers.scss';

const Coolers = () => {

    const [coolerNominations, setCN] = useState([
        {
            nominee: 'Brian Jordan',
            dateBrought: '1/1/2025',
            nominatorComment: 'This cooler was super great',
            nominatorName: 'Logan Holmes'
        }, {
            nominee: 'Brian Eggleston',
            dateBrought: '1/8/2025',
            nominatorComment: 'Brian always brings a great cooler. This one specifically had all the things I like. Brian brought the cooler back for multiple weeks with all of the leftovers. Truly a great cooler',
            nominatorName: 'Cindy Richmond'
        }, {
            nominee: 'Logan Holmes',
            dateBrought: '1/15/2025',
            nominatorComment: '',
            nominatorName: 'Rob Tagher'
        }, {
            nominee: 'Brian Eggleston',
            dateBrought: '1/8/2025',
            nominatorComment: 'Brian always brings a great cooler. This one specifically had all the things I like. Brian brought the cooler back for multiple weeks with all of the leftovers. Truly a great cooler',
            nominatorName: 'Cindy Richmond'
        }, {
            nominee: 'Logan Holmes',
            dateBrought: '1/15/2025',
            nominatorComment: '',
            nominatorName: 'Rob Tagher'
        }, {
            nominee: 'Brian Eggleston',
            dateBrought: '1/8/2025',
            nominatorComment: 'Brian always brings a great cooler. This one specifically had all the things I like. Brian brought the cooler back for multiple weeks with all of the leftovers. Truly a great cooler',
            nominatorName: 'Cindy Richmond'
        }, {
            nominee: 'Logan Holmes',
            dateBrought: '1/15/2025',
            nominatorComment: '',
            nominatorName: 'Rob Tagher'
        }, {
            nominee: 'Brian Eggleston',
            dateBrought: '1/8/2025',
            nominatorComment: 'Brian always brings a great cooler. This one specifically had all the things I like. Brian brought the cooler back for multiple weeks with all of the leftovers. Truly a great cooler',
            nominatorName: 'Cindy Richmond'
        }, {
            nominee: 'Logan Holmes',
            dateBrought: '1/15/2025',
            nominatorComment: '',
            nominatorName: 'Rob Tagher'
        }, {
            nominee: 'Brian Eggleston',
            dateBrought: '1/8/2025',
            nominatorComment: 'Brian always brings a great cooler. This one specifically had all the things I like. Brian brought the cooler back for multiple weeks with all of the leftovers. Truly a great cooler',
            nominatorName: 'Cindy Richmond'
        }, {
            nominee: 'Logan Holmes',
            dateBrought: '1/15/2025',
            nominatorComment: '',
            nominatorName: 'Rob Tagher'
        }, {
            nominee: 'Brian Eggleston',
            dateBrought: '1/8/2025',
            nominatorComment: 'Brian always brings a great cooler. This one specifically had all the things I like. Brian brought the cooler back for multiple weeks with all of the leftovers. Truly a great cooler',
            nominatorName: 'Cindy Richmond'
        }, {
            nominee: 'Logan Holmes',
            dateBrought: '1/15/2025',
            nominatorComment: '',
            nominatorName: 'Rob Tagher'
        }
    ]);

    // Validate duplicate cooler nominations by making sure no cooler within 6 days either side. If so, they have wrong date or its a duplicate
    // Look into forced select of an existing user
    // Read nominator name from user account
    return (
        <div className="cooler-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Cooler Of The Year Nominees
                    </div>
                    <div className="nominate-button">
                        + Nominate
                    </div>
                </div>
                <div className="body-content">
                    {coolerNominations.map((cooler) => (
                        <div className="nominee-content">
                            <div className="nominee-title-container">
                                <div>{cooler.nominee}</div>
                                <div>{cooler.dateBrought}</div>
                            </div>
                            <div className="nominator-comment">
                                {cooler.nominatorComment}
                            </div>
                            <div className="nominator-name">
                                Nominated By: {cooler.nominatorName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Coolers;