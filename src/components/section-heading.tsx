export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div
      className={`mx-auto mb-13 max-w-2xl ${align === "center" ? "text-center" : "text-left"}`}
    >
      <div
        className={`inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.12em] ${
          dark ? "text-mist-accent" : "text-primary"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {eyebrow}
      </div>
      <h2 className={`mt-3 mb-3.5 text-[32px] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {body && (
        <p className={`text-base leading-relaxed ${dark ? "text-mist-soft" : "text-ink-soft"}`}>
          {body}
        </p>
      )}
    </div>
  );
}
