import { FAQS } from '@/data/faq'

/** Content only — no outer container or padding, so callers can nest this inside their own layout. */
export default function FaqAccordion() {
  return (
    <>
      <h2 className="mb-10 text-center font-display text-3xl text-forest">Frequently asked questions</h2>
      <div className="mx-auto max-w-2xl space-y-3">
        {FAQS.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-mist bg-white px-5 py-4">
            <summary className="cursor-pointer list-none font-display text-lg text-forest marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="shrink-0 text-moss transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-ink/80">{faq.answer}</p>
          </details>
        ))}
      </div>
    </>
  )
}
