"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCartIcon, MinusIcon, PlusIcon, TrashIcon, UserIcon } from "@/components/icons"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/i18n/language-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  is_available: boolean
}

interface CartItem extends Product {
  quantity: number
}

export function OrderPageClient({ products, user }: { products: Product[]; user: { email: string; name: string } }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOrdering, setIsOrdering] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "card" | "cod">("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })
  const router = useRouter()
  const { t } = useLanguage()

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null)
    })
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSignOut = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return

    setShowPayment(true)
  }

  const handleConfirmPayment = async () => {
    setIsOrdering(true)

    setTimeout(() => {
      setCart([])
      setShowPayment(false)
      setCardDetails({ number: "", name: "", expiry: "", cvv: "" })
      alert(t("orderSuccess"))
      setIsOrdering(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-xl text-foreground">BakeryBox</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {t("welcome")}, {user.name}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <UserIcon className="h-4 w-4" />
                    {t("nav.account")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=info" className="cursor-pointer">
                      {t("account.manageAccount")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=orders" className="cursor-pointer">
                      {t("account.orderHistory")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                {t("signOut")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-foreground mb-6">{t("freshBakedGoods")}</h1>
            <div className="grid sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                      <img
                        src={product.image_url || "/placeholder.svg?height=200&width=300"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <Button onClick={() => addToCart(product)}>{t("addToCart")}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5" />
                  {t("yourCart")}
                </CardTitle>
                <CardDescription>
                  {cart.length} {t("items")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">{t("cartEmpty")}</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-border last:border-0">
                        <img
                          src={item.image_url || "/placeholder.svg?height=60&width=60"}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0 bg-transparent"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <MinusIcon className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0 bg-transparent"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <PlusIcon className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {cart.length > 0 && (
                <CardFooter className="flex-col gap-4">
                  <div className="w-full flex items-center justify-between text-lg font-bold">
                    <span>{t("total")}:</span>
                    <span className="text-primary">${totalAmount.toFixed(2)}</span>
                  </div>
                  {!showPayment ? (
                    <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                      {t("placeOrder")}
                    </Button>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-sm">{t("payment.title")}</h3>
                        <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                          <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                              <div className="font-medium">{t("payment.paypal")}</div>
                              <div className="text-xs text-muted-foreground">{t("payment.paypal.description")}</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              <div className="font-medium">{t("payment.card")}</div>
                              <div className="text-xs text-muted-foreground">{t("payment.card.description")}</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="flex-1 cursor-pointer">
                              <div className="font-medium">{t("payment.cod")}</div>
                              <div className="text-xs text-muted-foreground">{t("payment.cod.description")}</div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="space-y-3 pt-2">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber" className="text-xs">
                              {t("payment.cardNumber")}
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                              maxLength={19}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName" className="text-xs">
                              {t("payment.cardName")}
                            </Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="expiry" className="text-xs">
                                {t("payment.expiryDate")}
                              </Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                maxLength={5}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv" className="text-xs">
                                {t("payment.cvv")}
                              </Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                maxLength={3}
                                type="password"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setShowPayment(false)}
                        >
                          Back
                        </Button>
                        <Button className="flex-1" onClick={handleConfirmPayment} disabled={isOrdering}>
                          {isOrdering ? t("payment.processing") : t("payment.confirmPayment")}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
