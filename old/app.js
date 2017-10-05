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
                    title: 'Список дел в этой вселенной',
                    items: [
                        {
                            day: '1957-10-04',
                            anchor: '6 утра - Подъем',
                            href: 'https://vk.com'
                        },
                        {
                            day: '1957-10-04',
                            anchor: '7 утра - Разгон облаков... Установление хорошей погоды',
                            href: 'https://fb.com'
                        },
                        {
                            day: '1957-10-04',
                            anchor: 'с 8 до 10 - Подвиг',
                            href: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D1%83%D1%82%D0%BD%D0%B8%D0%BA-1'
                        },
                        {
                            day: '1957-10-04',
                            anchor: 'в 16:00 - война с Англией',
                            href: 'https://google.com'
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
        }
    }

    // export
    window.App = App;
})();
