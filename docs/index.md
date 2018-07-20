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

```html
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
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.


## Oтслеживание динамического ретаргетинга
#### Запомнить товар
Если необходимо запоминать товары для ретаргетинга, то вышеописанный код необходимо привести к следуюшему виду
```html
    <!-- Yottos Tracking Code -->
    <script>
    !function(t,e,c,n,r,a,o,s,u){
        r=r||"script",n=t[u=u||"YottosTrackObject"]=t[u]||n||"ytt",t[n]||((a=t[n]=function()
        {var t="callMethod",e="queue",c=arguments;a[e]=a[e]||[],a[t]?a[t].apply(a,c):a[e].push(c)}
        ).push=a,o=e.createElement(r),s=e.getElementsByTagName(r)[0],o.async=!0,o.src=c,s.parentNode.insertBefore(o,s))
    }(window,document,'https://cdn.yottos.com/tracking.js');
    ytt('init', '00000000-0000-0000-0000-000000000000', {
        'time':10,
        'add': 'id_offer'
    });
    </script>
    <!-- End Yottos Tracking Code -->
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором вашего аккаунта.
* Строку **'id_offer'** следует заменить идентификатором товара.
    
    Идентификатор товара может быть JS типом:
    * String ```'add': '1'```
    * Number ```'add': 1```
    * Array ```'add': ['1', 2, '3']```
    
    Задаваемый идентификатор товара должен соответствовать идентификатору в **XML** файле выгрузки или задаваемому в аккаунте
    ```
    <offer id="1147">
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