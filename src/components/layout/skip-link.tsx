export function SkipLink({ targetId = "inhalt" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only z-50 rounded-sign bg-raps px-4 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Zum Inhalt springen
    </a>
  );
}
