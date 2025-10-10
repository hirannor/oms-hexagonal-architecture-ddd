import {
  Component,
  EventEmitter,
  Output,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  takeUntil,
} from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Router, NavigationStart } from '@angular/router';
import { PRODUCT_STATE } from '@oms-frontend/models';

@Component({
  selector: 'lib-oms-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private readonly productState = inject(PRODUCT_STATE);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  @Output() searchTerm = new EventEmitter<string>();

  readonly searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter((term) => term !== null),
        takeUntil(this.destroy$)
      )
      .subscribe((term) => this.onSearch(term ?? ''));

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.clearSearch(false));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(term: string): void {
    const trimmed = term.trim();
    this.searchTerm.emit(trimmed);
    this.productState.loadProducts(undefined, trimmed);
  }

  onSubmit(): void {
    this.onSearch(this.searchControl.value ?? '');
  }

  clearSearch(reload = true): void {
    this.searchControl.setValue('');
    if (reload) {
      this.productState.loadProducts();
    }
  }
}
