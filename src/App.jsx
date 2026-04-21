import { useState } from 'react'
import './App.css'

const BIRDS = [
  { emoji: '🦜', name: 'インコのピピ',   color: '#4CAF50', messages: ['がんばれー！', 'ピピッ！できるよ！', 'もうすこし！'] },
  { emoji: '🐧', name: 'ペンギンのポポ', color: '#2196F3', messages: ['ポポッ！応援してるよ！', 'いい感じ！', 'ファイト！'] },
  { emoji: '🦚', name: 'クジャクのクー', color: '#9C27B0', messages: ['素敵なタスクね！', 'きれいにこなそう！', 'やればできる！'] },
  { emoji: '🦩', name: 'フラミンゴのフラ', color: '#E91E63', messages: ['ピンクパワー全開！', 'おしゃれにこなして！', 'すごーい！'] },
  { emoji: '🦉', name: 'フクロウのフク', color: '#FF9800', messages: ['賢くこなそう！', 'ほうほう、いいね！', '順番に進めよう！'] },
  { emoji: '🐤', name: 'ひよこのピヨ',   color: '#FFEB3B', messages: ['ピヨピヨ！いくよ！', 'いっしょにがんばろ！', 'できるもん！'] },
]

function getRandomBird() {
  return BIRDS[Math.floor(Math.random() * BIRDS.length)]
}

function getRandomMessage(bird) {
  return bird.messages[Math.floor(Math.random() * bird.messages.length)]
}

let nextId = 1

export default function App() {
  const [tasks, setTasks] = useState([
    { id: nextId++, text: 'タスクボードを使ってみる', done: false, bird: getRandomBird() },
  ])
  const [input, setInput] = useState('')
  const [mascot] = useState(() => getRandomBird())
  const [cheerMessage, setCheerMessage] = useState(() => getRandomMessage(mascot))

  function addTask() {
    const text = input.trim()
    if (!text) return
    const bird = getRandomBird()
    setTasks(prev => [...prev, { id: nextId++, text, done: false, bird }])
    setInput('')
    setCheerMessage(getRandomMessage(mascot))
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    )
    setCheerMessage(getRandomMessage(mascot))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  const doneCount = tasks.filter(t => t.done).length
  const total = tasks.length

  return (
    <div className="app">
      <header className="header">
        <div className="floating-birds" aria-hidden="true">
          {BIRDS.map((b, i) => (
            <span key={i} className={`float-bird float-bird-${i}`}>{b.emoji}</span>
          ))}
        </div>
        <h1 className="title">
          <span className="title-bird">🐦</span>
          Task Board Bird
          <span className="title-bird">🐦</span>
        </h1>
        <p className="subtitle">かわいい鳥たちがタスク管理を応援します！</p>
      </header>

      <main className="main">
        <div className="mascot-card">
          <span className="mascot-emoji">{mascot.emoji}</span>
          <div className="mascot-speech">
            <p className="mascot-name">{mascot.name}</p>
            <p className="mascot-message">「{cheerMessage}」</p>
          </div>
        </div>

        {total > 0 && (
          <div className="progress-bar-wrap">
            <div className="progress-label">
              {doneCount}/{total} 完了
              {doneCount === total && total > 0 && <span className="all-done"> 🎉 全部できた！すごい！</span>}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(doneCount / total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="input-row">
          <input
            className="task-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="新しいタスクを入力..."
            maxLength={100}
          />
          <button className="add-btn" onClick={addTask}>
            追加 🐣
          </button>
        </div>

        <ul className="task-list">
          {tasks.length === 0 && (
            <li className="empty-state">
              <span>🌿</span> タスクを追加してね！
            </li>
          )}
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
              <label className="task-label">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span
                  className="task-bird-icon"
                  style={{ color: task.bird.color }}
                  title={task.bird.name}
                >
                  {task.bird.emoji}
                </span>
                <span className="task-text">{task.text}</span>
              </label>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
                title="削除"
                aria-label="タスクを削除"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footer">
        <p>🌸 Task Board Bird — あなたのタスクを鳥たちが見守っています 🌸</p>
      </footer>
    </div>
  )
}
