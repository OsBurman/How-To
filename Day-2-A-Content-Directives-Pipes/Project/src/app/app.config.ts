/**
 * app.config.ts — Application Configuration
 *
 * ApplicationConfig holds providers that are available app-wide.
 * This project uses no router or HTTP client, so providers is empty.
 *
 * If you needed routing you would add: provideRouter(routes)
 * If you needed HTTP you would add: provideHttpClient()
 */

import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: []
};
