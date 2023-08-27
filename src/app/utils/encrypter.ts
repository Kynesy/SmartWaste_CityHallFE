import * as CryptoJS from 'crypto-js';

export default class Encrypter {
    private symmetricSecretKey = "mcMREavkBsiA3gYHxHSlOsvAVdNxjM6O";
    private secretKeyword = "TANGO";

    constructor() { }

    encrypt(word: string){
      var key = CryptoJS.enc.Base64.parse(this.symmetricSecretKey);
      var srcs = CryptoJS.enc.Utf8.parse(this.secretKeyword + word);
      var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
      return encrypted.toString();
  }
   
  /**
     * Decrypt
   * @param word
   * @returns {*}
   */
  decrypt(word: string){
      var key = CryptoJS.enc.Base64.parse(this.symmetricSecretKey);
      var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}