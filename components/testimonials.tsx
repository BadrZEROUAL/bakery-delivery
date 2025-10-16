"use client"

import { Star } from "@/components/icons"
import { useLanguage } from "@/lib/i18n/language-context"

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      nameKey: "testimonials.customer1.name" as const,
      textKey: "testimonials.customer1.text" as const,
      rating: 5,
      image: "/smiling-woman-portrait.png",
    },
    {
      nameKey: "testimonials.customer2.name" as const,
      textKey: "testimonials.customer2.text" as const,
      rating: 5,
      image: "/smiling-man-portrait.png",
    },
    {
      nameKey: "testimonials.customer3.name" as const,
      textKey: "testimonials.customer3.text" as const,
      rating: 5,
      image: "/professional-woman-portrait.png",
    },
  ]

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See what our customers are saying about their BakeryBox experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.nameKey}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-card-foreground leading-relaxed mb-6">"{t(testimonial.textKey)}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={t(testimonial.nameKey)}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-card-foreground">{t(testimonial.nameKey)}</div>
                  <div className="text-sm text-muted-foreground">Busy Professional</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
