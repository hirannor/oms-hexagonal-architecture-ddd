import { ProblemDetails as UiProblemDetails } from './problem-details';

export class ProblemDetailsMapper {
  static fromApi(model: any): UiProblemDetails {
    if (!model) return { detail: 'Unknown error', status: 0 };

    return {
      timestamp: model.timestamp,
      title: model.title,
      status: model.status,
      detail: model.detail,
      instance: model.instance,
      fields: model.fields ?? {},
    };
  }
}
