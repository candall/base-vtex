/// <reference path ="../node_modules/@types/jquery/index.d.ts"/>

import { Utils } from "./scripts/Utils";
import { Global } from "./scripts/Global";
import { PDP } from "./scripts/PDP";
import { PLP } from "./scripts/PLP";
import { Home } from "./scripts/Home";

declare global {
    interface Window {
        BaseVTEX: any;
        vtexid: any;
        vtexjs: any;
        vtex: any;
        vtxctx: any;
        Vtex: any;
    }
}

export class VTEX {
    Utils = new Utils();
    Global = new Global();
    Home = new Home();
    PLP = new PLP();
    PDP = new PDP();

    constructor($w: Window) {
        /** Global */
        this.Global.Menu();
        this.Global.CallMenu();
        this.Global.ShelfFlag();

        /** Product */
        if ($('body').hasClass('produto')) { }

        /** Home */
        if ($('body').hasClass('home')) {
            this.Home.callOwlCarousel();
            this.Home.callOwlCarouselShelfs();
        }

        /** PLP */
        if ($('body').hasClass('candall-search')) {
            this.PLP.init();
            this.PLP.filterCategory();
            this.PLP.buildingFilters();
        }


        // Account page
        if ($('body').hasClass('account')) { }
    }
}

window.BaseVTEX = new this.VTEX();
