export class Utils {
    getParameter(url:string, key:string) {
        if(url === undefined) {
            return '';
        }
        var match = url.match('[?&]' + key + '=([^&]+)');
        return match ? match[1] : null;
    }

    slugify(text:string) {
        return text.toString().toLowerCase().trim()
        .replace(/&/g, '-and-')
        .replace(/[\s\W-]+/g, '-')
    }

    setCookie(cname:string, cvalue:string, exdays:number) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname:string) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    currencyFormat(n:any):string {
        const c = 2;
        const d = ",";
        const t = ".";
        let s = n < 0 ? "-" : "";
        let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
        let j = i.length;
            j = j > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - parseInt(i)).toFixed(c).slice(2) : "");
    }

    removeZero(val:any) {
        var valueWithZero = String(val).replace(/,00/g,'');

        return valueWithZero;
    };

    removeCents(val:any, delimiter:string=',') {
        let centsIndex = val.indexOf(delimiter);
        if(centsIndex !== -1) {
            let text = String(val);
            let textToReplace = text.substr(centsIndex,3);
            let newText = text.replace(textToReplace,'');
            return newText
        }
        return val;

    };
}