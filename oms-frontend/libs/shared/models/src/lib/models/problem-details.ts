export interface ProblemDetails {
  timestamp?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  fields?: Record<string, string>;
}
