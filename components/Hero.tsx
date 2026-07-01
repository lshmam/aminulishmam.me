"use client";

const experiences = [
  { year: "2024", company: "Neucler Inc.", role: "Co-Founder & Product Lead" },
  { year: "2024", company: "Faeth Studio", role: "Founder & Design Lead" },
  { year: "2023", company: "Jim Coach", role: "Product Designer & Developer" },
  { year: "2023", company: "Neta Bridge", role: "Product Manager & Designer" },
  { year: "2023", company: "MyTrials", role: "Product Lead & UX Designer" },
];

export default function Hero() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-8 sm:pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 sm:gap-12">
        {/* Left: Big serif headline */}
        <div className="flex-shrink-0 sm:max-w-[700px]">
          <h1
            className="leading-[1.15] text-foreground font-serif"
            style={{
              fontSize: "clamp(32px, 6vw, 62px)",
              fontWeight: 400,
              fontFamily: "var(--font-tiempos), Georgia, serif",
            }}
          >
            <span className="inline-block sm:whitespace-nowrap">I&apos;m Aminul, a product</span> <br className="hidden sm:block" />
            designer who <em className="italic" style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}>builds</em>.
          </h1>
        </div>

        {/* Right: Experience table */}
        <div className="mb-1 w-full sm:w-auto">
          {/* Mobile view */}
          <div className="sm:hidden flex flex-col gap-2">
            {experiences.map(({ year, company, role }) => (
              <div key={company} className="flex items-baseline gap-3">
                <span className="text-[11px] text-muted tabular-nums w-8 shrink-0">{year}</span>
                <span className="text-[12px] font-semibold text-foreground shrink-0">{company}</span>
                <span className="text-[11px] text-muted truncate">{role}</span>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden sm:table w-full border-collapse">
            <tbody>
              {experiences.map(({ year, company, role }) => (
                <tr key={company} className="border-0">
                  <td className="text-[12px] text-muted pr-8 py-[5px] whitespace-nowrap tabular-nums">
                    {year}
                  </td>
                  <td className="text-[12px] font-semibold text-foreground pr-8 py-[5px] whitespace-nowrap">
                    {company}
                  </td>
                  <td className="text-[12px] text-muted py-[5px]">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
