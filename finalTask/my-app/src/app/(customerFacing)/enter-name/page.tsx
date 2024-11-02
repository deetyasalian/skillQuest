'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for Next.js 13+

const EnterNameComponent = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/certificate?name=${encodeURIComponent(name)}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
     
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        style={{ padding: '10px', fontSize: '16px', color:'black' }}
      />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '20px',
          marginLeft:'10px',
          padding: '10px 20px',
          backgroundColor: 'rgb(238, 75, 43)',
          borderRadius:'3px',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Get Certificate
      </button>
    </div>
  );
};

export default EnterNameComponent;
