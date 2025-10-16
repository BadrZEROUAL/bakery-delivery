"use client"

import { ClockIcon, ShieldIcon, SparklesIcon, TruckIcon } from "@/components/icons"
import { useLanguage } from "@/lib/i18n/language-context"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: ClockIcon,
      titleKey: "features.delivery.title" as const,
      descriptionKey: "features.delivery.description" as const,
    },
    {
      icon: SparklesIcon,
      titleKey: "features.fresh.title" as const,
      descriptionKey: "features.fresh.description" as const,
    },
    {
      icon: ShieldIcon,
      titleKey: "features.variety.title" as const,
      descriptionKey: "features.variety.description" as const,
    },
    {
      icon: TruckIcon,
      titleKey: "features.delivery.title" as const,
      descriptionKey: "features.delivery.description" as const,
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We connect you with the best local bakeries and deliver fresh, artisan-quality baked goods right to your
            door.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
