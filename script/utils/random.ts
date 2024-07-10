/**
 * random.ts
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
 * Generates pseudo random numbers using a seed
 * @author Malte Lunkeit
 * @since 1.0.0
 */
export class PseudoRandom
{
    private currentSeed = 0

    public constructor(seed: number)
    {
        this.currentSeed = seed;
    }

    /**
     * Linear congruent generator
     * Generates a new seed based on the current seed
     * @param seed The seed to generate the new seed
     * @private
     * @since 1.0.0
     */
    private lcg(seed: number): number
    {
        const a = 16645251
        const c = 1013904223
        const m = Math.pow(2, 32)

        return (a * seed + c) % m
    }

    /**
     * Generates a random value between two numbers
     * @param min The minimum value (default 0)
     * @param max The maximum value
     * @return A random number between min and max (not including max)
     * @since 1.0.0
     */
    public random(min: number = 0, max: number): number
    {
        const delta = max - min

        if (delta <= 0)
            throw Error("Delta must be greater than 0")

        this.currentSeed = this.lcg(this.currentSeed)

        const a = this.currentSeed % delta

        return a + min
    }
}