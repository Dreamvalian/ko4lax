type LinkItem = {
  label: string;
  value?: string;
  href?: string;
  subtle?: boolean;
};

type LinksSectionProps = {
  links: LinkItem[];
};

export function LinksSection({ links }: LinksSectionProps) {
  return (
    <section
      aria-labelledby='links-heading'
      className='space-y-3 text-sm sm:text-base'>
      <h2
        id='links-heading'
        className='text-xs uppercase tracking-[0.2em] text-subtle'>
        Accounts
      </h2>

      <div className='flex flex-col gap-2'>
        {links.map((link) => {
          const key = `${link.label}-${link.value ?? link.href}`;
          const isExternal = Boolean(link.href && link.href.startsWith("http"));

          if (link.href) {
            return (
              <a
                key={key}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className='group inline-flex items-center justify-between rounded-full border border-gray-200/80 bg-surface px-3 py-2 text-sm text-gray-800 transition-colors hover:border-accent/40 hover:bg-gray-50'>
                <span className='text-gray-600'>{link.label}</span>
                <span className='ml-4 text-xs sm:text-sm text-gray-900 group-hover:text-accent truncate'>
                  {link.value ?? link.href}
                </span>
              </a>
            );
          }

          return (
            <div
              key={key}
              className='inline-flex items-center justify-between rounded-full border border-dashed border-gray-200/80 bg-surface px-3 py-2 text-sm text-gray-500'>
              <span>{link.label}</span>
              {link.value && (
                <span className='ml-4 text-xs sm:text-sm text-gray-600 truncate'>
                  {link.value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
