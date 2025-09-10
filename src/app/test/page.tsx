'use client';

import { useState } from 'react';

export default function TestPage() {
  const [testData, setTestData] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testGet = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/test');
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: testData }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testLeadApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', name: 'Test User' }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testDbConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/db-test');
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="space-y-8">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test GET Request</h2>
          <button 
            onClick={testGet}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Test GET /api/test'}
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test POST Request</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              placeholder="Enter test data"
              className="flex-1 px-4 py-2 bg-gray-700 rounded text-white"
            />
            <button 
              onClick={testPost}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Test POST /api/test'}
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Lead API</h2>
          <button 
            onClick={testLeadApi}
            disabled={loading}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Test POST /api/lead'}
          </button>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Database Connection</h2>
          <button 
            onClick={testDbConnection}
            disabled={loading}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Test Database Connection'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-red-400">Error</h2>
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        {response && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Response</h2>
            <pre className="whitespace-pre-wrap bg-gray-700 p-4 rounded">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}