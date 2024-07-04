import {Game, GameOptions} from './engine/game.js';
import {State} from './engine/urinal.js';

let game: Game

const newGame = () => {
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

        document.getElementById('urinal-wrapper')!.appendChild(element)
    })
}

document.addEventListener('DOMContentLoaded', () => {

    newGame()

    Array.from(document.getElementsByClassName('urinal')).forEach(element => {
        element.addEventListener('click', event => {
            const target = event.currentTarget as HTMLElement
            const ord = target.getAttribute('ord') as string
            console.log(ord)

            const urinal = game.getUrinals()[+ord]
            const state = urinal.getState()

            if(state == State.FREE)
            {
                console.log(game.validate(+ord))
            }
            else
            {
                target.classList.add('failure')
                setTimeout(() => target.classList.remove('failure'), 500)
            }
        })
    })
})