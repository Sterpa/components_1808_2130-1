(function() {
    'use strict';

    /**
     * Компонента "Форма"
     */
    class Form {
        /**
         * @constructor
         * @param  {Object} opts
         */
        constructor({el, data, onSubmit}) {
            this.el = el;
            this.data = data;
            this.onSubmit = onSubmit;

            this._myInitEvents();
            this.render();
        }

        /**
         * Создаем HTML
         */
        render() {
            this.el.innerHTML = `
            <form class="form pure-form">
                <fieldset>
                    <input class="form__input"
                        type="url"
                        name="href"
                        required="required"
                        placeholder="url"/>

                    <input class="form__input"
                        type="date"
                        name="anchor"
                        required="required"
                        placeholder="anchor"/>

                    <button class="form__btn pure-button" type="submit">
                        Save
                    </button>
                </fieldset>
            </form>`;
        }

        /**
        * Развешиваем события 2
        */
        _myInitEvents() {
            this.el.addEventListener('submit', this._myTrigger.bind(this));
        }

        /**
        * Триггер 2
        * @param {Event} event
        */
        _myTrigger(event) {
            event.preventDefault(); // Отмена действия браeзера 'submit' по-умолчанию для формы
            let eventData = {
                url: this.el.querySelector('input[name="href"]').value,
                anchor: this.el.querySelector('input[name="anchor"]').value
            };
            this.trigger('toChat', eventData);
            event.target.reset();
        }

        /**
         * Генерация события на элементе
         * @param {string} eventName
         * @param {*} eventData
         */
        trigger(eventName, eventData) {
            let myEvent = new CustomEvent(eventName, {
                detail: eventData
            });

            this.el.dispatchEvent(myEvent);
        }
    }

    // export
    window.Form = Form;
})();
