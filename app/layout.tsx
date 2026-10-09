import Header from "@/components/header";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import SoundSwitch from "@/components/sound-switch";
import ThemeContextProvider from "@/context/theme-context";
import SoundContextProvider from "@/context/sound-context";
import { Toaster } from "react-hot-toast";
import VisitorNotice from "@/components/visitor-notice";

export const metadata = {
  title: "Mark Escolano Portfolio",
  description:
    "Senior software engineer with more than a decade of experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} relative bg-background pt-28 font-sans text-foreground antialiased sm:pt-36`}
      >
        <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-glow-warm blur-[10rem] sm:w-[68.75rem]" />
        <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-glow-cool blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />
        <ThemeContextProvider>
          <SoundContextProvider>
            <ActiveSectionContextProvider>
              <a
                href="#main-content"
                className="sr-only fixed left-4 top-4 z-[1002] rounded-md bg-background text-foreground focus:not-sr-only focus:p-3 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Skip to main content
              </a>
              <Header />
              {children}
              <Footer />
              <Toaster position="top-right" />
              <VisitorNotice />
              <ThemeSwitch />
              <SoundSwitch />
            </ActiveSectionContextProvider>
          </SoundContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
