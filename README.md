# TypedForms
Typed Forms for Angular


Example TypedControl:
```typescript
new TypedControl(
  '',
  [
    'required',
    (control) => control.value === 'some value' ? null : {customValidator: true}
  ],
  {
    required: 'message',
    customValidator: 'message'
  }
);
```

Example TypedBuilder:
 ```typescript
 tb.create({
   name: [
     {value: '', disabled: false},
     ['required', ['min', 10], ['max', 15], ({value}: TypedControl) => value === 'Jonh' ? {customError: true} : null],
     {required: 'validation_message for require validator', customError: 'for custom error', $common: 'for min & max validators'}
   ]
 });
 ```
