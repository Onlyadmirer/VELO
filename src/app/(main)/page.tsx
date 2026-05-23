import FeaturedCollection from "./components/FeaturedCollection";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className=' flex w-full flex-1 flex-col bg-background '>
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <HeroSection />
        <FeaturedCollection />
      </div>
    </div>
  );
}
