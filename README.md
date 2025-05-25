# Simplexify Learning Platform

<br> Team members: <br> 1.Ankit Halder <br> 2.Debajyoti Basu <br> 3.Biswajyoyi biswas
<br> 4.Anwesha Bhatia <br> 5.Bishal pritam chowdhury<br>

## API Setup Instructions

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/skill-x-main2.git
   cd skill-x-main2
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `api` directory with your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key
   SITE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open a separate terminal to serve the static HTML files:
   ```
   npx http-server -p 8080
   ```

6. Open your browser and navigate to `http://localhost:8080`

### Deployment on Vercel

1. Push your code to GitHub (make sure to exclude the `.env` file using `.gitignore`)

2. Connect your GitHub repository to Vercel

3. In the Vercel dashboard, add the following environment variables:
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `SITE_URL`: Your deployed site URL (e.g., https://your-app.vercel.app)

4. Deploy your application

## Security Notes

- The API key is stored securely on the server and not exposed in client-side code
- API requests are proxied through the backend to protect your API key
- Environment variables are used to manage sensitive information



