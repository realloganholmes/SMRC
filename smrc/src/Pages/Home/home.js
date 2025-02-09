import './home.css';
import ReactCurvedText from 'react-curved-text'

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-wrapper">
        <div className="logo-spinner">
          <div id="rotationDiv">
            <ReactCurvedText
              width={370}
              height={370}
              cx={185}
              cy={185}
              rx={170}
              ry={170}
              text={"Saturday Morning Run Club • Saturday Morning Run Club • "}
              textProps={{ style: { fontSize: 40.4 } }}
              textPathProps={{ style: { fill: '#66cda3' } }}
            />
          </div>
          <div className="smrc-text">
            <div>SM</div>
            <div>RC</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;