import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import SenaryoKarti from '../components/SenaryoKarti';

export default function Marketplace() {
  const [scripts, setScripts] = useState([]);
  const [aramaMetni, setAramaMetni] = useState("");
  const [secilenTur, setSecilenTur] = useState("Hepsi");
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/scripts').then(res => setScripts(res.data)).catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

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

  const filtrelenmisSenaryolar = scripts.filter(script => {

    const baslikUyumu = script.title.toLowerCase().includes(aramaMetni.toLowerCase());

    const turUyumu = secilenTur === "Hepsi"
      ? true
      : script.genres?.some(g => g.name === secilenTur);

    return baslikUyumu && turUyumu;
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee'}}>
        <h1 style={{color: '#333', margin: 0}}>Yönetmen Marketi 🎬</h1>
        <button onClick={handleLogout} style={{background:'#d32f2f', color:'white', border:'none', padding:'10px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>Çıkış</button>
      </div>

      <div style={{
          display: 'flex',gap: '15px',marginBottom: '30px',background: 'white',
          padding: '20px',borderRadius: '8px',boxShadow: '0 2px 5px rgba(0,0,0,0.05)',flexWrap: 'wrap'
      }}>

        <input
          type="text"
          placeholder="Senaryo adı ara..."
          value={aramaMetni}
          onChange={(e) => setAramaMetni(e.target.value)}
          style={{
            flex: 1,padding:'12px',border: '1px solid #ddd',borderRadius: '6px',fontSize: '16px',outline: 'none',minWidth: '200px'
          }}
        />

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


      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>


        {filtrelenmisSenaryolar.map(script => (
          <SenaryoKarti
            key={script.id}
            baslik={script.title}
            ozet={script.content}
            yazarAdi={script.writer ? script.writer.username : 'Gizli Yazar'}
            yazarEmail={script.writer?.email || 'Bilgi Yok'}
            yazarTelefon={script.writer?.phone}
            turler={script.genres}
          />
        ))}

        {filtrelenmisSenaryolar.length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#999', fontSize: '18px', border: '2px dashed #ddd', borderRadius: '8px'}}>
            Aradığınız kriterlere uygun senaryo bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}