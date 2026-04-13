import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IEEE Industrial Electronics Society Tunisia | IES Tunisia Section",
  description: "IEEE Industrial Electronics Society Tunisia Section — advancing industrial electronics, automation, and power systems through education, research, and community building.",
  applicationName: "IEEE IES Tunisia",
  authors: [{ name: "IEEE Industrial Electronics Society Tunisia Section" }],
  keywords: [
    "IEEE",
    "Industrial Electronics Society",
    "IES",
    "Tunisia",
    "industrial electronics",
    "automation",
    "power systems",
    "engineering",
    "student branch",
    "professional development",
  ],
  robots: "index, follow",
  category: "Technology",
  openGraph: {
    title: "IEEE Industrial Electronics Society Tunisia",
    description: "Advancing industrial electronics, automation, and power systems in Tunisia through education, research, and community building.",
    url: "https://ies.ieee.tn/",
    type: "website",
    siteName: "IEEE IES Tunisia",
  },
  twitter: {
    card: "summary",
    title: "IEEE Industrial Electronics Society Tunisia",
    description: "Advancing industrial electronics, automation, and power systems in Tunisia.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IEEE Industrial Electronics Society Tunisia Section",
              alternateName: "IEEE IES Tunisia",
              url: "https://ies.ieee.tn",
              logo: "https://ies.ieee.tn/logos/ies-tunisia.webp",
              description:
                "The IEEE Industrial Electronics Society Tunisia Section — advancing industrial electronics, automation, and power systems through education, research, and community building.",
              foundingDate: "2021-01-01",
              parentOrganization: {
                "@type": "Organization",
                name: "IEEE Industrial Electronics Society",
                url: "https://www.ieee-ies.org",
              },
              memberOf: {
                "@type": "Organization",
                name: "IEEE Tunisia Section",
                url: "https://ieee.tn",
              },
              sameAs: [
                "https://www.facebook.com/IEEEIESTunisia",
                "https://www.linkedin.com/company/ieee-ies-tunisia",
                "https://www.ieee-ies.org",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "ies.tn@ieee.org",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} font-sans antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
