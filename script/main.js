"use strict";
document.addEventListener('DOMContentLoaded', () => {
    Array.from(document.getElementsByClassName('urinal')).forEach(e => {
        e.addEventListener('click', event => {
            const target = event.currentTarget;
            const ord = target.getAttribute("ord");
            console.log('clicked ' + ord);
            if (target.style.border != '1px solid black')
                target.style.border = '1px solid black';
            else
                target.style.border = '1px solid transparent';
        });
    });
});
