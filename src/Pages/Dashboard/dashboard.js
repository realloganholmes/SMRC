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
                    <hr />
                    <p>If this is your first login, click the <a href='/account'>account tab</a> and update your PIN to something you can remember.</p>
                    <hr />
                    <p>Use the <a href='/recaps'>recap page</a> to find and read race recaps. There are a variety of filtering options.</p>
                    <p><i>Please</i> upload your own recaps in PDF form so we can have a complete archive of recaps here.</p>
                    <hr />
                    <p>Use the <a href='/coolers'>coolers page</a> to view existing <i>Cooler Of The Year</i> nominations as well as submit new nominations.</p>
                    <hr />
                    <p>For technical support contact Logan Holmes</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;