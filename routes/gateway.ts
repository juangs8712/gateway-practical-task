import { Router } from 'express';
import { check } from 'express-validator';

import { 
    deleteGateway,
    getGatewayById,
    getGateways,
    postGateway,
    putGateway
} from '../controllers/index.js';

import{
    validateFields
} from '../middlewares/index.js';

import {
    existsGatewayById, 
    existsGatewayByName,
    isValidIP
} from '../helpers/index.js'

// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------
// Get all gateways
router.get( '/', getGateways );

// -----------------------------------------------------
// Get a gateway by its ID
router.get( '/:id', [ 
        check( 'id', "ID is not a valid MongoID").isMongoId(),
        check( 'id' ).custom( existsGatewayById ), 
        validateFields
    ], getGatewayById
);

// -----------------------------------------------------
/**
 * Insert a new Gateway.
 * 
 * NOTE *1: Eventually it's required a valid token for this action.
 * But it's ignore in this case, because the user authentication 
 * is not implemented in this API.
 */
router.post('/', [
        check( 'name', 'The name is required.' ).notEmpty(),
        check( 'ipv4', 'The IPv4 address is required.' ).notEmpty(),
        check( 'name' ).custom( existsGatewayByName ),
        check( 'ipv4' ).custom( isValidIP ),
        validateFields,
    ], postGateway
); 

// -----------------------------------------------------
/**
 * Update a gateway.
 * 
 * NOTE: Same as *1.
 */
router.put('/:id', [
        check( 'id', `It's not a valid MongoID` ).isMongoId(),
        check( 'id' ).custom( existsGatewayById ), 
        validateFields,
    ], putGateway 
);

// -----------------------------------------------------
/**
 * Delete a gateway.
 * 
 * NOTE: This action sometime is execute only by admins.
 * Same as *1.
 */
router.delete('/:id', 
    [
        check( 'id', `It's not a valid MongoID` ).isMongoId(),
        check( 'id' ).custom( existsGatewayById ), 
        validateFields
    ], deleteGateway
);
// -----------------------------------------------------
export default router;