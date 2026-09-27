export interface Review {
  name: string
  rating: number
  text: string
}

// TODO: replace with real reviews
export const REVIEWS: Review[] = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'The customizer made it so easy to see exactly how my photo would look before I ordered. The magnets showed up looking exactly like the preview.',
  },
  {
    name: 'Jordan K.',
    rating: 5,
    text: 'Ordered a pack of 8 for my mom for Mother’s Day. The print quality is genuinely better than I expected for the price.',
  },
  {
    name: 'Priya R.',
    rating: 5,
    text: 'We booked the magnet bar for our wedding and guests are still talking about it. Everyone left with a keepsake from that night.',
  },
  {
    name: 'Casey T.',
    rating: 5,
    text: 'Used the QR magnet for my small business at a craft fair. Easy to set up, and customers actually scan it.',
  },
]
