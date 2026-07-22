import { Newsletter } from "@/components/layout/Newsletter";
import { Reveal } from "./Reveal";

export function NewsletterSection() {
  return (
    <section className="border-t border-line bg-bone-soft/60 py-20">
      <Reveal className="mx-auto max-w-md px-4 text-center sm:px-6">
        <Newsletter />
      </Reveal>
    </section>
  );
}
