export default class Customizator {
    constructor(scale = 1.5) {
        this.scale = scale;

        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');
        this.resetBlock = document.createElement('div');
        this.savedScale = localStorage.getItem('scale') || 1;
        this.savedColor = localStorage.getItem('color') || '#ffffff';

        this.btnBlock.addEventListener('click', (event) => this.onScaleChange(event));
        this.colorPicker.addEventListener('input', (event) => this.onColorChange(event));
        this.resetBlock.addEventListener('click', () => this.reset());
    }

    onColorChange(event) {
        const body = document.body;
        body.style.backgroundColor = event.target.value;
        localStorage.setItem('color', event.target.value);
    }

    onScaleChange(event) {
        const body = document.body;

        if (event) {
            this.savedScale = +event.target.value.replace(/x/g, '');
        }

        const setFontSize = (element) => {
            element.childNodes.forEach((node) => {
                if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
                    if (!node.parentNode.getAttribute('data-fz')) {
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        node.parentNode.setAttribute('data-fz', +value.replace(/px/g, ''));
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.savedScale + 'px';
                    } else {
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.savedScale + 'px';
                    }
                } else {
                    setFontSize(node);

                    localStorage.setItem('scale', this.savedScale);
                }
            });
        };

        setFontSize(body);
    }

    setColor() {
        const body = document.body;
        body.style.backgroundColor = this.savedColor;
        this.colorPicker.value = this.savedColor;
    }

    injectStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
            .panel {
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: fixed;
                top: 10px;
                right: 0;
                border: 1px solid rgba(0,0,0, .2);
                box-shadow: 0 0 20px rgba(0,0,0, .5);
                width: 300px;
                height: 60px;
                background-color: #fff;
            
            }
            
            .scale {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100px;
                height: 40px;
              
            }

            .scale_btn {
                display: block;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(0,0,0, .2);
                border-radius: 4px;
                font-size: 18px;
            }
            
            .color {
                width: 40px;
                height: 40px;
            }

            .reset {
                font-size: 40px;
                cursor: pointer;
            }
        `;
        document.querySelector('head').append(style);
    }

    reset() {
        localStorage.clear();
        this.savedScale = 1;
        this.savedColor = '#ffffff';
        this.setColor();
        this.onScaleChange();
    }

    render() {
        this.injectStyle();
        this.setColor();
        this.onScaleChange();

        let scaleInputSmall = document.createElement('input');
        let scaleInputMedium = document.createElement('input');
        let panel = document.createElement('div');

        panel.append(this.btnBlock, this.colorPicker, this.resetBlock);
        this.resetBlock.innerHTML = '&times';
        this.resetBlock.classList.add('reset');

        scaleInputSmall.classList.add('scale_btn');
        scaleInputMedium.classList.add('scale_btn');
        this.btnBlock.classList.add('scale');
        this.colorPicker.classList.add('color');

        scaleInputSmall.setAttribute('type', 'button');
        scaleInputMedium.setAttribute('type', 'button');
        scaleInputSmall.setAttribute('value', '1x');
        scaleInputMedium.setAttribute('value', `${+this.scale}x`);
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');

        this.btnBlock.append(scaleInputSmall, scaleInputMedium);

        panel.classList.add('panel');

        document.body.append(panel);
    }
}