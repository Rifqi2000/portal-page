import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaArrowLeft } from 'react-icons/fa';

const EditHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dbName, setDbName] = useState('db_kependudukan');
  const [tableName, setTableName] = useState('data_penduduk');
  const [dataSDI, setDataSDI] = useState('Data SDI');
  const [dataDescription, setDataDescription] = useState('Deskripsi awal data ini.');
  const [columns, setColumns] = useState([
    { name: 'rusun', type: 'string', length: 255 },
    { name: 'wilayah', type: 'string', length: 255 },
    { name: 'uprs', type: 'string', length: 255 },
  ]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';

  const handleSave = (field) => {
    let message = '';
    switch (field) {
      case 'Nama Database':
        message = ` ${dbName} berhasil disimpan`;
        break;
      case 'Nama Tabel':
        message = `${tableName} berhasil disimpan`;
        break;
      case 'Data SDI':
        message = `${dataSDI} berhasil disimpan`;
        break;
      case 'Deskripsi':
        message = 'Deskripsi berhasil disimpan';
        break;
      default:
        message = `${field} berhasil disimpan.`;
    }
    setAlertMessage(message);
    setAlertType('success');
  };

  const handleTypeChange = (index, newType) => {
    const updated = [...columns];
    updated[index].type = newType;
    setColumns(updated);
  };

  const handleLengthChange = (index, newLength) => {
    const updated = [...columns];
    updated[index].length = parseInt(newLength) || 0;
    setColumns(updated);
  };

  const handleColumnNameChange = (index, newName) => {
    const updated = [...columns];
    updated[index].name = newName;
    setColumns(updated);
  };

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', type: 'string', length: 255 }]);
  };

  const handleSubmitTable = () => {
    const payload = {
      table_name: tableName.toLowerCase().replace(/\s+/g, '_'),
      columns,
    };
    console.log('📦 Struktur Kolom:', payload);
    setAlertMessage('Struktur kolom berhasil disimpan.');
    setAlertType('success');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
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
                className={`btn w-100 text-start ${location.pathname === '/history-page' || location.pathname === '/history-page/progress-approval' || location.pathname === '/history-page/edit-page' ? 'btn-light text-dark' : 'btn-outline-light'}`}
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
            <i className="bi bi-pencil-square me-2"></i>Edit Data
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

        <div className="mb-4">
          <label className="form-label fw-semibold">Nama Database</label>
          <div className="d-flex align-items-center gap-2">
            <input type="text" className="form-control" value={dbName} onChange={(e) => setDbName(e.target.value)} />
            <button className="btn btn-primary" onClick={() => handleSave('Nama Database')}>Simpan</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Nama Tabel</label>
          <div className="d-flex align-items-center gap-2">
            <input type="text" className="form-control" value={tableName} onChange={(e) => setTableName(e.target.value)} />
            <button className="btn btn-primary" onClick={() => handleSave('Nama Tabel')}>Simpan</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Data SDI</label>
          <div className="d-flex align-items-center gap-2">
            <select className="form-select" value={dataSDI} onChange={(e) => setDataSDI(e.target.value)}>
              <option value="">Pilih</option>
              <option value="Data SDI">Data SDI</option>
              <option value="Tidak">Tidak</option>
            </select>
            <button className="btn btn-primary" onClick={() => handleSave('Data SDI')}>Simpan</button>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Deskripsi</label>
          <div className="d-flex align-items-start gap-2">
            <textarea className="form-control" rows="3" value={dataDescription} onChange={(e) => setDataDescription(e.target.value)}></textarea>
            <button className="btn btn-primary mt-1" onClick={() => handleSave('Deskripsi')}>Simpan</button>
          </div>
        </div>

        <div className="mb-4">
          <h5 className="fw-semibold">Struktur Kolom</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nama Kolom</th>
                <th>Tipe Data</th>
                <th>Panjang</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={col.name}
                      onChange={(e) => handleColumnNameChange(i, e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={col.type}
                      onChange={(e) => handleTypeChange(i, e.target.value)}
                    >
                      <option value="string">String</option>
                      <option value="integer">Integer</option>
                      <option value="float">Float</option>
                      <option value="boolean">Boolean</option>
                      <option value="date">Date</option>
                      <option value="text">Text</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={col.length}
                      onChange={(e) => handleLengthChange(i, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={handleAddColumn}>Tambah Kolom</button>
            <button className="btn btn-primary" onClick={handleSubmitTable}>Simpan Struktur Kolom</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHistoryPage;
