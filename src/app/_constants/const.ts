export const POST_FORM_MODE = {
  CREATE: "create",
  EDIT: "edit",
} as const;
export type POST_FORM_MODE =
  (typeof POST_FORM_MODE)[keyof typeof POST_FORM_MODE];
