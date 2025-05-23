import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaFileExcel, FaCode, FaFileAlt, FaArrowLeft } from 'react-icons/fa';

const dummyTableData = [
  { kolom1: '001', kolom2: 'Contoh Data 1', kolom3: 'Keterangan A' },
  { kolom1: '002', kolom2: 'Contoh Data 2', kolom3: 'Keterangan B' },
  { kolom1: '003', kolom2: 'Contoh Data 3', kolom3: 'Keterangan C' },
  { kolom1: '004', kolom2: 'Contoh Data 4', kolom3: 'Keterangan D' },
  { kolom1: '005', kolom2: 'Contoh Data 5', kolom3: 'Keterangan E' },
];

const PreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';

  return (
    <div className="d-flex" style={{ minHeight: '100vh', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <div
          className={`text-white d-flex flex-column ${sidebarOpen ? 'px-4 pt-5' : 'px-3 pt-5'}`}
          style={{
            width: sidebarOpen ? '250px' : '100px',
            background: sidebarGradient,
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
            transition: 'width 0.3s',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
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
                style={{
                  fontSize: '1.25rem',
                  transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(90deg)',
                  transition: 'transform 0.3s ease',
                }}
              ></i>
            </button>
          </div>

          {/* Nav Buttons */}
          <ul className="nav flex-column w-100 mt-4">
            <li className="nav-item mb-3 w-100">
              <button
                className={`btn w-100 text-start ${location.pathname === '/dashboard' ? 'btn-light text-dark' : 'btn-outline-light'}`}
                onClick={() => navigate('/dashboard')}
              >
                <i className="bi bi-speedometer2 me-2"></i>{sidebarOpen && 'Dashboard'}
              </button>
            </li>
            <li className="nav-item mb-3 w-100">
              <button
                className={`btn w-100 text-start ${location.pathname === '/data-page' || location.pathname === '/data-page/preview' ? 'btn-light text-dark' : 'btn-outline-light'}`}
                onClick={() => navigate('/data-page')}
              >
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
              <button
                className={`btn w-100 text-start ${location.pathname === '/create-database' ? 'btn-light text-dark' : 'btn-outline-light'}`}
                onClick={() => navigate('/create-database')}
              >
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
      <div
        className="flex-grow-1 p-4 pt-5"
        style={{
          marginLeft: sidebarOpen ? '250px' : '100px',
          transition: 'margin-left 0.3s',
          minHeight: '100vh',
          backgroundColor: '#fff',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">
              <i className="bi bi-file-earmark-text-fill me-2"></i>Preview Data
            </h2>
            <p className="text-muted">Berikut ini adalah deskripsi singkat dari data yang dipilih.</p>
          </div>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Kembali
          </button>
        </div>

        {/* Nama & Deskripsi */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-semibold">Nama Database:</h5>
            <p className="text-dark">Database A (Contoh)</p>
            <h5 className="fw-semibold">Nama Tabel:</h5>
            <p className="text-dark">Tabel A (Contoh)</p>
            <h5 className="fw-semibold">Deskripsi:</h5>
            <p className="text-dark">Ini adalah deskripsi dummy untuk data A.</p>
          </div>
          <div className="col-md-6">
            <h5 className="fw-semibold">Data SDI:</h5>
            <p className="text-dark">Data SDI.</p>
            <h5 className="fw-semibold">Produsen Data:</h5>
            <p className="text-dark">Perumahan</p>
          </div>
        </div>


        {/* Tabel Data */}
        <div className="card border-0 shadow mb-4">
          <div className="card-body p-0">
            <table className="table table-bordered table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Kode</th>
                  <th>Nama</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {dummyTableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.kolom1}</td>
                    <td>{row.kolom2}</td>
                    <td>{row.kolom3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <button className="btn btn-success d-flex align-items-center gap-2">
            <FaFileExcel /> Download Excel
          </button>
          <button className="btn btn-warning text-white d-flex align-items-center gap-2">
            <FaFileAlt /> Download JSON
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2">
            <FaCode /> API Endpoint
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
