import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProgressApprovalPage = ({ status = 'pending' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showReasons, setShowReasons] = useState(true);

  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';

  const getStatusText = () => {
    if (status === 'approved') return 'Data telah disetujui.';
    if (status === 'rejected') return 'Data ditolak. Mohon koreksi.';
    return 'Menunggu persetujuan.';
  };

  const currentStep = status === 'approved' ? 3 : status === 'rejected' ? 2 : 2;

  const renderStepIcon = (step, isActive, isDone, color) => {
    const isRejected = status === 'rejected' && step === 2;
    const isPending = status === 'pending' && step === 2;
    const stepColor = isRejected ? '#e74c3c' : isPending ? '#f1c40f' : color;

    return (
      <div
        className="d-flex justify-content-center align-items-center mx-auto mb-2"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `4px solid ${isActive ? stepColor : '#ccc'}`,
          backgroundColor: '#fff',
          transition: 'all 0.3s ease',
        }}
      >
        {isDone || (status === 'approved' && step === 3) ? (
          <i className="bi bi-check-lg" style={{ color: stepColor, fontSize: '1.1rem' }}></i>
        ) : isRejected ? (
          <i className="bi bi-x-lg" style={{ color: stepColor, fontSize: '1.1rem' }}></i>
        ) : (
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: isActive ? stepColor : '#ccc',
              borderRadius: '50%',
              transition: 'background-color 0.3s ease',
            }}
          ></div>
        )}
      </div>
    );
  };

  return (
    <div className="d-flex flex-row" style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <div
        className={`text-white vh-100 d-flex flex-column ${sidebarOpen ? 'px-4 pt-5' : 'px-3 pt-5'} position-fixed`}
        style={{
          width: sidebarOpen ? '250px' : '100px',
          transition: 'width 0.3s',
          background: sidebarGradient,
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
          zIndex: 1000,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div className="d-flex align-items-center">
            <i className="bi bi-folder-fill me-2 fs-5"></i>
            {sidebarOpen && <span className="fs-5 fw-semibold">Portal Data</span>}
          </div>
          <button
            className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Sembunyikan Sidebar' : 'Tampilkan Sidebar'}
            style={{ width: '36px', height: '36px', marginLeft: sidebarOpen ? '8px' : '0px' }}
          >
            <i
              className="bi bi-list"
              style={{ fontSize: '1.25rem', transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(90deg)', transition: 'transform 0.3s ease' }}
            ></i>
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="nav flex-column w-100 mt-4">
          <li className="nav-item mb-3 w-100">
            <button className={`btn w-100 text-start ${location.pathname === '/dashboard' ? 'btn-light text-dark' : 'btn-outline-light'}`} onClick={() => navigate('/dashboard')}>
              <i className="bi bi-speedometer2 me-2"></i>{sidebarOpen && 'Dashboard'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button className={`btn w-100 text-start ${['/data-page', '/data-page/preview'].includes(location.pathname) ? 'btn-light text-dark' : 'btn-outline-light'}`} onClick={() => navigate('/data-page')}>
              <i className="bi bi-table me-2"></i>{sidebarOpen && 'Kumpulan Data'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button
              className={`btn w-100 text-start ${location.pathname === '/history-page' ? 'btn-light text-dark' : 'btn-outline-light'}`}
              onClick={() => navigate('/history-page')}
            >
              <i className="bi bi-clock-history me-2"></i>{sidebarOpen && 'Riwayat Data'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button className={`btn w-100 text-start ${location.pathname === '/create-database' ? 'btn-light text-dark' : 'btn-outline-light'}`} onClick={() => navigate('/create-database')}>
              <i className="bi bi-database-fill-add me-2"></i>{sidebarOpen && 'Input Data Baru'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button
              className={`btn w-100 text-start ${location.pathname === '/approval-page' ? 'btn-light text-dark' : 'btn-outline-light'}`}
              onClick={() => navigate('/approval-page')}
            >
              <i className="bi bi-check2-square me-2"></i>{sidebarOpen && 'Approval Data'}
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 pt-5" style={{ marginLeft: sidebarOpen ? '250px' : '100px', transition: 'margin-left 0.3s' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">
          <i className="bi bi-hourglass-split me-2"></i>Progress Approval
          </h2>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Kembali
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="d-flex justify-content-center align-items-center flex-column mt-5 pt-4">
          <div className="position-relative w-100" style={{ maxWidth: '800px' }}>
            {/* Background Line */}
            <div className="position-absolute top-50 start-0 translate-middle-y w-100" style={{ height: '4px', zIndex: 0 }}>
              <div style={{
                height: '4px',
                width: '88%',
                margin: '0 auto',
                backgroundColor: '#e0e0e0',
                borderRadius: '2px'
              }}>
                <div style={{
                  height: '4px',
                  width:
                    status === 'approved' ? '100%' :
                    status === 'rejected' ? '66.66%' : '50%',
                  backgroundColor:
                    status === 'approved' ? '#27ae60' :
                    status === 'rejected' ? '#6c5ce7' : '#f1c40f',
                  borderRadius: '2px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            {/* Step Items */}
            <div className="d-flex justify-content-between align-items-center position-relative z-1">
              {[1, 2, 3].map((step) => {
                const isRejected = status === 'rejected' && step === 2;
                const isPending = status === 'pending' && step === 2;
                const isActive = step <= currentStep;
                const isDone = step < currentStep || (status === 'approved' && step === 3);
                const color = isRejected ? '#e74c3c' : isPending ? '#f1c40f' : '#27ae60';
                const label = step === 1 ? 'Input Data' : step === 2 ? 'Approval' : 'Selesai';
                const desc = step === 1 ? 'Data dikirim' : step === 2 ? getStatusText() : 'Tahapan akhir';

                return (
                  <div key={step} className="text-center" style={{ width: '33.3%' }}>
                    {renderStepIcon(step, isActive, isDone, color)}
                    <div className="fw-semibold" style={{ color: isActive ? '#000' : '#aaa' }}>{label}</div>
                    <div className="text-muted small">{desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rejected Reason Section */}
          {status === 'rejected' && (
            <div className="mt-4 w-100" style={{ maxWidth: '800px' }}>
              <button
                className="btn btn-outline-secondary mb-3"
                onClick={() => setShowReasons(!showReasons)}
              >
                {showReasons ? 'Sembunyikan Alasan Penolakan' : 'Tampilkan Alasan Penolakan'}
              </button>

              {showReasons && (
                <div className="card shadow-sm p-4">
                  <h5 className="fw-semibold mb-3">Alasan Penolakan</h5>
                  <ul className="list-unstyled mb-0">
                    {[
                      "Format data tidak sesuai",
                      "Beberapa kolom wajib kosong",
                      "File corrupt atau tidak dapat dibaca"
                    ].map((reason, index) => (
                      <li key={index} className="d-flex align-items-start mb-2">
                        <span
                          className="me-2"
                          style={{
                            fontSize: '1.2rem',
                            color: '#e74c3c',
                            lineHeight: 1
                          }}
                        >
                          ❌
                        </span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressApprovalPage;
