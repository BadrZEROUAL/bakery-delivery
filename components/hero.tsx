"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "@/components/icons"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Fresh baked daily
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {t("hero.title")} <br />
              {t("hero.subtitle")}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">{t("hero.description")}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/login">
                <Button size="lg" className="text-base">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">{t("hero.stats.products")}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">{t("hero.stats.deliveries")}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground">{t("hero.stats.rating")}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src="/artisan-bread-and-pastries-on-rustic-wooden-table.jpg"
                alt="Fresh artisan baked goods"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <span className="text-2xl">🥐</span>
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">Fresh Croissants</div>
                  <div className="text-sm text-muted-foreground">Delivered in 30 min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
