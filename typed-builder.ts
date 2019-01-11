import { AbstractControlOptions, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TypedControl, TypedControlConfig } from './typed-control';

@Injectable()
export class TypedBuilder {

  create<T>(controls: { [key in keyof T]: TypedControlConfig }, extra?: AbstractControlOptions): FormGroup {
    const typedControls: { [key: string]: TypedControl } = {};
    Object.keys(controls).map(key => {
      typedControls[key] = this.createTypedControl(controls[key]);
    });
    return new FormGroup(typedControls, extra);
  }

  private createTypedControl(config: TypedControlConfig) {
    return new TypedControl(...config);
  }

}
