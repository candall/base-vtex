import { Global } from './Global';

export class PLP {
    Global = new Global();

    init() {
        const $this = this;

        $(".prateleira[id*=ResultItems]").QD_infinityScroll({
            callback: function () {
                $this.Global.ShelfFlag();
            },
            paginate: function (moreResults: any) {
                $(".candall-searchResult-loadProd").click(moreResults);
            }
        });

        $(window).bind("QuatroDigital.is_noMoreResults", function () {
            $(".candall-searchResult-loadProd").after("<div class='candall-searchResult-noResults'><p>Não existem mais resultados</p></div>");
            $(".candall-searchResult-loadProd").hide();
        });
    }

    filterCategory() {
        let wrapperSearchMenu = $('.candall-searchResult');
        let $html = $('<div class="filter-category"> <span class="filter-category-active">Categorias</span> <div class="filter-category-list-content"><div class="filter-category-list"></div></div> </div>');

        $('.search-single-navigator h4').each(function () {
            const $t = $(this);
            $html.find('.filter-category-list').append($t.html());
        });

        $html.find('.filter-category-active').click(function() {
            $html.find('.filter-category-list-content').toggleClass('active');
        });

        wrapperSearchMenu.prepend($html);

        if (window.vtxctx.categoryName !== window.vtxctx.departmentName) {
            $html.find('.filter-category-active').text(window.vtxctx.categoryName);
        }
    }

    buildingFilters() {
        let wrapperSearchMenu = $('.candall-searchNavigator');

        $('.search-single-navigator h5').each(function () {
            const $t = $(this);
            let $html = $(`<div class="filter-category"> <span class="filter-category-active">${$t.text()}</span> <div class="filter-category-list-content"><div class="filter-category-list"></div></div> </div>`);

            $t.find('+ ul a').each(function() {
                $html.find('.filter-category-list').append($(this));
            });

            $html.find('.filter-category-active').click(function () {
                $(this).find('+ .filter-category-list-content').slideToggle();
            });

            wrapperSearchMenu.append($html);
        });
    }
}