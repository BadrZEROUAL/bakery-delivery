"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { OrderPageClient } from "@/components/order-page-client"

// Mock products data
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Croissant",
    description: "Buttery, flaky French pastry",
    price: 3.5,
    image_url: "/fresh-croissant.jpg",
    is_available: true,
  },
  {
    id: "2",
    name: "Sourdough Bread",
    description: "Artisan sourdough with crispy crust",
    price: 6.0,
    image_url: "/rustic-sourdough-loaf.png",
    is_available: true,
  },
  {
    id: "3",
    name: "Chocolate Chip Cookies",
    description: "Fresh baked cookies with chocolate chips",
    price: 2.5,
    image_url: "/chocolate-chip-cookies.png",
    is_available: true,
  },
  {
    id: "4",
    name: "Baguette",
    description: "Traditional French baguette",
    price: 4.0,
    image_url: "/french-baguette.jpg",
    is_available: true,
  },
]

export default function OrderPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) {
    return null
  }

  return <OrderPageClient products={MOCK_PRODUCTS} user={user} />
}
