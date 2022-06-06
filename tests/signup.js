import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { generateUser } from '../generator/user.js';
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';



const baseURL = "https://carestationrest.herokuapp.com/api/v1/"

export const options = {
  vus: 1,
  duration: '1s',
};


export default function (data) {

  const user = generateUser()
  user.date_of_birth = '1990-01-01'

  const signupParam = JSON.stringify(user)
 console.log(signupParam)
  const signupURL = baseURL + 'users'

  const res = http.post(signupURL, signupParam);
  console.log(res.status)
  expect(res.status, 'response status').to.equal(200);
  expect(res).to.have.validJsonBody();

}


export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
