import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaArrowLeft } from 'react-icons/fa';

const AddDataHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dbName, setDbName] = useState('db_kependudukan');
  const [tableName, setTableName] = useState('data_penduduk');
  const [dataSDI, setDataSDI] = useState('Data SDI');
  const [dataBidang, setBidang] = useState('Perumahan');
  const [dataDescription, setDataDescription] = useState('Deskripsi awal data ini.');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [uploadMode, setUploadMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';

  const dummyData = {
    namaDatabase: dbName,
    namaTabel: tableName,
    jenisDataSDI: dataSDI,
    namaBidang: dataBidang,
    deskripsi: dataDescription,
    preview: [
      { NIK: '1234567890', Nama: 'John Doe', Usia: 30, Alamat: 'Jl. Merdeka 1' },
      { NIK: '2345678901', Nama: 'Jane Smith', Usia: 25, Alamat: 'Jl. Sudirman 2' },
      { NIK: '3456789012', Nama: 'Alice Johnson', Usia: 28, Alamat: 'Jl. Thamrin 3' }
    ]
  };

  const expectedColumns = ['NIK', 'Nama', 'Usia', 'Alamat'];

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const headerRow = data[0].map((h) => h.trim());
      const isValid = JSON.stringify(headerRow) === JSON.stringify(expectedColumns);

      if (isValid) {
        const message = uploadMode === 'add' ? 'Data Berhasil Ditambahkan' : 'Data Berhasil Diganti';
        Swal.fire('Sukses!', message, 'success');
      } else {
        const message = uploadMode === 'add' ? 'Data Gagal Ditambahkan' : 'Data Gagal Diganti';
        Swal.fire('Gagal!', message, 'error');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleUploadPrompt = (mode) => {
    Swal.fire({
      title: mode === 'add' ? 'Tambah Data' : 'Ganti Data',
      text: 'Data akan diunggah dalam bentuk csv/excel. Apakah nama kolom sudah sesuai?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, lanjutkan',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setUploadMode(mode);
        fileInputRef.current.click();
      }
    });
  };

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
              className={`btn w-100 text-start ${location.pathname === '/history-page' || location.pathname === '/history-page/progress-approval' || location.pathname === '/history-page/edit-page' || location.pathname === '/history-page/add-page'? 'btn-light text-dark' : 'btn-outline-light'}`}
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

      <div className="flex-grow-1 p-4 pt-5" style={{ marginLeft: sidebarOpen ? '250px' : '100px', transition: 'margin-left 0.3s', zIndex: 0 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">
            <i className="bi bi-plus-square-fill me-2"></i>Tambah Data
          </h2>
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Kembali
          </button>
        </div>

        {alertMessage && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button type="button" className="btn-close" onClick={() => setAlertMessage('')}></button>
          </div>
        )}

        {/* Info Cards */}
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
              <div className="text-muted">Data SDI</div>
              <div className="fw-bold text-dark">{dummyData.jenisDataSDI}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-light p-3 rounded shadow-sm">
              <div className="text-muted">Bidang</div>
              <div className="fw-bold text-dark">{dummyData.namaBidang}</div>
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
          <div className="d-flex justify-content-between align-items-center px-3 pt-3 mb-3">
            <h5 className="fw-semibold mb-0">Data Tersedia</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Cari data..."
              style={{ maxWidth: '300px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="card-body p-0">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fw-semibold">NIK</th>
                  <th className="fw-semibold">Nama</th>
                  <th className="fw-semibold">Usia</th>
                  <th className="fw-semibold">Alamat</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.preview
                  .filter((row) =>
                    Object.values(row).some((value) =>
                      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                  .map((row, index) => (
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

        <input type="file" accept=".xlsx,.xls,.csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleUploadFile} />

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => handleUploadPrompt('add')}>
            <i className="bi bi-plus-circle"></i>Tambah Data
          </button>
          <button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={() => handleUploadPrompt('replace')}>
            <i className="bi bi-pencil-square"></i>Ganti Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDataHistoryPage;
