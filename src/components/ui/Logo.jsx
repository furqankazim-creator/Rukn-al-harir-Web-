import { Link } from 'react-router-dom'
import './Logo.css'

export default function Logo({ variant = 'light', size = 'md' }) {
  return (
    <Link to="/" className={`logo logo--${size}`} aria-label="Rukn Al Harir Technical Services — Home">
      <span className="logo__mark-wrap">
        <img src="/logomain.png" alt="" className="logo__mark" aria-hidden="true" />
      </span>

      <div className="logo__text">
        <span className={`logo__name logo__name--${variant}`}>RUKN AL HARIR</span>
        <span className={`logo__sub logo__sub--${variant}`}>Technical Services</span>
      </div>
    </Link>
  )
}
