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
import { AuthService } from '@oms-frontend/shared/data-access';

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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
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

  sidebarItems: MenuItem[] = [
    { label: 'Products', icon: 'pi pi-box', routerLink: '/products' },
  ];
}
