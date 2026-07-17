export default function SkeletonCard() {
  return (
    <div className='flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-black/5 dark:ring-white/10 animate-pulse'>
      <div className='relative aspect-4/5 bg-muted' />
      <div className='flex flex-col gap-2 p-4'>
        <div className='h-5 w-3/4 rounded-lg bg-muted' />
        <div className='h-4 w-1/3 rounded-lg bg-muted' />
        <div className='h-5 w-1/2 rounded-lg bg-muted' />
        <div className='mt-2 h-9 w-full rounded-4xl bg-muted' />
      </div>
    </div>
  );
}
