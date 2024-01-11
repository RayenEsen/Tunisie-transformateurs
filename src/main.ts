import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Import Bootstrap and Popper.js
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/umd/popper.min.js';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
