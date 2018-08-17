---
layout: default
---

# Как добавить на сайт tracking.js
Библиотека JavaScript tracking.js позволяет отслеживать взаимодействия пользователей с вашим сайтом. 

_**Базовое описание кода, типы идертификаторов и требования к ним можно посмотреть [тут](index.md).**_

_**Все значения идентификаторов можно получить у вашего менеджера**_

Для того чтобы добавить tracking.js на сайт необходимо выполнить следующие действия.


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
        ytt('init', '00000000-0000-0000-0000-000000000000', {'time': 30});
        ytt('track', 'remarketing', {'add': 1});
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```
* Строку **'00000000-0000-0000-0000-000000000000'** следует заменить идентификатором аккаунта.


## Добавить код для отслеживания формы обратного звонка tracking.js
Код должен срабатывать на валидный submit формы.
 
```html
<script>
   ytt('track', 'remarketing', {
       'add': 2,
       'remove': 1
   });
</script>
```

**_Например:_**
```html
<script>
    $('form.bingc-passive-get-phone-form').on( "submit", function() {
       ytt('track', 'remarketing', {
           'add': 2,
           'remove': 1
       });
    });
</script>
```