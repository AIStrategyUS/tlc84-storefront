import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import ShopCategory from '@/pages/ShopCategory'
import ProductPage from '@/pages/ProductPage'
import Events from '@/pages/Events'
import EventsBook from '@/pages/EventsBook'
import Bulk from '@/pages/Bulk'
import About from '@/pages/About'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import OrderConfirmation from '@/pages/OrderConfirmation'
import Contact from '@/pages/Contact'
import Policies from '@/pages/Policies'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:category" element={<ShopCategory />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="events" element={<Events />} />
        <Route path="events/book" element={<EventsBook />} />
        <Route path="bulk" element={<Bulk />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order/:orderId" element={<OrderConfirmation />} />
        <Route path="contact" element={<Contact />} />
        <Route path="policies" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
