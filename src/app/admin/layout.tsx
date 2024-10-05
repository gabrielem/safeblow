import AdminAuth from "@/components/AdminAuth"
import { AuthContextProvider } from "@/context/AuthContext";
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <AdminAuth>
        {children}
      </AdminAuth>
    </AuthContextProvider>
  );
}
