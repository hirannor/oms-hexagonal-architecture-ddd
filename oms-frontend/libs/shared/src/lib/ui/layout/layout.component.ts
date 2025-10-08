import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AuthService, NotificationItem, NotificationService } from '../../core';
import { OverlayModule } from 'primeng/overlay';
import { map, Observable } from 'rxjs';
import { BadgeDirective } from 'primeng/badge';

@Component({
  selector: 'oms-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    PanelMenuModule,
    InputTextModule,
    TooltipModule,
    OverlayModule,
    BadgeDirective,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private readonly notificationService = inject(NotificationService);

  readonly notifications$: Observable<NotificationItem[]> =
    this.notificationService.notifications$;

  overlayVisible = false;

  readonly hasNotifications$ = this.notifications$.pipe(
    map((n) => !!n && n.length > 0)
  );

  toggleOverlay() {
    this.overlayVisible = !this.overlayVisible;
  }

  onClearAll() {
    this.notificationService.clearAll();
  }

  sidebarItems: MenuItem[] = [
    {
      label: 'Products',
      icon: 'pi pi-box',
      expanded: true,
      items: [
        {
          label: 'Peripherals',
          icon: 'pi pi-cog',
          routerLink: '/products/peripherals',
        },
        {
          label: 'Displays',
          icon: 'pi pi-desktop',
          routerLink: '/products/displays',
        },
        {
          label: 'Audio & Smart Devices',
          icon: 'pi pi-headphones',
          routerLink: '/products/audio',
        },
        {
          label: 'Accessories',
          icon: 'pi pi-sliders-h',
          routerLink: '/products/accessories',
        },
        {
          label: 'Storage',
          icon: 'pi pi-database',
          routerLink: '/products/storage',
        },
      ],
    },
    { label: 'My Basket', icon: 'pi pi-shopping-cart', routerLink: '/basket' },
    { label: 'My Orders', icon: 'pi pi-list', routerLink: '/orders' },
    {
      label: 'Support',
      icon: 'pi pi-info-circle',
      items: [
        {
          label: 'Contact Us',
          icon: 'pi pi-envelope',
          routerLink: '/support/contact',
        },
        {
          label: 'FAQ',
          icon: 'pi pi-question-circle',
          routerLink: '/support/faq',
        },
        {
          label: 'Shipping & Returns',
          icon: 'pi pi-truck',
          routerLink: '/support/shipping',
        },
        {
          label: 'Privacy Policy',
          icon: 'pi pi-lock',
          routerLink: '/support/privacy',
        },
        {
          label: 'Terms of Service',
          icon: 'pi pi-file',
          routerLink: '/support/terms',
        },
      ],
    },
  ];
  private authService: AuthService = inject(AuthService);
  profileItems: MenuItem[] = [
    {
      label: 'My Profile',
      icon: 'pi pi-id-card',
      routerLink: '/customers/me',
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.authService.logout(),
    },
  ];
}
