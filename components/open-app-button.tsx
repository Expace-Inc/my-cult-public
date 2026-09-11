import { buttonClass } from "@/components/button";
import { authAppHref } from "@/lib/deep-link";

export function OpenAppButton({
  href = authAppHref(),
  label = "Open MyCult",
  variant = "ember",
}: {
  href?: string;
  label?: string;
  variant?: "ember" | "forest" | "ghost" | "outline";
}) {
  return (
    <a href={href} className={buttonClass(variant)}>
      {label}
    </a>
  );
}
