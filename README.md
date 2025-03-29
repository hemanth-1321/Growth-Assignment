# Gemini-Powered Gen AI Analytics Backend

## Project Overview
An advanced backend service leveraging Google's Gemini AI to translate natural language queries into SQL, providing intelligent data insights.

## Technical Stack
- Node.js
- Express.js
- Google Gemini AI
- SQLite (In-Memory Database)
- JWT Authentication

## Key Features
- AI-Powered Query Translation
- Intelligent Natural Language Processing
- Comprehensive Data Analysis
- Secure Authentication
- Detailed Query Explanations

## Prerequisites
- Node.js (v14+)
- Google Gemini API Key
- npm

## Setup Instructions

1. Clone the Repository
```bash
git clone <your-repo-url>
cd gen-ai-analytics-backend
```

2. Install Dependencies
```bash
npm install
```

3. Configure Environment Variables
Create a `.env` file:
```
PORT=3000
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Run the Application
```bash
npm start
```

## API Endpoints

### Authentication
`POST /auth`
- Generate JWT token
- Returns: `{ token, user }`

### Query Processing
`POST /query`
- Gemini-Powered natural language query processing
- Requires JWT token
- Translates query to SQL
- Returns query results

### Query Explanation
`POST /explain`
- Generate Gemini-powered query explanations
- Requires JWT token
- Provides business-friendly query insights

### Query Validation
`POST /validate`
- Validate query feasibility
- Requires JWT token

## Example Queries
- "Show total sales for laptops in March"
- "Compare revenue across different regions"
- "Find top-selling products in the Enterprise segment"

## Deployment
Recommended Platforms:
- Render
- Heroku
- Railway

## Future Enhancements
- More advanced AI query processing
- Machine learning-based predictions
- Enhanced natural language understanding

## Limitations
- Depends on Gemini API availability
- Query complexity may vary
- Requires active Gemini API key