import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/items").then(res => res.json()).then(setItems);
  }, []);

  const addItem = async () => {
    if (!text) return;
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: text })
    });
    const newItem = await res.json();
    setItems(prev => [...prev, newItem]);
    setText("");
  };

  const deleteItem = async (id) => {
    await fetch("/api/items/" + id, { method: "DELETE" });
    setItems(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteItem(item._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
