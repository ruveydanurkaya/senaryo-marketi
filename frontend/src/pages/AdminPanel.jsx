import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [genreName, setGenreName] = useState('');
  const [genres, setGenres] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  const fetchGenres = async () => {
    try {
      const res = await api.get('/scripts/genres');
      setGenres(res.data);
    } catch (error) {
      console.error("Türler çekilemedi", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/auth/users');
      setUsers(res.data);
    } catch (error) {
      console.error("Kullanıcılar çekilemedi (Yetkiniz olmayabilir)", error);
    }
  };


  useEffect(() => {
    fetchGenres();
    fetchUsers();
  }, []);


  const handleAddGenre = async () => {
    if (!genreName) return;
    try {
      await api.post('/scripts/genres', { name: genreName });
      alert('Tür Eklendi!');
      setGenreName('');
      fetchGenres();
    } catch (error) {
      alert('Hata: ' + (error.response?.data?.message || error.message));
    }
  };


  const handlePromote = async (user) => {

    if (!window.confirm(`${user.email} kullanıcısını YÖNETİCİ (Admin) yapmak istediğinize emin misiniz?`)) return;

    try {
      await api.put(`/auth/promote/${user.id}`);
      alert('Kullanıcı başarıyla Admin yapıldı!');
      fetchUsers();
    } catch (error) {
      alert('İşlem başarısız: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h1 style={{ color: '#2c3e50' }}>Admin Paneli 🛡️</h1>
        <button
          onClick={handleLogout}
          style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
        >
          Çıkış Yap
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

        <div>
          <h3>🎬 Film Türleri Yönetimi</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              value={genreName}
              onChange={e => setGenreName(e.target.value)}
              placeholder="Yeni Tür Adı (Örn: Western)"
              style={{ padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button
              onClick={handleAddGenre}
              style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Ekle
            </button>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
            {genres.map(g => (
              <li key={g.id} style={{ padding: '10px 15px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
                {g.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>👥 Kullanıcı Yönetimi</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ background: '#2c3e50', color: 'white', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Email / Kullanıcı</th>
                <th style={{ padding: '10px' }}>Rol</th>
                <th style={{ padding: '10px' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee', background: 'white' }}>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 'bold' }}>{user.name || user.username || 'İsimsiz'}</div>
                      <div style={{ fontSize: '12px', color: '#777' }}>{user.email}</div>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{
                        padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                        background: user.role === 'admin' ? '#e74c3c' : '#3498db',
                        color: 'white'
                      }}>
                        {user.role ? user.role.toUpperCase() : 'USER'}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handlePromote(user)}
                          style={{ background: '#27ae60', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          Admin Yap
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '10px', textAlign: 'center', color: '#777' }}>
                    Henüz kullanıcı yok veya yükleniyor...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}