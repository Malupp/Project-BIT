import { Component, EventEmitter, Output } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { GenderOption } from "src/app/features/students/models/gender.type";

import { StudentFacadeService } from "../../services/student-facade.service";

import { StudentService } from "src/app/features/students/services/student.service";
import { Pet } from "../../models/pet.interface";
import {
  StudentFormHobby,
  StudentFormLanguage,
  StudentFormPet,
  StudentFormJobExperience,
  StudentFormPersonalInformation,
  StudentFormLocation,
} from "../../models/student-form.interface";
import { Student, Hobby, Language, StudentExperience } from "../../models/student.class";

@Component({
  selector: "academy-student-form",
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.scss"],
  providers: [StudentFacadeService],
})
export class StudentFormComponent {
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup<any>;
  students!: Array<Student>;
  index!: number;

  get hobbies(): FormArray<FormGroup<StudentFormHobby>> {
    return this.form.get("hobbies") as FormArray<FormGroup<StudentFormHobby>>;
  }

  get knownLanguages(): FormArray<FormGroup<StudentFormLanguage>> {
    return this.form.get("knownLanguages") as FormArray<FormGroup<StudentFormLanguage>>;
  }

  get pets(): FormArray<FormGroup<StudentFormPet>> {
    return this.form.get("pets") as FormArray<FormGroup<StudentFormPet>>;
  }

  get jobExperiences(): FormArray<FormGroup<StudentFormJobExperience>> {
    return this.form.get("jobExperiences") as FormArray<FormGroup<StudentFormJobExperience>>;
  }

  constructor(private readonly route: ActivatedRoute, private readonly facadeService: StudentFacadeService, private readonly studentService: StudentService) {
    this.students = JSON.parse(localStorage.getItem("students")!);

    this.form = new FormGroup({
      personal_information: new FormGroup<StudentFormPersonalInformation>({
        id: new FormControl<string>("", { nonNullable: true }),
        name: new FormControl<string>("", { nonNullable: true }),
        surname: new FormControl<string>("", { nonNullable: true }),
        age: new FormControl<number>(18, { nonNullable: true }),
        gender: new FormControl<GenderOption>("", { nonNullable: true }),
      }),
      location: new FormGroup<StudentFormLocation>({
        city: new FormControl<string>("", { nonNullable: true }),
        postalCode: new FormControl<string>("", { nonNullable: true }),
        address: new FormControl<string>("", { nonNullable: true }),
        state: new FormControl<string>("", { nonNullable: true }),
        country: new FormControl<string>("", { nonNullable: true }),
      }),
      hobbies: new FormArray([this.facadeService.addHobby()]),
      knownLanguages: new FormArray([this.facadeService.addLanguage()]),
      pets: new FormArray([this.facadeService.addPet()]),
      jobExperiences: new FormArray([this.facadeService.addJobExperience()]),
    });

    this.route.paramMap.subscribe({
      next: (map: ParamMap) => {
        const id = map.get("id")?.toString();
        console.log(id);
        if (this.students.some((s) => s.id === id)) {
          this.form = this.facadeService.getForm(this.students.find((s) => s.id === id));
          this.index = this.students.indexOf(this.students.find((s) => s.id === id)!);
        } else {
          this.form;
        }
      },
    });
  }

  addMoreHobbies(): void {
    this.hobbies.push(this.facadeService.addHobby());
  }

  addMoreLanguages(): void {
    this.knownLanguages.push(this.facadeService.addLanguage());
  }

  addMorePets(): void {
    this.pets.push(this.facadeService.addPet());
  }

  addMoreJobs(): void {
    this.jobExperiences.push(this.facadeService.addJobExperience());
  }

  addMoreTags(experienceControl: FormGroup<StudentFormJobExperience>): void {
    const tags: FormArray<FormControl<string>> = experienceControl.get("tags") as FormArray<FormControl<string>>;
    tags.push(this.facadeService.addJobExperienceTag());
  }

  handleSaveStudent() {
    const newValue: Student = new Student({
      id: this.form.value.personal_information?.id as Required<string>,
      name: this.form.value.personal_information?.name as Required<string>,
      surname: this.form.value.personal_information?.surname as Required<string>,
      gender: this.form.value.personal_information?.gender as Required<GenderOption>,
      age: this.form.value.personal_information?.age as Required<number>,
      location: {
        city: this.form.value.location?.city as Required<string>,
        postalCode: this.form.value.location?.postalCode as Required<string>,
        address: this.form.value.location?.address as Required<string>,
        state: this.form.value.location?.state as Required<string>,
        country: this.form.value.location?.country as Required<string>,
      },
      hobbies: this.form.value.hobbies as Required<Hobby[]>,
      pets: this.form.value.pets as Required<Pet[]>,
      knownLanguages: this.form.value.knownLanguages as Required<Language[]>,
      jobExperiences: this.form.value.jobExperiences as Required<StudentExperience[]>,
    });

    if (newValue.id) {
      this.studentService.putStudents(newValue);
      alert("Sei bravissimo");
    } else {
      this.studentService.postStudents(newValue);
      alert("Sei bravissimo");
    }
  }

  // insertStudente() {
  //   const studenti = JSON.parse(localStorage.getItem('students')!);
  //   studenti.push(this.form.value);
  //   localStorage.setItem('students', JSON.stringify(studenti));
  // }

  removeTag(experienceControl: FormGroup<StudentFormJobExperience>, i: number): void {
    const tags: FormArray<FormControl<string>> = experienceControl.get("tags") as FormArray<FormControl<string>>;
    tags?.removeAt(i);
  }

  removeHobby(i: number): void {
    const hobbiesArray: FormArray = this.form.get("hobbies") as FormArray;
    hobbiesArray?.removeAt(i);
  }

  removeLanguage(i: number): void {
    const languages: FormArray = this.form.get("knownLanguages") as FormArray;
    languages?.removeAt(i);
  }
}
