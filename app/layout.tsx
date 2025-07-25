import type { Metadata } from "next";
import { Pacifico, Inter } from "next/font/google";
import "./globals.css";
// import UserSync from './components/UserSync';

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VoiceMentor",
  description: "Voice-based mentorship platform for rural youth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pacifico.variable} ${inter.variable}`}> 
      <body className="font-inter">
        {/* <UserSync /> */}
        {children}
      </body>
    </html>
  );
}
