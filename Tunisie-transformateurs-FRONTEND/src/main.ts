// src/main.ts

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Import Bootstrap (Popper.js will be automatically loaded by Bootstrap)
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
