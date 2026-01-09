import React, { useState } from 'react';


const SenaryoKarti = ({ baslik, ozet, yazarAdi, yazarEmail, yazarTelefon, turler }) => {
  const [iletisimAcik, setIletisimAcik] = useState(false);

  return (
    <div style={{
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }}>

      <h2 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#333' }}>{baslik}</h2>


      <p style={{ fontSize: '14px', color: '#555', margin: '0 0 10px 0' }}>
        <strong>Yazar:</strong> {yazarAdi}
      </p>

       {turler && turler.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          {turler.map((t, index) => (
            <span key={index} style={{ background: '#e0f7fa', color: '#006064', padding: '3px 10px', borderRadius: '15px', fontSize: '12px', marginRight: '5px', display: 'inline-block' }}>
              {t.name}
            </span>
          ))}
        </div>
      )}


      <p style={{ fontStyle: 'italic', fontSize: '13px', color: '#666', lineHeight: '1.5', flexGrow: 1 }}>
          {ozet && ozet.length > 120 ? ozet.substring(0, 120) + '...' : ozet}
      </p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button
          onClick={() => setIletisimAcik(true)}
          style={{
            backgroundColor: '#6200ea',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5300c7'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6200ea'}
        >
          İletişime Geç
        </button>
      </div>

      {iletisimAcik && (
          <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            zIndex: 10,
            border: '2px solid #6200ea'
          }}>

          <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
              Yazar İletişim Bilgileri
          </h4>

          <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '6px', width: '90%', marginBottom: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>E-Posta (Kopyalamak için seçin):</p>

            <p style={{ fontFamily: 'monospace', color: '#6200ea', fontWeight: 'bold', fontSize: '16px', userSelect: 'all', wordBreak: 'break-all', margin: 0 }}>
              {yazarEmail}
            </p>
          </div>


          <button
            onClick={() => setIletisimAcik(false)}
            style={{ background: 'none', border: 'none', color: '#999', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', marginTop: '10px' }}
             onMouseOver={(e) => e.target.style.color = '#d32f2f'}
             onMouseOut={(e) => e.target.style.color = '#999'}
          >
            Pencereyi Kapat
          </button>
        </div>
      )}
    </div>
  );
};

export default SenaryoKarti;