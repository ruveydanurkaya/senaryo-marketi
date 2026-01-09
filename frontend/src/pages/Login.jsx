import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('writer');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/auth/register' : '/auth/login';

    const payload = isRegister
      ? { email, password, username, role }
      : { email, password };

    try {
      const res = await api.post(endpoint, payload);

      if (isRegister) {
        alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
        setIsRegister(false);
      } else {
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('role', res.data.role);

        if (res.data.role === 'writer') navigate('/writer');
        else if (res.data.role === 'admin') navigate('/admin');
        else navigate('/market');
      }
    } catch (err) {
      console.error(err);
      alert('İşlem başarısız! Bilgileri kontrol edin.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{textAlign:'center'}}>{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {isRegister && (
          <input
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{padding: 8}}
          />
        )}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{padding: 8}}
        />

        <input
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{padding: 8}}
        />

        {isRegister && (
          <div style={{display:'flex', gap: 10, alignItems:'center'}}>
            <label>Rol Seç:</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={{padding: 5, flex:1}}>
              <option value="writer">Senarist (Senaryo Yazar)</option>
              <option value="director">Yönetmen (Senaryo Alır)</option>
              <option value="admin">Admin (Yönetici)</option>
            </select>
          </div>
        )}

        <button type="submit" style={{ padding: 10, backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isRegister ? 'Kaydol' : 'Giriş Yap'}
        </button>
      </form>

      <button
        onClick={() => setIsRegister(!isRegister)}
        style={{ marginTop: 10, background: 'none', border: 'none', color: 'blue', cursor: 'pointer', width: '100%' }}
      >
        {isRegister ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
      </button>
    </div>
  );
}