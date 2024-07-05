import {Game, GameOptions} from './engine/game.js';
import {State} from './engine/urinal.js';
import {Cookie} from "./utils/cookie.js";

let game: Game

/**
 * Initializes a new game
 * @since 1.0.0
 */
const newGame = (parent: HTMLElement) => {
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

function configureTheme()
{
    const theme = Cookie.get('theme')

    document.getElementsByTagName('body')[0].setAttribute('data-bs-theme', theme ? theme : 'light')
    document.getElementById('btn-'+theme+'mode')?.toggleAttribute('checked')

    document.getElementById('btn-darkmode')!.addEventListener('click', () => {
        document.getElementsByTagName('body')[0].setAttribute('data-bs-theme', 'dark')
        Cookie.set('theme', 'dark')
    })

    document.getElementById('btn-lightmode')!.addEventListener('click', () => {
        document.getElementsByTagName('body')[0].setAttribute('data-bs-theme', 'light')
        Cookie.set('theme', 'light')
    })
}

function urinalClickEventHandler(event: Event)
{
    const target = event.currentTarget as HTMLElement
    const ord = target.getAttribute('ord') as string
    console.log(ord)

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

    configureTheme()

    newGame(document.querySelector('.urinal-wrapper.focus')!)

    Array.from(document.getElementsByClassName('urinal')).forEach(element => {
        element.addEventListener('click', urinalClickEventHandler)
    })
})