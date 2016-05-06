/**
 * @ngdoc service
 * @name service.crypt
 */
angular
    .module('service.crypt')
    .service('crypt', crypt);

crypt.$inject = [
    '$rootScope',
];

function crypt() {
    var encrypt = 'SECRET_CRYPT_HASH';

    /**
     * @ngdoc method
     * @name service.crypt#encrypt
     * @methodOf service.crypt
     *
     * @description
     * encrypt a specific String
     *
     * @param  {String} toEncrypt - the string which should be encrypted
     * @return {String} the encrypted string
     */
    this.encrypt = function(toEncrypt) {
        return CryptoJS.AES.encrypt(toEncrypt, encrypt).toString();
    }

    /**
     * @ngdoc method
     * @name service.crypt#decrypt
     * @methodOf service.crypt
     *
     * @description
     * decrypt a specific String
     *
     * @param  {String} encryptedString - the string which should be decrypted
     * @return {String} the decrypted string
     */
    this.decrypt = function(encryptedString) {
        return CryptoJS.AES.decrypt(encryptedString, encrypt).toString(CryptoJS.enc.Utf8);
    }
}