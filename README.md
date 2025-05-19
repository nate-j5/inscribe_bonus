# Feature Request Logger

This app allows internal team members to write feature requests in their own words. It then uses the Claude API to generate a summary, which can be added to tools like Featurebase, Sleekplan, or Canny.

[View Website](https://inscribe-bonus.onrender.com).

## Technical Setup
### Frontend
- React application built with Vite
- Run development server: `npm run dev`
- Access at: `http://localhost:5173`

### Backend
- Python Flask server
- Requires Anthropic API key for Claude AI integration
- Run development server: `python main.py`
- Listens at: `http://localhost:5500`

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/nate-j5/inscribe_bonus.git
   ```
2. Set up backend:
   ```
   cd backend
   pip install -r requirements.txt
   ```
3. Set up frontend:
   ```
   cd frontend
   npm install
   ```
4. Create a `.env` file in the backend directory with your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_key_here
   ```
5. Start both servers and open the application in your browser:
   ```
   # Terminal 1 - Backend
   cd backend
   python main.py

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```


