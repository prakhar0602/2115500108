const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let a = [];

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
    let res1 = await axios.post('http://20.244.56.144/test/auth',{
      "companyName": "Afford Medical",
      "clientID": "14d4cd03-c18f-4337-9671-cfbb01768f30",
      "clientSecret": "YeaZCnTUjdHSHCJa",
      "ownerName": "Prakhar Gupta",
      "ownerEmail": "prakhar.gupta_cs.aiml21@gla.ac.in",
      "rollNo": "2115500108"
    })
    let token = res1.data.access_token
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
      z=response.data;
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
        zz.push(response.data);
      }
      for (let i of zz) {
        for (let pro of i) {
          z.push(pro);
        }
      }
      zz = [];
    }
   
    if (parameter && method) z = sort(z, parameter, method);
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
      zz = zz[p];
    } else {
      for (let pro of z) {
        pro.id = uuidv4();
        zz.push(pro);
      }
    }
    a = zz;
    res.json(zz);
  } catch (e) {
    console.log(e.message);
    res.json({ msg: "Error" });
  }
});

router.get(
  "/categories/:categoryname/products/:productid",
  async (req, res) => {
    const { categoryname, productid } = req.params;
    let x = a.filter((s) => s.id == productid);
    x = x[0];
    res.json(x);
  }
);

module.exports = router;
