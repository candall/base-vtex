import { Global } from './Global';

declare global {
    interface Window {
        skuJson: any;
    }
}

export class PDP {
    skuJson : any;
    available : boolean;

    Global = new Global();

    isAvailable() {
        const disponibility = window.skuJson.available;

        $("#isAvailable").html(`${disponibility === true ? `<p>Disponible.</p>` : ``}`);
    }
}