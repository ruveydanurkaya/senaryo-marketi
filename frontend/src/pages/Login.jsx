import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('writer'); // Varsayılan rol: Senarist seçili oluyor.
  const [isRegister, setIsRegister] = useState(false); // Ekranda "Giriş" mi yoksa "Kayıt" formu mu gösterilecek?
  const navigate = useNavigate(); // Sayfa yönlendirmesi için

  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    const endpoint = isRegister ? '/auth/register' : '/auth/login'; // Hangi URL'e istek atacağız?

    // Backend'e gidecek veri paketi
    const payload = isRegister
      ? { email, password, username, role } // Kayıt ise hepsini gönder
      : { email, password };                // Giriş ise sadece bunları gönder

    try {
      const res = await api.post(endpoint, payload); //API İSTEĞİ

      if (isRegister) {
        alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.'); // Kayıt başarılıysa kullanıcıyı giriş moduna döndür.
        setIsRegister(false); // Giriş moduna dön
      } else {
        // --- BAŞARILI GİRİŞ ---
        //Token'ı kaydet ve yönlendir.
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('role', res.data.role);

        // Kullanıcının rolüne göre ilgili sayfaya yönlendir.
        if (res.data.role === 'writer') navigate('/writer');
        else if (res.data.role === 'admin') navigate('/admin');
        else navigate('/market'); //Yönetmen ise markete gider.
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
        {/* Sadece KAYIT modunda görünen alanlar */}
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

        {/* Rol Seçimi (Kayıtta) */}
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

      {/* Mod Değiştirme Butonu */}
      <button
        onClick={() => setIsRegister(!isRegister)}
        style={{ marginTop: 10, background: 'none', border: 'none', color: 'blue', cursor: 'pointer', width: '100%' }}
      >
        {isRegister ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
      </button>
    </div>
  );
}