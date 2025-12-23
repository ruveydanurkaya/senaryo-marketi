import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [genreName, setGenreName] = useState(''); //Yeni eklenecek türün adı
  const [genres, setGenres] = useState([]); //Mevcut türlerin listesi
  const navigate = useNavigate();

  // Mevcut türleri çekme
  const fetchGenres = async () => {
    try {
      const res = await api.get('/scripts/genres');
      setGenres(res.data); // Gelen listeyi state'e at
    } catch (error) {
      console.error("Türler çekilemedi", error);
    }
  };

  useEffect(() => { // useEffect: Sayfa ilk açıldığında 1 kere çalışır.
    fetchGenres();
  }, []);

  // --- TÜR EKLEME İŞLEMİ ---
  const handleAddGenre = async () => {
    if (!genreName) return; // Boşsa işlem yapma (boş return)
    try {
      await api.post('/scripts/genres', { name: genreName }); //API ile backend'e POST isteği atıyor.
      alert('Tür Eklendi!');
      setGenreName(''); //İşlem bitti. Inputu temizle.
      fetchGenres(); // Listeyi yenile
    } catch (error) {
      alert('Hata: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Token'ı sil
    navigate('/');        // Giriş sayfasına at
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h1>Admin Paneli 🛡️</h1>
        <button onClick={handleLogout} style={{background:'red', color:'white', border:'none', padding:5}}>
            Çıkış</button>
      </div>

      {/* Yeni Tür Ekleme Formu */}
      <div style={{ border: '1px solid #ccc', padding: 20, marginBottom: 20 }}>
        <h3>Yeni Tür Ekle</h3>
        <input
          value={genreName}
          onChange={e => setGenreName(e.target.value)}
          placeholder="Örn: Bilim Kurgu, Dram, Aksiyon..."
          style={{ padding: 8, width: 300, marginRight: 10 }}
        />
        <button onClick={handleAddGenre} style={{ padding: 8, background: 'blue', color: 'white', border:'none' }}>
          Ekle
        </button>
      </div>

      <h3>Mevcut Türler:</h3>
      <ul>
        {genres.map(g => (
          <li key={g.id} style={{marginBottom: 5}}>
             {g.id} - <b>{g.name}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}