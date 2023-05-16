import { Response, Request } from "express";

import { Peripheral } from "../models/index.js";
import { 
    existsGatewayById, 
    validateStatus, 
    getPeripheralUID,
    canAdmitDevice
} from "../helpers/index.js";

// -----------------------------------------------------
const populateOptions = { 
    path: 'gateway',
    select: '_id name',
    options: { sort: 'name' },
};
// -----------------------------------------------------
// Get a peripheral by ID
export const getPeripheralById = async ( req : Request, res : Response ) => {
    const { id } = req.params; 
    const peripheral = await Peripheral.findById( id )
        .populate( populateOptions );
    res.json({ peripheral })
}
// -----------------------------------------------------
// Get all Peripherals - paginate
export const getPeripherals = async (req : Request, res : Response) => {
    const { limit = 10, skip = 0, state = true } = req.query;
    const query = { state };
    const [ total, peripherals ] = await Promise.all( [
        Peripheral.countDocuments( query ),
        Peripheral.find( query )
            .skip( Number( skip ) )
            .limit( Number( limit ) )
            .populate( populateOptions )
    ] );
    res.json({
        total,
        peripherals
    })
}
// -----------------------------------------------------
// Get all Peripherals - paginate
export const getPeripheralsByGateway = async (req : Request, res : Response) => {
    const { id } = req.params;
    const { limit = 10, skip = 0, state = true } = req.query;
    const query = { gateway: id, state };
    
    const [ total, peripherals ] = await Promise.all( [
        Peripheral.countDocuments( query ),
        Peripheral.find( query )
            .skip( Number( skip ) )
            .limit( Number( limit ) )
            .populate( populateOptions )
    ] );
    res.json({
        total,
        peripherals
    })
}
// -----------------------------------------------------
// Insert a Peripheral
export const postPeripheral = async ( req : Request, res : Response ) => {
    try {
        const { uid, status, date, state, ...rest } = req.body;
        const newUid = await getPeripheralUID();
        const data = {
            ...rest,
            uid: newUid,
            status: validateStatus( status ),
            state: true,
        }
        const newPeripheral = new Peripheral( data );
        const peripheral = await (await newPeripheral.save()).
            populate( populateOptions );

        res.status( 201 ).json({ peripheral });
    } catch ( error : any ) {
        return res.status( 400 ).json({
            msg:  error.toString()
        });
    }
}
// -----------------------------------------------------
// Update a Peripheral
export const putPeripheral = async ( req : Request, res : Response ) => {
    const { id } = req.params;
    const { uid, gateway, date, ...data } = req.body;
    try {
        if ( gateway ) {
            await existsGatewayById( gateway );
            await canAdmitDevice( gateway );
            data.gateway = gateway;
        }
        const peripheral = await Peripheral.
            findByIdAndUpdate( id, data, { new: true } ).
            populate( populateOptions ); 

        res.json({ peripheral });
    } catch (error : any ) {
        return res.status( 400 ).json({
            msg:  error.toString()
        })
    }
}
// -----------------------------------------------------
// Delete a Peripheral
export const deletePeripheral = async (req : Request, res : Response) => {
    const { id } = req.params;
    try {
        // instead of delete, usually the state is changed to false, so the information is reachable if needed.
        const peripheral = await Peripheral.
            findByIdAndUpdate( id, { state: false }, { new: true } ).
            populate( populateOptions );

        // for delete permanently, discomment the next line.
        // const peripheral = await Peripheral.findByIdAndDelete( id );

        res.json({ peripheral })
    } catch (error : any) {
        return res.status( 400 ).json({
            msg:  error.toString()
        })
    }
}
// -----------------------------------------------------

