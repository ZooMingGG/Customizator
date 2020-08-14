export default class Customizator {
    constructor(scale = 1.5) {
        this.scale = scale;

        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');

        this.btnBlock.addEventListener('click', (event) => this.onScaleChange(event));
        this.colorPicker.addEventListener('input', (event) => this.onColorChange(event));
    }

    onColorChange(event) {
        const body = document.body;
        body.style.backgroundColor = event.target.value;
    }

    onScaleChange(event) {
        const body = document.body;
        let scale;

        if (event.target.value) {
            scale = +event.target.value.replace(/x/g, '');
        }

        const recursy = (element) => {
            element.childNodes.forEach((node) => {
                if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
                    if (!node.parentNode.getAttribute('data-fz')) {
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        node.parentNode.setAttribute('data-fz', +value.replace(/px/g, ''));
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + 'px';
                    } else {
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + 'px';
                    }
                } else {
                    recursy(node);
                }
            });
        };

        recursy(body);
    }

    render() {
        let scaleInputSmall = document.createElement('input');
        let scaleInputMedium = document.createElement('input');
        let panel = document.createElement('div');

        panel.append(this.btnBlock, this.colorPicker);

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