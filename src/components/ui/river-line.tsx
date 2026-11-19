/**
 * Die „Kocher-Linie“: das wiederkehrende Gestaltungselement der Seite.
 * Rein dekorativ, daher für Screenreader ausgeblendet.
 */
export function RiverLine({
  className = "",
  strokeWidth = 6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M-10 74C120 30 220 104 380 78S640 22 790 52 1040 112 1210 46"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
