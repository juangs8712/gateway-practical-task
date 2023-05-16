import { Response, Request } from "express";

import { Gateway } from "../models/index.js";
import { isValidIP, isValidNameForID } from "../helpers/index.js";

// -----------------------------------------------------
// Get a gateway by ID
export const getGatewayById = async ( req : Request, res : Response ) => {
    const { id } = req.params;
    const gateway = await Gateway.findById( id );
    res.json({ gateway })
}
// -----------------------------------------------------
// Get all gateways - paginate
export const getGateways = async (req : Request, res : Response) => {
    const { limit = 10, skip = 0, state = true } = req.query;
    const query = { state };
    const [ total, gateways ] = await Promise.all( [
        Gateway.countDocuments( query ),
        Gateway.find( query )
            .skip( Number( skip ) )
            .limit( Number( limit ) )
    ] );

    res.json({
        total,
        gateways
    })
}
// -----------------------------------------------------
// Insert Gateways
export const postGateway = async ( req : Request, res : Response ) => {
    const { name, state, ...rest } = req.body;
    const prettyName = name[0].toUpperCase() + name.substring( 1 ).toLowerCase();
    const gatewayByName = await Gateway.findOne( { name: prettyName } );    
    
    // Check if the gateway exists 
    if ( gatewayByName ){
        return res.status( 400 ).json( {
            msg: `The gateway${ prettyName } already exists.`
        } );
    }

    const data = {
        ...rest,
        state: true,
        name: prettyName,
    }
    const newGateway = new Gateway( data );
    await newGateway.save();
    const gateway = await  Gateway.findById( newGateway._id );

    res.status( 201 ).json({ gateway });
}
// -----------------------------------------------------
// Update gateway
export const putGateway = async ( req : Request, res : Response ) => {
    const { id } = req.params;
    const { name, ipv4, ...data } = req.body;
    
    try {
        if ( name ) {
            data.name = name[0].toUpperCase() + name.substring( 1 ).toLowerCase();            
            // check if the name exists in another gateway
            if ( await isValidNameForID( id, data.name ) === false ) {
                return res.status( 400 ).json({
                    msg: `Error: There is another gateway with the name '${ data.name }'.`
                });   
            }
        }
        // isValidIP() will throw an exception if ipv4 is not valid
        if( ipv4 && isValidIP( ipv4 ) ){
            data.ipv4 = ipv4;
        }

        const gateway = await Gateway.findByIdAndUpdate( id, data, { new: true } );
        res.json({ gateway });
    } catch (error : any ) {
        return res.status( 400 ).json({
            msg:  error.toString()
        })
    }
}
// -----------------------------------------------------
// Delete the gateway
export const deleteGateway = async (req : Request, res : Response) => {
    const { id } = req.params;
    // instead of delete, usually the state is changed to false, so the information is reachable if needed.
    const gateway = await Gateway.findByIdAndUpdate( id, { state: false }, { new: true } );

    // for delete permanently, discomment the next line
    // const gateway = await Gateway.findByIdAndDelete( id );

    res.json({ gateway })
}
// -----------------------------------------------------

