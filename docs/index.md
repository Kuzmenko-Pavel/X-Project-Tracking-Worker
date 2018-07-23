---
layout: default
---

# Как добавить на сайт tracking.js
Библиотека JavaScript tracking.js позволяет отслеживать взаимодействия пользователей с вашим сайтом. 
Из этой статьи вы узнаете, как добавить tracking.js на сайт.

## Код отслеживания JavaScript
Самый простой способ приступить к использованию tracking.js – это добавить в шаблоны сайта приведенный ниже 
код отслеживания JavaScript.

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
        ytt('init', '00000000-0000-0000-0000-000000000000');
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.


## Oтслеживание динамического ретаргетинга
Библиотека JavaScript tracking.js позволяет отслеживать товары для динамического ретаргетинга
(закреплять/запомнить и удалять закрепленные за пользователем товары)

Для запоминания/удаления товара используеться его идентификатор

Задаваемый идентификатор товара должен соответствовать идентификатору в **XML** файле выгрузки или задаваемому в аккаунте
```xml
    <offer id="1147">
        ...
    </offer>
```


```xml
    <offer id="1147">
        <categoryId>50</categoryId>
        <categoryName>Встраиваемая техника</categoryName>
        <name>Ariston PH 94111</name>
        <url>
        http://example.com/item.php?resolved_name_=ARISTON-PH-94111&view_=prices
        </url>
        <price>12000</price>
        <currencyId>UAH</currencyId>
        <picture>http://example.com/jpg/1146.jpg</picture>
        <logo>http://example.com/logo_image.png</logo>
        <description>описание товара 70 символов</description>
    </offer>
```
Идентификатор товара может быть JS типом:
   * String ```'add': '1'```
   * Number ```'add': 1```
   * Array ```'add': ['1', 2, '3']```
   

### Запомнить товар
Товар закрепляеться(запоминаеться) за пользователем на **N** дней.

Количество дней задаеться значением **time**.

**time** может быть JS типом:
 * String ```'add': '1'```
 * Number ```'add': 1```
 
Сушествует два способа запомнить товар, simple (простой) и extended (расширеный)

#### Запомнить товар simple
Если необходимо запоминать товары для ретаргетинга, то **Yottos Tracking Code** код необходимо привести к следуюшему виду
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
        ytt('init', '00000000-0000-0000-0000-000000000000', {
            'time': 'time',
            'track': {
                'remarketing':{
                    'add': 'id_offer'
                }
            }
        });
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.
* Строку **'id_offer'** следует заменить идентификатором товара либо списком идентификаторов.
* Строку **'time'** следует заменить количеством дней на которое осушествляеться закрепление за пользователем товара.

#### Запомнить товар extended
Extended способ закрепления товара позволяет учитывать JS события (click, submit ...)

Для этого **Yottos Tracking Code** код необходимо привести к следуюшему виду

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
        ytt('init', '00000000-0000-0000-0000-000000000000');
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.

По необходимому JS события (click, submit ...) необходимо вызвать следующий код
```javascript
 ytt('track', 'remarketing', {
        'add': 'id_offer',
        'time': 'time'
    });
```
* Строку **'id_offer'** следует заменить идентификатором товара либо списком идентификаторов.
* Строку **'time'** следует заменить количеством дней на которое осушествляеться закрепление за пользователем товара.

**_Например:_**
```html
<script>
    // #form - айди формы заказа товаров
    $('#form').on( "submit", function() {
           ytt('track', 'remarketing', {
               'add': [1,2,3], //id товаров из корзины
               'time': 15 // закрепляються товары на 15 дней
           });
    });
    // #button - айди кнопки
    $('#button').on( "click", function() {
           ytt('track', 'remarketing', {
               'add': [1,2,3], //id товаров из корзины
               'time': 15 // закрепляються товары на 15 дней
           });
    })
</script>
```

### Удалить товар

Сушествует два способа удалить(открепить от пользователя) товар, simple (простой) и extended (расширеный)

