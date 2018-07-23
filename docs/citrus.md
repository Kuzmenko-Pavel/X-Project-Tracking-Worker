---
layout: default
---

# Как добавить на сайт tracking.js
Библиотека JavaScript tracking.js позволяет отслеживать взаимодействия пользователей с вашим сайтом. 
Для того чтобы добавить tracking.js на сайт необходимо выполнить следующие действия.

_**Все значения идентификаторов можно получить у вашего менеджера**_

_**Базовое описание кода, типы идертификаторов и требования к ним можно посмотреть [тут](index.md).**_

## Добавить базовый код tracking.js
Код нужно добавлять в верхней части тега **<head>**, перед любым другим скриптом и тегами CSS.
Код полностью асинхронный и не вызывает блокировок и задержек рендеринга страницы, должен быть размешен на всех страницах сайта.

```html
    <head>
        ...
        <!-- Yottos Tracking Code -->
        <script>
        !function(t,e,c,n,r,a,o,s,u){
            r=r||"script",n=t[u=u||"YottosTrackObject"]=t[u]||n||"ytt",t[n]||((a=t[n]=function()
            {var t="callMethod",e="queue",c=arguments;a[e]=a[e]||[],a[t]?a[t].apply(a,c):a[e].push(c)}
            ).push=a,o=e.createElement(r),s=e.getElementsByTagName(r)[0],o.async=!0,o.src=c,s.parentNode.insertBefore(o,s))
        }(window,document,'https://cdn.yottos.com/tracking.js');
        ytt('target_to_acc.init', '00000000-0000-0000-0000-000000000000', {'time': 'time_target_to_acc'});
        ytt('target_to_offer.init', '11111111-1111-1111-1111-111111111111', {'time':'time_target_to_offer'});
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором аккаунта для таргетинга на аккаунт.
* Строку **'11111111-1111-1111-1111-111111111111'** следует заменить идентификатором аккаунта для таргетинга на товар.
* Строку **'time_target_to_acc'** следует заменить значением количества дней для таргетинга на аккаунт.
* Строку **'time_target_to_offer'** следует заменить значением количества дней для таргетинга на товар.

## Добавить код пометки пользователей товаром при просмотре
Код должен быть размешен на страницах сайта с непосредственным товаром [например](https://www.citrus.ua/smartfony/m5s-16gb-grey-meizu-609619.html). 
```html
<script>
   ytt('target_to_acc.track', 'remarketing', {'add': 'id_offer_acc'});
   ytt('target_to_offer.track', 'remarketing', {'add': 'id_offer_ret'});
</script>
```
* Строку **'id_offer_acc'** следует заменить идентификатором товара для таргетинга на аккаунт _(значение уточните у вашего менеджера)_.
* Строку **'id_offer_ret'** следует заменить идентификатором товара отображаемого на странице.

## Добавить код пометки пользователей товарами при покупке
Код должен быть размешен на страницах сайта с оформлением покупки [например](https://my.citrus.ua/ru/checkout/116707260?order_source=new_desktop&new_site=https://www.citrus.ua&_ga=2.151571193.1127107469.1532340927-1209114315.1529668825).
Срабатывать на валидный submit формы.
 
```html
<script>
   ytt('target_to_acc.track', 'remarketing', {
       'time': 'time_target_to_acc',
       'add': 'id_offer_acc'
   });
   ytt('target_to_offer.track', 'remarketing', {
       'time': 'time_target_to_offer',
       'add': 'id_offer_ret_add',
       'remove': 'id_offer_ret_remove'
   });
</script>
```
* Строку **'id_offer_acc'** следует заменить идентификатором либо списком идентификаторов товаров для таргетинга на аккаунт _(значение уточните у вашего менеджера)_.
* Строку **'time_target_to_acc'** следует заменить 365 дней  _(значение уточните у вашего менеджера)_.
* Строку **'id_offer_ret_add'** следует заменить идентификатором либо списком идентификаторов рекомендованных товаров.
* Строку **'id_offer_ret_remove'** следует заменить идентификатором либо списком идентификаторов товаров из корзины.
* Строку **'time_target_to_offer'** следует заменить количеством дней на которое осушествляеться закрепление рекомендованных за пользователем товара.


**_Например:_**
```html
<script>
    $('form.order-form').on( "submit", function() {
           ytt('target_to_acc.track', 'remarketing', {
               'time': 365,
               'add': 1
           });
           ytt('target_to_offer.track', 'remarketing', {
               'time': 15,
               'add': [5,4,6],
               'remove': [1,2,7,8]
           });
    });
</script>
```