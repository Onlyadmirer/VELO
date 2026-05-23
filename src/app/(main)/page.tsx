import FeaturedCollection from "./components/FeaturedCollection";
import HeroSection from "./components/HeroSection";
import Service from "./components/Service";

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col '>
      <div className='flex flex-col h-[calc(100dvh-4rem)] gap-4 p-4 pt-0'>
        <HeroSection />
        <FeaturedCollection />
      </div>
      <div className='gap-4 p-4 mt-24'>
        <Service />
      </div>
    </div>
  );
}
