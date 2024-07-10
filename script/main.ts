/**
 * main.ts
 *
 * Copyright (C) 2024 Malte Lunkeit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import {Game, GameOptions} from './engine/game.js';
import {State} from './engine/urinal.js';
import {Theme} from "./utils/theme.js";

let game: Game

/**
 * Initializes a new game
 * @param parent The parent element where the game elements should be inserted
 * @since 1.0.0
 */
function newGame(parent: HTMLElement)
{
    game = new Game(GameOptions.randomize())
    const urinals = game.getUrinals()

    let ord = 0

    urinals.forEach(urinal => {
        const element = document.createElement('div')
        element.classList.add('urinal')

        switch(urinal.getState())
        {
            case State.FREE:
                element.classList.add('free')
                break
            case State.OCCUPIED:
                element.classList.add('occupied')
                break
            case State.UNAVAILABLE:
                element.classList.add('unavailable')
                break
        }

        element.setAttribute('ord', String(ord))

        ord++

        const imageDiv = document.createElement('div')
        imageDiv.classList.add('png')
        element.appendChild(imageDiv)

        parent.appendChild(element)
    })
}

function urinalClickEventHandler(event: Event)
{
    const target = event.currentTarget as HTMLElement
    const ord = target.getAttribute('ord') as string

    const urinal = game.getUrinals()[+ord]
    const state = urinal.getState()

    if(state == State.FREE)
    {
        const valid = game.validate(+ord)

        if(valid)
            target.classList.add('success')
        else
            target.classList.add('wrong')

        Array.from(document.getElementsByClassName('urinal'))
            .filter(e => e.getAttribute('ord') != ord)
            .forEach(e => e.replaceWith(e.cloneNode(true)))

        newGame(document.querySelector('.urinal-wrapper.right')!)

        setTimeout(() => {
            document.querySelector('.urinal-wrapper.right')!.classList.replace('right', 'focus')
            document.querySelector('.urinal-wrapper.focus')!.classList.replace('focus', 'left')

            const newRight = document.createElement('div')
            newRight.classList.add('urinal-wrapper')
            newRight.classList.add('right')

            document.querySelector('main')?.appendChild(newRight)

            Array.from(document.getElementsByClassName('urinal')).forEach(element => {
                element.addEventListener('click', urinalClickEventHandler)
            })

            setTimeout(() => {
                document.querySelectorAll('.urinal-wrapper.left').forEach(e => e.remove())
            }, 300)
        }, 1000)
    }
    else
    {
        target.classList.add('failure')
        setTimeout(() => target.classList.remove('failure'), 500)
    }
}

document.addEventListener('DOMContentLoaded', () => {

    Theme.init()

    newGame(document.querySelector('.urinal-wrapper.focus')!)

    Array.from(document.getElementsByClassName('urinal')).forEach(element => {
        element.addEventListener('click', urinalClickEventHandler)
    })

    document.querySelector('footer a')?.addEventListener('click', () => {
        document.querySelector('#imprint')?.classList.toggle('active')
    })

    document.querySelector('.close-btn')?.addEventListener('click', () => {
        document.querySelector('#imprint')?.classList.toggle('active')
    })
})