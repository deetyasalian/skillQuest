'use client'; // Add this line at the very top

import { useSearchParams } from 'next/navigation';
import React from 'react';

type CertificateProps = {
  participantName?: string;
  completionDate?: string;
  courseDuration?: string;
};

const CertificatesPage: React.FC<CertificateProps> = ({
  participantName = "John Doe",
  completionDate = "August 8, 2024",
  courseDuration = "4 weeks",
}) => {
  const searchParams = useSearchParams();
  const nameFromQuery = searchParams.get('name');
  const nameToDisplay = nameFromQuery || participantName;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#FFF',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        border: `3px solid rgb(238, 75, 43)`,
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        width: '700px',
        boxShadow: '0 0 20px rgba(238, 75, 43, 0.7)',
      }}>
        <h1 style={{
          fontSize: '2.5em',
          marginBottom: '20px',
          color: 'rgb(238, 75, 43)',
        }}>Certificate of Achievement</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>This is to certify that</p>
        <h2 style={{
          fontSize: '2.2em',
          margin: '20px 0',
          color: 'rgb(238, 75, 43)',
        }}>{nameToDisplay}</h2>
        <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>has successfully completed the</p>
        <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>course</p>
        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>Duration: {courseDuration}</p>
        <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>Date of Completion: {completionDate}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '40px',
        }}>
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
