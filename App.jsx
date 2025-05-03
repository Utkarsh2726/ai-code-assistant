
import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">AI Code Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 text-black rounded mb-2"
          rows={6}
          placeholder="Enter prompt (e.g. Create a React login page)"
        ></textarea>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </form>
      {response && (
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto whitespace-pre-wrap">
          {response}
        </pre>
      )}
    </div>
  );
}

export default App;
