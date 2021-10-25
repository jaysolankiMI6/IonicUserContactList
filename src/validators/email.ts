import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export class EmailValidator {


  static isValidk2(control: FormControl) {
    var startsre = new RegExp(/^\d+/); //starts with digit, one or more
    var m = startsre.exec(control.value);
    if (m) {
      if (m[0] != null) {
        let regExp = /^[0-9]{10}$/;

        if (!regExp.test(control.value)) {
          return { "invalidMobile": true };
        }
        return null;

      }
    } else {
      const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);
      const blank = /^$|^.*@.*\..*$/.test(control.value);
      if (blank) {
        return null;
      }
      return {
        "invalidEmail": true
      };
    }
  }

  static isValid(control: FormControl) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const space = /\s/.test(control.value);
    const blank = /^$|^.*@.*\..*$/.test(control.value);

    // if (blank) {
    //   return null;
    // }
    if (!re.test(control.value)) {
      return {
        "invalidEmail": true
      };
    }
  }

  static isValidemail(control: FormControl) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const space = /\s/.test(control.value);
    const blank = /^$|^.*@.*\..*$/.test(control.value);

    // if (blank) { 
    //   return null;
    // }
    if (!re.test(control.value) && control.value != '') {
      return {
        "invalidEmail": true
      };
    }
  }

  static isValidEmailNotRequired(control: FormControl) {    
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const space = /\s/.test(control.value);
      const blank = /^$|^.*@.*\..*$/.test(control.value);
      // if(/^[\s\d]*$/.test(control.value)){
      //   return false; 
      // }     
      if (!re.test(control.value) && !/^[\s\d]*$/.test(control.value)) {
        return {
          "invalidEmail": true
        };
      }
    }
  


  static isValidMobile(control): any {
    let regExp = /^[0-9]{10}$/;

    if (!regExp.test(control)) {
      return { "invalidMobile": true };
    }
    return null;
  }



  static userNamevalidations(control): any {

    var re = /^[a-za-z0-9-]*$/;
    // const space = /\s/.test(control.value);
    // const blank = /^$|^.*@.*\..*$/.test(control.value);

    if (!re.test(control.value)) {
      return {
        "invalidName": true
      };
    }
  }

  static namevalidations(control): any {

    var re = /^[a-zA-Z_ '\-]+$/;
    // const space = /\s/.test(control.value);
    // const blank = /^$|^.*@.*\..*$/.test(control.value);

    if (!re.test(control.value)) {
      return {
        "invalidName": true
      };
    }
  }

  static isNumber(control): any {
    var re = /^[0-9\s]*$/;    
    if (!re.test(control.value)) {
      return {
        "notNumber": true
      };
    }
  }
  static isMobileNumber(control): any {
    var re = /^[ ()+0-9-]{5,20}$/;       
    // const blank = /^$|^.*@.*\..*$/.test(control.value);
    if(/^[\s\d]*$/.test(control.value)){
      return false; 
    } 
    if (!re.test(control.value)) {
      return {
        "notNumber": true
      };
    }
  }

  


  static requiredOnCondition(control): any {

    var re = /^[a-zA-Z_ '\-]+$/;
    if (!re.test(control.value)) {
      return {
        "invalidName": true
      };
    }
  }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmpassword').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('confirmpassword').setErrors({ MatchPassword: true })
    } else {
      return null
    }
  }

  static mutliLinkValidations(control: FormControl) {
    var regForUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let val = control.value;
    if (val.indexOf(',') > -1) {
      let array = control.value.split(',');
      for (let i = 0; i <= array.length; i++) {
        if (!regForUrl.test(array[i])) {
          // alert('Invalid URL-- missing "http://" or "https://"');
          return { "invalidEmail": true };
        }
      }
    } else {
      if (!regForUrl.test(val)) {
        // alert('Invalid URL-- missing "http://" or "https://"');
        return { "invalidEmail": true };
      }
    }
    return null
  }



  static isValidk(control: FormControl) {
    var intRegx = /[\d\.]/g;
    var mobileRegex = /[0-9 -()+]+$/;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var charRegex = /[a-zA-Z]/;
    const blank = /^$|^.*@.*\..*$/.test(control.value);
    const space = /\s/.test(control.value);

    if (intRegx.test(control.value) == true && charRegex.test(control.value) == false) {
      if ((control.value.length < 5) || (control.value.length > 12) || (!mobileRegex.test(control.value))) {
        return { "invalidMobile": true };
      }
    } else {
      if (re.test(control.value) === false) {
        return { "invalidEmail": true };
      }
    }



    //   var startsre = new RegExp(/^\d+/); //starts with digit, one or more
    //   var m = startsre.exec(control.value);
    //   if (m) {
    //     if (m[0] != null) {
    //       let regExp = /^[0-9]{10}$/;

    //       if (!regExp.test(control.value)) {
    //         return { "invalidMobile": true };
    //       }
    //       return null;

    //     }
    //   } else {
    //     const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);
    //     const blank = /^$|^.*@.*\..*$/.test(control.value);
    //     if (blank) {
    //       return null;
    //     }
    //     return {
    //       "invalidEmail": true
    //     };
    //   }
    // }

  }


} 