"use client";

import { AboutSection } from "@/components/AboutSection";
import { HighlightsSection } from "@/components/HighlightsSection";
import { IntroSection } from "@/components/IntroSection";
import { LinksSection } from "@/components/LinksSection";
import { ViewCounter } from "@/components/ViewCounter";
import Image from "next/image";
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

type ConnectedAccounts = {
  valorantId?: string;
  robloxProfile?: string;
  minecraftName?: string;
  epicId?: string;
  steamProfile?: string;
  spotifyProfile?: string;
  spotifyPlaylist?: string;
};

type Profile = {
  handle: string;
  displayName: string;
  status: string;
  about: string;
  avatarSrc?: string;
  bio?: string;
  likes?: string[];
  dislikes?: string[];
  games?: string[];
  favoriteGame?: string;
  connectedAccounts?: ConnectedAccounts;
  links: LinkItem[];
  highlights: Highlight[];
};

type ProfilePagerProps = {
  profile: Profile;
};

export function ProfilePager({ profile }: ProfilePagerProps) {
  const [pageIndex, setPageIndex] = useState(0);

  const isOverview = pageIndex === 0;
  const isBio = pageIndex === 1;
  const isHighlights = pageIndex === 2;
  const pageLabel =
    pageIndex === 0
      ? "Page 1 of 3 · Overview"
      : pageIndex === 1
      ? "Page 2 of 3 · Biography"
      : "Page 3 of 3 · Highlights";

  const gamesList = profile.games ?? [
    "Minecraft",
    "Valorant",
    "Dead by Daylight",
    "Roblox",
  ];
  const favoriteGame = profile.favoriteGame ?? gamesList[0];
  const otherGames = gamesList.filter((g) => g !== favoriteGame);

  const GAME_IMAGES: Record<string, string> = {
    Minecraft: "/games/minecraft.png",
    Valorant: "/games/valorant.svg",
    "Dead by Daylight": "/games/dbd.png",
    Roblox: "/games/roblox.png",
    "Dota 2": "/games/dota2.png",
    "Fishing Planet": "/games/fishingplanet.jpg",
    "Stardew Valley": "/games/stardewvalley.png",
  };

  const accounts = profile.connectedAccounts;

  return (
    <div className='w-full relative'>
      {/* Decorative peeking avatar for Highlights page */}
      {isHighlights && (
        <>
          <div className='absolute -left-20 xl:-left-32 top-1/2 -translate-y-1/2 w-48 h-48 xl:w-64 xl:h-64 -z-10 hidden lg:block transition-all duration-500 animate-in fade-in slide-in-from-right-4'>
            <Image
              src='/custom-ava-2.png'
              alt=''
              width={256}
              height={256}
              className='object-contain drop-shadow-xl transform -rotate-12 opacity-90'
              priority
            />
          </div>

          <div className='absolute -top-10 right-8 sm:right-16 w-24 h-24 sm:w-32 sm:h-32 -z-10 hidden sm:block transition-all duration-500 animate-in fade-in slide-in-from-bottom-4'>
            <Image
              src='/custom-ava-4.png'
              alt=''
              width={128}
              height={128}
              className='object-contain drop-shadow-xl transform rotate-3 opacity-90'
              priority
            />
          </div>
        </>
      )}

      <div className='rounded-soft border border-gray-200/80 bg-surface/80 backdrop-blur-sm px-4 py-4 sm:px-7 sm:py-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)]'>
        <div className='flex flex-col gap-3 sm:gap-4'>
          <div className='min-h-[210px] sm:min-h-[200px] flex flex-col gap-3 sm:gap-4'>
            {isOverview && (
              <>
                <IntroSection
                  handle={profile.handle}
                  displayName={profile.displayName}
                  status={profile.status}
                  avatarSrc={profile.avatarSrc}
                />

                <div className='h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent' />

                <AboutSection about={profile.about} />

                <section className='space-y-2 text-sm sm:text-[15px] leading-relaxed'>
                  <h2 className='text-[11px] sm:text-xs uppercase tracking-[0.18em] text-subtle'>
                    Favorite playlist
                  </h2>
                  <div className='rounded-soft border border-gray-200/80 bg-white/80 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-3 sm:gap-4'>
                    <div className='h-10 w-10 sm:h-11 sm:w-11 rounded-md bg-[#1db954] flex items-center justify-center text-[10px] sm:text-xs font-semibold text-white'>
                      ♫
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-xs sm:text-[13px] font-medium text-gray-900 truncate'>
                        one hundred sleepless nights
                      </p>
                      <p className='text-[11px] sm:text-xs text-gray-500 truncate'>
                        music that keeps you awake — by koala.
                      </p>
                      {accounts?.spotifyPlaylist && (
                        <div className='mt-1 flex items-center gap-2'>
                          <a
                            href={accounts.spotifyPlaylist}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex items-center gap-1 rounded-full bg-[#1db954] text-white px-2.5 py-1 text-[11px] sm:text-xs font-medium shadow-sm hover:brightness-110 transition'>
                            <span>▶</span>
                            <span>Play on Spotify</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <LinksSection links={profile.links} />
              </>
            )}

            {isBio && (
              <section className='space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed'>
                <h2 className='text-xs uppercase tracking-[0.2em] text-subtle'>
                  Biography
                </h2>
                <p className='text-gray-700'>{profile.bio ?? profile.about}</p>

                <div className='grid gap-3 sm:gap-4 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]'>
                  <div className='space-y-4 sm:space-y-5'>
                    <div className='grid gap-3 sm:gap-4 sm:grid-cols-2'>
                      <div className='space-y-1'>
                        <h3 className='text-[11px] sm:text-xs uppercase tracking-[0.18em] text-subtle'>
                          What I Like
                        </h3>
                        <ul className='text-xs sm:text-sm text-gray-700 list-disc list-inside space-y-0.5'>
                          {(
                            profile.likes ?? [
                              "Quiet nights online",
                              "Cozy servers",
                              "Small, thoughtful UI details",
                            ]
                          ).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className='space-y-1'>
                        <h3 className='text-[11px] sm:text-xs uppercase tracking-[0.18em] text-subtle'>
                          Dislikes
                        </h3>
                        <ul className='text-xs sm:text-sm text-gray-700 list-disc list-inside space-y-0.5'>
                          {(
                            profile.dislikes ?? [
                              "Loud pings",
                              "Cluttered layouts",
                              "Unnecessary drama",
                            ]
                          ).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className='space-y-3 sm:space-y-4 pt-1 sm:pt-2'>
                      <div className='rounded-soft border border-gray-200/80 bg-white/80 px-3 py-2.5 sm:px-4 sm:py-3 flex gap-3 sm:gap-4 items-center'>
                        <div className='h-10 w-10 sm:h-11 sm:w-11 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center'>
                          {GAME_IMAGES[favoriteGame] ? (
                            <Image
                              src={GAME_IMAGES[favoriteGame]}
                              alt={favoriteGame}
                              width={44}
                              height={44}
                              className='h-full w-full object-cover'
                            />
                          ) : (
                            <span className='text-[10px] sm:text-xs font-semibold text-gray-700'>
                              {favoriteGame?.[0] ?? "?"}
                            </span>
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-subtle mb-0.5'>
                            Favorite game
                          </p>
                          <p className='text-sm sm:text-base font-medium text-gray-900 truncate'>
                            {favoriteGame}
                          </p>
                        </div>
                      </div>

                      <div className='rounded-soft border border-gray-200/80 bg-white/80 px-3 py-2.5 sm:px-4 sm:py-3 space-y-2.5'>
                        <div className='flex items-center justify-between gap-2'>
                          <div>
                            <p className='text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-subtle'>
                              Other Games
                            </p>
                          </div>
                        </div>

                        <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                          {(otherGames.length ? otherGames : gamesList).map(
                            (game) => (
                              <span
                                key={game}
                                className='inline-flex items-center gap-1.5 rounded-full bg-surface/90 border border-gray-200 px-2.5 py-1 text-[11px] sm:text-xs text-gray-800 shadow-xs'>
                                {GAME_IMAGES[game] && (
                                  <Image
                                    src={GAME_IMAGES[game]}
                                    alt={game}
                                    width={18}
                                    height={18}
                                    className='h-4 w-4 rounded-[4px] object-cover'
                                  />
                                )}
                                <span>{game}</span>
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {accounts && (
                        <div className='rounded-soft border border-gray-200/80 bg-white/80 px-3 py-2.5 sm:px-4 sm:py-3 space-y-2.5'>
                          <p className='text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-subtle'>
                            Connected accounts
                          </p>

                          <dl className='space-y-1.5 text-xs sm:text-sm text-gray-700'>
                            {accounts.valorantId && (
                              <div className='flex items-center justify-between gap-3'>
                                <dt className='text-subtle'>Valorant</dt>
                                <dd className='font-medium truncate'>
                                  {accounts.valorantId}
                                </dd>
                              </div>
                            )}
                            {accounts.robloxProfile && (
                              <div className='flex items-center justify-between gap-3'>
                                <dt className='text-subtle'>Roblox</dt>
                                <dd className='font-medium truncate'>
                                  <a
                                    href={accounts.robloxProfile}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='hover:text-accent underline-offset-2 hover:underline'>
                                    @Dreamvalian
                                  </a>
                                </dd>
                              </div>
                            )}
                            {accounts.minecraftName && (
                              <div className='flex items-center justify-between gap-3'>
                                <dt className='text-subtle'>Minecraft</dt>
                                <dd className='font-medium truncate'>
                                  {accounts.minecraftName}
                                </dd>
                              </div>
                            )}
                            {accounts.epicId && (
                              <div className='flex items-center justify-between gap-3'>
                                <dt className='text-subtle'>Epic Games</dt>
                                <dd className='font-medium truncate'>
                                  {accounts.epicId}
                                </dd>
                              </div>
                            )}
                            {accounts.steamProfile && (
                              <div className='flex items-center justify-between gap-3'>
                                <dt className='text-subtle'>Steam</dt>
                                <dd className='font-medium truncate'>
                                  <a
                                    href={accounts.steamProfile}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='hover:text-accent underline-offset-2 hover:underline'>
                                    koala
                                  </a>
                                </dd>
                              </div>
                            )}
                            {accounts.spotifyProfile && (
                              <div className='flex items-center justify-between gap-3'>
                                <dt className='text-subtle'>Spotify</dt>
                                <dd className='font-medium truncate'>
                                  <a
                                    href={accounts.spotifyProfile}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='hover:text-accent underline-offset-2 hover:underline'>
                                    koala.
                                  </a>
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='md:row-span-1'>
                    <div
                      className='rounded-soft border border-gray-200/80 overflow-hidden w-full h-full min-h-[400px] sm:min-h-[500px]'
                      style={{
                        backgroundImage: `url(/custom-ava.png)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  </div>
                </div>
              </section>
            )}

            {isHighlights && <HighlightsSection items={profile.highlights} />}

            <footer className='mt-auto pt-2 text-[11px] sm:text-xs text-subtle flex justify-between gap-3'>
              <span className='flex items-center gap-2'>
                <span>Last seen online · today</span>
                <span className='h-1 w-1 rounded-full bg-gray-300' />
                <ViewCounter />
              </span>
              <span className='text-right'>
                Built with Next.js &amp; Tailwind · by @ko4lax
              </span>
            </footer>
          </div>

          <div className='flex items-center justify-between pt-1 text-[11px] sm:text-xs text-subtle border-t border-gray-200/70 mt-1'>
            <span>{pageLabel}</span>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() =>
                  setPageIndex((prev) => (prev === 0 ? 2 : prev - 1))
                }
                className='inline-flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1 text-[11px] sm:text-xs text-gray-700 hover:border-accent/50 hover:text-accent disabled:opacity-40 disabled:hover:border-gray-200/80 disabled:hover:text-gray-700 transition-colors'>
                Back
              </button>
              <button
                type='button'
                onClick={() =>
                  setPageIndex((prev) => (prev === 2 ? 0 : prev + 1))
                }
                className='inline-flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1 text-[11px] sm:text-xs text-gray-700 hover:border-accent/50 hover:text-accent disabled:opacity-40 disabled:hover:border-gray-200/80 disabled:hover:text-gray-700 transition-colors'>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
