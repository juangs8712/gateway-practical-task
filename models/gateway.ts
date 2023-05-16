import { Schema, model } from 'mongoose'

// -----------------------------------------------------
export const GatewaySchema = new Schema({
    name:  { 
        type: String, 
        required: [ true, 'The name is required' ] 
    },
    ipv4:  { 
        type: String, 
        required: [ true, 'The IPv4 address is required' ] 
    },
    state: { 
        type: Boolean, 
        default: true 
    },
});

// -----------------------------------------------------
GatewaySchema.methods.toJSON = function (){
    const { __v, ...gateway } = this.toObject();
    return gateway;
} 
// -----------------------------------------------------

export default model( 'Gateway', GatewaySchema );