/**
 * This class is used to manage the game.
 * @author Malte Lunkeit
 * @since 1.0.0
 */
class Game
{
    private options: GameOptions;

    public constructor(options: GameOptions)
    {
        this.options = options;
    }
}

/**
 * This class is used to define the game options before the game begins
 * @author Malte Lunkeit
 * @since 1.0.0
 */
class GameOptions
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
        if(!this.percentages.has(state))
            throw new Error("The percentage for state " + state + " is unset")
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
        options.setAmount(Math.floor((Math.random() * 5 + 3)))
        return options
    }
}