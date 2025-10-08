import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProblemDetails } from '../problem-details/problem-details';
import { NotificationItem } from './notification-item';

export type NotificationSeverity = 'success' | 'info' | 'warn' | 'error';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _notifications = new BehaviorSubject<NotificationItem[]>([]);
  readonly notifications$ = this._notifications.asObservable();

  success(summary: string, detail?: string) {
    this.add('success', summary, detail);
  }

  info(summary: string, detail?: string) {
    this.add('info', summary, detail);
  }

  warn(summary: string, detail?: string) {
    this.add('warn', summary, detail);
  }

  error(summary: string, detail?: string) {
    this.add('error', summary, detail);
  }

  fromProblem(problem: ProblemDetails): void {
    const title =
      problem.title ??
      (problem.status
        ? `Error ${problem.status}`
        : 'An unexpected error occurred');
    const message =
      problem.detail ??
      (problem.fields
        ? Object.entries(problem.fields)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join('\n')
        : 'Please try again later.');

    this.add('error', title, message);
  }

  clearAll(): void {
    this._notifications.next([]);
  }

  private add(
    type: NotificationSeverity,
    title: string,
    message?: string
  ): void {
    const newNotification: NotificationItem = {
      id: crypto.randomUUID(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };

    this._notifications.next([newNotification, ...this._notifications.value]);
  }
}
