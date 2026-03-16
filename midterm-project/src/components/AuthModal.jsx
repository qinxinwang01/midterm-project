import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login') // 'login' or 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Account created! Check your email to confirm, then log in.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else onClose()
    }

    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2 className="modal-title">Welcome to QuickBite</h2>

        <div className="modal-tabs">
          <button
            className={`modal-tab ${mode === 'login' ? 'modal-tab-active' : ''}`}
            onClick={() => { setMode('login'); setError(''); setMessage('') }}
          >
            Log In
          </button>
          <button
            className={`modal-tab ${mode === 'signup' ? 'modal-tab-active' : ''}`}
            onClick={() => { setMode('signup'); setError(''); setMessage('') }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="modal-input"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="modal-input"
          />
          {error && <p className="modal-error">{error}</p>}
          {message && <p className="modal-message">{message}</p>}
          <button type="submit" disabled={loading} className="modal-submit">
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}
