import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aimploy",
  description: "Aimploy is an AI-powered CV and Resume builder website ",
};

const MainNavbar = () => {
  const navLinks = [
    { href: "/product", name: "Products" },
    { href: "/about", name: "About" },
  ] as const;

  return (
    <header className="flex shrink-0">
      <div className="flex flex-1 justify-between items-center container mx-auto px-3 py-4">
        <h1>
          <Link href="/" className="font-bold text-xl">
            Aimploy
          </Link>
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(({ href, name }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={href}>{name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-1 flex-col">
              <SidebarTrigger />
              {children}
            </main>
            <Toaster position="top-center" />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
