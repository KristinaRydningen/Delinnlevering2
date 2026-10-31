import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";
import { DM_Sans, Fraunces } from "next/font/google";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Soppoteket",
  description: "Utforsk sopparter med norske, samiske og vitenskapelige navn",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nb">
      <body className={`${dmSans.className} ${fraunces.variable}`}>
        <div className="soppoteketContainer">
          <Link href="/" aria-label="Gå til forsiden" className="HeaderLogo">
            <img src="/Soppoteket.png" alt="" />
          </Link>
        </div>
        <div className="home-container">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
