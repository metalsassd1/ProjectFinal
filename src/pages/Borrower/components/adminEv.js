import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const ActivateApiPage = () => {
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const params = useParams()

  const handleApiActivation = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:4000/api/Borrowed/adminsubmit/${params.equipment_name}/${params.id}`);
      setApiResponse(JSON.stringify(response.data, null, 2));
      setLoading(false);
    } catch (error) {
      console.error('API call failed:', error);
      setApiResponse('Failed to fetch data.');
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleApiActivation}
        style={{ padding: '20px 40px', fontSize: '20px' }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Activate API'}
      </Button>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>API Response:</h3>
        <pre>{apiResponse || 'No data received yet.'}</pre>
      </div>
    </div>
  );
};

export default ActivateApiPage;
