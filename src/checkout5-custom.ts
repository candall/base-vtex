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
        $this.insertScript();

        // CALL FUNCTIONS
        $(document).ready(() => {
        });
    }

    insertScript() {
        let scripts = [''];
        for (let i = 0; i < scripts.length; i++) {
            let f = document.getElementsByTagName('body')[0];
            let j = document.createElement('script');
            j.async = true;
            j.src = scripts[i];
            f.parentNode.insertBefore(j, f);
        }
    }
}

window.BaseVTEX = new this.VTEX();