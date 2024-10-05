'use client'

import FormLogin from "@/components/FormLogin"
import { useAuth } from "@/context/AuthContext"

export default function AdminAuth({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isAdmin } = useAuth()
  return (
    <div>
      {isAdmin
        ? children
        : <FormLogin />
      }
    </div>
  );
}
