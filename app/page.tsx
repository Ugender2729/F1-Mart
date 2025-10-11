import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import OfferCards from '@/components/home/OfferCards';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FoodDeliverySection from '@/components/home/FoodDeliverySection';
import CombosSection from '@/components/home/CombosSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OfferCards />
      <CombosSection />
      <FoodDeliverySection />
      <CategoryGrid />
      <FeaturedProducts />
    </main>
  );
}