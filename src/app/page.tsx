import CTASection from "./components/homepage/CTASection";
import Features from "./components/homepage/Features";
import Hero from "./components/homepage/Hero";
import HowItWorks from "./components/homepage/HowItWorks";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background text-text px-4 md:px-8 lg:px-14 space-y-20">
      <Hero />
      <HowItWorks />
      <Features />
      <CTASection />
    </div>
  );
};

export default Home;
