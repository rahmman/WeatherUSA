import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sticky-footer',
    templateUrl: 'sticky-footer.component.html',
    styles: [`
    @media screen and (min-height: 570px){
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            /* Set the fixed height of the footer here */
            height: 60px;
            background-color: #f5f5f5;
        }
    }
    @media screen and (max-height: 570px){
        .footer {
            width: 100%;
            /* Set the fixed height of the footer here */
            height: 60px;
            background-color: #f5f5f5;
        }
    }
    `]
})
export class StickyFooterComponent implements OnInit {
    ngOnInit() {
    }
}
