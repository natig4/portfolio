export default function BackgroundEffects() {
  return (
    <div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
      <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob-1' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-blob-2' />
    </div>
  );
}
