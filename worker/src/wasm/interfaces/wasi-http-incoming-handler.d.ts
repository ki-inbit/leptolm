/** @module Interface wasi:http/incoming-handler@0.2.12 **/
export function handle(request: IncomingRequest, responseOut: ResponseOutparam): void;
export type IncomingRequest = import('./wasi-http-types.js').IncomingRequest;
export type ResponseOutparam = import('./wasi-http-types.js').ResponseOutparam;
