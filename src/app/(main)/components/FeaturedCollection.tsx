import { ArrowRight } from "lucide-react";
import Image from "next/image";

const collections = [
  {
    id: 2,
    title: "Elegant Dress",
    description: "For special events",
    image: "/images/home/featured-section/elegant-dress.jpeg",
    items: "35+ Item",
  },
  {
    id: 3,
    title: "Streetwear",
    description: "The latest urban style",
    image: "/images/home/featured-section/streetwear.jpeg",
    items: "40+ Item",
  },
  {
    id: 4,
    title: "Summer Collection",
    description: "Fresh for summer",
    image: "/images/home/featured-section/summer-collection.jpeg",
    items: "60+ Item",
  },
];

function FeaturedCollection() {
  return (
    <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
      {collections.map((collection) => (
        <div
          key={collection.id}
          className='aspect-video group overflow-hidden cursor-pointer items-end relative justify-between flex md:flex-row rounded-xl bg-muted/50'
        >
          <div className='absolute inset-0'>
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              className='object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out object-[50%_20%]'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent'></div>
          </div>
          <div className='relative h-full gap-0.5 justify-end p-6 flex flex-col'>
            <span className='text-neutral-300 text-sm'>{collection.items}</span>
            <h1 className='text-md text-neutral-50 tracking-tight'>
              {collection.title}
            </h1>
            <p className='font-thin text-neutral-100 tracking-tight'>
              {collection.description}
            </p>
          </div>
          <div className='relative flex p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 justify-end'>
            <span className='flex text-sm items-center flex-row gap-2 text-neutral-100'>
              View Collection
              <ArrowRight size={16} className='translate-y-0.5' />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedCollection;
