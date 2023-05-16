import { Router } from 'express';
import { check } from 'express-validator';

import { 
    deletePeripheral,
    getPeripheralById,
    getPeripherals,
    getPeripheralsByGateway,
    postPeripheral,
    putPeripheral,
} from '../controllers/index.js';

import{
    validateFields
} from '../middlewares/index.js';

import {
    canAdmitDevice,
    existsGatewayById,
    existsPeripheralById,
    isValidIP
} from '../helpers/index.js'

// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------
// Get all peripherals
router.get( '/', getPeripherals );

// -----------------------------------------------------
// Get a peripheral by ID
router.get( '/:id', [ 
        check( 'id', "ID is not a valid MongoID").isMongoId(),
        check( 'id' ).custom( existsPeripheralById ), 
        validateFields
    ], getPeripheralById
);

// -----------------------------------------------------
// Get a peripheral by the gateway ID
router.get( '/by-gateway/:id', [ 
        check( 'id', "ID is not a valid MongoID").isMongoId(),
        check( 'id' ).custom( existsGatewayById ), 
        validateFields
    ], getPeripheralsByGateway
);

// -----------------------------------------------------
/**
 * Insert a new Peripheral.
 * 
 * NOTE *1: Eventually it's required a valid token for this action.
 * But it's ignore in this case, because the user authentication 
 * is not implemented in this API.
 */
router.post('/', [
        check( 'vendor', 'The vendor is required.' ).notEmpty(),
        check( 'gateway', 'The gateway ID is required.' ).notEmpty(),
        check( 'gateway', 'Gateway is not a valid MongoID.' ).isMongoId(),
        check( 'gateway' ).custom( existsGatewayById ),
        check( 'gateway' ).custom( canAdmitDevice ),
        validateFields,
    ], postPeripheral
); 

// -----------------------------------------------------
/**
 * Update a peripheral.
 * 
 * NOTE: Same as *1.
 */
router.put('/:id', [ 
        check( 'id', `It's not a valid MongoID` ).isMongoId(),
        check( 'id' ).custom( existsPeripheralById ),
        validateFields,
    ], putPeripheral 
);

// -----------------------------------------------------
/**
 * Delete a peripheral.
 * 
 * NOTE: This action sometime is execute only by admins.
 * Same as *1.
 */
router.delete('/:id', 
    [
        check( 'id', `The ID is not a valid MongoID` ).isMongoId(),
        check( 'id' ).custom( existsPeripheralById ), 
        validateFields
    ], deletePeripheral 
);
// -----------------------------------------------------
export default router;