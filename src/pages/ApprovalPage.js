import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const dummyData = {
  namaDatabase: 'db_kependudukan',
  namaTabel: 'data_penduduk',
  deskripsi: 'Data penduduk berdasarkan wilayah dan kategori usia.',
  namaUser: 'Rifqi Mulya',
  bidang: 'Kependudukan',
  preview: [
    { NIK: '3201010101010001', Nama: 'Ahmad', Usia: 34, Alamat: 'Jl. Merdeka 1' },
    { NIK: '3201010101010002', Nama: 'Siti', Usia: 28, Alamat: 'Jl. Merdeka 2' },
    { NIK: '3201010101010003', Nama: 'Budi', Usia: 40, Alamat: 'Jl. Merdeka 3' },
    { NIK: '3201010101010001', Nama: 'Ahmad', Usia: 34, Alamat: 'Jl. Merdeka 1' },
    { NIK: '3201010101010002', Nama: 'Siti', Usia: 28, Alamat: 'Jl. Merdeka 2' },
    { NIK: '3201010101010003', Nama: 'Budi', Usia: 40, Alamat: 'Jl. Merdeka 3' },
    { NIK: '3201010101010001', Nama: 'Ahmad', Usia: 34, Alamat: 'Jl. Merdeka 1' },
    { NIK: '3201010101010002', Nama: 'Siti', Usia: 28, Alamat: 'Jl. Merdeka 2' },
    { NIK: '3201010101010003', Nama: 'Budi', Usia: 40, Alamat: 'Jl. Merdeka 3' },
  ],
};

const ApprovalPage = () => {
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
      <div className="flex-grow-1 p-4 pt-5" style={{ marginLeft: sidebarOpen ? '250px' : '100px', transition: 'margin-left 0.3s' }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h2 className="fw-bold text-dark">
            <i className="bi bi-check2-square me-2"></i>Approval Data
          </h2>
          <button className="btn btn-outline-danger" onClick={() => navigate('/')}>Logout</button>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="bg-light p-3 rounded shadow-sm">
              <div className="text-muted">Nama Database</div>
              <div className="fw-bold text-dark">{dummyData.namaDatabase}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-light p-3 rounded shadow-sm">
              <div className="text-muted">Nama Tabel</div>
              <div className="fw-bold text-dark">{dummyData.namaTabel}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-light p-3 rounded shadow-sm">
              <div className="text-muted">Bidang</div>
              <div className="fw-bold text-dark">{dummyData.bidang}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-light p-3 rounded shadow-sm">
              <div className="text-muted">Nama User</div>
              <div className="fw-bold text-dark">{dummyData.namaUser}</div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="bg-light p-3 rounded shadow-sm">
              <div className="text-muted">Deskripsi</div>
              <div className="text-dark">{dummyData.deskripsi}</div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow mb-4">
          <div className="card-body p-0">
            <table className="table table-bordered mb-0">
              <thead className="table-light">
                <tr>
                  <th>NIK</th>
                  <th>Nama</th>
                  <th>Usia</th>
                  <th>Alamat</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.preview.map((row, index) => (
                  <tr key={index}>
                    <td>{row.NIK}</td>
                    <td>{row.Nama}</td>
                    <td>{row.Usia}</td>
                    <td>{row.Alamat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-success d-flex align-items-center gap-2">
                <i className="bi bi-check-circle"></i>Setujui Data
            </button>
            <button className="btn btn-danger d-flex align-items-center gap-2">
                <i className="bi bi-x-circle"></i>Tolak Data
            </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalPage;
