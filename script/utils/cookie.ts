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
        const expireDate = new Date()
        expireDate.setMonth(expireDate.getMonth() + 1)

        console.log(key + '=' + value + '; expires=' + expireDate.toUTCString() + '')

        document.cookie = key + '=' + value + '; expires=' + expireDate.toUTCString() + ''
    }
}