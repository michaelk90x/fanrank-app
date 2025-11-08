import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [coins, setCoins] = useState(1000);
  const [text, setText] = useState('');

  const login = (role) => setUser({ role, name: role === 'creator' ? '@you' : '@fan' });

  const post = (free = true) => {
    if (!text) return;
    setPosts([{ id: Date.now(), creator: user.name, text, free, price: free ? 0 : 5 }, ...posts]);
    setText('');
  };

  if (!user) return (
    <div style={s.page}>
      <h1 style={s.title}>FanRank</h1>
      <button onClick={() => login('creator')} style={s.btn}>Creator Login</button>
      <button onClick={() => login('fan')} style={s.btn}>Fan Login</button>
    </div>
  );

  return (
    <div style={s.page}>
      <h1>{user.name} • {coins} coins</h1>
      {user.role === 'creator' && (
        <>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Post..." style={s.input} />
          <button onClick={() => post(true)} style={s.btn}>Free Post</button>
          <button onClick={() => post(false)} style={s.btn}>$5 PPV</button>
        </>
      )}
      {posts.map(p => (
        <div key={p.id} style={s.post}>
          <strong>{p.creator}</strong>: {p.text}
          {!p.free && user.role === 'fan' && <button onClick={() => setCoins(c => c - 5)} style={s.btn}>Unlock $5</button>}
          {user.role === 'fan' && <button onClick={() => setCoins(c => c - 50)} style={s.btn}>DM (50)</button>}
        </div>
      ))}
    </div>
  );
}

const s = {
  page: { padding: 20, background: '#111', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' },
  title: { color: '#ff69b4', textAlign: 'center' },
  btn: { background: '#ff69b4', color: 'white', padding: 12, margin: 5, border: 'none', borderRadius: 8, width: '100%' },
  input: { width: '100%', padding: 12, margin: '10px 0', borderRadius: 8, border: 'none' },
  post: { background: '#222', padding: 15, margin: '10px 0', borderRadius: 10 }
};
