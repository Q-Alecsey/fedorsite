import { Header } from '@components/Header/Header';
import { Hero } from '@components/Hero/Hero';
import { AboutMe } from '@components/AboutMe/AboutMe';
import { VideoSection } from '@components/VideoSection/VideoSection';
import { SuccessStories } from '@components/SuccessStories/SuccessStories';
import { Reviews } from '@components/Reviews/Reviews';
import { Footer } from '@components/Footer/Footer';

function App() {
  return (
    <>
      {/* Decorative Fixed Glowing Grid Background */}
      <div className="grid-bg" />

      {/* Main Page Layout */}
      <Header />
      
      <main>
        <Hero />
        <AboutMe />
        <VideoSection />
        <SuccessStories />
        <Reviews />
      </main>

      <Footer />
    </>
  );
}

export default App;
