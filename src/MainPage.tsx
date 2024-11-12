import { CSSProperties,useEffect, useState } from 'react';
import axios from 'axios';

function ServiceRequestList() {
  const [requests, setRequests] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleRequests() {
      try {
        const uname = localStorage.getItem('username');
        
        if (!uname) {
          setError('Username not found. Please log in again.');
          setLoading(false);
          return;
        }
        
        const response = await axios.get('https://fearless-growth-production.up.railway.app/servicerequest/getRequestsBarangay', {
          params: { barangay: uname }
        });
        
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError('No service request found');
          console.error(error);
        } else {
          const message = handleAxiosError(error);
          setError(message || 'An error occurred while fetching data.');
        }
      } finally {
        setLoading(false);
      }
    }
    
    handleRequests();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      {requests && requests.map((values: any, index: any) => (
        <div key={index} style={requestCardStyle}>
          <p style={{ color: 'black', fontFamily: 'Courier New', fontWeight: 'bold' }}>User ID: {values.UserID}</p>
          <p style={{ color: 'black', fontFamily: 'Courier New', fontWeight: 'bold' }}>Username: {values.Username}</p>
          <p style={{ color: 'black', fontFamily: 'Courier New', fontWeight: 'bold' }}>Request Type: {values.RequestType}</p>
          <p style={{ color: 'black', fontFamily: 'Courier New', fontWeight: 'bold' }}>Status: {values.RequestStatus === 'pending' ? (
            <span style={{ color: 'black' }}>{values.RequestStatus}</span>
          ) : values.RequestStatus}</p>
          <p style={{ color: 'black', fontFamily: 'Courier New', fontWeight: 'bold' }}>Address: {values.Address}</p>
        </div>
      ))}
    </div>
  );
}

// Styles
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5d2d1',
  padding: '20px',
  width: '100vw',
  height: '100vh',
  overflow: 'auto',
  boxSizing: 'border-box',
};

const requestCardStyle: CSSProperties = {
  backgroundColor: '#e9ecef',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  width: '300px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export function handleAxiosError(error: any): string {
  if (error.response) {
    console.error('Response error:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    return `Server responded with status ${error.response.status}: ${error.response.data.message || 'An error occurred.'}`;
  } else if (error.request) {
    console.error('Request error:', error.request);
    return 'No response received from the server. Please check your network connection.';
  } else {
    console.error('General error:', error.message);
    return `Error: ${error.message}`;
  }
}

export default ServiceRequestList;
