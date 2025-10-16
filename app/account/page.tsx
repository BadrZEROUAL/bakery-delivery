import { Suspense } from "react"
import { AccountPageClient } from "@/components/account-page-client"

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AccountPageClient />
    </Suspense>
  )
}
