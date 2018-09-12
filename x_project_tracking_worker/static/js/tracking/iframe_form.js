/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define('iframe_form', ['underscore'],
    function (_) {
        return function (url) {
            var object = this;
            var iframe = 'iframe';
            var form = 'form';
            var addParameter = 'addParameter';
            object.time = new Date().getTime();
            object.defer = new _.Deferred();
            object.name = 'y_iframe_'+object.time;
            try {
                object[iframe] = document.createElement('<iframe name='+ object.name +'>');
            } catch (ex) {
                object[iframe] = document.createElement("iframe");
                object[iframe].name = object.name;
            }
            object[form] = document.createElement(form);
            object[iframe].id = object.name;
            object[form].target = object.name;
            object[form].method = "POST";
            object[form].action = url;
            object[iframe].style.width = '0px';
            object[iframe].marginHeight = '0px';
            object[iframe].marginWidth = '0px';
            object[iframe].style.height = '0px';
            object[form].style.width = '0px';
            object[form].style.height = '0px';
            object[form].style.border = '0px';
            object[iframe].style.border = '0px';
            object[iframe].style.margin = '0px';
            object[form].style.margin = '0px';
            object[iframe].style.display = 'none';
            object[form].style.display = 'none';
            object[iframe].style.visibility = 'hidden';
            object[form].style.visibility = 'hidden';
            object[iframe].style.position = 'absolute';
            object[form].style.position = 'absolute';
            object[iframe].scrolling='no';
            object[iframe].vspace='0';
            object[iframe].hspace='0';
            object[iframe].frameborder ='0';
            object[iframe].allowtransparency='true';
            object[addParameter] = function (parameter, value) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", parameter);
                hiddenField.setAttribute("value", value);
                this[form].appendChild(hiddenField);
            };
            object.send = function () {
                document.body.appendChild(this[iframe]);
                document.body.appendChild(this[form]);
                this[iframe].onload = _.bind(function (e) {
                    this[form].remove();
                    this[iframe].remove();
                    this.defer.resolve();
                }, this);
                this[form].submit();
            };
            object.send();
            return object;
        };
    });