import Link from "next/link";

type FeatureCardProps = {
  tone: "cyan" | "green" | "amber" | "red";
  title: string;
  body: string;
  href?: string;
  linkLabel?: string;
};

export function FeatureCard({ tone, title, body, href, linkLabel }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <span className={`glyph ${tone}`} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{body}</p>
      {href && linkLabel ? <Link href={href}>{linkLabel}</Link> : null}
    </article>
  );
}
