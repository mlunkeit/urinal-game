/**
 * Represents an urinal in the game
 * @author Malte Lunkeit
 * @since 1.0.0
 */
export class Urinal
{
    /**
     * Used to store the urinals state
     * @since 1.0.0
     * @private
     */
    private readonly state: State;

    /**
     * Used to store the information whether the urinal is selected by the user or not
     * @since 1.0.0
     * @private
     */
    private selected: boolean = false;

    public constructor(state: State)
    {
        this.state = state;
    }

    /**
     * Returns the state of the urinal
     * @since 1.0.0
     */
    public getState(): State
    {
        return this.state;
    }

    /**
     * Returns if the urinal is currently selected by the user
     * @since 1.0.0
     */
    public isSelected(): boolean
    {
        return this.selected;
    }

    /**
     * Updates the selected status of the urinal
     * @since 1.0.0
     * @param selected Whether the urinal is selected or not
     */
    public setSelected(selected: boolean): void
    {
        this.selected = selected;
    }

    /**
     * Toggles the selected status of the urinal
     * @since 1.0.0
     */
    public toggle(): void
    {
        this.selected = !this.selected;
    }
}

/**
 * Represents the state of the urinal
 * @author Malte Lunkeit
 * @since 1.0.0
 */
export enum State
{
    FREE,
    OCCUPIED,
    UNAVAILABLE
}