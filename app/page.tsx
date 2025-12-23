"use client";
import { ProfilePager } from "@/components/ProfilePager";
import { useEffect, useState } from "react";

export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_LEGACY_INDEX === "1") {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const target = `${base}/legacy-index.html`;
      window.location.assign(target);
    }
  }, []);
  const profile = {
    handle: "ko4lax",
    displayName: "Koala",
    status: "In Research",
    avatarSrc: "./profile.png",
    about:
      "Heh, do you like to spin things around and make woosh woosh sounds?",
    bio: "I craft digital experiences where simplicity meets elegance. As a UI/UX Designer, I obsess over whitespace, typographic rhythm, and subtle interactions to create interfaces that feel effortless. My work is grounded in the belief that the best design is often the one you notice least—clean, focused, and intentionally quiet.",
    likes: ["Creeper explosions", "Gengar", "Curating playlists"],
    dislikes: ["Drained social battery", "Forced small talk", "Crowded spaces"],
    favoriteGame: "Minecraft",
    games: [
      "Minecraft",
      "Valorant",
      "Dead by Daylight",
      "Roblox",
      "Dota 2",
      "Fishing Planet",
      "Stardew Valley",
    ],
    connectedAccounts: {
      valorantId: "Koala#Moon",
      robloxProfile: "https://www.roblox.com/users/4458264566/profile",
      minecraftName: "Ko4lax",
      epicId: "Ko4lax.",
      steamProfile: "https://steamcommunity.com/id/Dreamvalian/",
      spotifyProfile: "https://open.spotify.com/user/yrov2tazzzb149l3yn72dplhv",
      spotifyPlaylist:
        "https://open.spotify.com/playlist/5ECJnDi2T1ZjzCENB6mjaq?si=07201cd86c4f4b88",
    },
    links: [
      {
        label: "Discord",
        value: "baejuhyun",
        subtle: false,
      },
      {
        label: "Twitter",
        value: "@ko4lax",
        href: "https://twitter.com/ko4lax",
      },
      {
        label: "GitHub",
        value: "dreamvalian",
        href: "https://github.com/dreamvalian",
      },
    ],
    highlights: [
      {
        title: "Discord bots for small servers",
        description:
          "Lightweight utilities for moderation, role management, and status pings. Focused on being invisible until you need them.",
      },
      {
        title: "Thread: small UI patterns",
        description:
          "A short Twitter/X thread collecting quiet UI details I like across the web — micro-layouts, typography, and whitespace choices.",
      },
      {
        title: "Nightly notes",
        description:
          "A tiny personal log I update a few times a week: small experiments, what I’m learning, and things worth revisiting.",
      },
    ],
  };

  return (
    <>
      {showSplash && (
        <div className='splash-overlay' aria-hidden='true'>
          <div className='splash-backdrop'></div>
          <div className='creeper-face'>
            <div className='eye left'></div>
            <div className='eye right'></div>
            <div className='mouth'></div>
          </div>
        </div>
      )}
      <main className='min-h-screen flex items-center justify-center px-3 py-2 sm:px-8 sm:py-6'>
        <div className='w-full max-w-4xl'>
          <ProfilePager profile={profile} />
        </div>
      </main>
    </>
  );
}
