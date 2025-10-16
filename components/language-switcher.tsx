"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="min-w-[60px]"
      >
        EN
      </Button>
      <Button
        variant={language === "fr" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("fr")}
        className="min-w-[60px]"
      >
        FR
      </Button>
    </div>
  )
}
