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
    <div style={{padding:20, textAlign:'center', background:'#111', color:'#fff', minHeight:'100vh'}}>
      <h1 style={{color:'#ff69b4'}}>FanRank</h1>
      <button onClick={() => login('creator')} style={btn}>Creator</button>
      <button onClick={() => login('fan')} style={btn}>Fan</button>
    </div>
  );

  return (
    <div style={{padding:20, background:'#111', color:'#fff', minHeight:'100vh'}}>
      <h1>{user.name} | Coins: {coins}</h1>
      {user.role === 'creator' && (
        <>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Post..." style={input} />
          <button onClick={()=>post(true)} style={btn}>Free</button>
          <button onClick={()=>post(false)} style={btn}>$5 PPV</button>
        </>
      )}
      {posts.map(p => (
        <div key={p.id} style={{background:'#222', padding:15, margin:'10px 0', borderRadius:10}}>
          <strong>{p.creator}</strong>: {p.text}
          {!p.free && user.role === 'fan' && <button onClick={() => setCoins(c=>c-5)} style={btn}>Unlock $5</button>}
          {user.role === 'fan' && <button onClick={() => setCoins(c=>c-50)} style={btn}>DM (50)</button>}
        </div>
      ))}
    </div>
  );
}

const btn = {background:'#ff69b4', color:'white', padding:10, margin:5, border:'none', borderRadius:8};
const input = {width:'100%', padding:10, margin:'10px 0', borderRadius:8};
