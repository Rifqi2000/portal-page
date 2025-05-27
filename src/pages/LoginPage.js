import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoDprkp from '../assets/images/logo-dprkp.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div
      className="d-flex flex-column flex-md-row min-vh-100"
      style={{ fontFamily: 'Segoe UI, sans-serif' }}
    >
      {/* Left - Form Area */}
      <div
        className="d-flex align-items-center justify-content-center flex-fill p-4"
        style={{ backgroundColor: '#ffffff', flex: '0 0 60%' }}
      >
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>Halo,<br />Selamat Datang di Portal Data DPRKP</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                id="username"
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Ingat Saya
                </label>
              </div>
              <button
                type="button"
                onClick={() => alert('Fitur lupa password belum tersedia.')}
                className="btn btn-link text-muted p-0"
                style={{ fontSize: '0.9rem', textDecoration: 'none' }}
              >
                Lupa Password?
              </button>

            </div>

            <button
              type="submit"
              className="btn w-100 fw-semibold"
              style={{ backgroundColor: '#104D62', color: '#fff' }}
            >
              Masuk
            </button>
          </form>

          <p className="mt-4 text-center text-muted" style={{ fontSize: '0.9rem' }}>
            Sudah punya Akun? <Link to="/register" className="text-decoration-none" style={{ color: '#104D62' }}>Daftar</Link>
          </p>
        </div>
      </div>

      {/* Right - Illustration or color background */}
      <div
        className="d-none d-md-flex flex-fill align-items-center justify-content-center"
        style={{
          flex: '0 0 40%',
          background: 'linear-gradient(135deg, #f98025, #f69000, #53B1B1, #104D62, #828282)',
          position: 'relative',
          padding: '2rem',
          borderTopLeftRadius: '2rem',
          borderBottomLeftRadius: '2rem',
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
    </div>
  );
};

export default LoginPage;
