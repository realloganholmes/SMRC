import './rfg.css';

const RFG = () => {
    return (
        <div className="container">
            <div className="content">
                <div className="header-content">
                    <div className="header-text">
                        RFG Standings
                    </div>
                </div>
                <div className="body-content">
                    <div className="rfg-content">
                        <div>
                            <div className="runner-name">Eggs</div>
                            <div className="rfg-second">2</div>
                        </div>
                        <div>
                            <div className="runner-name">Wolverine</div>
                            <div className="rfg-first">1</div>
                        </div>
                        <div>
                            <div className="runner-name">Joe The Show</div>
                            <div className="rfg-third">3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RFG;