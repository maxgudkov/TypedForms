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
   name: {'', ['required', ['min', 10], ['max', 15]], {required: 'validation_message for require validator', $common: 'for min & max validators'}}
 });
 ```
