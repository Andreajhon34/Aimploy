import { Template1 } from "../_components/templates/Template1";
import { Template2 } from "../_components/templates/Template2";

export const TEMPLATES = {
  classic: Template1,
  modern: Template2,
} as const;

export type TEMPLATES_NAME = keyof typeof TEMPLATES;
