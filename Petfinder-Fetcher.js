"use strict";

const fetch = require("node-fetch");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var jsonexport = require('jsonexport');
var fs = require('fs');

const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciO2aUY0dSIsImp0aSI6IjM1MTUExMmZiNjkxNWIzMDU2YWNiZDkyMDNhkwMTQ0ZTdmMDZjYTg3MzNiOWMwIiwiaWF0IjoxN_MZdunhGoU6Cby1mA46FYTPwpnyugOL0eLNktQRTBMFPC98oAsQKFU2cutyxnEcxEVXo5HDXpq0bXRypdajbQZJVGL2EVs3EGYP-OJPESscoJPyF0GN3yPHy7glqLB6_zunT-hV8ltRggjSwhn_xXOIdUz0MGEKufGxQV0FKxIQbFpXcnmGsXFbV_EOLxdTo5zqeRSuu-yBUft-SWXz_7Z05Q0y92pJTaepChbp-Bll_lohtmFt8hABC-InAn5JYtghrQrky65NGqK2IhZFLiCi8R2csUMXqHIL3PfFuAaj-AIdGL6Cz024Hlu7HlT1xF9ZiIZqwNsSA"

const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authToken
};

var arrayALL = [];
var count = 0;

const ObjectsToCsv = require('objects-to-csv');

const csvWriter = createCsvWriter({
    path: '/Users/brendanlawlor/Desktop/data-export.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'email', title: 'EMAIL'},
        {id: 'phone', title: 'PHONE'},
        {id: 'addressLine1', title: 'ADDRESS-1'},
        {id: 'addressLine2', title: 'ADDRESS-2'},
        {id: 'city', title: 'CITY'},
        {id: 'state', title: 'STATE'},
        {id: 'zipcode', title: 'ZIPCODE'},
        {id: 'country', title: 'COUNTRY'}
    ]
});

function fetchData() {
  for (var i = 1; i < 150; i++) {
    const URL = ("https://api.petfinder.com/v2/organizations?limit=100&page=" + i);
    fetch(URL, {method: "GET", headers})
        .then(res => res.json())
        .then(json => extractData(json))
        .catch(err => console.log(err));
  }
};

function extractData(json) {
  var keys = Object.keys(json);
  var organizationList = json[keys[0]];

  for (var i = 0; i < organizationList.length; i++) {
    var organizationArray = [];
    var name;
    var email;
    var phone;
    var addressLine1;
    var addressLine2;
    var city;
    var state;
    var zipcode;
    var country;

    try {
      name = organizationList[i]["name"];
    } catch {
      name = null;
    }

    try {
      email = organizationList[i]["email"];
    } catch {
      email = null;
    }

    try {
      phone = organizationList[i]["phone"];
    } catch {
      phone = null;
    }

    try {
      addressLine1 = organizationList[i]["address"]["address1"];
    } catch {
      addressLine1 = null;
    }

    try {
      addressLine2 = organizationList[i]["address"]["address2"];
    } catch {
      addressLine2 = null;
    }

    try {
      city = organizationList[i]["address"]["city"];
    } catch {
      city = null;
    }

    try {
      state = organizationList[i]["address"]["state"];
    } catch {
      state = null;
    }

    try {
      zipcode = organizationList[i]["address"]["postcode"];
    } catch {
      zipcode = null;
    }

    try {
      country = organizationList[i]["address"]["country"];
    } catch {
      country = null;
    }

    var organizationObject = {name: name, email: email, phone: phone, addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, zipcode: zipcode, country: country};
    arrayALL.push(organizationObject);
    count = (count + 1);
    console.log(count);
  }

  csvWriter.writeRecords(arrayALL)
    .then(() => {
        console.log('Data Successfully Saved');
        arrayALL = [];
    });
};

fetchData();
