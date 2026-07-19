export default function CartSkeleton() {
  return (
    <div className='space-y-4 animate-pulse'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className='flex gap-4 rounded-xl bg-card ring-1 ring-black/5 dark:ring-white/10 p-4'
        >
          <div className='size-24 rounded-lg bg-muted shrink-0' />
          <div className='flex-1 space-y-3'>
            <div className='h-5 w-1/2 rounded-lg bg-muted' />
            <div className='h-4 w-1/4 rounded-lg bg-muted' />
            <div className='h-5 w-1/3 rounded-lg bg-muted' />
          </div>
          <div className='h-9 w-20 rounded-lg bg-muted shrink-0' />
        </div>
      ))}
    </div>
  );
}
