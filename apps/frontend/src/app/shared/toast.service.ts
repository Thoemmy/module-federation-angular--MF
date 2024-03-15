import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Small Wrapper of Toasts and the Message Service Api from PrimeNg
 *
 * Following setup needs to be done to use the global toast service
 *
 * * app.component.ts - `import` **ToastModule**
 * * app.component.html - add element **p-toast** with attribute **key="global"**
 * * app.config.ts or main.ts (where the main config of the app is done)
 * `import` the **MessageService** from PrimeNG and add it to the providers array
 *
 *
 * Apis to call:
 *
 * * **showSuccess**(message: string)
 * * **showError**(message: string)
 * * **showWarn**(message: string)
 * * **showInfo**(message: string)
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string) {
    this.messageService.add({
      key: 'global',
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  showError(message: string) {
    this.messageService.add({
      key: 'global',
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
  showWarn(message: string) {
    this.messageService.add({
      key: 'global',
      severity: 'warn',
      summary: 'Warning',
      detail: message,
    });
  }
  showInfo(message: string) {
    this.messageService.add({
      key: 'global',
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }
}
