import { Template1 } from "../_components/templates/Template1";

export const TEMPLATES = {
  classic: Template1,
} as const;

export type TEMPLATES_NAME = keyof typeof TEMPLATES;
