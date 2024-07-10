/**
 * urinal.ts
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