import { check } from "express-validator";
import { Peripheral } from "../models/index.js"

// -----------------------------------------------------
/**
 * Check the id in Peripheral table.
 * 
 * If the peripheral not exists, throw an exception.
 */
export const existsPeripheralById = async( id : string ) => {
    const gategay = await Peripheral.findById( id )

    if ( !gategay ){
        throw new Error( `ID: '${ id }' don't exists in Peripherals.` )
    }
}
// -----------------------------------------------------
const allowedStatus = [ 'online', 'offline' ];
/**
 * Check if the status is valid.
 * @param status a String with the status for been validated.
 * @returns A valid status.
 */
export const validateStatus = ( status: String | undefined ) => {
    const lowerStatus = status?.toLocaleLowerCase() ?? '';
    const isValid = allowedStatus.find( s => s === lowerStatus );
    if ( isValid ) {
        return lowerStatus;
    }
    return allowedStatus[0];
}
// -----------------------------------------------------
export const maxPeripheralByGateway = Number( 10 );
// -----------------------------------------------------
/**
 * Check if there is available space in the gateway for admit
 * another peripheral.
 * 
 * If there is no space for another device, the function
 * throw an Error.
 * 
 * @param gateway Is the gateway ID for check if it is full.
 */
export const canAdmitDevice = async ( gateway: String ) => { 
    const count = await Peripheral.countDocuments({ gateway });
    if( count >= maxPeripheralByGateway ){
        throw new Error( 
            `The gateway '${ gateway }' can't admit more devices.` );
    }
}
// -----------------------------------------------------