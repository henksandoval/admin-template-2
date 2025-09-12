import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ThemeSelectorComponent } from '@layout/components/theme-selector/theme-selector.component';
import { UserMenuComponent } from '@shared/components/molecules/user-menu/user-menu.component';
import { LanguageSelectorComponent } from '@shared/components/atoms/language-selector/language-selector.component';
import { AuthService } from '@core/services/auth.service';
import { CommonTranslationsService } from '@core/services/common-translations.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    ThemeSelectorComponent,
    UserMenuComponent,
    LanguageSelectorComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  
  protected readonly authService = inject(AuthService);
  protected readonly commonTranslations = inject(CommonTranslationsService);

  onMenuToggle() {
    this.menuToggle.emit();
  }
}
