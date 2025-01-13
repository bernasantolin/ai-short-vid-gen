import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from 'next/font/google';
import { Provider } from './provider';
import "./globals.css";

const outfit = Outfit({ subsets:['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body
            className={outfit.className}
          >
            <Provider>
              {children}
            </Provider>
          </body>
        </html>
    </ClerkProvider>
  );
}
