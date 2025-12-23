import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import SenaryoKarti from '../components/SenaryoKarti';

export default function Marketplace() {
  const [scripts, setScripts] = useState([]); // İlk anda gösterilen tüm senaryolar
  const [aramaMetni, setAramaMetni] = useState(""); // Arama kutusu için state
  const [secilenTur, setSecilenTur] = useState("Hepsi"); // Kategori filtresi için state (Başlangıçta "Hepsi" seçili)
  const navigate = useNavigate(); //Yönlendirmeler için

  useEffect(() => {
    // Verileri çekiyoruz backend'den
    api.get('/scripts').then(res => setScripts(res.data)).catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // --- 1. ADIM: Mevcut Senaryolardan Benzersiz Türleri Çıkarıyoruz ---
  // Backend'den gelen tüm senaryolara bakıp, var olan türleri (Dram, Komedi vs.) listeliyoruz.
  const mevcutTurler = ["Hepsi"];
  scripts.forEach(script => {
    if (script.genres) {
      script.genres.forEach(g => {
        if (!mevcutTurler.includes(g.name)) {
          mevcutTurler.push(g.name);
        }
      });
    }
  });

  // --- 2. ADIM: Filtreleme Mantığı ---
  // Hem arama metnine hem de seçilen türe göre listeyi daraltıyoruz.
  const filtrelenmisSenaryolar = scripts.filter(script => {
    // 1.Arama Kriteri (Büyük/küçük harf duyarsız)
    const baslikUyumu = script.title.toLowerCase().includes(aramaMetni.toLowerCase());

    // 2.Tür Kriteri
    const turUyumu = secilenTur === "Hepsi"
      ? true
      : script.genres?.some(g => g.name === secilenTur);

    return baslikUyumu && turUyumu; //İkiside uyuyorsa gösterir.
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>

      {/* Üst Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee'}}>
        <h1 style={{color: '#333', margin: 0}}>Yönetmen Marketi 🎬</h1>
        <button onClick={handleLogout} style={{background:'#d32f2f', color:'white', border:'none', padding:'10px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>Çıkış</button>
      </div>

      {/* --- Arama ve Filtreleme Alanı --- */}
      <div style={{
          display: 'flex',gap: '15px',marginBottom: '30px',background: 'white',
          padding: '20px',borderRadius: '8px',boxShadow: '0 2px 5px rgba(0,0,0,0.05)',flexWrap: 'wrap' // Mobilde alt alta geçmesi için
      }}>

        {/* Arama Kutusu */}
        <input
          type="text"
          placeholder="Senaryo adı ara..."
          value={aramaMetni}
          onChange={(e) => setAramaMetni(e.target.value)}
          style={{
            flex: 1,padding:'12px',border: '1px solid #ddd',borderRadius: '6px',fontSize: '16px',outline: 'none',minWidth: '200px'
          }}
        />

        {/* Tür Seçimi */}
        <select
          value={secilenTur}
          onChange={(e) => setSecilenTur(e.target.value)}
          style={{
            padding: '12px',border: '1px solid #ddd',borderRadius: '6px',fontSize: '16px',backgroundColor: 'white',cursor: 'pointer',minWidth: '150px'
          }}
        >
          {mevcutTurler.map((tur, index) => (
            <option key={index} value={tur}>{tur}</option>
          ))}
        </select>
      </div>

      <p style={{fontSize: '16px', color: '#666', marginBottom: '20px'}}>
        Toplam <strong>{filtrelenmisSenaryolar.length}</strong> senaryo listeleniyor.
      </p>

      {/* --- Kartların Listelendiği Grid Yapısı --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>

        {/*'scripts.map' yerine 'filtrelenmisSenaryolar.map' kullanıyoruz */}
        {filtrelenmisSenaryolar.map(script => (
          <SenaryoKarti
            key={script.id}
            baslik={script.title}
            ozet={script.content}
            yazarAdi={script.writer ? script.writer.username : 'Gizli Yazar'} //Yazar boş gelirse hata olmasın diye"?" kullanıyoruz.
            yazarEmail={script.writer?.email || 'Bilgi Yok'}
            yazarTelefon={script.writer?.phone}
            turler={script.genres}
          />
        ))}

        {filtrelenmisSenaryolar.length === 0 && ( //Arama sonucu boş
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#999', fontSize: '18px', border: '2px dashed #ddd', borderRadius: '8px'}}>
            Aradığınız kriterlere uygun senaryo bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}