// import { Injectable, } from '@angular/core';
// import { Router } from '@angular/router';
// import * as CryptoJS from 'crypto-js';

// @Injectable()
// export class SecurityService {

//     constructor(private router: Router) { }

//     encrypt(hash: any) {
//         if (hash != null) {
//             const ciphertext = CryptoJS.AES.encrypt(hash + 'AAAAAA', 'pUt51LdhQ05C%2kQ');
//             return ciphertext.toString();
//         }
//     }

//     encryptForUserData(hash: any) {
//         if (hash != null) {
//             const ciphertext = CryptoJS.AES.encrypt(hash, 'pUt51LdhQ05C%2kQ');
//             return ciphertext.toString();
//         }
//     }

//     decrypt(hash: any) {
//         if (hash != null) {
//             const bytes = CryptoJS.AES.decrypt(hash, 'pUt51LdhQ05C%2kQ');
//             const id = bytes.toString(CryptoJS.enc.Utf8).replace('AAAAAA', '');

//             if (Number(id)) return id;
//         }

//         this.router.navigate(['/error']);
//     }

//     decryptSimple(hash: any) {
//         if (hash != null) {
//             const bytes = CryptoJS.AES.decrypt(hash, 'pUt51LdhQ05C%2kQ');
//             const id = bytes.toString(CryptoJS.enc.Utf8).replace('AAAAAA', '');
//             return id;
//         }
//     }
// }