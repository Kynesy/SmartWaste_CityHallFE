import { jwtDecode } from "jwt-decode";

export default class JwtDecoder {
    constructor() { }

    decodeJwt(token: string){
        return jwtDecode(token);
    }
}