
import { Directive, ElementRef} from '@angular/core';

@Directive({ selector: '.dropdown-menu.alert-dropdown' })
export class StopScroll {

    private el: HTMLElement;
    private fixScrolling:any = false;
    private fixPos:number = 0;
    stopScroll() {
        let self = this;
        this.el.addEventListener('mouseenter', function(){
            console.log('mouseenter');
            console.log((<any>$)(this.el).scrollTop());
            if(!self.fixScrolling) {
                self.fixScrolling = true;
                self.fixPos = (<any>$)('body').scrollTop();
            }
            (<any>$)('body').on('mousewheel',function(event:any) {
                console.log(event.originalEvent.wheelDelta);
                let currentScrollTop = (<any>$)(self.el).scrollTop();
                if(((<any>$)(self.el).innerHeight() + currentScrollTop >= (<any>$)(self.el)[0].scrollHeight ) 
                    && event.originalEvent.wheelDelta < 0)
                    return false;
                else if(currentScrollTop === 0 && event.originalEvent.wheelDelta > 0)
                    return false;
                return true;
            });
            // (<any>$)('body').css("position", "fixed");
        });

        this.el.addEventListener('mouseleave', function() {
            console.log('mouseleave');
            self.fixScrolling = false;
            (<any>$)('body').off('mousewheel');
            // (<any>$)('body').css("position", "");
        });
    }

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
        this.stopScroll();
    }

}
