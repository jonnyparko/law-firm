import { Component, OnInit, HostListener   } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal,
  // Portal, TemplatePortalDirective
  } from '@angular/cdk/portal';
import { ContactComponent } from '../contact/contact.component';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
stayClosed = false;
overlayRef: any;
  constructor(public overlay: Overlay) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  open(event: Event) {
    if (this.stayClosed) {
      return;
    }
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally(),
      scrollStrategy : this.overlay.scrollStrategies.close(),
      panelClass: 'custom-dialog-container'
    });
     this.overlayRef = this.overlay.create(config);

    this.overlayRef.attach(new ComponentPortal(ContactComponent));

    this.overlayRef.backdropClick().subscribe(() =>  {
      this.overlayRef.detach();
      this.stayClosed = true;
    });
  }

  close() {
    this.overlayRef.detach();
  }

}
