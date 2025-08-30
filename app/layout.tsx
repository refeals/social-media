import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Social - Rede Social Brasileira",
  description: "A rede social feita para brasileiros",
  generator: "v0.app",
}

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Head>
        <script
          defer
          src="http://social-media-umami-b5999a-145-223-31-54.traefik.me/script.js"
          data-website-id="54e4289c-95df-4f6d-8094-29b6b9aac498"
        ></script>
      </Head>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
