import { model } from 'mongoose';

import { GatewaySchema    } from './gateway.js';
import { PeripheralSchema } from './peripheral.js';

export const Gateway    = model( 'Gateway',    GatewaySchema );
export const Peripheral = model( 'Peripheral', PeripheralSchema );
export * as Server from './server.js';
