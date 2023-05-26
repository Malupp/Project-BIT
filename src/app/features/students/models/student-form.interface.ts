import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { GenderOption } from "./gender.type";
import { PetTypeOptions } from "./pet.interface";

export interface StudentForm {
  id: FormControl<string>;
  personal_information: FormGroup<StudentFormPersonalInformation>;
  location: FormGroup<StudentFormLocation>;
  hobbies: FormArray<FormGroup<StudentFormHobby>>;
  knownLanguages: FormArray<FormGroup<StudentFormLanguage>>;
  pets: FormArray<FormGroup<StudentFormPet>>;
  jobExperiences: FormArray<FormGroup<StudentFormJobExperience>>;
}

export interface StudentFormModel {
  id: string;
  personal_information: StudentFormPersonalInformation;
  location: StudentFormLocation;
  hobbies: FormGroup<StudentFormHobby>;
  knownLanguages: FormArray<FormGroup<StudentFormLanguage>>;
  pets: FormArray<FormGroup<StudentFormPet>>;
  jobExperiences: FormArray<FormGroup<StudentFormJobExperience>>;
}

export interface StudentFormPersonalInformation {
  id: FormControl<string>;
  name: FormControl<string>;
  surname: FormControl<string>;
  gender: FormControl<GenderOption>;
  age: FormControl<number>;
}

export interface StudentFormLocation {
  city: FormControl<string>;
  postalCode: FormControl<string>;
  address: FormControl<string>;
  state: FormControl<string>;
  country: FormControl<string>;
}

interface StudentFormBaseEntity {
  name: FormControl<string>;
  icon: FormControl<string>;
}

export type StudentFormHobby = StudentFormBaseEntity;
export type StudentFormLanguage = StudentFormBaseEntity;

export interface StudentFormPet {
  name: FormControl<string>;
  type: FormControl<PetTypeOptions>;
  breed: FormControl<string>;
  gender: FormControl<GenderOption>;
  age: FormControl<number>;
}

export interface StudentFormJobExperience {
  name: FormControl<string>;
  company: FormControl<string>;
  description: FormControl<string>;
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
  tags: FormArray<FormControl<string>>;
}
