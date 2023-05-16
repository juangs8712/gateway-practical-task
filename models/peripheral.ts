
import { Schema, model, now } from 'mongoose';

// -----------------------------------------------------
export const PeripheralSchema = new Schema({
    uid:     { 
        type: Number, 
        required: [ true, 'The uid is required.' ] 
    },
    vendor:  { 
        type: String, 
        required: [ true, 'The vendor is required.' ] 
    },
    gateway: { 
        type: Schema.Types.ObjectId, 
        ref: 'Gateway', 
        required: [ true, 'The gateway ID is required.'] 
    },
    date:    { 
        type: Date, 
        default: Date.now 
    },
    status:  { 
        type: String, 
        enum: [ 'online', 'offline' ], 
        default: 'online' 
    },
    state:   { 
        type: Boolean, 
        default: true 
    },
});
// -----------------------------------------------------
PeripheralSchema.methods.toJSON = function (){
    const { __v, ...peripheral } = this.toObject();
    return peripheral;
}
// -----------------------------------------------------

export default model( 'Peripheral', PeripheralSchema );
