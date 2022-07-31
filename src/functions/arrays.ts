
/**
 * 
 * @param elements Array with elements to be randomized
 * @returns Array with randomized elements
 * 
 */
export function RandomizeArray(elements: any[]): any[] {

  const randomize = elements.map(value => ({ value, random: Math.random() }))
    .sort((obj1, obj2) => obj1.random - obj2.random).map(obj => obj.value);

  return randomize;
}