#### Удалить товар simple
Если необходимо удалить товары ретаргетинга, то *Yottos Tracking Code* код необходимо привести к следуюшему виду
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
        ytt('init', '00000000-0000-0000-0000-000000000000', {
            'track': {
                'remarketing':{
                    'remove': 'id_offer'
                }
            }
        });
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.
* Строку **'id_offer'** следует заменить идентификатором товара либо списком идентификаторов.
* Строку **'time'** следует заменить количеством дней на которое осушествляеться закрепление за пользователем товара.

#### Удалить товар extended
Extended способ удаления товара позволяет учитывать JS события (click, submit ...)

Для этого **Yottos Tracking Code** код необходимо привести к следуюшему виду

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
        ytt('init', '00000000-0000-0000-0000-000000000000');
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.

По необходимому JS события (click, submit ...) необходимо вызвать следующий код
```javascript
 ytt('track', 'remarketing', {
        'remove': 'id_offer'
    });
```
* Строку **'id_offer'** следует заменить идентификатором товара либо списком идентификаторов.

**_Например:_**
```html
<script>
    // #form - айди формы заказа товаров
    $('#form').on( "submit", function() {
           ytt('track', 'remarketing', {
               'remove': [1,2,3], //id товаров
           });
    });
    // #button - айди кнопки
    $('#button').on( "click", function() {
           ytt('track', 'remarketing', {
               'remove': [1,2,3], //id товаров
           });
    })
</script>
```

### Запомнить и удалить товар одновременно
В большенстве случаем, при покупке пользователем товаров необходимо удалить из ретаргетинга товары которые пользователь купил
и прикрепить к нему какието рекомендованные товары.
Данное действие можно выполнить одновременно.

#### Запомнить и удалить товар одновременно simple
Если необходимо запомнить и удалить товары ретаргетинга, то *Yottos Tracking Code* код необходимо привести к следуюшему виду
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
        ytt('init', '00000000-0000-0000-0000-000000000000', {
            'time': 'time',
            'track': {
                'remarketing':{
                    'add': 'id_offer_add',
                    'remove': 'id_offer_remove'
                }
            }
        });
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.
* Строку **'id_offer_add'** следует заменить идентификатором либо списком идентификаторов добавляемых товаров.
* Строку **'id_offer_remove'** следует заменить идентификатором либо списком идентификаторов удаляемых товаров.
* Строку **'time'** следует заменить количеством дней на которое осушествляеться закрепление за пользователем товара.

#### Запомнить и удалить товар одновременно extended
Extended способ запоминания и удаления товара позволяет учитывать JS события (click, submit ...)

Для этого **Yottos Tracking Code** код необходимо привести к следуюшему виду

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
        ytt('init', '00000000-0000-0000-0000-000000000000');
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.

По необходимому JS события (click, submit ...) необходимо вызвать следующий код
```javascript
 ytt('track', 'remarketing', {
        'time': 'time',
        'add': 'id_offer_add',
        'remove': 'id_offer_remove'
    });
```
* Строку **'id_offer_add'** следует заменить идентификатором либо списком идентификаторов добавляемых товаров.
* Строку **'id_offer_remove'** следует заменить идентификатором либо списком идентификаторов удаляемых товаров.
* Строку **'time'** следует заменить количеством дней на которое осушествляеться закрепление за пользователем товара.

**_Например:_**
```html
<script>
    // #form - айди формы заказа товаров
    $('#form').on( "submit", function() {
           ytt('track', 'remarketing', {
               'add': [4,5,6], //id рекомендованных товаров
               'time': 15, // закрепляються товары на 15 дней
               'remove': [1,2,3], //id товаров из корзины
           });
    });
    // #button - айди кнопки
    $('#button').on( "click", function() {
           ytt('track', 'remarketing', {
               'add': [4,5,6], //id рекомендованных товаров
               'time': 15, // закрепляються товары на 15 дней
               'remove': [1,2,3], //id товаров из корзины
           });
    })
</script>
```

## Пример вызовов API tracking.js

_**Описание вызовов, типы идертификаторов и требования к ним можно посмотреть [тут](./api.html).**_