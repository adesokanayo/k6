import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';


const baseURL = "https://carestationrest.herokuapp.com/api/v1/"

export const options = {
  vus: 1,
  duration: '1s',
};

const headerinfo = {
  headers: {
    'Content-Type': 'application/json'
  },
};

export function setup() {
console.log("setup function started")

const  loginParam = JSON.stringify({
    username: 'demouser',
    password: '12345678'
  })

  const loginURL = baseURL +'login'
  const res = http.post(loginURL , loginParam, headerinfo)

  expect(res.status, 'response status').to.equal(200);
 
  const access_token = res.json().access_token 

  return { token: access_token };
}



export default function (data) {
  console.log(data.token)

  headerinfo.headers.Authorization = 'Bearer ' + data.token

  const getUsersURL = baseURL + 'users'
  const res =  http.get(getUsersURL,headerinfo);
  expect(res.status, 'response status').to.equal(200);
  console.log(res.json())

}


export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}


export function teardown(data) {
  console.log("teardown function started")
}