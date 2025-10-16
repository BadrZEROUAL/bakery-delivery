"use client"

import { SearchIcon, ShoppingCartIcon, PackageIcon } from "@/components/icons"
import { useLanguage } from "@/lib/i18n/language-context"

export function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: SearchIcon,
      titleKey: "howItWorks.step1.title" as const,
      descriptionKey: "howItWorks.step1.description" as const,
    },
    {
      icon: ShoppingCartIcon,
      titleKey: "howItWorks.step2.title" as const,
      descriptionKey: "howItWorks.step2.description" as const,
    },
    {
      icon: PackageIcon,
      titleKey: "howItWorks.step3.title" as const,
      descriptionKey: "howItWorks.step3.description" as const,
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Getting fresh baked goods delivered is as easy as 1, 2, 3.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.titleKey} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t(step.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(step.descriptionKey)}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
