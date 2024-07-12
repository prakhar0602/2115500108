const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

function sort(z, parameter, method) {
  if (method == "ascending") {
    for (let i = 0; i < z.length - 1; i++) {
      for (let j = 0; j < z.length - 1 - i; j++) {
        if (z[j][parameter] > z[j + 1][parameter]) {
          let temp = z[j];
          z[j] = z[j + 1];
          z[j + 1] = temp;
        }
      }
    }
  } else {
    for (let i = 0; i < z.length - 1; i++) {
      for (let j = 0; j < z.length - 1 - i; j++) {
        if (z[j][parameter] < z[j + 1][parameter]) {
          let temp = z[j];
          z[j] = z[j + 1];
          z[j + 1] = temp;
        }
      }
    }
  }
  return z;
}

router.get("/categories/:categoryname/products", async (req, res) => {
  try {
    let { categoryname } = req.params;
    let { n, parameter, method, companyName } = req.query; // n for no of product and parameter for sorting according to different parameters
    let p = undefined;
    if (n > 10) {
      p = req.query.p;
    }
    let token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzgyMTkyLCJpYXQiOjE3MjA3ODE4OTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjE0ZDRjZDAzLWMxOGYtNDMzNy05NjcxLWNmYmIwMTc2OGYzMCIsInN1YiI6InByYWtoYXIuZ3VwdGFfY3MuYWltbDIxQGdsYS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IkFmZm9yZCBNZWRpY2FsIiwiY2xpZW50SUQiOiIxNGQ0Y2QwMy1jMThmLTQzMzctOTY3MS1jZmJiMDE3NjhmMzAiLCJjbGllbnRTZWNyZXQiOiJZZWFaQ25UVWpkSFNIQ0phIiwib3duZXJOYW1lIjoiUHJha2hhciBHdXB0YSIsIm93bmVyRW1haWwiOiJwcmFraGFyLmd1cHRhX2NzLmFpbWwyMUBnbGEuYWMuaW4iLCJyb2xsTm8iOiIyMTE1NTAwMTA4In0.KiO9e3vQwTynKMYZP1ZdJb0qRNj6kVnP3Ip82IQg2QA"
    let z = [];
    let zz = [];
    let companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    if (companyName) {
      let response = await axios.get(
        `http://20.244.56.144/test/companies/${companyName}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=20000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      zz.push(response.data);
    } else {
      for (let y of companyNames) {
        let response = await axios.get(
          `http://20.244.56.144/test/companies/${y}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=20000`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        z.push(response.data);
      }
      for (let i of zz) {
        for (let pro of i) {
          z.push(pro);
        }
      }
      zz = [];
    }
    if (parameter && method) z = sort(z, parameter, method);
    console.log(z);
    if (p) {
      let test = [];
      for (let pro of z) {
        pro.id = uuidv4();
        test.push(pro);
        if (test.length == n) {
          zz.push(test);
          test = [];
        }
      }
      if (test.length > 0) zz.push(test);
    } else {
      for (let pro of z) {
        pro.id = uuidv4();
        zz.push(pro);
      }
    }
    res.json(zz[p]);
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ msg: "Error" });
  }
});

module.exports = router;    