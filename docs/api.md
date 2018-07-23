---
layout: default
---
# tracking.js - описание вызовов, типы идертификаторов и требования к ним 

```html
    <head>
        ...
        <!-- Yottos Tracking Code -->
        <script>
        !function(t,e,c,n,r,a,o,s,u){
            r=r||"script",n=t[u=u||"YottosTrackObject"]=t[u]||n||"ytt",t[n]||((a=t[n]=function()
            {var t="callMethod",e="queue",c=arguments;a[e]=a[e]||[],a[t]?a[t].apply(a,c):a[e].push(c)}
            ).push=a,o=e.createElement(r),s=e.getElementsByTagName(r)[0],o.async=!0,o.src=c,s.parentNode.insertBefore(o,s))
        }(window,document,'https://cdn.yottos.com/tracking.js','ytt');
        </script>
        <!-- End Yottos Tracking Code -->
        ...
    </head>
```

```html
<script>
    ytt('init', '00000000-0000-0000-0000-000000000000', {
            'time': 'time',
            'track': {
                'remarketing':{
                    'add': 'id_offer_add',
                    'remove': 'id_offer_remove'
                }
            }
     });
    ytt('t1.init', '11111111-1111-1111-1111-111111111111', {'time':10});
    ytt('t2.init', '22222222-2222-2222-2222-222222222222', {'time':15});
    ytt('set', 'time', 12);
    ytt('t1.set', 'time', 13);
    ytt('t2.set', 'time', 14);
    ytt('set', 'gender', null);
    ytt('t1.set', 'gender', 0);
    ytt('t2.set', 'gender', 1);
    ytt('t1.set', 'gender', 'm');
    ytt('t2.set', 'gender', 'w');
    ytt('set', 'price', 102);
    ytt('t1.set', 'price', 103);
    ytt('t2.set', 'price', 104);
    ytt('track', 'remarketing', {'add': 1});
    ytt('t1.track', 'remarketing', {'add': 2});
    ytt('t2.track', 'remarketing', {'add': 3});
    ytt('track', 'remarketing', {'remove': 1});
    ytt('t1.track', 'remarketing', {'remove': 2});
    ytt('t2.track', 'remarketing', {'remove': 3});
    ytt('track', 'remarketing', {'add': '1'});
    ytt('t1.track', 'remarketing', {'add': '2'});
    ytt('t2.track', 'remarketing', {'add': '3'});
    ytt('track', 'remarketing', {'remove': '1'});
    ytt('t1.track', 'remarketing', {'remove': '2'});
    ytt('t2.track', 'remarketing', {'remove': '3'});
    ytt('track', 'remarketing', {
        'add': 1,
        'time': 15,
        'gender': 'm',
        'price' : 10000,
        'remove': 2
    });
    ytt('t1.track', 'remarketing', {
        'add': 1,
        'time': 15,
        'gender': 0,
        'price' : 10000,
        'remove': 2
    });
    ytt('t2.track', 'remarketing', {
        'add': 1,
        'time': 15,
        'gender': 'm',
        'price' : 10000,
        'remove': 2
    });
</script>
```