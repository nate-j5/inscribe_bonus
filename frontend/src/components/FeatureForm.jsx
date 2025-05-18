import { useState } from 'react';
import axios from 'axios';

const FeatureForm = ({ onSummaryReceived }) => {
  const [featureRequest, setFeatureRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!featureRequest.trim()) {
      setError('Please enter a feature request');
      return;
    }
    
    // Check if there are at least 3 words
    const wordCount = featureRequest.trim().split(/\s+/).length;
    if (wordCount < 3) {
      setError('Please enter at least 3 words for summarization');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/summarize';
      const response = await axios.post(apiUrl, {
        text: featureRequest
      });
      
      onSummaryReceived({
        summary: response.data.summary, 
        note: response.data.note
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to get summary. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            id="feature-request"
            value={featureRequest}
            onChange={(e) => setFeatureRequest(e.target.value)}
            rows={5}
            placeholder="Enter request here..."
            disabled={isLoading}
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? 'Processing...' : 'Add Request'}
        </button>
      </form>
    </div>
  );
};

export default FeatureForm;