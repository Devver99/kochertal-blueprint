/** Gemeinsame Klassen für Formularfelder. Rahmen in `muted` erfüllt 3:1 für Bedienelemente. */
export const inputClasses =
  "block min-h-12 w-full rounded-sign border-2 border-muted bg-white px-4 py-2.5 text-base text-ink placeholder:text-muted/80";

export const selectClasses = `${inputClasses} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M6%209l6%206%206-6'%20fill='none'%20stroke='%231c2a28'%20stroke-width='2.5'%20stroke-linecap='round'/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[position:right_0.9rem_center] bg-no-repeat pr-11`;

export const labelClasses = "mb-1.5 block font-bold";
