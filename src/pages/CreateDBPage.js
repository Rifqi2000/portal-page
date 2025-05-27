import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreateDBPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hasDatabase, setHasDatabase] = useState(null);
  const [dbName, setDbName] = useState('');
  const [tableName, setTableName] = useState('');
  const [existingDatabases] = useState(['db_umkm', 'db_kependudukan']);
  const [columns, setColumns] = useState([]);
  const [preview, setPreview] = useState([]);
  const [fileName, setFileName] = useState('');
  const [firstRowHeader, setFirstRowHeader] = useState(true);
  const [dbCreated, setDbCreated] = useState(false);
  const [uploadStep, setUploadStep] = useState(1);
  const [dataDescription, setDataDescription] = useState('');
  const [isDbNameSaved, setIsDbNameSaved] = useState(false);
  const [isTableNameSaved, setIsTableNameSaved] = useState(false);
  const [isDescriptionSaved, setIsDescriptionSaved] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success', 'danger', 'info', etc.



  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';

  const handleFileUpload = (e) => {
    if (!dbName || !tableName || !dataDescription) {
      setAlertMessage('Pastikan nama database, nama tabel, dan deskripsi data sudah diisi sebelum mengupload file.');
      setAlertType('danger');
      return;
    }

    const file = e.target.files[0];
    setFileName(file?.name || '');
    const reader = new FileReader();
  
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const isCSV = file.name.endsWith('.csv');
      const data = isCSV
        ? XLSX.read(bstr, { type: 'string', raw: true })
        : XLSX.read(bstr, { type: 'binary' });
  
      const wsname = data.SheetNames ? data.SheetNames[0] : null;
      const ws = data.Sheets
        ? data.Sheets[wsname]
        : XLSX.utils.aoa_to_sheet(XLSX.utils.sheet_to_json(data, { header: 1 }));
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      const headers = firstRowHeader
        ? jsonData[0].map((col) => col.toLowerCase().replace(/\s+/g, '_'))
        : jsonData[0].map((_, idx) => `kolom_${idx + 1}`);
  
      const rows = jsonData.slice(firstRowHeader ? 1 : 0, 6);
      const initialTypes = headers.map((col) => ({
        name: col,
        type: 'string',
        length: 255,
      }));
  
      if (uploadStep === 1) {
        setColumns(initialTypes);
        setUploadStep(2); // naik ke tahap berikutnya
      }
  
      setPreview(rows);
    };
  
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
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

  const handleCreateDatabase = () => {
    if (!dbName.trim()) {
      setAlertMessage('Nama database tidak boleh kosong.');
      setAlertType('danger');
      return;
    }
    setDbCreated(true);
    setIsDbNameSaved(true);
    setAlertMessage(`Database '${dbName}' berhasil dibuat.`);
    setAlertType('success');
  };
  

  const handleSubmitTable = () => {
    const payload = {
      table_name: dbName.toLowerCase().replace(/\s+/g, '_'),
      columns,
    };
    console.log('📦 Submit Kolom:', payload);
    setAlertMessage('Kolom berhasil dimasukkan.');
    setAlertType('success');

  };

  const handleInsertData = () => {
    if (preview.length === 0) {
      setAlertMessage('Tidak ada data untuk dimasukkan.');
      setAlertType('danger');
      return;
    }
    const payload = {
      data: preview,
    };
    console.log('📦 Data to insert:', payload);
    setAlertMessage('Data berhasil dimasukkan.');
    setAlertType('success');
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
      <div className="flex-grow-1 p-4 pt-5" style={{ marginLeft: sidebarOpen ? '250px' : '100px', transition: 'margin-left 0.3s', zIndex: 0 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">
            <i className="bi bi-database-fill-add me-2"></i>Input Data
          </h2>
          <button className="btn btn-outline-danger" onClick={() => navigate('/')}>Logout</button>
        </div>

        {alertMessage && (
          <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button type="button" className="btn-close" onClick={() => setAlertMessage('')}></button>
          </div>
        )}

        {/* Langkah 1 */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Apakah sudah memiliki database?</label><br />
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="dbOption" onChange={() => setHasDatabase(true)} />
            <label className="form-check-label">Sudah</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="dbOption" onChange={() => setHasDatabase(false)} />
            <label className="form-check-label">Belum</label>
          </div>
        </div>

        {/* Langkah 2 */}
        {hasDatabase === true && (
          <div className="mb-4">
            <label className="form-label fw-semibold">Pilih Nama Database</label>
            <select
              className="form-select"
              value={dbName}
              onChange={(e) => {
                const value = e.target.value;
                setDbName(value);
                setIsDbNameSaved(!!value && value !== ''); // tandai sebagai disimpan jika sudah memilih
              }}
            >
              <option value="">Pilih database</option>
              {existingDatabases.map((db, i) => (
                <option key={i} value={db}>{db}</option>
              ))}
            </select>
          </div>
        )}


        {hasDatabase === false && (
          <div className="mb-4">
            <label className="form-label fw-semibold">Masukkan Nama Database Baru</label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control"
                style={{ flex: 1 }}
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
                placeholder="Contoh: db_kependudukan"
              />
              <button
                className="btn btn-primary"
                onClick={handleCreateDatabase}
                type="button"
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        {/* Nama Tabel */}
        {isDbNameSaved && (
          <div className="mb-4">
            <label className="form-label fw-semibold">Masukkan Nama Tabel</label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control"
                style={{ flex: 1 }}
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="Contoh: data_penduduk"
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  if (!tableName.trim()) {
                    setAlertMessage('Nama Tabel tidak boleh kosong.');
                    setAlertType('danger');
                  }
                  setIsTableNameSaved(true);
                  setAlertMessage(`Nama Tabel '${tableName}' berhasil dibuat.`);
                  setAlertType('success');

                }}
              >
                Simpan
              </button>
            </div>
          </div>
        )}


        {/* Deskripsi Data */}
        {isTableNameSaved && (
          <div className="mb-4">
            <label className="form-label fw-semibold">Masukkan Deskripsi Data</label>
            <div className="d-flex align-items-start gap-2">
              <textarea
                className="form-control"
                rows="3"
                style={{ flex: 1 }}
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                placeholder="Tuliskan deskripsi singkat tentang data yang akan diupload..."
              ></textarea>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  if (!dataDescription.trim()) {
                    setAlertMessage('Deskripsi tidak boleh kosong.');
                    setAlertType('danger');
                  }
                  setIsDescriptionSaved(true);
                  setAlertMessage(`Deskripsi berhasil dibuat.`);
                  setAlertType('success');
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        {/* Struktur Kolom */}
        {isDescriptionSaved && columns.length > 0 && (
          <div className="mb-4">
            <table className="table table-bordered mt-2">
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
                    <td>{col.name}</td>
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
            <button className="btn btn-success" onClick={handleSubmitTable}>
              Masukkan Kolom Tabel
            </button>
          </div>
        )}
        
        {/* Upload Data */}
        {isDescriptionSaved && (
          <div className="mb-4">
            <h5 className="fw-semibold">
              <i className="bi bi-upload me-2"></i>
              {uploadStep === 1 ? 'Upload Struktur Nama Kolom Excel/CSV' : 'Upload Data Excel/CSV'}
            </h5>
            <input type="file" accept=".xlsx,.xls,.csv" className="form-control" onChange={handleFileUpload} />
          </div>
        )}

        {/* Preview */}
        {preview.length > 0 && (
          <div>
            <h5 className="fw-semibold"><i className="bi bi-eye me-2"></i>Preview Data</h5>
            <table className="table table-hover">
              <thead>
                <tr>{columns.map((col, i) => <th key={i}>{col.name}</th>)}</tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i}>
                    {row.map((val, j) => <td key={j}>{val}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary" onClick={handleInsertData}>Masukkan Data</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateDBPage;
