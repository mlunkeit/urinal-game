/**
 * Represents an urinal in the game
 * @author Malte Lunkeit
 * @since 1.0.0
 */
class Urinal
{
    /**
     * Used to store the urinals state
     * @author Malte Lunkeit
     * @since 1.0.0
     * @private
     */
    private readonly state: State

    public constructor(state: State)
    {
        this.state = state
    }

    public getState(): State
    {
        return this.state
    }
}

/**
 * Represents the state of the urinal
 * @author Malte Lunkeit
 * @since 1.0.0
 */
enum State
{
    FREE,
    OCCUPIED,
    UNAVAILABLE
}