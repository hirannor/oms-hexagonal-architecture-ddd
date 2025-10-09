import { ProblemDetails } from './problem-details';

export class ProblemDetailsMapper {
  static fromApi(model: unknown): ProblemDetails {
    if (!model || typeof model !== 'object') {
      return { detail: 'Unknown error', status: 0 };
    }

    const data = model as Partial<ProblemDetails>;

    return {
      timestamp: data.timestamp ?? '',
      title: data.title ?? 'Error',
      status: data.status ?? 0,
      detail: data.detail ?? 'An unexpected error occurred.',
      instance: data.instance ?? '',
      fields: data.fields ?? {},
    };
  }
}
