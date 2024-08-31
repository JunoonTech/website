import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/providers";
import "@/styles/globals.css";
export const viewport = {
  themeColor: "#000000",
};
export const metadata = {
  title: "Junoon",
  description: "Welcome to the Official website of Junoon",
  appleTouchIcon: "/junoon-logo-only.png",
  favicon: "/junoon-logo-only.png",
  openGraph: {
    image: "/junoon-logo-only.png",
  },
  icons: {
    icon: "/junoon-logo-only.png",
    shortcut: "/junoon-logo-only.png",
    apple: "/junoon-logo-only.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/junoon-logo-only.png",
    },
  },
};

export default async function Layout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-darker text-lightest ">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
