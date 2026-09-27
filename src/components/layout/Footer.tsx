import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail } from 'lucide-react'

const POLICY_LINKS = [
  { to: '/policies#shipping', label: 'Shipping' },
  { to: '/policies#returns', label: 'Returns' },
  { to: '/policies#privacy', label: 'Privacy' },
  { to: '/policies#terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-forest text-cream">
      <div className="container-page grid gap-10 py-12 sm:py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="The Legacy Collective"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-cream/95 p-1"
            />
            <span className="font-display text-lg">The Legacy Collective</span>
          </Link>
          <p className="max-w-xs text-sm text-cream/80">
            Family-made in Pittsburgh, PA. Hand-crafted keepsakes made from the photos you already love.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-base">Get in touch</h2>
          <a
            href="mailto:thelegacycollective84@gmail.com"
            className="flex min-h-[44px] items-center gap-2 text-sm text-cream/80 hover:text-cream"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            thelegacycollective84@gmail.com
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/tlc842025"
              target="_blank"
              rel="noreferrer"
              aria-label="The Legacy Collective on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream/10"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/61579779443234"
              target="_blank"
              rel="noreferrer"
              aria-label="The Legacy Collective on Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream/10"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-base">Policies</h2>
          <ul className="space-y-2">
            {POLICY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="flex min-h-[44px] items-center text-sm text-cream/80 hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} The Legacy Collective. All rights reserved.</span>
          <span>Rooted in love, growing in purpose.</span>
        </div>
      </div>
    </footer>
  )
}
