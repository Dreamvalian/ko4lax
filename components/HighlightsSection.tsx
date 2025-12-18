type Highlight = {
  title: string;
  description: string;
};

type HighlightsSectionProps = {
  items: Highlight[];
};

export function HighlightsSection({ items }: HighlightsSectionProps) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby='highlights-heading'
      className='space-y-3 text-sm sm:text-base'>
      <h2
        id='highlights-heading'
        className='text-xs uppercase tracking-[0.2em] text-subtle'>
        Highlights
      </h2>

      <div className='grid gap-3 sm:gap-4'>
        {items.map((item) => (
          <article
            key={item.title}
            className='rounded-2xl border border-gray-200/70 bg-surface px-4 py-3 sm:px-5 sm:py-4 shadow-[0_10px_40px_rgba(15,23,42,0.03)]'>
            <h3 className='text-sm font-medium text-gray-900 tracking-tight'>
              {item.title}
            </h3>
            <p className='mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed'>
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
