# **Routes For Home Page**

## For Receiver

---

- will not be shown for receiver

## For Lender

---

- **[Check if user is verified](..\controller\authController.js)** - Basically returns if user has both NID and Collateral Present. Check if both values are true, otherwise show the button and redirect accordingly <br><br>

* **GET** : &nbsp; `{{URL}}/api/auth/6076cfa408541e2ba057e335`

  - ```x
         {
             "status": "OK",
             "data": {
                 "hiddenDetails": false,
                 "collateral": false
             },
             "message": "User has filled out the form"
         }
    ```

* **GET** : &nbsp; `{{URL}}/api/loans?type=loan&sort=review`
  - ```x
      [
          {
              Status: 'Pending',
              typeOfLoan: 'Loan',
              contracts: [ {
                  amount: 500
                  collectedAmount: 0
                  defaults: 0
                  installmentDates: ["2021-08-04T13:23:49.954Z"]
                  installments: 1
                  interestRate: 8
                  lenderId: "6076cfa408541e2ba057e336"
                  loanId: "60a2288f788f921b543cd8cc"
                  receiverId: "6076cfa408541e2ba057e333"
                  status: "Pending"
                  __v: 0
                  _id: "60a2288f788f921b543cd813"
              } ],
              _id: 60a2288f788f921b543cd8cc,
              collectedAmount: 0,
              Receiver: {
              usertype: 'Receiver',
              _id: 6076cfa408541e2ba057e333,
              username: 'Shwarup',
              password: '$2a$10$/AwJc5e.g.S0ixUwfXzHJeF4j/zpjn9M0EbgnF/xbGAOXC/bHf.Te',
              email: 'shwarup101@gmail.com',
              nid: '$2a$10$BXPRS5/8LzY9vLLPSuNun.PHJXMuo3kPNuFX4.pTZI4uw1y0/LUcW',
              bkash: '01961145453',
              dob: 1999-02-10T00:00:00.000Z,
              collateral: 'https://youtu.be/fKNdoxRld34',
              verfiedStatus: false,
              __v: 0
              },
              Amount: 1300,
              Details: 'I need Loan!!',
              issueDate: '5/6/2021',
              __v: 0
          },
          {
              Status: 'Pending',
              typeOfLoan: 'Loan',
              contracts: [],
              _id: 60a2288f788f921b543cd8cd,
              collectedAmount: 0,
              Receiver: {
              usertype: 'Receiver',
              _id: 6076cfa408541e2ba057e334,
              username: 'Syed',
              password: '$2a$10$fuBEkz2em3Pv4WPiNtk6ReR/Mwv2h4rbTTk/mPXPXJK6HgBHczYWm',
              email: 'syed110@gmail.com',
              nid: '$2a$10$9rYI.4qU/M4gLV1mIpYFXu3nBTyMnjmOFIkEtz6hZ8YSJysBCiudi',
              bkash: '01961145454',
              dob: 1997-05-10T00:00:00.000Z,
              collateral: 'https://youtu.be/fKNdoxRld34',
              verfiedStatus: true,
              __v: 0
              },
              Amount: 1600,
              Details: 'Clear!!',
              issueDate: '5/6/2021',
              __v: 0
          }
      ]
    ```

# **Routes For User Profiles**

## Lender Dashboard

---

