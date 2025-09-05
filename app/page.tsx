import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import OfferCards from '@/components/home/OfferCards';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <OfferCards />
      <CategoryGrid />
      <FeaturedProducts />
    </main>
  );
}