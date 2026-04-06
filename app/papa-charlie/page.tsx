import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Papa Charlie — JAFDFT",
  description: "She didn't just give me a name — she gave me a purpose.",
};

export default function PapaCharliePage() {
  return (
    <>
      <Nav />
      <main className="bg-[#FAF7F2] flex-1">
        {/* Text content */}
        <div className="mx-auto max-w-[720px] px-6 py-24 sm:py-32">
          {/* Eyebrow */}
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-6">
            Papa Charlie
          </p>

          {/* Headline */}
          <h1 className="font-display text-7xl sm:text-[72px] tracking-wide text-foreground leading-none mb-10">
            The Name Behind The Hat.
          </h1>

          {/* Pull quote */}
          <blockquote className="font-editorial italic text-[24px] sm:text-[28px] text-[#C8905A] leading-snug mb-10 max-w-lg">
            &ldquo;She didn&rsquo;t just give me a name &mdash; she gave me a purpose.&rdquo;
          </blockquote>

          {/* Cognac divider */}
          <span className="block w-12 h-px bg-[#C8905A] mb-10" />

          {/* Body */}
          <div className="font-body text-base text-text-muted leading-[1.8] space-y-6">
            <p>
              Charlie arrived. I became Papa Charlie. She didn&rsquo;t just give me a
              name &mdash; she gave me a purpose.
            </p>
            <p>
              Every hat in this drop is my design. Built for the fathers who are locked
              in and show up. This is what that looks like.
            </p>
          </div>
        </div>

        {/* Papa Charlie badge panel */}
        <div className="bg-[#0A0A0A] py-20 sm:py-28">
          <div className="mx-auto max-w-[720px] px-6 flex items-center justify-center">
            <svg
              viewBox="0 0 240 240"
              className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circle */}
              <circle
                cx="120"
                cy="120"
                r="110"
                fill="none"
                stroke="#C8905A"
                strokeWidth="1"
              />
              {/* Inner circle */}
              <circle
                cx="120"
                cy="120"
                r="96"
                fill="none"
                stroke="#C8905A"
                strokeWidth="0.5"
              />

              {/* Circular text */}
              <defs>
                <path
                  id="pc-circle"
                  d="M 120,120 m -85,0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                />
              </defs>
              <text
                fill="#C8905A"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  fontFamily: "var(--font-space-mono)",
                }}
              >
                <textPath href="#pc-circle" startOffset="0%">
                  PAPA CHARLIE &middot; DESIGNED BY PAPA CHARLIE &middot; EST MMXVIII &middot;
                </textPath>
              </text>

              {/* Center PC text */}
              <text
                x="120"
                y="115"
                textAnchor="middle"
                fill="#C8905A"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  fontSize: "52px",
                  letterSpacing: "0.12em",
                }}
              >
                PC
              </text>
              {/* Sub text */}
              <text
                x="120"
                y="140"
                textAnchor="middle"
                fill="#C8905A"
                opacity="0.5"
                style={{
                  fontFamily: "var(--font-space-mono)",
                  fontSize: "7px",
                  letterSpacing: "0.3em",
                }}
              >
                EST MMXVIII
              </text>
            </svg>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
