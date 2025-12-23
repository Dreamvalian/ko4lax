import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "koala.is-a.dev — online presence",
  description:
    "A minimal, calm profile of an online identity — Discord, Twitter, and a small collection of digital highlights.",
  metadataBase: new URL("https://ko4lax.me"),
  icons: { icon: "/profile.png" },
  openGraph: {
    title: "koala.is-a.dev — online presence",
    description:
      "A minimal, calm profile of an online identity — Discord, Twitter, and a small collection of digital highlights.",
    url: "https://ko4lax.me",
    siteName: "koala.is-a.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "koala.is-a.dev — online presence",
    description:
      "A minimal, calm profile of an online identity — Discord, Twitter, and a small collection of digital highlights.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
