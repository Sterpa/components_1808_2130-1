(function() {
    'use strict';

   // import
   let Menu = window.Menu;
   let Form = window.Form;

    /**
     * Компонента "Форма"
     */
    class App {
        /**
         * @param {Object} param0 
         * @param {HTMLElement} param0.el
         */
        constructor({el}) {
            let menu = new Menu({
                el: document.querySelector('.js-menu'),
                data: {
                    title: 'Список дел на сегодня',
                    items: [
                        {
                            href: 'https://vk.com',
                            anchor: '6 утра - Подъем'
                        },
                        {
                            href: 'https://ok.ru',
                            anchor: '7 утра - Разгон облаков...'
                        },
                        {
                            href: 'https://yahoo.com',
                            anchor: '&nbsp;&nbsp;&nbsp;&nbsp;Установление хорошей погоды'
                        },
                        {
                            href: 'https://yandex.ru',
                            anchor: 'с 8 до 10 - Подвиг'
                        },
                        {
                            href: 'https://yandex.ru',
                            anchor: 'в 16:00 - война с Англией'
                        }
                    ]
                },
                onPick(item) {
                    console.log(item);
                }
            });

            let form = new Form({
                el: el.querySelector('.js-form'),
                data: {}
            });

            // Обрабатываем всплывшее событие с form
            form.el.addEventListener('toChat', (event) => {
                menu.addItem(event.detail);
            });

            // Новое меню по шаблону
            let tmpl = _.template(document.getElementById('list-template').innerHTML);

            // ..результат
            let result = tmpl({count: 6});
            let elm = document.createElement('div');
            elm.innerHTML = result;
            elm = elm.firstElementChild;
            document.body.querySelector('.myApp').append(elm);
        }
    }

    // export
    window.App = App;
})();
