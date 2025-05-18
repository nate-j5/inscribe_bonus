from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from anthropic import Anthropic
from dotenv import load_dotenv
import logging  # Add this import

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Environment-based CORS configuration
if os.getenv("FLASK_ENV") == "production":
    logger.info("Starting server in production mode")
    CORS(app, origins=["https://your-production-domain.com"])
else:
    logger.info("Starting server in development mode")
    CORS(app, origins=["http://localhost:5173"])  # Default Vite dev server port

# Initialize Anthropic client
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
if not anthropic_api_key:
    logger.error("ANTHROPIC_API_KEY not found in .env file")
    raise ValueError("ERROR: ANTHROPIC_API_KEY not found in .env file.")

anthropic = Anthropic(api_key=anthropic_api_key)

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.json
    if not data or 'text' not in data:
        logger.warning("Request received with no text")
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    
    try:
        # Check if text has at least 3 words
        if len(text.split()) < 3:
            logger.warning(f"Text too short: {text}")
            return jsonify({'error': 'Please enter at least 3 words for summarization'}), 400
            
        logger.info(f"Processing summarization request for text of length {len(text)}")
        
        # Use Claude to summarize the text
        prompt = f"""
Please summarize the following feature request into a ONE SENTENCE product description.
Keep the summary professional, actionable, and limited to exactly one sentence maximum.

{text}


"""
        
        response = anthropic.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1024,
            temperature=0.0,
            system="You are a helpful assistant that summarizes feature requests concisely and professionally.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        summary = response.content[0].text
        logger.info("Successfully generated summary")
        return jsonify({'summary': summary, 'note': text})
            
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=False)
