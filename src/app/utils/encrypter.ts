import * as CryptoJS from 'crypto-js';

export default class Encrypter {
    private secretKey = "mcMREavkBsiA3gYHxHSlOsvAVdNxjM6O";

    constructor() { }

    encrypt(value : string) : string{
      return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
    }
  
    decrypt(textToDecrypt : string){
      return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
    }
}