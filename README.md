# TypedForms
Typed Forms for Angular


Example TypedControl:
```typescript
new TypedControl(
  '',
  [
    'required',
    ['minLength', 3],
    ['maxLength', 7],
    ({value}: TypedControl): ValidationErrors | null => value === 'John Doe' ? null : {customValidatorError: true}
  ],
  {
    required: "It's required",
    minlength: ({actualLength, requiredLength}) => `Required length: ${requiredLength}. Actual length: ${actualLength}`,
    customValidatorError: "You aren't John Doe"
  }
);
```

Example TypedBuilder:
 ```typescript
 constructor(private tb: TypedBuilder) {}
 
 ...
 
 tb.create({
   name: [
     {value: '', disabled: false},
     ['required', ['min', 10], ['max', 15], ({value}: TypedControl) => value === 'Jonh' ? {customError: true} : null],
     {required: 'Validation message for require validator', customError: 'for custom error', $common: 'for min & max validators'}
   ]
 });
 ```
