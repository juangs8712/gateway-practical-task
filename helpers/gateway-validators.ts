import { Gateway } from "../models/index.js";

// -----------------------------------------------------
/**
 * Check the id in Gateway table.
 * 
 * If the gateway not exists, throw an exception.
 */
export const existsGatewayById = async( id : string ) => {
    const gateway = await Gateway.findById( id )
    if ( !gateway ){
        throw new Error( `ID: '${ id }' don't exists in Gateway.` )
    }
}
// -----------------------------------------------------
/**
 * Check the id in Gateway table.
 * 
 * If do not exist, throw an exception
 */
export const existsGatewayByName = async( name : string ) => {
    const gateway = await Gateway.findOne( { name } )

    if ( gateway ){
        throw new Error( `Already exists a gateway named ${ name }.` )
    }
}
// -----------------------------------------------------
export const isValidIP = ( str : String ) => {
    let valid = str.split('.');
    if( valid.length != 4 )
        throw new Error( `The IPv4 address '${ str }' is not valid.` );

    for( let i in valid){
      if(!/^\d+$/g.test(valid[i])
      ||+valid[i]>255
      ||+valid[i]<0
      ||/^[0][0-9]{1,2}/.test(valid[i]))
        throw new Error( `The IPv4 address '${ str }' is not valid.` );;
    }
    return true
}
// -----------------------------------------------------
/**
 * Check if the new name belong to another gateway
 * 
 * @param id The current gateway ID.
 * @param name The new name to update, if it's valid;
 * @returns False if the name belong to another gateway. True otherwise.
 */
export const isValidNameForID = async ( id: String, name : String ) : Promise<Boolean> => {
    const existsName = await Gateway.findOne({ name });
    if ( existsName ) {
        if ( existsName._id.toString() !== id ) {
            return false;
        }
    }
    return true;
}
// -----------------------------------------------------