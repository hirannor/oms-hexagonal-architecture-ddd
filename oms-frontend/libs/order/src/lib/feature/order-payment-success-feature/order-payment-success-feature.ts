import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-order-feature-details',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './order-payment-success-feature.html',
  styleUrls: ['./order-payment-success-feature.scss'],
})
export class OrderPaymentSuccessFeature implements OnInit {
  sessionId?: string;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.sessionId =
      this.route.snapshot.queryParamMap.get('session_id') ?? undefined;
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }
}
