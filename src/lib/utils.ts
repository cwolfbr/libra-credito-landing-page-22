import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * Helper para composição de classes Tailwind.
 * Usa `clsx` para condicionar classes e `tailwind-merge` para
 * remover duplicidades.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
