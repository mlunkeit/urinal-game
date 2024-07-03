import { Urinal, State } from './urinal.js'
import {choose, chooseIndexes} from '../utils/random.js'

/**
 * This class is used to manage the game.
 * @author Malte Lunkeit
 * @since 1.0.0
 */
export class Game
{
    private options: GameOptions
    private readonly urinals: Urinal[]

    public constructor(options: GameOptions)
    {
        this.options = options
        this.urinals = new Array(options.getAmount())
        console.log(options.getAmount())

        ;(Object.values(State) as State[]).forEach((value: State) => {
            const percentage = this.options.getPercentage(value)
            const totalAmount = Math.floor((percentage/100) * this.options.getAmount())
            const indexes = chooseIndexes(totalAmount, this.urinals)

            indexes.forEach((index) => {
                this.urinals[index] = new Urinal(value)
            })
        })

        for(let i = 0; i < this.options.getAmount(); i++)
        {
            if(this.urinals[i] == null)
                this.urinals[i] = new Urinal(State.FREE)
        }
    }

    /**
     * Toggles the state of selection of a urinal.
     * If it isn't currently marked as selected, it will be marked as selected
     * If it is currently marked as selected, it will no longer be marked as selected
     * @param ord The number of the urinal
     */
    public toggle(ord: number): void
    {
        this.urinals[ord].toggle()
    }

    public getUrinals(): Urinal[]
    {
        return this.urinals
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
     * Represents the amount of urinals in the game
     * @author Malte Lunkeit
     * @since 1.0.0
     * @private
     */
    private amount: number = 0

    private percentages: Map<State, number> = new Map()

    /**
     * Setter for the amount
     * @author Malte Lunkeit
     * @since 1.0.0
     */
    public setAmount(amount: number)
    {
        this.amount = amount
    }

    /**
     * Getter for the amount
     * @author Malte Lunkeit
     * @since 1.0.0
     */
    public getAmount(): number
    {
        return this.amount
    }

    public setPercentage(state: State, percentage: number)
    {
        this.percentages.set(state, percentage)
    }

    public getPercentage(state: State): number
    {
        //if(!this.percentages.has(state))
        //    throw new Error("The percentage for state " + state + " is unset")
        return this.percentages.get(state) as number
    }

    /**
     * Creates randomized game options
     * @author Malte Lunkeit
     * @since 1.0.0
     * @return The game options object
     */
    static randomize(): GameOptions
    {
        const options = new GameOptions()
        options.setAmount(Math.floor(Math.random() * 5) + 3)

        options.setPercentage(State.FREE, 40)
        options.setPercentage(State.OCCUPIED, 50)
        options.setPercentage(State.UNAVAILABLE, 20)

        return options
    }
}