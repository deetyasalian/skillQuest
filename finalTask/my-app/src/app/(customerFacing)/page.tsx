"use client";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { toast } from "react-hot-toast";

const Home = () => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State to track authentication status

  // Function to handle logout
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      localStorage.removeItem("authenticated"); // Clear authenticated status
      setIsAuthenticated(false); // Set authentication status to false
      router.push('/login'); // Redirect to login page
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Function to handle login redirection
  const goToLogin = () => {
    router.push('/login'); // Redirect to login page
  };

  // Check for authentication status when component loads
  useEffect(() => {
    const authStatus = localStorage.getItem("authenticated");
    setIsAuthenticated(authStatus === "true"); // Set the authenticated state
  }, []);

  // Handler functions for mouse events
  const handleMouseEnter = (index: number) => setHoveredItem(index);
  const handleMouseLeave = () => setHoveredItem(null);

  // Prevent rendering while checking authentication
  if (isAuthenticated === null) {
    return null; // Prevent render until we know the auth status
  }

  return (
    <div style={styles.container}>
      {/* Conditional rendering based on authentication status */}
      {isAuthenticated ? (
        <button
          onClick={logout}
          className="absolute top-4 right-4 bg-black hover:bg-gray-800 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={goToLogin}
          className="absolute top-4 right-4 bg-black hover:bg-gray-800 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Login
        </button>
      )}

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Expand knowledge with flexible, and <span style={styles.heroHighlight}>affordable online courses.</span>
        </h1>
        <p style={styles.heroSubtitle}>Skill Up.</p>
        <button style={styles.button}>Download Your Free Version</button>
      </section>

      {/* Company Icons Section */}
      <section style={styles.companySection}>
        <div style={styles.companyIcons}>
          <img src="/images/33.png" alt="Company 1" style={styles.companyIcon} />
          <img src="/images/44.png" alt="Company 2" style={styles.companyIcon} />
          <img src="/images/55.png" alt="Company 3" style={styles.companyIcon} />
          <img src="/images/66.png" alt="Company 4" style={styles.companyIcon} />
          <img src="/images/44.png" alt="Company 5" style={styles.companyIcon} />
        </div>
        <p style={styles.companyDescription}>
          We are proud to work with a variety of industry-leading companies to bring you the best experience possible.
        </p>
      </section>

      {/* Body Section */}
      <section style={styles.body}>
        <div style={styles.bodyContent}>
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={hoveredItem === index ? { ...styles.bodyItem, ...styles.bodyItemHover } : styles.bodyItem}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div style={{ ...styles.imageTextWrapper, flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
                <img
                  src={`/images/${index}.png`}
                  alt="Description"
                  style={index % 2 === 0 ? styles.image400 : styles.image600}
                />
                <div style={styles.textContent}>
                  <h2 style={styles.bodyTitle}>Your Title Here</h2>
                  <p style={styles.bodyText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, nunc non posuere consectetur, justo erat semper enim, non hendrerit dui odio id enim.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© Copyright 2024. Powered by YourName</p>
        <div style={styles.socialIcons}>
          <a href="#"><img src="/images/discord.png" alt="Discord" style={styles.socialIcon} /></a>
          <a href="#"><img src="/images/linkedin.png" alt="LinkedIn" style={styles.socialIcon} /></a>
          <a href="#"><img src="/images/youtube.png" alt="YouTube" style={styles.socialIcon} /></a>
          <a href="#"><img src="/images/telegram.png" alt="Telegram" style={styles.socialIcon} /></a>
        </div>
      </footer>
    </div>
  );
};

// Define CSS properties using TypeScript's CSSProperties type
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  hero: {
    textAlign: 'center',
    padding: '80px 20px',
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '2.5em',
    fontWeight: 'bold',
  },
  heroHighlight: {
    color: 'rgb(238, 75, 43)',
  },
  heroSubtitle: {
    marginTop: '10px',
    fontSize: '1.2em',
    color: '#bbbbbb',
  },
  button: {
    backgroundColor: 'rgb(238, 75, 43)',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1em',
    cursor: 'pointer',
    marginTop: '20px',
  },
  companySection: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#000',
    marginBottom: '40px',
  },
  companyIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '100px',
    marginBottom: '20px',
  },
  companyIcon: {
    width: '100px',
    height: 'auto',
  },
  companyDescription: {
    fontSize: '1.2em',
    color: '#bbbbbb',
    maxWidth: '800px',
    margin: '0 auto',
  },
  footer: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#000',
    marginTop: '20px',
  },
  footerText: {
    color: '#bbbbbb',
    marginBottom: '20px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  socialIcon: {
    width: '30px',
    height: 'auto',
    filter: 'invert(1)', // This makes the icon white on a dark background
  },
  body: {
    padding: '20px',
  },
  bodyContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  bodyItem: {
    backgroundColor: '#000',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  bodyItemHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  imageTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  textContent: {
    maxWidth: '600px',
  },
  image400: {
    width: '400px',
    height: 'auto',
    borderRadius: '8px',
  },
  image600: {
    width: '300px',
    height: 'auto',
    borderRadius: '8px',
  },
  bodyTitle: {
    fontSize: '1.5rem',
    margin: '10px 0',
  },
  bodyText: {
    color: '#bbbbbb',
  },
};

export default Home;
