type AboutSectionProps = {
  about: string;
};

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section
      aria-labelledby='about-heading'
      className='space-y-2 text-sm sm:text-base leading-relaxed'>
      <h2
        id='about-heading'
        className='text-xs uppercase tracking-[0.2em] text-subtle'>
        Presence
      </h2>
      <p className='text-gray-700'>{about}</p>
    </section>
  );
}
