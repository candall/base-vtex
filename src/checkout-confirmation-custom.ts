/// <reference path ="../node_modules/@types/jquery/index.d.ts"/>

interface Window {
    vtexid: any;
    vtexjs: any;
    vtex: any;
    BaseVTEX: any;
}

export class VTEX {
    $this: any;

    constructor() {
        let $this = this;

        // CALL FUNCTIONS
        $(document).ready(() => {
        });
    }
}

window.BaseVTEX = new this.VTEX();