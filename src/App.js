import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [coins, setCoins] = useState(1000);
  const [text, setText] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  const login = (role) => {
    const name = role === 'creator' ? '@you' : '@fan';
    setUser({ role, name });
    updateLeaderboard();
  };

  const post = (free = true) => {
    if (!text) return;
    const newPost = {
      id: Date.now(),
      creator: user.name,
      text,
      free,
      price: free ? 0 : 5,
      image: `https://picsum.photos/400/600?random=${Date.now()}`
    };
    setPosts([newPost, ...posts]);
    setText('');
    updateLeaderboard();
  };

  const updateLeaderboard = () => {
    const creatorPosts = posts.filter(p => p.creator === '@you').length;
    const points = creatorPosts * 100;
    setLeaderboard([{ name: '@you', points }]);
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

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div style={s.leaderboard}>
          #1 {leaderboard[0].name} – {leaderboard[0].points} pts
        </div>
      )}

      {user.role === 'creator' && (
        <>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="What's hot? 🔥" style={s.input} />
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => post(true)} style={s.btn}>Free Post</button>
            <button onClick={() => post(false)} style={s.btn}>$5 PPV</button>
          </div>
        </>
      )}

      {/* Feed */}
      {posts.map(p => (
        <div key={p.id} style={s.post}>
          <strong>{p.creator}</strong>
          {p.image && <img src={p.image} alt="post" style={{ width: '100%', borderRadius: 10, margin: '10px 0' }} />}
          <p>{p.text}</p>
          {!p.free && user.role === 'fan' && (
            <button onClick={() => setCoins(c => c - 5)} style={s.btnSmall}>Unlock $5</button>
          )}
          {user.role === 'fan' && (
            <button onClick={() => setCoins(c => c - 50)} style={s.btnSmall}>DM (50)</button>
          )}
        </div>
      ))}

      {/* Buy Coins */}
      <button onClick={() => setCoins(c => c + 500)} style={s.buyBtn}>
        Buy 500 Coins ($5)
      </button>
    </div>
  );
}

const s = {
  page: { padding: 20, background: '#111', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' },
  title: { color: '#ff69b4', textAlign: 'center', fontSize: 28 },
  btn: { background: '#ff69b4', color: 'white', padding: 14, margin: 5, border: 'none', borderRadius: 12, flex: 1, fontWeight: 'bold' },
  btnSmall: { background: '#ff1493', color: 'white', padding: 8, margin: 5, border: 'none', borderRadius: 8, fontSize: 12 },
  input: { width: '100%', padding: 14, margin: '10px 0', borderRadius: 12, border: 'none', background: '#333', color: '#fff' },
  post: { background: '#222', padding: 15, margin: '15px 0', borderRadius: 15 },
  leaderboard: { background: '#ff1493', padding: 12, borderRadius: 12, textAlign: 'center', fontWeight: 'bold', margin: '10px 0' },
  buyBtn: { background: '#00ff00', color: 'black', padding: 16, margin: '20px 0', border: 'none', borderRadius: 16, width: '100%', fontWeight: 'bold', fontSize: 18 }
};
