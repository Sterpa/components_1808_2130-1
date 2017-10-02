(function() {
    'use strict';

    // const tmpl = window.menuTmpl;

    /**
     * @typedef {Item} Тип элемента меню
     * @prop {string} href URL
     * @prop {string} anchor текст
     */

    /**
     * Компонента "Меню"
     */
    class Menu {
        /**
         * @constructor
         * @param  {Object} opts
         */
        constructor(opts) {
            this.el = opts.el;
            this.data = opts.data;
            this.onPick = opts.onPick;

            this.render();
            this._initEvents();
        }

        /**
         * Добавляем элемент меню
         * @param {Object} item
         */
        addItem(item) {
            let el = document.createElement('div');
            el.innerHTML = this.getItemHtml(item, this.data.items.length);
            el = el.firstElementChild;

            this.list.append(el);
            el.addEventListener('animationend', () => el.classList.remove('bounce-in-left'));
            el.classList.add('bounce-in-left');

            this.data.items.push(item);
        }

        /**
         * Удаляем пункт меню из данных
         * @param {Integer} itemIndex
         */
        removeItem(itemIndex) {
            this.data.items.splice(itemIndex, 1);
            this.render();
        }

        /**
         * HTML одного объекта меню
         * @param {Item} item
         * @param {number} index
         * @return {string}
         */
        getItemHtml(item, index) {
            console.log(item); // Для теста item
            return `
            <li class="pure-menu-item" data-index="${index}">
                <a 
                class="pure-menu-link"
                href="${item.href}"
                data-action="pick">
                    ${item.anchor}
                </a><button class="close remove-button" data-action="remove">[X]</button>
            </li>`;
        }

        /**
         * Создаем HTML
         */
        render() {
            /**
             * Создаем HTML элементов меню
             * @param {Array<Item>} itmes
             * @return {string}
             */
            let generateItems = (itmes) => {
                return itmes.map(this.getItemHtml.bind(this)).join('');
            };

            // this.el.innerHTML = tmpl(this.data);

            this.el.innerHTML = `<div class="menu pure-menu custom-restricted-width">
                <span class="menu__title pure-menu-heading">
                ${this.data.title}
                </span>
                <ul class="menu__list pure-menu-list">
                ${generateItems(this.data.items)}
                </ul>
            </div>
            `;

            this.list = this.el.querySelector('.menu__list');
            this.title = this.el.querySelector('.menu__title');
        }

        /**
        * Удаления элемента меню
        * @param  {Element} item
        * @private
        */
        _onRemoveClick(item) {
            let index = parseInt(item.parentNode.dataset.index, 10);
            this.removeItem(index);
        }

        /**
        * Выбор элемента меню
        * @param  {HTMLElement} item
        */
        _onPickClick(item) {
            this.onPick(item);
        }

        /**
        * Развешиваем события
        */
        _initEvents() {
            this.el.addEventListener('click', this._onClick.bind(this));
        }

        /**
        * Клик в любую область меню
        * @param {Event} event
        * @private
        */
        _onClick(event) {
            // if (event.target.dataset.action != 'pick') event.preventDefault();
            event.preventDefault();
            let item = event.target;

            switch (item.dataset.action) {
            case 'remove':
            this._onPickClick(item);
            this._onRemoveClick(item);
            break;

            case 'pick':
            this._onPickClick(item);
            if (item.href) window.open(item.href);
            break;
            }
        }
    }

    // Export
    window.Menu = Menu;
})(window);
