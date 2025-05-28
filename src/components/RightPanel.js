// components/RightPanel.jsx
import React from 'react';
import logoDprkp from '../assets/images/logo-dprkp.png';

const RightPanel = () => {
  return (
    <div
      className="d-none d-md-flex flex-fill align-items-center justify-content-center"
      style={{
        flex: '0 0 40%',
        background: 'linear-gradient(135deg, #f98025, #f69000, #53B1B1, #104D62, #828282)',
        borderTopLeftRadius: '2rem',
        borderBottomLeftRadius: '2rem',
        padding: '2rem',
        minHeight: '100vh',
      }}
    >
      <div style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1rem 2rem' }}>
        <img
          src={logoDprkp}
          alt="DPRKP Logo"
          style={{ maxWidth: '220px', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
};

export default RightPanel;
