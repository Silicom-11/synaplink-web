import './styles.css'
import Header from './components/Header';
import Hero from './components/Hero';
import PorQueSection from './components/PorQueSection';
import LongDescription from './components/LongDescription';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <hr style={{ border: 'none', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)', margin: '20px 0' }} />
        <PorQueSection />
        <LongDescription />
      </main>
      <Footer />
    </>
  );
}
