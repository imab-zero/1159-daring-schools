'use client';

import { useState } from 'react';

export default function ApiTestPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const testApi = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponse(null);
    setErrorMessage('');

    try {
      console.log('Testing API with:', { email, name });
      
      // Create a simple fetch request to the API
      const fetchResponse = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      console.log('Response status:', fetchResponse.status);
      console.log('Response headers:', Object.fromEntries(fetchResponse.headers.entries()));
      
      // Try to get the response as text first
      const responseText = await fetchResponse.text();
      console.log('Response text:', responseText);
      
      // Then try to parse it as JSON if possible
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed JSON response:', responseData);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        responseData = { text: responseText };
      }
      
      setResponse(responseData);
      
      if (!fetchResponse.ok) {
        setStatus('error');
        setErrorMessage(responseData.error || `Server error: ${fetchResponse.status}`);
      } else {
        setStatus('success');
      }
    } catch (error) {
      console.error('API test error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
        
        <form onSubmit={testApi} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="test@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name (optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="John Doe"
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {status === 'loading' ? 'Testing...' : 'Test API'}
          </button>
        </form>
        
        {status === 'error' && (
          <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-bold">Error:</p>
            <p>{errorMessage}</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p className="font-bold">Success!</p>
          </div>
        )}
        
        {response && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Response:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}