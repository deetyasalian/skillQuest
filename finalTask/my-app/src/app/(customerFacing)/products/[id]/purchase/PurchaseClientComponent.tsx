'use client';

import { CSSProperties, useState, useEffect } from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  product: Product;
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px',
    backgroundColor: '#100f0f',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '24px',
  },
  subHeader: {
    fontSize: '2rem',
    marginBottom: '16px',
    color: '#ff6347',
  },
  card: {
    backgroundColor: '#181818',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '32px',
    transition: 'transform 0.3s',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHover: {
    transform: 'scale(1.02)',
  },
  section: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '12px',
  },
  button: {
    backgroundColor: 'rgb(238,75,43)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '5px',
    marginTop: '20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: 'rgb(255,95,66)',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '24px',
  },
  mainContent: {
    flex: '2',
  },
  courseInfo: {
    padding: '20px',
    border: '1px solid #383838',
    borderRadius: '10px',
    backgroundColor: '#202020',
    flex: '1',
  },
  linkButton: {
    color: '#007bff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: '0',
    fontWeight: 'bold',
  },
  videoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '16px',
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    padding: '16px',
  },
  iframe: {
    width: '350px',
    height: '200px',
    border: 'none',
    borderRadius: '10px',
  },
  description: {
    flex: '1',
    color: '#ccc',
  },
  checkbox: {
    marginRight: '8px',
  },
  certificateButton: {
    backgroundColor: 'rgb(238,75,43)',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  sectionSpacing: {
    marginTop: '40px',
  }
};

const week1Videos = [
  { id: 1, title: 'Week 1 - Video 1', url: 'https://www.youtube.com/embed/5NiXlPrLslg', description: 'Introduction to Week 1 concepts and basics.' },
  { id: 2, title: 'Week 1 - Video 2', url: 'https://www.youtube.com/embed/nHMQ33LZ6oA', description: 'Week 1 deep dive into fundamentals.' },
  { id: 3, title: 'Week 1 - Video 3', url: 'https://www.youtube.com/embed/s1d8UGDCCN8', description: 'Advanced concepts covered in Week 1.' },
  { id: 4, title: 'Week 1 - Quiz', url: '/quizzes', description: 'Test your knowledge with the Week 1 Quiz.' },
];

const week2Videos = [
  { id: 5, title: 'Week 2 - Video 1', url: 'https://www.youtube.com/embed/QG0hE0R_ng4', description: 'Introduction to Week 2 topics.' },
  { id: 6, title: 'Week 2 - Video 2', url: 'https://www.youtube.com/embed/ffE1xj51EBQ', description: 'Further exploration of Week 2 topics.' },
  { id: 7, title: 'Week 2 - Video 3', url: 'https://www.youtube.com/embed/XLdpy0_6MR4', description: 'Wrapping up Week 2 concepts.' },
  { id: 8, title: 'Week 2 - Quiz', url: 'https://www.geeksforgeeks.org/quizzes/top-50-data-structures-mcqs-with-answers/?page=2', description: 'Test your knowledge with the Week 2 Quiz.' },
];

export default function PurchaseClientComponent({ product }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [completedWeek1, setCompletedWeek1] = useState(Array(week1Videos.length).fill(false));
  const [completedWeek2, setCompletedWeek2] = useState(Array(week2Videos.length).fill(false));
  const [isWeek2Visible, setIsWeek2Visible] = useState(false);
  const [isCertificateVisible, setIsCertificateVisible] = useState(false);

  const handleCheckboxChange = (index: number, week: number) => {
    if (week === 1) {
      const updatedCompletedWeek1 = [...completedWeek1];
      updatedCompletedWeek1[index] = !updatedCompletedWeek1[index];
      setCompletedWeek1(updatedCompletedWeek1);
    } else if (week === 2) {
      const updatedCompletedWeek2 = [...completedWeek2];
      updatedCompletedWeek2[index] = !updatedCompletedWeek2[index];
      setCompletedWeek2(updatedCompletedWeek2);
    }
  };

  useEffect(() => {
    const allWeek1Completed = completedWeek1.every((status) => status);
    setIsWeek2Visible(allWeek1Completed);
  }, [completedWeek1]);

  useEffect(() => {
    const allWeek1Completed = completedWeek1.every((status) => status);
    const allWeek2Completed = completedWeek2.every((status) => status);
    setIsCertificateVisible(allWeek1Completed && allWeek2Completed);
  }, [completedWeek1, completedWeek2]);

  const allWeek1Completed = completedWeek1.every((status) => status);
  const allWeek2Completed = completedWeek2.every((status) => status);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{product.name}</h2>
      <div
        style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.flexContainer}>
          <div style={styles.mainContent}>
            <h2 style={styles.subHeader}>{product.name}</h2>
            <p>Instructor: Taught by Meta Staff</p>
            <button
              style={styles.button}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor as string)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor as string)}
            >
              Enroll for Free
            </button>
            <p>Starts Jul 11</p>
            <p>181,422 already enrolled</p>
          </div>

          <div style={styles.courseInfo}>
            <p style={{ fontWeight: 'bold' }}>Course</p>
            <p>Gain insight into a topic and learn the fundamentals.</p>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <span>4.7 ★ (3,994 reviews) | </span>
              <span style={{ color: '#007bff', marginLeft: '4px' }}>95%</span>
            </p>
            <p>Beginner level</p>
            <p>42 hours (approximately)</p>
            <p>Flexible schedule</p>
            <button style={styles.linkButton}>View course modules</button>
          </div>
        </div>
      </div>

      <h3 style={styles.title}>Week 1</h3>
      <div>
        {week1Videos.map((video, index) => (
          <div key={video.id} style={styles.videoContainer}>
            <iframe src={video.url} style={styles.iframe}></iframe>
            <div style={styles.description}>
              <h4>{video.title}</h4>
              <p>{video.description}</p>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={completedWeek1[index]}
                onChange={() => handleCheckboxChange(index, 1)}
              />
              <label>Mark as Completed</label>
            </div>
          </div>
        ))}
      </div>

      {isWeek2Visible && (
        <div style={styles.sectionSpacing}>
          <h3 style={styles.title}>Week 2</h3>
          {week2Videos.map((video, index) => (
            <div key={video.id} style={styles.videoContainer}>
              <iframe src={video.url} style={styles.iframe}></iframe>
              <div style={styles.description}>
                <h4>{video.title}</h4>
                <p>{video.description}</p>
                <input
                  type="checkbox"
                  style={styles.checkbox}
                  checked={completedWeek2[index]}
                  onChange={() => handleCheckboxChange(index, 2)}
                />
                <label>Mark as Completed</label>
              </div>
            </div>
          ))}
        </div>
      )}

{allWeek1Completed && allWeek2Completed && (
        <Link href="/enter-name">
          <button style={styles.certificateButton}>Get Certificate</button>
        </Link>
      )}
    </div>
  );
}