- **[Find User's Hidden Details](..\controller\userController.js)** - Basically gives the hidden details about a user<br><br>

  - **GET** : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335`

    - ```x
        {
            "data": {
                "usertype": "Receiver",
                "_id": "6076cfa408541e2ba057e335",
                "username": "Shoummo",
                "password": "$2a$10$kWGdqy62nFIV07gtUxcIO.yvOGaIYEFzLG6fqOlZJS1btF1wLvBuq",
                "email": "shoummo66@gmail.com",
                "nid": "$2a$10$.lH2qDsusb2oZWiD4pjhWOAsQ6PFdYRQhV4s5PRGstiNDokd.1XjK",
                "bkash": "01961145455",
                "dob": "1997-01-10T00:00:00.000Z",
                "joinedDate": "2021-07-05T20:24:21.347+00:00"
                "__v": 0
            },
            "status": "OK",
            "message": "User found in the database"
        }
      ```

---

- **[Show User's Site History](..\controller\userController.js)** - Shows Currently lending section & Site history section <br><br>

  - **GET** : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335/history`

    - ```x
        {
            "data": {
                "completedContractCount": 0,
                "maxAmountLent": 1000,
                "nextInstallmentDate": "2021-08-05T16:25:47.606Z",
                "nextInstallmentAmount": 66.66666666666667,
                "currentlyActiveContacts": [
                    {
                        "contractId": "60a2288f788f921b543cd811",
                        "receiverId": "6076cfa408541e2ba057e331",
                        "receiverName": "Anik",
                        "amount": 200,
                        "collectedAmount": 0,
                        "nextInstallmentAmount": 66.66666666666667,
                        "nextInstallmentDate": "2021-08-05T16:25:47.606Z",
                        "interestRate": 5,
                        "contractDefaults": 0,
                        "installmentsCompleted": 0
                    },
                    {
                        "contractId": "60a2288f788f921b543cd814",
                        "receiverId": "6076cfa408541e2ba057e333",
                        "receiverName": "Shwarup",
                        "amount": 1000,
                        "collectedAmount": 0,
                        "nextInstallmentAmount": 500,
                        "nextInstallmentDate": "2021-08-05T16:25:47.612Z",
                        "interestRate": 8,
                        "contractDefaults": 0,
                        "installmentsCompleted": 0
                    }
                ]
            },
            "status": "OK",
            "message": "User history of contracts has been found."
        }
      ```

  - **PUT** :&nbsp; `{{URL}}/api/contract`

    - ```x
        req.body

        {
            "contractId": "60a2288f788f921b543cd812",
            "issuerId": "6076cfa408541e2ba057e336"
        }
      ```

    - returns nothing important <br><br>

  - **POST** : &nbsp; `{{URL}}/api/report`
    - not yet implemented

---

## Receiver Dashboard

---

- **[Find User's Hidden Details](..\controller\userController.js)** - Basically gives the hidden details about a user<br><br>

  - **GET** : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335`

    - ```x
        {
            "data": {
                "usertype": "Receiver",
                "_id": "6076cfa408541e2ba057e335",
                "username": "Shoummo",
                "password": "$2a$10$kWGdqy62nFIV07gtUxcIO.yvOGaIYEFzLG6fqOlZJS1btF1wLvBuq",
                "email": "shoummo66@gmail.com",
                "nid": "$2a$10$.lH2qDsusb2oZWiD4pjhWOAsQ6PFdYRQhV4s5PRGstiNDokd.1XjK",
                "bkash": "01961145455",
                "dob": "1997-01-10T00:00:00.000Z",
                "__v": 0
            },
            "status": "OK",
            "message": "User found in the database"
        }
      ```

---

- **[Check If Loan request can be made](..\controller\userController.js)** - Checks if user can make a loan request<br><br>
  - **GET** : &nbsp; `{{URL}}/api/user/loanverify`
    - If request can be made
    ```x
        {
            "data": true,
            "status": "OK",
            "message": "Loan request can be made"
        }
    ```

---

- **[Fetch Pending Loan For User](..\controller\loanController.js)** - Fetches the pending loan for the user. Can be only one at a time<br><br>
  - **GET** : &nbsp; `{{URL}}/api/loans/user/:userId`
    - ```x
        {
            "data": {
                "leftAmount": 10000,
                "totalAmount": 10000,
                "interestRate": 8,
                "nextInstallment": "No Contract Signed Yet",
                "expirationDate": "2021-10-03T18:00:00.000Z",
                "progress": 0,
                "currentLenders": 0,
                "totalRequest": 0
            },
            "status": "OK",
            "message": "Found pending loan in the database"
        }
      ```

---

- **[Post A Loan Request](..\controller\loanController.js)** - Posts a loan only if the user is of receiver type + has no active request + all previous contracts are resolved<br><br>
  - **POST** : &nbsp; `{{URL}}/api/loans`
    - ```x
        {
            "data": {
                "Status": "Pending",
                "collectedAmount": 0,
                "typeOfLoan": "Loan",
                "contracts": [],
                "_id": "60e362a87b6f321aac993aba",
                "Receiver": "6076cfa408541e2ba057e339",
                "Amount": 10000,
                "Details": "Hey There! I would like loans.",
                "issueDate": "6/6/2021",
                "__v": 0
            },
            "status": "OK",
            "message": "Loan has been created in the database"
        }
      ```

---

- **[History For the Receiver](..\controller\userController.js)** - Posts a loan only if the user is of receiver type + has no active request + all previous contracts are resolved<br><br>

  - **GET** : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e339/history`

    - ```x
        {
            "data": {
                "loanRequests": 1,
                "totalContracts": 0,
                "defaults": 0,
                "review": 5
            },
            "status": "OK",
            "message": "All loans for this user have been fetched from the database"
        }
      ```

---

- **[Contract Requests/Offers for a loan request](..\controller\loanController.js)** - Fetches offers for a loan request by loan id.<br><br>

  - **GET** : &nbsp; `{{URL}}/api/loans/request/:loanId`

    - ```x
        {
            "data": [
                {
                    "contractId": "60a2288f788f921b543cd814",
                    "lenderId": "6076cfa408541e2ba057e337",
                    "lenderName": "Akid",
                    "totalAmount": 1000,
                    "expirationDate": "2021-09-04T16:25:47.612Z",
                    "installments": 2,
                    "interestRate": 8
                },
                {
                    "contractId": "60a2288f788f921b543cd813",
                    "lenderId": "6076cfa408541e2ba057e336",
                    "lenderName": "Rafid",
                    "totalAmount": 500,
                    "expirationDate": "2021-08-05T16:25:47.612Z",
                    "installments": 1,
                    "interestRate": 8
                }
            ],
            "status": "OK",
            "message": "All offers for this loan request have been fetched"
        }
      ```

---

- **[Current Lenders for a loan request](..\controller\loanController.js)** - Fetches current lenders for a loan request by loan id.<br><br>

  - **GET** : &nbsp; `{{URL}}/api/loans/lenders/:loanId`

    - ```x
        {
            "data": [
                {
                    "contractId": "60a2288f788f921b543cd812",
                    "lenderId": "6076cfa408541e2ba057e336",
                    "lenderName": "Rafid",
                    "totalAmount": 500,
                    "collectedAmount": 0,
                    "nextInstallmentDate": "2021-08-05T16:25:47.611Z",
                    "installmentAmount": 250,
                    "installments": 2,
                    "installmentsCompleted": 0,
                    "interestRate": 5,
                    "myDefaults": 0
                },
                {
                    "contractId": "60a2288f788f921b543cd811",
                    "lenderId": "6076cfa408541e2ba057e337",
                    "lenderName": "Akid",
                    "totalAmount": 200,
                    "collectedAmount": 0,
                    "nextInstallmentDate": "2021-08-05T16:25:47.606Z",
                    "installmentAmount": 66.66666666666667,
                    "installments": 3,
                    "installmentsCompleted": 0,
                    "interestRate": 5,
                    "myDefaults": 0
                }
            ],
            "status": "OK",
            "message": "All offers for this loan request have been fetched"
        }
      ```

---

## Lender Views Receiver Dashboard

- **[History For the Receiver](..\controller\userController.js)** - Posts a loan only if the user is of receiver type + has no active request + all previous contracts are resolved<br><br>

  - **GET** : &nbsp; `{{URL}}/api/user/:receiverId/history`

    - ```x
        {
            "data": {
                "loanRequests": 1,
                "totalContracts": 0,
                "defaults": 0,
                "review": 5
            },
            "status": "OK",
            "message": "All loans for this user have been fetched from the database"
        }
      ```

---


- **[Fetch Pending Loan For User](..\controller\loanController.js)** - Fetches the pending loan for the receiver. Can be only one at a time<br><br>
  - **GET** : &nbsp; `{{URL}}/api/loans/user/:receiverId`
    - ```x
        {
            "data": {
                "leftAmount": 10000,
                "totalAmount": 10000,
                "interestRate": 8,
                "nextInstallment": "No Contract Signed Yet",
                "expirationDate": "2021-10-03T18:00:00.000Z",
                "progress": 0,
                "currentLenders": 0,
                "totalRequest": 0
            },
            "status": "OK",
            "message": "Found pending loan in the database"
        }
      ```

---

- **[Current Lenders for a loan request](..\controller\loanController.js)** - Fetches current lenders for a loan request by loan id.<br><br>

  - **GET** : &nbsp; `{{URL}}/api/loans/lenders/:loanId`

    - ```x
        {
            "data": [
                {
                    "contractId": "60a2288f788f921b543cd812",
                    "lenderId": "6076cfa408541e2ba057e336",
                    "lenderName": "Rafid",
                    "totalAmount": 500,
                    "collectedAmount": 0,
                    "nextInstallmentDate": "2021-08-05T16:25:47.611Z",
                    "installmentAmount": 250,
                    "installments": 2,
                    "installmentsCompleted": 0,
                    "interestRate": 5,
                    "myDefaults": 0
                },
                {
                    "contractId": "60a2288f788f921b543cd811",
                    "lenderId": "6076cfa408541e2ba057e337",
                    "lenderName": "Akid",
                    "totalAmount": 200,
                    "collectedAmount": 0,
                    "nextInstallmentDate": "2021-08-05T16:25:47.606Z",
                    "installmentAmount": 66.66666666666667,
                    "installments": 3,
                    "installmentsCompleted": 0,
                    "interestRate": 5,
                    "myDefaults": 0
                }
            ],
            "status": "OK",
            "message": "All offers for this loan request have been fetched"
        }
      ```

---
