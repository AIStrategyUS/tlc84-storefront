import { useState } from 'react'
import type { FormEvent } from 'react'
import { Facebook, Instagram, Mail } from 'lucide-react'
import { useSeo } from '@/lib/useSeo'
import { Button } from '@/components/ui/Button'

const inputClass =
  'min-h-[44px] w-full rounded-xl border border-mist bg-white px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-moss'

export default function Contact() {
  useSeo('Contact', 'Get in touch with The Legacy Collective.')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 font-medium uppercase tracking-[0.2em] text-moss">Get in touch</p>
          <h1 className="font-display text-3xl text-forest sm:text-4xl">We'd love to hear from you</h1>
          <p className="mt-4 text-ink/80">
            Questions about an order, a custom request, or booking an event? Send us a note and we'll
            get back to you within 1 business day.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="mailto:thelegacycollective84@gmail.com"
              className="flex min-h-[44px] items-center gap-2 text-sm text-ink/80 hover:text-forest"
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/50 text-forest hover:bg-sage"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/61579779443234"
                target="_blank"
                rel="noreferrer"
                aria-label="The Legacy Collective on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/50 text-forest hover:bg-sage"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-mist bg-white p-6 shadow-card sm:p-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h2 className="font-display text-xl text-forest">Message sent</h2>
              <p className="mt-2 text-sm text-ink/70">Thanks for reaching out. We'll reply within 1 business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={inputClass}
                />
              </label>
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
