"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/i18n/language-context"
import { Header } from "@/components/header"

interface Order {
  id: string
  date: string
  status: "delivered" | "inTransit" | "processing"
  amount: number
  items: string[]
}

interface UserProfile {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
}

export function AccountPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState("info")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser({
      email: parsedUser.email,
      firstName: "Badr",
      lastName: "Zer",
      phone: "+33 6 12 34 56 78",
      address: "123 Rue de la Boulangerie, 75001 Paris, France",
    })

    // Mock order history - 3 past orders
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        date: "2025-01-10",
        status: "delivered",
        amount: 24.5,
        items: ["Croissant x3", "Baguette x2", "Pain au Chocolat x2"],
      },
      {
        id: "ORD-002",
        date: "2025-01-13",
        status: "delivered",
        amount: 18.75,
        items: ["Sourdough Loaf", "Almond Croissant x2"],
      },
      {
        id: "ORD-003",
        date: "2025-01-15",
        status: "inTransit",
        amount: 32.0,
        items: ["Baguette x3", "Croissant x4", "Chocolate Cake"],
      },
    ]
    setOrders(mockOrders)
  }, [router])

  if (!user) {
    return null
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "inTransit":
        return "text-blue-600 bg-blue-50"
      case "processing":
        return "text-orange-600 bg-orange-50"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">{t("account.title")}</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">{t("account.manageAccount")}</TabsTrigger>
              <TabsTrigger value="orders">{t("account.orderHistory")}</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("account.personalInfo")}</CardTitle>
                  <CardDescription>{t("account.info")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("account.firstName")}</Label>
                      <Input id="firstName" value={user.firstName} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("account.lastName")}</Label>
                      <Input id="lastName" value={user.lastName} readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("account.email")}</Label>
                    <Input id="email" type="email" value={user.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("account.phone")}</Label>
                    <Input id="phone" type="tel" value={user.phone} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t("account.address")}</Label>
                    <Input id="address" value={user.address} readOnly />
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">{t("account.memberSince")}: January 2025</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>{t("account.orderHistory")}</CardTitle>
                  <CardDescription>
                    {orders.length === 0 ? t("account.noOrders") : `${orders.length} ${t("items")}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-semibold text-foreground">
                              {t("account.orderNumber")} #{order.id}
                            </p>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {t(`account.status.${order.status}`)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {t("account.date")}: {new Date(order.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">€{order.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
