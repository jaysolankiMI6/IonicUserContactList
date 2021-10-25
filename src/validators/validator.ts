// Validators
// This file contains all your validators for the formGroups and for inputPrompts.
// Patterns can be tested by using a RegEx validator such as http://www.regexpal.com, https://regex101.com, among others.

import { Validators } from '@angular/forms';

export namespace Validator {
  // Set your validators here, don't forget to import and use them in the appropriate class that uses formGroups.
  // In this example, they are used on LoginPage where a formGroup for email and passwords is used.
  export const emailValidator = ['', [
    Validators.minLength(5),
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$')]
  ];

  export const emailNotReqValidator = ['', [
    Validators.minLength(5),
    Validators.pattern('^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$')]
  ];

  export const passwordValidator = ['', [
    Validators.minLength(5),
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')]
  ];
  export const phoneNumberValidator = ['', [
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.required,
    Validators.pattern('^[7-9][0-9]{9}$')]
  ];
  export const pincodeNumberValidator = ['', [
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.required,
    Validators.pattern('^[0-9]*$')]
  ];
  export const requiredValidator = ['', [
    Validators.required]
  ];

  export const nameValidator = ['', [
    Validators.minLength(1),
    Validators.required]
  ];
  // Set your prompt input validators here, don't forget to import and use them on the AlertController prompt.
  // In this example they are used by home.ts where the user are allowed to change their profile.
  // errorMessages are used by the AlertProvider class and is imported inside AlertProvider.errorMessages which is used by showErrorMessage().
  export const profileNameValidator = {
    minLength: 5,
    lengthError: { title: 'Name Too Short!', subTitle: 'Sorry, but name must be more than 4 characters.' },
    pattern: /^[a-zA-Z0-9\s]*$/g,
    patternError: { title: 'Invalid Name!', subTitle: 'Sorry, but the name you entered contains special characters.' }
  };
  export const profileEmailValidator = {
    pattern: /^[a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,15})$/g,
    patternError: { title: 'Invalid Email Address!', subTitle: 'Sorry, but the email you have entered is invalid.' }
  };
  export const profilePasswordValidator = {
    minLength: 5,
    lengthError: { title: 'Password Too Short!', subTitle: 'Sorry, but password must be more than 4 characters.' },
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/g,
    patternError: { title: 'Invalid Password!', subTitle: 'Sorry, but the password you have entered contains special characters.' }
  };
  // Group Form Validators
  export const groupNameValidator = ['', [Validators.required, Validators.minLength(1)]];
  export const groupDescriptionValidator = ['', [Validators.required, Validators.minLength(1)]];

  
}
