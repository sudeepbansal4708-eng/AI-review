import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReview = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review');
      return;
    }

    setLoading(true);
    setError('');
    setReview('');

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate review');
      }

      const data = await response.json();
      setReview(data.review);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>AI Code Review</h1>
        <p>Paste your code below for an AI-powered review using Claude</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h2>Code Input</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              style={{
                width: '100%',
                height: '400px',
                padding: '10px',
                fontFamily: 'monospace',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <button
              onClick={handleReview}
              disabled={loading}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>

          <div>
            <h2>Review Result</h2>
            {error && (
              <div
                style={{
                  padding: '10px',
                  backgroundColor: '#fee',
                  color: '#c33',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              >
                {error}
              </div>
            )}
            <div
              style={{
                width: '100%',
                height: '400px',
                padding: '10px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: 'monospace',
                fontSize: '14px',
              }}
            >
              {review || (loading ? 'Generating review...' : 'Review will appear here')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
