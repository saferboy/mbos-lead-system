import * as localJwt from "./local-swt.service";

const service = localJwt;

const { sign, verify } = service;

export { sign, verify };
