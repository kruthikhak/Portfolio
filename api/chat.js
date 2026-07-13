/* =============================================
   VERCEL SERVERLESS PROXY — Groq API
   Keeps GROQ_API_KEY safe on the server side
   ============================================= */

   export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    try {
      const { messages } = req.body;
  
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 200,
          temperature: 0.4,
          messages: messages
        })
      });
  
      const data = await groqResponse.json();
      return res.status(200).json(data);
  
    } catch (error) {
      return res.status(500).json({ error: 'Proxy error' });
    }
  }