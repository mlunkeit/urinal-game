/**
 * theme.ts
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

import {Cookie} from "./cookie.js";

/**
 * Represents a theme for the website
 * @since 1.0.0
 * @author Malte Lunkeit
 */
export class Theme
{
    /**
     * The name of the theme
     * @private
     * @since 1.0.0
     */
    private readonly name: string

    /**
     * Constructor for the theme class
     * @param name The name of the theme
     */
    public constructor(name: string)
    {
        this.name = name;
    }

    /**
     * Changes the theme to this theme
     * @since 1.0.0
     */
    public apply()
    {
        document.getElementsByTagName('body')[0].setAttribute('data-bs-theme', this.name)
        document.getElementById('btn-'+this.name+'mode')?.toggleAttribute('checked')
        document.getElementsByTagName('body')[0].setAttribute('data-bs-theme', this.name)
        Cookie.set('theme', this.name)
    }

    /**
     * Getter for the name attribute
     * @return The name of the theme
     * @since 1.0.0
     */
    public getName()
    {
        return this.name
    }

    /**
     * Returns the theme that should be active now
     * @return A theme object
     * @since 1.0.0
     */
    static getCurrent(): Theme
    {
        return new Theme(Cookie.get('theme') ?? 'light')
    }

    /**
     * Registers the theme event listeners automatically
     */
    static init()
    {
        const theme = Theme.getCurrent()
        theme.apply()

        document.getElementById('btn-darkmode')!.addEventListener('click', () => {
            new Theme('dark').apply()
        })

        document.getElementById('btn-lightmode')!.addEventListener('click', () => {
            new Theme('light').apply()
        })
    }
}