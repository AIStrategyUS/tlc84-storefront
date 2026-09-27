import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const NAV_LINKS = [
  { to: '/shop', label: 'Shop' },
  { to: '/events', label: 'Events' },
  { to: '/bulk', label: 'Bulk' },
  { to: '/about', label: 'About' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount, openDrawer } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-mist bg-cream/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="The Legacy Collective"
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11"
          />
          <span className="hidden font-display text-lg text-forest sm:block">
            The Legacy Collective
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors hover:text-forest ${
                  isActive ? 'text-forest' : 'text-ink/70'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-sage/60"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[10px] font-semibold text-cream">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-sage/60 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-mist bg-cream md:hidden" aria-label="Mobile">
          <ul className="container-page flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center text-base font-medium ${
                      isActive ? 'text-forest' : 'text-ink/80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
