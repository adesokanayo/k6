import { faker } from "k6/x/faker";

export const generateUser = () => ({
  firstname: faker.firstName(),
  lastname: faker.lastName(),
  username: faker.username(),
  password: faker.password() + faker.password(),
  title: faker.jobTitle(),
  email: faker.email(),
  usertype: 1,
  date_of_birth: faker.date()
});



