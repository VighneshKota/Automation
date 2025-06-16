import { Check } from "lucide-react"

export default function SocialProof() {
  const companies = [
    { name: "TechCorp" },
    { name: "InnovateLabs" },
    { name: "FutureWorks" },
    { name: "NextGen" },
    { name: "GlobalTech" },
  ]

  return (
    <section id="social-proof" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
          Trusted by innovative companies worldwide
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company) => (
            <div key={company.name} className="opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span className="font-medium">{company.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
