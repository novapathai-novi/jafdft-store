const pillars = [
  {
    number: "01",
    word: "Presence",
    description:
      "Fatherhood is not a title. It\u2019s a practice. Being there \u2014 consistently, intentionally, before anyone is watching \u2014 is the whole job.",
  },
  {
    number: "02",
    word: "Precision",
    description:
      "Real fathers are deliberate. Every detail matters \u2014 in how you dress, how you speak, how you show up.",
  },
  {
    number: "03",
    word: "Standard",
    description:
      "What you model becomes what your kids expect from the world. JAFDFT is for the fathers who carry that weight \u2014 and wear it well.",
  },
];

export default function BrandStatement() {
  return (
    <section
      className="bg-[#FAF7F2] border-t border-b border-border"
      style={{ padding: "80px 0" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="flex flex-col items-center text-center px-6 lg:px-10 py-10 md:py-0"
            >
              <span className="font-mono text-xs tracking-[0.3em] text-[#C8905A] mb-4">
                {pillar.number}
              </span>
              <h3 className="font-display text-5xl tracking-wide text-foreground mb-5">
                {pillar.word}
              </h3>
              <span className="block w-8 h-px bg-[#C8905A] mb-6" />
              <p className="font-body text-sm leading-relaxed text-text-muted max-w-[280px]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
