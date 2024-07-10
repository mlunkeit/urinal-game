/**
 * cookie.ts
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
 * A class to set and read the document cookie
 * @since 1.0.0
 * @author Malte Lunkeit
 */
export class Cookie
{
    /**
     * Read a property from the cookie
     * @param key The property key
     * @return A string value, containing the property content if the property is set and undefined if the key doesn't exist
     * @since 1.0.0
     */
    public static get(key: string): string | undefined
    {
        return document.cookie
            .split('; ')
            .find(e => e.startsWith(key + '='))
            ?.split('=')[1]
    }

    /**
     * Sets a property in the document cookie
     * If the property doesn't exist yet, this method adds it to the cookie
     * @param key The property key
     * @param value The property value
     * @since 1.0.0
     */
    public static set(key: string, value: string): void
    {
        document.cookie = key + '=; Max-Age=-99999999; path=/';

        const expireDate = new Date()
        expireDate.setMonth(expireDate.getMonth() + 1)

        document.cookie = key + '=' + value + '; expires=' + expireDate.toUTCString() + '; path=/'
    }
}