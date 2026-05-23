import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className='min-h-screen flex-1 overflow-hidden relative rounded-xl bg-muted/50 md:min-h-min'>
      <div className='absolute inset-0'>
        <Image
          src={"/images/home/hero.jpeg"}
          alt='bg-hero'
          fill
          priority
          className='object-cover'
        ></Image>
        <div className='bg-black/40  absolute inset-0'></div>
      </div>
      <div className='flex p-8 z-10 relative flex-col gap-6 justify-center items-center text-center md:text-start md:items-start md:justify-end h-full'>
        <div className='flex flex-col gap-2'>
          <h1 className='sm:text-6xl tracking-tight text-4xl text-neutral-50'>
            Gaya Terbaru Untuk Anda
          </h1>
          <p className='sm:text-2xl tracking-tight text-xl text-neutral-50'>
            Diskon hingga 50% untuk koleksi pilihan
          </p>
        </div>
        <div className='flex flex-row gap-4'>
          <Button className='rounded-lg'>
            Belanja Sekarang
            <ArrowRight className='translate-y-0.5' />
          </Button>
          <Button className='rounded-lg' variant={"outline"}>
            Lihat Koleksi
          </Button>
        </div>
      </div>
    </div>
  );
}
