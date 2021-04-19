const PASSWORD_MIN_LENGTH = 8;
const specialCharactersString = ` !"#$%&'()*+,-./:;<=>?@[\]^_` + `{|}~`;

export function isValidPassword(password) {
    if(password.length < PASSWORD_MIN_LENGTH)
        return false;
    let uppercaseCheck = false;
    let lowercaseCheck = false;
    let specialCharacterCheck = false;
    for(let i = 0 ; i < password.length && (!uppercaseCheck || !lowercaseCheck || !specialCharacterCheck); i++) {
        console.log(password[i], password[i].toLowerCase(), password[i].toUpperCase(), specialCharactersString.includes(password[i]));
        if(password[i] === password[i].toLowerCase() && !lowercaseCheck)
            lowercaseCheck = true;
        if(password[i] === password[i].toUpperCase() && !uppercaseCheck)
            uppercaseCheck = true;
        if(specialCharactersString.includes(password[i]) && !specialCharacterCheck)
            specialCharacterCheck = true;
    }
    return lowercaseCheck && uppercaseCheck && specialCharacterCheck;
}