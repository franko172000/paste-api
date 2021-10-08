import { 
  IsEmail, 
  IsNumber,
  IsString, 
  Matches, 
  MinLength,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments, } from 'class-validator';
import { Users } from '../entities/users.entity';

/**
 * Passord validation structure
 * 1. The string must contain at least 1 lowercase alphabetical character
 * 2. The string must contain at least 1 uppercase alphabetical character
 * 3. The string must contain at least 1 numeric character
 * 4. The string must contain at least one special character
 * 5. The string must be eight characters or longer
 */
const passwordRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
const pwdMessage =
  'Invalid password. Password must contain atleast 1 special character, \n 1 lowercase alphabetical character, \n 1 uppercase alphabetical character, \n 1 numeric character \n and must be eight characters or longer';

  @ValidatorConstraint({ async: true })
  export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: any, args: ValidationArguments) {
      return Users.count({
        where:{
          email
        }
      }).then(user => {
        if (user > 0) return false;
        return true;
      });
    }
  }
  
  export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserAlreadyExistConstraint,
      });
    };
  }

export class UserRegisterDTO {
  @MinLength(2, {
    message: 'Name is missing ',
  })
  name: string;

  @IsEmail()
  @IsUserAlreadyExist({
    message: "Email already exists"
  })
  email: string;

  @IsNumber()
  age: number;

  @Matches(passwordRegEx, {
    message: pwdMessage,
  })
  password: string;
}

export class UserLoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
