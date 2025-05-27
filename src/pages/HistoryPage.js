import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';

const sdiOptions = ['Semua', 'Data SDI', 'Tidak'];
// const produsenOptions = ['Semua', 'Perumahan', 'Permukiman', 'RPM', 'Pusdatin'];
const statusOptions = ['Semua', 'approved', 'rejected', 'pending'];

const dataDummy = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Data ${String.fromCharCode(65 + i)}`,
  deskripsi: `Deskripsi Data ${String.fromCharCode(65 + i)}`,
  dataSdi: ['Data SDI', 'Tidak'][Math.floor(Math.random() * 2)],
  // produsen: ['Perumahan', 'Permukiman', 'RPM', 'Pusdatin'][Math.floor(Math.random() * 4)],
  status: ['approved', 'rejected', 'pending'][i % 3],
}));

const HistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSdi, setFilterSdi] = useState('Semua');
  // const [filterProdusen, setFilterProdusen] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [data, setData] = useState(dataDummy);
  const [setData] = useState(dataDummy);


  const filteredData = dataDummy.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterSdi === 'Semua' || item.dataSdi === filterSdi) &&
    // (filterProdusen === 'Semua' || item.produsen === filterProdusen) &&
    (filterStatus === 'Semua' || item.status === filterStatus)
  );

  const handleDelete = () => {
    setData(prev => prev.filter(item => item.id !== selectedId));
    setShowDeleteModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <style>{`
        .table-hover tbody tr:hover {
          background-color: #FDB46C !important;
        }
        .icon-button {
          background: none;
          border: none;
          padding: 0 5px;
          cursor: pointer;
        }
        .icon-button {
          background: none;
          border: none;
          padding: 5px;
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

      `}</style>

      {showSuccess && (
        <div
          className="alert alert-success position-fixed top-0 start-50 translate-middle-x text-center"
          style={{ zIndex: 1050, marginTop: '1rem', width: 'auto' }}
        >
          Data berhasil dihapus.
        </div>

      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus data ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Batal</Button>
          <Button variant="danger" onClick={handleDelete}>Hapus</Button>
        </Modal.Footer>
      </Modal>

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

        {/* Main content */}
        <div className="flex-grow-1 p-4 pt-5" style={{
          backgroundColor: '#ffffff',
          marginLeft: sidebarOpen ? '250px' : '100px',
          transition: 'margin-left 0.3s',
        }}>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <h2 className="fw-bold text-dark mb-0">
              <i className="bi bi-clock-history me-2"></i>Riwayat Data
            </h2>
            <button className="btn btn-outline-danger" onClick={() => navigate('/')}>Logout</button>
          </div>

          <div className="card border-0 shadow rounded-4">
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex flex-wrap align-items-center gap-2">
                <select
                  className="form-select"
                  value={filterSdi}
                  onChange={(e) => setFilterSdi(e.target.value)}
                  style={{ maxWidth: '150px' }}
                >
                  {sdiOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                {/* <select
                  className="form-select"
                  value={filterProdusen}
                  onChange={(e) => setFilterProdusen(e.target.value)}
                  style={{ maxWidth: '150px' }}
                >
                  {produsenOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select> */}
                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ maxWidth: '150px' }}
                >
                  {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <div className="ms-auto" style={{ maxWidth: '250px', flex: '1 1 auto' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cari data..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
          </div>



            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Nama Data</th>
                      <th>Data SDI</th>
                      {/* <th>Produsen Data</th> */}
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map(item => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.dataSdi}</td>
                          {/* <td>{item.produsen}</td> */}
                          <td>
                            <button
                              className={`btn btn-sm text-capitalize px-3 py-2 ${item.status === 'approved' ? 'btn-success' : item.status === 'rejected' ? 'btn-danger' : 'btn-warning text-dark'}`}
                              onClick={() => navigate('/history-page/progress-approval')}
                              style={{ width: '100px' }}
                            >
                              {item.status}
                            </button>
                          </td>

                          <td>
                            <button className="icon-button text-primary" title="Lihat Data" onClick={() => navigate('/data-page/preview')}>
                              <i className="bi bi-eye-fill"></i>
                            </button>
                            <button className="icon-button text-info" title="Lihat Log" onClick={() => console.log(`Log data untuk ID ${item.id}`)}>
                              <i className="bi bi-journal-text"></i>
                            </button>
                            {item.status === 'approved' && (
                              <button className="icon-button text-success" title="Tambah Data">
                                <i className="bi bi-plus-square-fill"></i>
                              </button>
                            )}
                            <button className="icon-button text-warning" title="Edit Data" onClick={() => navigate('/history-page/edit-page')}>
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="icon-button text-danger" title="Hapus" onClick={() => { setSelectedId(item.id); setShowDeleteModal(true); }}>
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted py-3">
                          Tidak ada data ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-between align-items-center">
              <div>Total data: {filteredData.length}</div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Halaman {currentPage} dari {totalPages}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
