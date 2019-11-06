import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private showSpinner: BehaviorSubject<boolean>;
  constructor() {
    this.showSpinner = new BehaviorSubject<boolean>(false);
  }

  /**
   * observableSpinner - Informa cambios de estado del spinner.
   */
  public observableSpinner(): Observable<boolean> {
    return this.showSpinner.asObservable();
  }

  /**
   * show - Muestra el spinner.
   */
  public show() {
    this.showSpinner.next(true);
  }

  /**
   * hide - Oculta el spinner.
   */
  public hide() {
    this.showSpinner.next(false);
  }
}
