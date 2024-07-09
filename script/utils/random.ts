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