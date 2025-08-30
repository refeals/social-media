import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import Head from "next/head"
import type React from "react"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "SocialBR",
  description: "A rede social brasileira",
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
          src="https://umami.schedra.com.br/script.js"
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
