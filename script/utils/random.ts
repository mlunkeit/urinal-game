/**
 * Used to choose n random values from an array
 * @param amount The amount of elements that should be chosen
 * @param array The array of elements to choose from
 * @since 1.0.0
 * @author Malte Lunkeit
 */
export const choose = <T>(amount: number, array: T[]): T[] =>
{
    const copy = [...array];
    const chosenElements: T[] = [];

    while (chosenElements.length < amount && copy.length > 0) {
        const size = copy.length;
        const elementIndex = Math.floor(Math.random() * size);
        chosenElements.push(copy[elementIndex]);
        copy.splice(elementIndex, 1);
    }

    return chosenElements;
}

export const chooseIndexes = <T>(amount: number, array: T[]): number[] =>
{
    let indexes: number[] = [];

    for(let i = 0; i < array.length; i++)
    {
        if(array[i] == null)
            indexes.push(i)
    }

    return choose(amount, indexes);
}