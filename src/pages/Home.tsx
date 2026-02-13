import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import WhoWeAre from '@/sections/WhoWeAre';
import Services from '@/sections/Services';
import SuccessStories from '@/sections/SuccessStories';
import Stats from '@/sections/Stats';
import Team from '@/sections/Team';
import Testimonials from '@/sections/Testimonials';
import BlogPreview from '@/sections/BlogPreview';
import CTA from '@/sections/CTA';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Services />
        <SuccessStories />
        <Stats />
        <Team />
        <Testimonials />
        <BlogPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
