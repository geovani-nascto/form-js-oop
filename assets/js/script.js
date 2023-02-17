class Form{
    method = 'GET';
    items = [];

    constructor(container, method, action, className){
        this.container = document.querySelector(container);
        this.method = method;
        this.action = action;
        this.className = className;
    }

    addItem(item){
        this.items.push(item);
    }

    displayOn(){
        let formElement = document.createElement('form');
        formElement.setAttribute('method', this.method);
        formElement.setAttribute('action', this.action);
        formElement.setAttribute('class', this.className);

        for(let i in this.items){
            this.items[i].displayOn(formElement);
        }

        this.container.appendChild(formElement);
    }
}

class Input{
    required = false;
    _type = 'text'
    
    constructor(name, label, className){
        this.name = name;
        this.label = label;
        this.className = className;
    }

    get type(){
        return this._type;
    }

    set type(type){
        if(['text', 'email', 'password', 'tel', 'submit'].includes(type)){
            this._type = type;
        } else{
            throw new Error(`O input de tipo ${type} não existe.`);
        }
    }

    displayOn(formElement){
        let inputField = document.createElement('input');
        inputField.name = this.name;
        inputField.placeholder = this.label;
        inputField.type = this.type;
        inputField.required = this.required;
        inputField.className = this.className;
        formElement.appendChild(inputField);
    }
}

class Button extends Input{

    constructor(label, className){
        super('', label, className);
        this.type = 'submit';
    }

    displayOn(formElement){
        let buttonInput = document.createElement('input');
        buttonInput.type = this.type;
        buttonInput.value = this.label;
        buttonInput.className = this.className;
        formElement.appendChild(buttonInput);
    }
}

class Validate{
    constructor(value, className){
        this.value = value;
        this.className = className;
    }
}

let form = new Form('.formArea', 'POST', '#', 'form');

let email = new Input('email', 'Digite seu e-mail', 'inputField');
email.type = 'email';
email.required = true;
form.addItem(email);

let password = new Input('password', 'Digite sua senha', 'inputField');
password.type = 'password';
password.required = true;
form.addItem(password);

let tel = new Input('tel', 'Digite seu número de telefone', 'inputField');
tel.type = 'tel';
form.addItem(tel);

let button = new Button('Enviar', 'buttonInput');
form.addItem(button);

form.displayOn();