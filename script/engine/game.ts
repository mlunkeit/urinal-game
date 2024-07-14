/**
 * game.ts
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

import {State, Urinal} from './urinal.js'
import {PseudoRandom} from "../utils/random.js";

/**
 * This class is used to manage the game.
 * @author Malte Lunkeit
 * @since 1.0.0
 */
export class Game
{
    private readonly urinals: Urinal[]

    public constructor(options: GameOptions)
    {
        this.urinals = new Array(options.getAmount())

        for(let i = 0; i < options.getAmount(); i++)
            this.urinals[i] = new Urinal(options.getState(i))
    }

    /**
     * Returns an array of all urinals
     * @return Urinal array
     * @since 1.0.0
     */
    public getUrinals(): Urinal[]
    {
        return this.urinals
    }

    /**
     * Calculates the value of a urinal
     * The higher the value the worse the position
     * @param ord The position of the urinal
     * @private
     * @since 1.0.0
     */
    private calculateValue(ord: number): number
    {
        let value = 0

        if(ord > 0)
        {
            if(this.urinals[ord - 1].getState() == State.OCCUPIED)
                value += 2
        }
        else
            value--

        if(ord + 1 < this.urinals.length)
        {
            if (this.urinals[ord + 1].getState() == State.OCCUPIED)
                value += 2
        }
        else
            value--

        return value
    }

    public validate(ord: number): boolean
    {
        const urinal = this.urinals[ord]

        if(urinal.getState() != State.FREE)
            throw new Error('Urinal needs to have the state FREE to be validated!')

        let lowestValue = 256

        Array.from(Array(this.urinals.length).keys()).forEach((index) => {
            const value = this.calculateValue(index)
            const urinal = this.urinals[index]
            if(value < lowestValue && urinal.getState() == State.FREE)
                lowestValue = value
        })

        let value = this.calculateValue(ord)
        return value <= lowestValue
    }
}

/**
 * This class is used to define the game options before the game begins
 * @author Malte Lunkeit
 * @since 1.0.0
 */
export class GameOptions
{
    /**
     * The amount of urinals
     * @private
     * @since 1.0.0
     */
    private readonly amount: number

    private readonly states: State[]

    public constructor(amount: number, states: State[])
    {
        this.amount = amount
        this.states = states
    }

    public getAmount(): number
    {
        return this.amount
    }

    public getState(n: number): State
    {
        return this.states[n]
    }

    /**
     * Creates randomized game options
     * @return The game options object
     * @since 1.0.0
     */
    static randomize(seed: number = 0): GameOptions
    {
        if(seed == 0)
            seed = new Date().getUTCMilliseconds()

        const random = new PseudoRandom(seed)
        const amount = random.random(4, 9)

        const states: State[] = []

        for(let i = 0; i < amount; ++i)
        {
            const state = random.random(0, 3)
            states.push(state)
        }

        while(states.filter(s => s == State.OCCUPIED).length < (amount / 3))
        {
            const index = random.random(0, amount)
            states[index] = State.OCCUPIED
        }

        while(states.filter(s => s == State.FREE).length < 2)
        {
            const index = random.random(0, amount)
            states[index] = State.FREE
        }

        return new GameOptions(amount, states)
    }
}