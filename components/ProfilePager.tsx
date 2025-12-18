"use client";

import { AboutSection } from "@/components/AboutSection";
import { HighlightsSection } from "@/components/HighlightsSection";
import { IntroSection } from "@/components/IntroSection";
import { LinksSection } from "@/components/LinksSection";
import { ViewCounter } from "@/components/ViewCounter";
import { useState } from "react";

type LinkItem = {
  label: string;
  value?: string;
  href?: string;
  subtle?: boolean;
};

type Highlight = {
  title: string;
  description: string;
};

type Profile = {
  handle: string;
  displayName: string;
  status: string;
  about: string;
  links: LinkItem[];
  highlights: Highlight[];
};

type ProfilePagerProps = {
  profile: Profile;
};

export function ProfilePager({ profile }: ProfilePagerProps) {
  const [pageIndex, setPageIndex] = useState<0 | 1>(0);

  const isOverview = pageIndex === 0;

  return (
    <div className='w-full'>
      <div className='rounded-soft border border-gray-200/80 bg-surface/80 backdrop-blur-sm px-4 py-4 sm:px-6 sm:py-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]'>
        <div className='flex flex-col gap-3 sm:gap-4'>
          {isOverview ? (
            <>
              <IntroSection
                handle={profile.handle}
                displayName={profile.displayName}
                status={profile.status}
              />

              <div className='h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent' />

              <AboutSection about={profile.about} />

              <LinksSection links={profile.links} />

              <footer className='pt-2 text-[11px] sm:text-xs text-subtle flex justify-between gap-3'>
                <span className='flex items-center gap-2'>
                  <span>Last seen online · today</span>
                  <span className='h-1 w-1 rounded-full bg-gray-300' />
                  <ViewCounter />
                </span>
                <span className='text-right'>
                  Built with Next.js &amp; Tailwind · by @ko4lax
                </span>
              </footer>
            </>
          ) : (
            <HighlightsSection items={profile.highlights} />
          )}

          <div className='flex items-center justify-between pt-2 text-[11px] sm:text-xs text-subtle border-t border-gray-200/70 mt-1'>
            <span>
              {isOverview
                ? "Page 1 of 2 · Overview"
                : "Page 2 of 2 · Highlights"}
            </span>
            <button
              type='button'
              onClick={() => setPageIndex(isOverview ? 1 : 0)}
              className='inline-flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1 text-[11px] sm:text-xs text-gray-700 hover:border-accent/50 hover:text-accent transition-colors'>
              {isOverview ? "Next · Highlights" : "Back · Overview"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
