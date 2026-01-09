import { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function WriterPanel() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [allGenres, setAllGenres] = useState([]);
  const [myScripts, setMyScripts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const genreRes = await api.get('/scripts/genres');
      setAllGenres(genreRes.data);
      const scriptsRes = await api.get('/scripts/my-scripts');
      setMyScripts(scriptsRes.data);}
    catch (err) {
      console.error("Veri yükleme hatası", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if(!title || !price || selectedGenres.length === 0) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const payload = {
      title,
      content,
      price: parseFloat(price),
      genreIds: selectedGenres.map(id => parseInt(id))
    };

    try {
      if (editingId){
        await api.put(`/scripts/${editingId}`, payload);
        alert('Senaryo Güncellendi!');
      } else {
        await api.post('/scripts', payload);
        alert('Senaryo Eklendi!');
      }

      resetForm();
      fetchData();
    } catch (error) {
      alert('Hata: ' + error.message);
    }
  };


  const handleEditClick = (script) => {
    setEditingId(script.id);
    setTitle(script.title);
    setPrice(script.price);
    setContent(script.content);
    setSelectedGenres(script.genres.map(g => g.id));

    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/scripts/${id}`);
      fetchData();
      if(editingId === id) resetForm();
    } catch (error) {
      alert("Silinemedi!");
    }
  };

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setContent('');
    setSelectedGenres([]);
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Senarist Paneli ✍️</h1>
        <button onClick={handleLogout} style={{background:'red', color:'white', border:'none', padding:8}}>
            Çıkış</button>
      </div>

      {/* FORM ALANI */}
      <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 8, marginBottom: 30, backgroundColor: editingId ? '#fff3cd' : '#f9f9f9' }}>
        <h3>{editingId ? 'Senaryoyu Düzenle ✏️' : 'Yeni Senaryo Yükle ➕'}</h3>

        <input style={{display:'block', width:'100%', padding: 8, marginBottom: 10}} placeholder="Senaryo Adı" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="number" style={{display:'block', width:'100%', padding: 8, marginBottom: 10}} placeholder="Fiyat (TL)" value={price} onChange={e => setPrice(e.target.value)} />
        <textarea style={{display:'block', width:'100%', padding: 8, marginBottom: 10, height: 60}} placeholder="Kısa Özet" value={content} onChange={e => setContent(e.target.value)} />

        <label style={{fontSize:12, fontWeight:'bold'}}>Türler (CTRL ile çoklu seç):</label>
        <select multiple value={selectedGenres} style={{display:'block', width:'100%', height: 80, marginBottom: 10}} onChange={(e) => setSelectedGenres([...e.target.selectedOptions].map(o => o.value))}>
          {allGenres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>

        <div style={{display:'flex', gap:10}}>
          <button onClick={handleSubmit} style={{padding: '10px 20px', background: editingId ? 'orange' : 'green', color:'white', border:'none', cursor:'pointer'}}>
            {editingId ? 'Güncelle' : 'Satışa Çıkar'}
          </button>

          {editingId && (
            <button onClick={resetForm} style={{padding: '10px 20px', background:'gray', color:'white', border:'none', cursor:'pointer'}}>
              İptal
            </button>
          )}
        </div>
      </div>


      <h3>Senaryolarım ({myScripts.length})</h3>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#eee', textAlign:'left'}}>
            <th style={{padding:10}}>Başlık</th>
            <th style={{padding:10}}>Fiyat</th>
            <th style={{padding:10}}>Türler</th>
            <th style={{padding:10}}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {myScripts.map(script => (
            <tr key={script.id} style={{borderBottom:'1px solid #ddd'}}>
              <td style={{padding:10}}>{script.title}</td>
              <td style={{padding:10}}>{script.price} TL</td>
              <td style={{padding:10}}>{script.genres.map(g => g.name).join(', ')}</td> {/* Tür isimlerini yan yana yazdır (Dram, Komedi) */}
              <td style={{padding:10}}>
                <button onClick={() => handleEditClick(script)} style={{background:'#007bff', color:'white', border:'none', padding:'5px 10px', borderRadius:4, cursor:'pointer', marginRight: 5}}>
                  Düzenle
                </button>
                <button onClick={() => handleDelete(script.id)} style={{background:'darkred', color:'white', border:'none', padding:'5px 10px', borderRadius:4, cursor:'pointer'}}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}