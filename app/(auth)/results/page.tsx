
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const result = searchParams.get('result');
  const confidence = searchParams.get('confidence');
  const explanation = searchParams.get('explanation')
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Analysis Result</h1>

      <h2>
        Result:{' '}
        <span style={{ color: result === 'Fake' ? 'red' : 'green' }}>
          {result}
        </span>
      </h2>

      <h3>Confidence: {confidence}%</h3>
    <p style={{ marginTop: '10px' }}>
    Explanation: {explanation}
</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/check-news')}>
          Analyze Again
        </button>
      </div>
    </div>
  );
}
