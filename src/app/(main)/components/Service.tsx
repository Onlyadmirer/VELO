import { RefreshCw, Shield, Tag, Truck } from "lucide-react";

const features = [
  {
    icon: Tag,
    title: "Best Price",
    description: "Lowest price guarantee",
  },
  {
    icon: Truck,
    title: "free shipping",
    description: "For minimum purchase of Rp 200.000",
  },
  {
    icon: RefreshCw,
    title: "Easy Swap",
    description: "Exchange items within 30 days",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected transactions",
  },
];

function Service() {
  return (
    <>
      <div className='text-center'>
        <h1 className='tracking-tight text-foreground text-balance text-5xl'>
          Our Best Service
        </h1>
        <p className='text-secondary-foreground/60 pt-2'>
          Making your shopping experience fun and completely hassle-free.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-8 lg:grid-cols-4 gap-6'>
        {features.map((feature, index) => (
          <div key={index} className=' rounded-2xl p-8 text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-black text-neutral-100 rounded-full mb-4'>
              <feature.icon className='w-8 h-8' />
            </div>
            <h3 className='text-xl text-accent-foreground mb-2'>
              {feature.title}
            </h3>
            <p className='text-secondary-foreground/70'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Service;
