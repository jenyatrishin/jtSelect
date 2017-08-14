import "../scss/_jtSelect.scss";

class jtSelect{

    constructor(element, options = {}){

        if(element){
            this.element = element;
            this.options = options;
            this._config(this.element, this.options);
            this._render();
        }

    }

    static getVersion(){
        return '0.1.4-beta';
    }

    _config(element, options){
        this.placeholder = options.placeholder || this.element.getAttribute('data-placeholder') || 'Выберите значение';
        this.searchField = options.searchField || false;
        this.onStateChange = options.onStateChange || null;

        //this.exId = Math.round(Math.random()* (50 - 1) + 1);
        this.exId = Math.random().toString(36).slice(2);
        this.subElements = element.querySelectorAll('option');
        this.selectMultyType = this.element.hasAttribute('multiple');

    }

    _init(){

        this.element.style.display = 'none';

        let activeElement = this._getActiveElement(),
            elementsList = this._getElementsList(),
            searchField = this._getSearchField();

        let _template = `
            <div class="jtselect__container">
                <div class="jtselect__block">
                    <div class="jtselect__value">
                        ${activeElement}
                    </div>
                    <div class="jtselect__dropdown">
                        ${searchField}
                        ${elementsList}
                    </div>
                </div>
            </div>
        `;

        return _template;
    }

    destroy(){
        document.querySelector(`.el${this.exId}`).remove();
        this.element.style.display = 'inherit';
    }

    reload(){
        this.destroy();
        this._config(this.element, this.options);
        this._render();
    }

    _getActiveElement(){
        let _active = Array.from(this.subElements).filter((one) => {
            return one.hasAttribute('selected');
        }), _text = '';

        if(_active.length){
            _active.forEach((el) => {
               _text += el.innerText;
            });
            //_text = _active.join(', ');
        }
        else if(!_active.length && this.placeholder){
            _text = this.placeholder;
        }
        return _text;
    }


    _getElementsList(){
        let _template = `<ul class="jtselect__elements">`,
            _id = 1;
        Array.from(this.subElements).forEach((one) => {
            one.setAttribute('data-id',_id);
           _template += `<li class="${(one.hasAttribute('selected')) ? 'active' : ''}"><a href="#" data-id="${_id}">${one.innerText}</a></li>`
            _id++;
        });
        _template += `</ul>`;

        return _template;
    }

    _getSearchField(){
        let _searchFieldTemplate = '';

        if(this.searchField){
            _searchFieldTemplate = `
                <div class="jtselect__search">
                    <input type="text" name="jtselect-search" value="">
                </div>`;
        }

        return _searchFieldTemplate;
    }

    _render(){
        let _template = this._init(),
            _container = document.createElement('div');
        _container.classList.add('jtselect');
        _container.classList.add(`el${this.exId}`);
        _container.innerHTML = _template;
        this.element.parentNode.appendChild(_container);
        this._addElementListener();
        this._addTitleEvent();
        this._addSearchEvent();
        this._closeSelect();
    }

    _addTitleEvent(){
        let _block = document.querySelector(`.el${this.exId}`);
        document.querySelector(`.el${this.exId} .jtselect__value`).addEventListener('click', function(){
            if(_block.classList.contains('open')){
                _block.classList.remove('open');
            }
            else{
                _block.classList.add('open');
            }
        });
    }

    _addElementListener(){
        let _elements = document.querySelectorAll(`.el${this.exId} .jtselect__dropdown a`);
        Array.from(_elements).forEach((one) =>{
            one.addEventListener('click', (e) => {
                e.preventDefault();
                let _id = one.getAttribute('data-id'),
                    _text = one.innerText,
                    _parent = one.parentNode;
                this._changeActiveElement(_id, _text, _parent);
            })
        });
    }

    _changeActiveElement(id, text, parent){

        this._changeSelectState(id);

        if(this.selectMultyType){
            if(parent.classList.contains('active')){
                parent.classList.remove('active');
            }
            else{
                parent.classList.add('active');
            }

            let _activeTitles = [];
            Array.from(document.querySelectorAll(`.el${this.exId} .jtselect__dropdown ul li.active`)).forEach((el) => {
                _activeTitles.push(el.querySelector('a').innerText);
            });

            document.querySelector(`.el${this.exId} .jtselect__value`).innerText = _activeTitles.join(', ');
        }
        else{


            Array.from(document.querySelectorAll(`.el${this.exId} .jtselect__dropdown ul li`)).forEach((el) => {
                el.classList.remove('active');
            });

            parent.classList.add('active');

            document.querySelector(`.el${this.exId} .jtselect__value`).innerText = text;

            document.querySelector(`.el${this.exId}`).classList.remove('open');
        }



    }

    _changeSelectState(id){
        if(this.selectMultyType){
            let _el = this.element.querySelector(`option[data-id="${id}"]`);
            if(_el.hasAttribute('selected')){
                _el.removeAttribute('selected');
            }
            else{
                _el.setAttribute('selected','selected');
            }
        }
        else{

            this.subElements.forEach((one) => {
                if(one.getAttribute('data-id') === id){
                    one.setAttribute('selected','selected');
                }
                else{
                    one.removeAttribute('selected');
                }
            });

        }

        if(typeof this.onStateChange === 'function'){
            this.onStateChange();
        }

    }

    _addSearchEvent(){
        if(this.searchField){

            let _searchField = document.querySelector(`.el${this.exId} .jtselect__search input`),
                _list = document.querySelectorAll(`.el${this.exId} .jtselect__dropdown ul li`);
            _searchField.addEventListener('keyup', function(){
                let _value = this.value.toLowerCase();
                if(_value.length > 0){


                    _list.forEach((el) => {

                        //if(el.innerText.toLowerCase().indexOf(_value)+1){
                        if(el.innerText.includes(_value)){
                            el.classList.remove('hidden-li');
                        }
                        else{
                            el.classList.add('hidden-li');
                        }

                    });

                }
                else{
                    _list.forEach((el) => {
                        el.classList.remove('hidden-li');
                    });
                }
            });

        }
    }

    _closeSelect(){
        document.addEventListener('click', (e) => {
           if(!e.target.closest('.jtselect')){
               Array.from(document.querySelectorAll('.jtselect')).forEach((block) => {
                   block.classList.remove('open');
               });
           }
        });
    }

}

export {jtSelect};