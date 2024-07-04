import {State, Urinal} from './urinal.js'
import {chooseIndexes} from '../utils/random.js'

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
     * @since 1.0.0
     */
    public toggle(ord: number): void
    {
        this.urinals[ord].toggle()
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
     * Represents the amount of urinals in the game
     * @private
     * @since 1.0.0
     */
    private amount: number = 0

    private percentages: Map<State, number> = new Map()

    /**
     * Setter for the amount
     * @since 1.0.0
     */
    public setAmount(amount: number)
    {
        this.amount = amount
    }

    /**
     * Getter for the amount
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
     * @return The game options object
     * @since 1.0.0
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