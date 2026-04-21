import { useState, useEffect, useRef } from 'react'
import './App.css'

const BIRDS = [
  { emoji: '🦜', name: 'インコのピピ',    color: '#4CAF50', messages: ['がんばれー！', 'ピピッ！できるよ！', 'もうすこし！'] },
  { emoji: '🐧', name: 'ペンギンのポポ',  color: '#2196F3', messages: ['ポポッ！応援してるよ！', 'いい感じ！', 'ファイト！'] },
  { emoji: '🦚', name: 'クジャクのクー',  color: '#9C27B0', messages: ['素敵なタスクね！', 'きれいにこなそう！', 'やればできる！'] },
  { emoji: '🦩', name: 'フラミンゴのフラ', color: '#E91E63', messages: ['ピンクパワー全開！', 'おしゃれにこなして！', 'すごーい！'] },
  { emoji: '🦉', name: 'フクロウのフク',  color: '#FF9800', messages: ['賢くこなそう！', 'ほうほう、いいね！', '順番に進めよう！'] },
  { emoji: '🐤', name: 'ひよこのピヨ',   color: '#FFC107', messages: ['ピヨピヨ！いくよ！', 'いっしょにがんばろ！', 'できるもん！'] },
]

function getRandomBird() {
  return BIRDS[Math.floor(Math.random() * BIRDS.length)]
}

function getRandomMessage(bird) {
  return bird.messages[Math.floor(Math.random() * bird.messages.length)]
}

function loadTasks() {
  try {
    const saved = localStorage.getItem('tbb_tasks')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

const CELEBRATION_EMOJIS = ['🦜','🐧','🦚','🦩','🦉','🐤','🐦','🦢','🦅','🦆']

function generateCelebrationBirds() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: CELEBRATION_EMOJIS[i % CELEBRATION_EMOJIS.length],
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    size: 2.0 + Math.random() * 2.5,
    delay: Math.random() * 0.4,
    duration: 2.0 + Math.random() * 1.0,
    dx: (Math.random() - 0.5) * 280,
    dy: (Math.random() - 0.5) * 280,
    rot: (Math.random() - 0.5) * 720,
  }))
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = loadTasks()
    if (saved && saved.length > 0) return saved
    return [{ id: 1, text: 'タスクボードを使ってみる', done: false, bird: getRandomBird() }]
  })
  const nextId = useRef(Math.max(0, ...tasks.map(t => t.id)) + 1)

  const [input, setInput] = useState('')
  const [mascot] = useState(() => getRandomBird())
  const [cheerMessage, setCheerMessage] = useState(() => getRandomMessage(mascot))
  const [celebrating, setCelebrating] = useState(false)
  const [celebrationBirds, setCelebrationBirds] = useState([])
  const prevAllDone = useRef(false)

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem('tbb_tasks', JSON.stringify(tasks))
  }, [tasks])

  // celebration trigger
  const allDone = tasks.length > 0 && tasks.every(t => t.done)
  useEffect(() => {
    if (allDone && !prevAllDone.current) {
      setCelebrationBirds(generateCelebrationBirds())
      setCelebrating(true)
      const timer = setTimeout(() => setCelebrating(false), 3500)
      return () => clearTimeout(timer)
    }
    prevAllDone.current = allDone
  }, [allDone])

  function addTask() {
    const text = input.trim()
    if (!text) return
    setTasks(prev => [...prev, { id: nextId.current++, text, done: false, bird: getRandomBird() }])
    setInput('')
    setCheerMessage(getRandomMessage(mascot))
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
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
      {/* Celebration overlay */}
      {celebrating && (
        <div className="celebration-overlay" aria-hidden="true">
          {celebrationBirds.map(b => (
            <span
              key={b.id}
              className="celebration-bird"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                fontSize: `${b.size}rem`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                '--dx': `${b.dx}px`,
                '--dy': `${b.dy}px`,
                '--rot': `${b.rot}deg`,
              }}
            >
              {b.emoji}
            </span>
          ))}
        </div>
      )}

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
              <span>{doneCount}/{total} 完了</span>
              {allDone && <span className="all-done">🎉 全部できた！すごい！</span>}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(doneCount / total) * 100}%` }} />
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
            enterKeyHint="done"
          />
          <button className="add-btn" onClick={addTask}>
            追加 🐣
          </button>
        </div>

        <ul className="task-list">
          {tasks.length === 0 && (
            <li className="empty-state">🌿 タスクを追加してね！</li>
          )}
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
              <label className="task-label">
                <span className="checkbox-wrap">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                </span>
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
