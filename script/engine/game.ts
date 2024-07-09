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