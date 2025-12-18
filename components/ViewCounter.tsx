"use client";

import { useEffect, useState } from "react";

type CounterResponse = {
  count: number;
};

export function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const trackView = async () => {
      try {
        const res = await fetch(
          "https://api.counterapi.dev/v1/ut_lAcYe4mFZKgfgErIZOvZ9sJcawHZjWTTQYbGOHLH/profile/up"
        );
        if (!res.ok) return;
        const data = (await res.json()) as CounterResponse;
        setViews(data.count);
      } catch {
        // fail silently; view counter is non-essential
      }
    };

    trackView();
  }, []);

  if (views === null) return null;

  return (
    <span className='text-[11px] sm:text-xs text-subtle'>
      {views.toLocaleString()} views
    </span>
  );
}
