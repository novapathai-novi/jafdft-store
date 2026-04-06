import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

export const metadata = {
  title: "Our Story — JAFDFT",
  description: "EST MMXVIII. Just A Father Doing Fatherly Things.",
};

export default function OurStoryPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#FAF7F2] flex-1">
        <div className="mx-auto max-w-[720px] px-6 py-24 sm:py-32">
          {/* Eyebrow */}
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-6">
            Our Story
          </p>

          {/* Headline */}
          <h1 className="font-display text-7xl sm:text-[72px] tracking-wide text-foreground leading-none mb-10">
            EST. MMXVIII
          </h1>

          {/* Pull quote */}
          <blockquote className="font-editorial italic text-[24px] sm:text-[28px] text-[#C8905A] leading-snug mb-10 max-w-lg">
            &ldquo;I&rsquo;m just a father, man. Doing fatherly things.&rdquo;
          </blockquote>

          {/* Cognac divider */}
          <span className="block w-12 h-px bg-[#C8905A] mb-10" />

          {/* Body */}
          <div className="font-body text-base text-text-muted leading-[1.8] space-y-6 mb-14">
            <p>
              2018. Charlie was born. A friend asked Demetrie what he&rsquo;d been up to
              lately. He said: &ldquo;I&rsquo;m just a father, man. Doing fatherly
              things.&rdquo;
            </p>
            <p>
              Those words weren&rsquo;t planned. They weren&rsquo;t a pitch. They were just
              true. And from that moment, they became everything &mdash; the name, the
              standard, the reason.
            </p>
            <p>
              EST MMXVIII. That&rsquo;s when it started. That&rsquo;s what&rsquo;s on the
              brim.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/collections/all"
            className="inline-block px-8 py-3.5 bg-[#C8905A] text-[#0A0A0A] font-mono text-xs uppercase tracking-widest hover:bg-[#d9a06a] transition-colors"
          >
            Shop Drop 001
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
