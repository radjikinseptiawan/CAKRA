// app/(auth)/layout.tsx atau app/layout.tsx
import TopBarNav from "@/components/top-bar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

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
          <div className="m-11">{children}</div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
