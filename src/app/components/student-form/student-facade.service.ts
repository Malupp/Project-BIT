import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenderOption } from 'src/app/models/gender.type';
import { Pet, PetTypeOptions } from 'src/app/models/pet.interface';
import {
  StudentForm,
  StudentFormHobby,
  StudentFormJobExperience,
  StudentFormLanguage,
  StudentFormLocation,
  StudentFormPersonalInformation,
  StudentFormPet,
} from 'src/app/models/student-form.interface';
import {
  Hobby,
  Language,
  Student,
  StudentExperience,
} from 'src/app/models/student.class';

@Injectable()
export class StudentFacadeService {
  getForm(student?: Student): FormGroup<StudentForm> {
    return new FormGroup({
      id: new FormControl<string>(student?.id ?? '', {
        nonNullable: true,
      }),
      personal_information: new FormGroup<StudentFormPersonalInformation>({
        name: new FormControl<string>(student?.name ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        surname: new FormControl<string>(student?.surname ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        age: new FormControl<number>(student?.age ?? 18, {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.min(18),
            Validators.max(70),
          ],
        }),
        gender: new FormControl<GenderOption>(student?.gender ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
      location: new FormGroup<StudentFormLocation>({
        city: new FormControl<string>(student?.location?.city ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        postalCode: new FormControl<string>(
          student?.location?.postalCode ?? '',
          { nonNullable: true, validators: [Validators.required] }
        ),
        address: new FormControl<string>(student?.location?.address ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        state: new FormControl<string>(student?.location?.state ?? '', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(2)],
        }),
        country: new FormControl<string>(student?.location?.country ?? '', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(3)],
        }),
      }),
      hobbies: new FormArray(
        student?.hobbies.length
          ? student?.hobbies.map((hobby) => this.addHobby(hobby))
          : [this.addHobby()]
      ),
      knownLanguages: new FormArray(
        student?.knownLanguages.length
          ? student?.knownLanguages.map((language) => this.addHobby(language))
          : [this.addLanguage()]
      ),
      pets: new FormArray(
        student?.pets.length
          ? student?.pets.map((pet) => this.addPet(pet))
          : [this.addPet()]
      ),
      jobExperiences: new FormArray(
        student?.jobExperiences.length
          ? student?.jobExperiences.map((jobExperience) =>
              this.addJobExperience(jobExperience)
            )
          : [this.addJobExperience()]
      ),
    });
  }

  addHobby(hobby?: Hobby): FormGroup<StudentFormHobby> {
    return new FormGroup<StudentFormHobby>({
      name: new FormControl<string>(hobby?.name ?? '', { nonNullable: true }),
      icon: new FormControl<string>(hobby?.icon ?? '', { nonNullable: true }),
    });
  }

  addLanguage(language?: Language): FormGroup<StudentFormLanguage> {
    return new FormGroup<StudentFormLanguage>({
      name: new FormControl<string>(language?.name ?? '', {
        nonNullable: true,
      }),
      icon: new FormControl<string>(language?.icon ?? '', {
        nonNullable: true,
      }),
    });
  }

  addPet(pet?: Pet): FormGroup<StudentFormPet> {
    return new FormGroup<StudentFormPet>({
      name: new FormControl<string>(pet?.name ?? '', { nonNullable: true }),
      type: new FormControl<PetTypeOptions>(pet?.type ?? '', {
        nonNullable: true,
      }),
      breed: new FormControl<string>(pet?.breed ?? '', { nonNullable: true }),
      gender: new FormControl<GenderOption>(pet?.gender ?? '', {
        nonNullable: true,
      }),
      age: new FormControl<number>(pet?.age ?? 0, { nonNullable: true }),
    });
  }

  addJobExperience(
    jobExperience?: StudentExperience
  ): FormGroup<StudentFormJobExperience> {
    return new FormGroup<StudentFormJobExperience>({
      name: new FormControl<string>(jobExperience?.name ?? '', {
        nonNullable: true,
      }),
      company: new FormControl<string>(jobExperience?.company ?? '', {
        nonNullable: true,
      }),
      description: new FormControl<string>(jobExperience?.description ?? '', {
        nonNullable: true,
      }),
      startDate: new FormControl<Date>(jobExperience?.startDate ?? new Date(), {
        nonNullable: true,
      }),
      endDate: new FormControl<Date>(jobExperience?.endDate ?? new Date(), {
        nonNullable: true,
      }),
      tags: new FormArray(
        jobExperience?.tags?.length
          ? jobExperience?.tags.map((tag) => this.addJobExperienceTag(tag))
          : [this.addJobExperienceTag()]
      ),
    });
  }

  addJobExperienceTag(tag?: string): FormControl<string> {
    return new FormControl<string>(tag ?? '', { nonNullable: true });
  }

  //   studentFormModelToDataModel(formValue: Partial<StudentFormModel>): Student {
  //     const {id, personal_information, location, hobbies, knownLanguages, pets, jobExperiences} = formValue;

  //     const student = new Student({
  //         id,
  //         ...personal_information,
  //       });
  //       if (location){
  //         student.location = location as Required<Location>;
  //       }

  //       if {hobbies?.length}{
  //         student.hobbies = hobbies as Array<Hobby>
  //       }

  //       if (knownLanguages?.length) {
  //         student.knownLanguages = knownLanguages as Array<Language>;
  //       }
  //       if (pets?.length) {
  //         student.pets = pets as Array<Pet>;
  //       }

  //       if (jobExperiences?.length) {
  //         student.jobExperiences = jobExperiences as Array<StudentExperience>;
  //       }

  //       return student;
  //   }
}
