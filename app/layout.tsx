import { ThemeProvider } from "next-themes"
import "./globals.css"
import "../tailwind.config"

export const metadata = {
  title: "Voice Stream Dashboard",
  description: "Monitor your OpenAI API usage and call transcriptions",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
