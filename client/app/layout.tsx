// app/(auth)/layout.tsx atau app/layout.tsx
import TopBarNav from "@/components/top-bar";
import ContainerContextClient from "@/context/context";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="id">
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <TopBarNav />
          <div className="mt-10">{children}</div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
