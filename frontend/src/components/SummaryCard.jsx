import React from 'react';
import cannyLogo from '../assets/canny.png';
import featurebaseLogo from '../assets/featurebase.png';
import sleekplanLogo from '../assets/sleekplan.png';

const SummaryCard = ({ summary, onReset, note }) => {
    return (
      <div className="summary-card">
        <h2 className='summary-title'>Feature Request</h2>
        <div className="summary-content">
          <p>{summary}</p>
        </div>
        
        <div className="sharing-options">
          {/* <h3>Share to:</h3> */}
          <div className="buttons">
            <button className="share-button featurebase">
              <img src={featurebaseLogo} alt="Featurebase" />
              Add to Featurebase
            </button>
            <button className="share-button sleekplan">
              <img src={sleekplanLogo} alt="Sleekplan" />
              Add to Sleekplan
            </button>
            <button className="share-button canny">
              <img src={cannyLogo} alt="Canny" />
              Add to Canny
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SummaryCard;