import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/api/items').then(res => res.json()).then(setItems);
  }, []);

  const addItem = async () => {
    if (!text) return;
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: text })
    });
    const newItem = await res.json();
    setItems(prev => [...prev, newItem]);
    setText('');
  };

  const deleteItem = async (id) => {
    await fetch('/api/items/' + id, { method: 'DELETE' });
    setItems(prev => prev.filter(item => item._id !== id));
  };

  const updateItem = async (id) => {
    const newName = prompt('New name:');
    if (!newName) return;
    const res = await fetch('/api/items/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    });
    const updated = await res.json();
    setItems(prev => prev.map(item => item._id === id ? updated : item));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CRUD App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => updateItem(item._id)}>✏️</button>
            <button onClick={() => deleteItem(item._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
