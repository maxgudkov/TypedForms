import { FormControl, ValidatorFn, Validators } from '@angular/forms';

type TypedControlState = number | string | boolean | { value: string | number | boolean | [] | {} | null, disabled: boolean } | null;

/**
 * @example
 * ['required', ['minLength', 1], 'email', ['pattern', /[0-9]+/'], (control) => null]
 */
export type DefaultValidators = (
  'required'
  | 'requiredTrue'
  | 'email'
  | ['minLength' | 'maxLength' | 'min' | 'max', number]
  | ['pattern', string | RegExp]
  | ['compose', ValidatorFn[]]
  // | [string, (control: AbstractControl) => boolean]
  | ValidatorFn
  )[];


/**
 * @example
 * {
 *   required: 'hello message',
 *   $common: 'common',
 *   custom: 'custom',
 *   minlength: ({requiredLength, actualLength}) => `is ${actualLength}, need ${requiredLength}`
 * }
 *
 * TODO доделать соотвествие названия валидаторов и ключей в объекте ошибок (maxLength <--> maxlength)
 */
type ValidationMessages = { [key in ('required' | 'email' | 'minlength' | 'maxlength' | 'min' | 'max' | 'pattern' | 'compose' | '$common' | string)]?: ((errors) => string) | string };

export type TypedControlConfig = [TypedControlState, DefaultValidators?, ValidationMessages?];

/**
 * @example
 * new TypedControl(
 *   '',
 *   [
 *     'required',
 *     (control) => control.value === 'some value' ? null : {customValidator: true}
 *   ],
 *   {
 *     required: 'message',
 *     customValidator: 'message'
 *   }
 * );
 */
export class TypedControl extends FormControl {

  constructor(
    state: TypedControlState,
    readonly validators?: DefaultValidators,
    readonly validationMessages?: ValidationMessages
  ) {
    super(state);
    if (validators) {
      this.initValidators();
    }
  }

  /**
   * first value of ```errors```
   */
  get error(): string {
    return this._errors && Object.values(this._errors)[0];
  }

  set error(value) { }

  private _errors: { [key: string]: string } = null;

  get errors() {
    return this._errors;
  }

  set errors(value) {
    this._errors = value !== null && this.validationMessages ? this.getValidationMessages(value) : value;
  }

  private getValidationMessages(errors): { [key: string]: string } {
    Object.keys(errors).forEach(key => {
      const message = this.validationMessages[key] || this.validationMessages.$common || '';
      errors[key] = typeof message === 'function' ? message.call(this, { [key]: errors[key] }) : message;
    });
    return errors;
  }

  private initValidators() {
    const validatorsList: ValidatorFn[] = [];
    this.validators.forEach((key: unknown) => {
      if (typeof key === 'string') {
        validatorsList.push(Validators[key]);
      } else if (Array.isArray(key)) {
        validatorsList.push(Validators[key[0]](key[1]));
      } else if (typeof key === 'function') {
        validatorsList.push(key as ValidatorFn);
      }
    });
    this.setValidators(validatorsList);
  }

}
