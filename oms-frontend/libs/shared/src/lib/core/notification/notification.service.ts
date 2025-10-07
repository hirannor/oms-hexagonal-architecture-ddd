import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProblemDetails } from '../models/problem-details';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messageService: MessageService = inject(MessageService);

  success(summary: string, detail?: string) {
    this.messageService.add({ severity: 'success', summary, detail });
  }

  error(summary: string, detail?: string) {
    this.messageService.add({ severity: 'error', summary, detail });
  }

  warn(summary: string, detail?: string) {
    this.messageService.add({ severity: 'warn', summary, detail });
  }

  info(summary: string, detail?: string) {
    this.messageService.add({ severity: 'info', summary, detail });
  }

  fromProblem(problem: ProblemDetails) {
    this.error(problem.title ?? 'Error', problem.detail ?? 'Unexpected error');
  }
}

