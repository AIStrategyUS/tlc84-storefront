export interface FaqItem {
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  {
    question: 'What kind of photo should I upload?',
    answer:
      'A clear, well-lit photo works best. Our customizer warns you if an image is too small to print sharp: at least 600px on the short side for 2.25" products, or 800px for 3".',
  },
  {
    question: 'How long does an order take?',
    answer:
      'Orders go into production within 1 business day of receiving your photos, and standard delivery within the USA takes 3 to 5 business days after that. Bulk orders need extra production time.',
  },
  {
    question: 'Do you offer bulk or business pricing?',
    answer:
      'Yes. Save the Date and Logo/QR magnets are priced in bulk tiers of 50, 100, and 200, and other products can be quoted in volume. Visit our Bulk page to request a quote.',
  },
  {
    question: 'Can you come to our event?',
    answer:
      'We bring an onsite magnet-making station to weddings, showers, birthdays, and corporate events across Middle Tennessee. Visit our Events page to see packages and check availability.',
  },
]
