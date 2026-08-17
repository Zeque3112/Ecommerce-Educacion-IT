import './Toast.css'

function Toast({ message, type = 'success' }) {
  return (
    <div className={`toast toast-${type}`}>
      {type === 'success' && <span>✓</span>}
      {type === 'error' && <span>✕</span>}
      {type === 'warning' && <span>!</span>}
      <span>{message}</span>
    </div>
  )
}

export default Toast
