import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const sdiOptions = ['Data SDI', 'Tidak'];
const produsenOptions = ['Perumahan', 'Permukiman', 'RPM', 'Pusdatin'];

// Menghasilkan data dummy dengan isi acak untuk kolom dataSdi dan produsen
const dataDummy = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Data ${String.fromCharCode(65 + i)}`,
  dataSdi: sdiOptions[Math.floor(Math.random() * sdiOptions.length)],
  produsen: produsenOptions[Math.floor(Math.random() * produsenOptions.length)]
}));

const DataPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSdi, setFilterSdi] = useState('Semua');
  const [filterProdusen, setFilterProdusen] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';

  const filteredData = dataDummy.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterSdi === 'Semua' || item.dataSdi === filterSdi) &&
    (filterProdusen === 'Semua' || item.produsen === filterProdusen)
  );

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
      `}</style>

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

        {/* Main content */}
        <div
          className="flex-grow-1 p-4 pt-5"
          style={{
            backgroundColor: '#ffffff',
            transition: '0.3s',
            marginLeft: sidebarOpen ? '250px' : '100px',
            width: '100%',
          }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <h2 className="fw-bold text-dark mb-0">
              <i className="bi bi-table me-2"></i>Kumpulan Data
            </h2>
            <button className="btn btn-outline-danger" onClick={() => navigate('/')}>Logout</button>
          </div>

          <div className="card border-0 shadow rounded-4">
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                <h5 className="mb-0 fw-semibold">
                  <i className="bi bi-folder2-open me-2"></i>Data Tersedia
                </h5>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <select
                  className="form-select"
                  style={{ maxWidth: '150px' }}
                  value={filterSdi}
                  onChange={(e) => {
                    setFilterSdi(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="Semua">Semua</option>
                  <option value="Data SDI">Data SDI</option>
                  <option value="Tidak">Tidak</option>
                </select>
                <select
                  className="form-select"
                  style={{ maxWidth: '180px' }}
                  value={filterProdusen}
                  onChange={(e) => {
                    setFilterProdusen(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="Semua">Semua</option>
                  <option value="Perumahan">Perumahan</option>
                  <option value="Permukiman">Permukiman</option>
                  <option value="RPM">RPM</option>
                  <option value="Pusdatin">Pusdatin</option>
                </select>
                <input
                  type="text"
                  className="form-control ms-auto"
                  placeholder="Cari data..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </div>


            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nama Data</th>
                      <th>Data SDI</th>
                      <th>Produsen Data</th>
                      <th>Detail Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.dataSdi}</td>
                          <td>{item.produsen}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => navigate('/data-page/preview')}
                            >
                              Lihat Detail
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-3">
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
              <div className="d-flex align-items-center gap-2">
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

export default DataPage;
