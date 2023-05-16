import { Peripheral } from "../models/index.js"

// -----------------------------------------------------
/**
 * Get an UID for peripherals.
 * 
 * @returns A serial uid as a Number.
 */
export const getPeripheralUID = async(): Promise<Number> => {
    try {
        const data = await Peripheral.
            find().
            sort({'uid':-1}).
            limit(1);
        if ( data ) {
            return data[0].uid + 1;
        }   
    } catch (error) {
       return 1; 
    }
    return 1;
}
// -----------------------------------------------------
