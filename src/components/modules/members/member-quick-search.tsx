import Form from "next/form";
import { inputClasses } from "@/components/ui/form-styles";
import { Button } from "@/components/ui/button";

/**
 * Suchfeld, das ins Mitgliederverzeichnis führt (/mitglieder?q=…).
 * Funktioniert auch ohne JavaScript als normales GET-Formular.
 */
export function MemberQuickSearch({
  label = "Welchen Betrieb suchen Sie?",
}: {
  label?: string;
}) {
  return (
    <Form action="/mitglieder" role="search" className="max-w-2xl">
      <label htmlFor="quick-search" className="mb-2 block text-lg font-bold">
        {label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="quick-search"
          name="q"
          type="search"
          autoComplete="off"
          placeholder="z. B. Friseur, Trockenbau, Wein"
          className={`${inputClasses} sm:flex-1`}
        />
        <Button type="submit" className="px-7">
          Suchen
        </Button>
      </div>
    </Form>
  );
}
