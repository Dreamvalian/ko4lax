type IntroSectionProps = {
  handle: string;
  displayName: string;
  status: string;
};

export function IntroSection({
  handle,
  displayName,
  status,
}: IntroSectionProps) {
  return (
    <section
      aria-labelledby='intro-heading'
      className='flex flex-col items-center text-center gap-4'>
      <p className='text-xs uppercase tracking-[0.2em] text-subtle'>Welcome</p>

      <div className='space-y-2'>
        <h1
          id='intro-heading'
          className='text-3xl sm:text-4xl font-semibold tracking-tight'>
          {displayName}
        </h1>
        <p className='text-sm text-subtle'>@{handle}</p>
      </div>

      <p className='max-w-sm text-sm sm:text-base text-gray-700 leading-relaxed'>
        {status}
      </p>
    </section>
  );
}
