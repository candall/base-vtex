import { Utils } from "./Utils";

export class Global {
    Utils = new Utils();

    constructor() {
    }

    checkuser() {
        $.ajax({
            url: "/no-cache/profileSystem/getProfile",
            dataType: "json",
            success: function (data) {
                if (data.UserId) {
                    console.log('logado');
                } else {
                    console.log('não está logado');
                }
            }
        });
    }

    Minicart() {
        const init = function () {
            let timeout: any;
            window.vtexjs.checkout.getOrderForm().done((orderForm: any) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    build(orderForm);
                }, 500);

            });
            $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    build(orderForm);
                }, 500);
            });
            let leave: number = null;
            $('.mini-cart').on('mouseenter', () => {
                clearTimeout(leave);
                $('.minicart-items').fadeIn();
            });
            $('.mini-cart').on('mouseleave', () => {
                leave = setTimeout(() => {
                    $('.minicart-items').fadeOut();
                }, 500)
            });
        }

        const addRemove = function () {
            const container = $('.minicart-quantity-selector-container').not('.has-qty');
            const update = function (id: string, qty: number) {
                window.vtexjs.checkout.getOrderForm()
                    .then(function (orderForm: any) {
                        let itemIndex = orderForm.items.findIndex(function (item: any, index: number) {
                            if (item.id === id) return true;
                        });
                        let updateItem = {
                            index: itemIndex,
                            quantity: qty
                        };
                        return window.vtexjs.checkout.updateItems([updateItem], null, false);
                    })
                    .done(function (orderForm: any) {

                    });
            };
            container.each(function (i, el) {
                $('input', el).on('keyup, keydown, change', (e) => {
                    update(String($(el).data().sku), parseInt(String($(e.currentTarget).val())));
                });
                $(el).find('.ico-down').on('click', function () {
                    let inpVal = parseInt(String($(el).find('input').val()));
                    if (inpVal > 1) {
                        inpVal = inpVal - 1;
                        $('input', el).val(inpVal).change();
                    }
                });
                $('.ico-up', el).on('click', function () {
                    let inpVal = parseInt(String($(el).find('input').val()));
                    inpVal = inpVal + 1;
                    $('input', el).val(inpVal).change();
                });
            });

            container.addClass('has-qty');
        };

        const remove = function () {
            const elements = $('.minicart-list .remove');
            const removeItem = function (id: string) {
                window.vtexjs.checkout.getOrderForm()
                    .then(function (orderForm: any) {
                        let itemIndex = orderForm.items.findIndex(function (item: any, index: number) {
                            if (item.id === id) return true;
                        });
                        var itemsToRemove = [{
                            "index": itemIndex,
                            "quantity": 0,
                        }];
                        return window.vtexjs.checkout.removeItems(itemsToRemove);
                    })
                    .done(function (orderForm: any) {

                    });
            };
            $(elements).each(function (i, el) {
                $(el).on('click', (e) => {
                    removeItem(String($(e.currentTarget).data('sku')));
                    $(e.currentTarget).html('<img src="/arquivos/aaxis-loading.gif"/>');
                });
            });
        };

        const build = (orderForm: any) => {
            let html = '<div class="minicart-container">';
            const items = orderForm.items;
            if (items.length) {
                html += '<div class="row minicart-header"><strong>Produtos no Carrinho</strong></div><ul class="minicart-list">';
                // loop
                for (let i: number = 0; i < items.length; i++) {
                    html += '<li>' +
                        '<div class="row">' +
                        '<div class="col-md-3 bg-white">' +
                        '<figure>' +
                        '<img src="' + items[i].imageUrl + '" />' +
                        '</figure>' +
                        '<a class="remove" data-sku="' + items[i].id + '">Retirar do carrinho</a>' +
                        '</div>' +
                        '<div class="col-md-3 bg-white">' +
                        '<span class="minicart-product-brand">' + items[i].additionalInfo.brandName + '</span>' +
                        '<span class="minicart-product-name">' + items[i].name + '</span>' +
                        '<a href="' + items[i].detailUrl + '" class="minicart-product-link-details">Detalhes</a>' +
                        '</div>' +
                        '<div class="col-md-3 bg-light-grey">' +
                        '<span class="minicart-quantity-label">Qtd.</span>' +
                        '<div class="minicart-quantity-selector-container" data-sku="' + items[i].id + '">' +
                        '<span class="ico-down"></span>' +
                        '<input type="text" value="' + items[i].quantity + '"/>' +
                        '<span class="ico-up"></span>' +
                        '</div>' +
                        '<span class="minicart-total-label">Total</span>' +
                        '</div>' +
                        '<div class="col-md-3 bg-mid-grey">' +
                        '<span class="minicart-price-label">Preço</span>' +
                        '<span class="minicart-unit-price">R$ ' + this.Utils.currencyFormat(items[i].listPrice / 100) + '</span>' +
                        '<span class="minicart-unit-total-price">R$ ' + this.Utils.currencyFormat((items[i].listPrice * items[i].quantity) / 100) + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</li>';
                }
                html += '</ul><div class="row minicart-total"><div class="col-md-6 shipping-detail"><a href="/checkout/#/cart">Detalhes do Envio</a></div><div class="col-md-6 total-order"><span class="total-label">Total</span><span class="total-value">R$ ' + this.Utils.currencyFormat(orderForm.value / 100) + '</span></div></div>';
                html += '<div class="row minicart-footer"><div class="col-md-6 keep-shopping"><a onClick="$(\'.minicart-items\').fadeOut()">Continue comprando</a></div><div class="col-md-6 checkout-order"><a href="/checkout/#/cart">Fechar Pedido <img src="/arquivos/arrow_black.png" /></a></div></div>';
            } else {
                html += '<span class="empty-cart">Carrinho vazio</span>';
            }
            html += '</div>';
            $('.minicart-items').html(html);
            addRemove();
            remove();
        }

        init();
    }

    ShelfFlag() {
        $(".helperComplement").remove();

        $(".shelf-priceLabel").each(function () {
            let valor: any = $(this).html();
            valor = valor.replace(" %", "");
            valor = valor.replace(",", ".");
            valor = valor.replace("<br>", "");
            valor = valor.replace("OFF", "");
            valor = valor.replace("%", "");
            valor = Number(valor);
            valor = Math.ceil(valor);
            $(this).html(`desconto de ${valor}%`);
        });

        $(".prateleira ul li").each(function () {
            let flagDesc = $(this).find(".shelf-priceLabel").html();

            if (flagDesc) {
                $(this).find(".shelf-priceLabel").remove();
                $(this).find(".shelf-flaghight").append('<div class="shelf-priceLabel">' + flagDesc + '</div>');
            }
        });
    }

    CallMenu() {
        $('.header-call-menu').click(function () {
            $('.header-menu-content').slideToggle();
        });

        $('.header-call-menu-mobile').click(function () {
            $('.header-menu-content-mobile').slideToggle();
        });
    }

    Menu() {
        let $items = $('.header-menu-content .menu-departamento ul');
        let $html = $('<div class="wrapper-menu"></div>');

        for (let i = 0; i < $items.length; i++) {
            let $item = $('<div class="menu-item"></div>');

            if (i === 1) {
                $item.append($($items[i]).prev()[0]);
                $item.append($items[i]);
                $item.append($($items[i + 1]).prev()[0]);
                $item.append($items[i + 1]);
                $html.append($item);
            } else if (i === 2) {
                continue;
            } else {
                $item.append($($items[i]).prev()[0]);
                $item.append($items[i]);
                $html.append($item);
            }
        }

        $('.header-menu-content .menu-departamento').after($html);
    }
}
