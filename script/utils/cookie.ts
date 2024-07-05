export class Cookie
{
    public static get(key: string): string | undefined
    {
        return document.cookie
            .split('; ')
            .find(e => e.startsWith(key + '='))
            ?.split('=')[1]
    }

    public static set(key: string, value: string): void
    {
        const expireDate = new Date()
        expireDate.setMonth(expireDate.getMonth() + 1)

        console.log(key + '=' + value + '; expires=' + expireDate.toUTCString() + '')

        document.cookie = key + '=' + value + '; expires=' + expireDate.toUTCString() + ''
    }
}