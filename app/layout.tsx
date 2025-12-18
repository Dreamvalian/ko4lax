import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "koala.is-a.dev — online presence",
  description:
    "A minimal, calm profile of an online identity — Discord, Twitter, and a small collection of digital highlights.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "koala.is-a.dev — online presence",
    description:
      "A minimal, calm profile of an online identity — Discord, Twitter, and a small collection of digital highlights.",
    url: "https://example.com",
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
      <body>{children}</body>
    </html>
  );
}
