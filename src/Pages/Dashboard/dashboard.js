import './dashboard.scss';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        Dashboard
                    </div>
                </div>
                <div className="body-content">
                    <h1>Welcome to SMRC.run!</h1>
                    <ul>
                        <li>Find and filter race recaps</li>
                        <li>Nominate someone for cooler of the year</li>
                        <li>Check the upcoming race schedule</li>
                        <li>See the RFG standings</li>
                    </ul>
                    <p>For technical support contact Logan Holmes</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;