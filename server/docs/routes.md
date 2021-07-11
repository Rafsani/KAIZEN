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
                "loanDefaults": 0,
                "rating": 5,
                "_id": "6076cfa408541e2ba057e331",
                "username": "Anik",
                "password": "$2a$10$txjxVJIxsD//cioMTblMy..06YHGbSyJvb5SnHjQlYYG07uFkdShW",
                "email": "anik65@gmail.com",
                "nid": "$2a$10$T.26ert2gpOezcrDjQPRk.4btFg5Z591DQJoqbnaxnxZO5m2LfF6S",
                "bkash": "01961145451",
                "dob": "1992-02-10T00:00:00.000Z",
                "collateral": "https://www.youtube.com/watch?v=u3D2jlCYyhY",
                "verfiedStatus": true,
                "joinedDate": "2021-07-11T16:47:16.969Z",
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

- **[Post Review](..\controller\contractController.js)** - Ends Contract and posts a review<br><br>
  - **POST** : &nbsp; `{{URL}} /api/review`
    - ```x 
        {
            "contract": "60a2288f788f921b543cd811",
            "lender": "6076cfa408541e2ba057e337",
            "receiver": "6076cfa408541e2ba057e331",
            "ratingValue": "1",
            "details": "Taka niye mere diyeche."
        }
    - ```x
        {
            "status": "OK",
            "data": {
                "_id": "60eb20f48f385c1a70b7bfc8",
                "contract": "60a2288f788f921b543cd811",
                "lender": "6076cfa408541e2ba057e337",
                "receiver": "6076cfa408541e2ba057e331",
                "ratingValue": 1,
                "details": "Taka niye mere diyeche.",
                "__v": 0
            },
            "message": "Review has been posted."
        }
      ```
---


---

## Receiver Dashboard

---

- **[Find User's Hidden Details](..\controller\userController.js)** - Basically gives the hidden details about a user<br><br>

  - **GET** : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335`

    - ```x
        {
            "data": {
                "usertype": "Receiver",
                "loanDefaults": 0,
                "rating": 3,
                "_id": "6076cfa408541e2ba057e331",
                "username": "Anik",
                "password": "$2a$10$txjxVJIxsD//cioMTblMy..06YHGbSyJvb5SnHjQlYYG07uFkdShW",
                "email": "anik65@gmail.com",
                "nid": "$2a$10$T.26ert2gpOezcrDjQPRk.4btFg5Z591DQJoqbnaxnxZO5m2LfF6S",
                "bkash": "01961145451",
                "dob": "1992-02-10T00:00:00.000Z",
                "collateral": "https://www.youtube.com/watch?v=u3D2jlCYyhY",
                "verfiedStatus": true,
                "joinedDate": "2021-07-11T16:47:16.969Z",
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
                "lastIssuedLoan": "60a2288f788f921b543cd8ca",
                "expirationDate": "2021-10-03T18:00:00.000Z",
                "progress": 0,
                "currentLenders": 0,
                "totalRequest": 0
            },
            "status": "OK",
            "message": "Found pending loan in the database"
        }
      ```
    - ```x 
        {
            "data": {
                "lastIssuedLoan": "60a2288f788f921b543cd8ca"
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

- **[Deny Contract Offer/Request](..\controller\contractController.js)** - Denies a contract offer.<br><br>

  - **DELETE** : &nbsp; `{{URL}}/api/contract/:contractId`
    - ```x
        req.body
        {
            "issuerId": "6076cfa408541e2ba057e335" // receiverId
        }
        ```
    - ```x
        {
            "status": "OK",
            "data": {
                "collectedAmount": 0,
                "defaults": 0,
                "status": "Requested",
                "installments": 3,
                "installmentsCompleted": 0,
                "installmentDates": [
                    "2021-08-05T20:27:25.177Z",
                    "2021-09-04T20:27:25.179Z",
                    "2021-10-04T20:27:25.179Z"
                ],
                "_id": "60e4bcad507bc5307c4728c9",
                "loanId": "60a2288f788f921b543cd8ce",
                "lenderId": "6076cfa408541e2ba057e336",
                "receiverId": "6076cfa408541e2ba057e335",
                "amount": 1200,
                "interestRate": 8,
                "__v": 0
            },
            "message": "The contract offer has been denied."
        }
      ```
---

- **[Accept Contract Offer/Request](..\controller\contractController.js)** - Denies a contract offer.<br><br>

  - **PUT** : &nbsp; `{{URL}}/api/contract/:contractId`
    - ```x
        req.body
        {
            "issuerId": "6076cfa408541e2ba057e335" // receiverId
        }
        ```
    - ```x
        {
            "status": "OK",
            "data": {
                "collectedAmount": 0,
                "defaults": 0,
                "status": "Requested",
                "installments": 3,
                "installmentsCompleted": 0,
                "installmentDates": [
                    "2021-08-05T20:35:48.459Z",
                    "2021-09-04T20:35:48.460Z",
                    "2021-10-04T20:35:48.460Z"
                ],
                "_id": "60e4bea401f3f22330e8b3ea",
                "loanId": "60a2288f788f921b543cd8ce",
                "lenderId": "6076cfa408541e2ba057e336",
                "receiverId": "6076cfa408541e2ba057e335",
                "amount": 1200,
                "interestRate": 8,
                "__v": 0
            },
            "message": "The contract offer has been accepted."
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
- **[Reviews For a user](..\controller\reviewController.js)** - Fetches reviews for user by user id.<br><br>

  - **GET** : &nbsp; `{{URL}}/api/review/:receiverId`

    - ```x
        {
            "status": "OK",
            "data": [
                {
                    "_id": "60a2288f788f921b543cd811",
                    "receiver": "6076cfa408541e2ba057e331",
                    "lender": "6076cfa408541e2ba057e336",
                    "rating": 4,
                    "details": "Had a really easy contract",
                    "totalAmount": 1400,
                    "issueDate": "2021-07-11T16:47:20.602Z",
                    "contractId": "60a2288f788f921b543cd816"
                },
                {
                    "_id": "60a2288f788f921b543cd813",
                    "receiver": "6076cfa408541e2ba057e331",
                    "lender": "6076cfa408541e2ba057e340",
                    "rating": 4,
                    "details": "Had a fun contract",
                    "totalAmount": 1100,
                    "issueDate": "2021-07-11T16:47:20.603Z",
                    "contractId": "60a2288f788f921b543cd817"
                },
                {
                    "_id": "60eb20f48f385c1a70b7bfc8",
                    "receiver": "6076cfa408541e2ba057e331",
                    "lender": "6076cfa408541e2ba057e337",
                    "rating": 1,
                    "details": "Taka niye mere diyeche.",
                    "totalAmount": 1500,
                    "issueDate": "2021-07-11T16:47:20.599Z",
                    "contractId": "60a2288f788f921b543cd811"
                }
            ],
            "message": "Reviews have been found."
        }
      ```

---

## Lender Views Receiver Dashboard

---

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

- **[Post A Contract Offer/Request](..\controller\contractController.js)** - Creates a new Contract. Sends a request to the receiver<br><br>
  - **POST** : &nbsp; `{{URL}}/api/contract`
    - ```
        req.body 
        {
            "loanId": "60a2288f788f921b543cd8ce",
            "lenderId": "6076cfa408541e2ba057e336",
            "receiverId": "6076cfa408541e2ba057e335",
            "amount": "1200",
            "installments": "3"
        }
    - ```x
        {
            "status": "OK",
            "data": {
                "collectedAmount": 0,
                "defaults": 0,
                "status": "Requested",
                "installments": 3,
                "installmentsCompleted": 0,
                "installmentDates": [
                    "2021-08-05T20:35:48.459Z",
                    "2021-09-04T20:35:48.460Z",
                    "2021-10-04T20:35:48.460Z"
                ],
                "_id": "60e4bea401f3f22330e8b3ea",
                "loanId": "60a2288f788f921b543cd8ce",
                "lenderId": "6076cfa408541e2ba057e336",
                "receiverId": "6076cfa408541e2ba057e335",
                "amount": 1200,
                "interestRate": 8,
                "__v": 0
            },
            "message": "The contract has been created."
        }
      ```

---

- **[Get Active Contract](..\controller\contractController.js)** - Fetches an active contract if there are any<br><br>
  - **GET** : &nbsp; `{{URL}}/api/contract/:receiverId`
    - ```x
        {
            "status": "OK",
            "data": {
                "activeContract": true, // if true fetch bkash number
                "contractId": "60a2288f788f921b543cd811",
                "totalAmount": 200,
                "signingDate": "2021-07-06T20:34:22.556Z",
                "collectedAmount": 0,
                "nextInstallment": "2021-08-05T20:34:22.556Z",
                "nextInstallmentAmount": 66.66666666666667,
                "installmentsCompleted": 0,
                "interestRate": 5
            },
            "message": "There is an active contract."
        }
      ```
    - ```x
        {
            "status": "ERROR",
            "data": null,
            "message": "No active request at this moment."
        }
        ```
---
<!-- - **[End Contract](..\controller\contractController.js)** - Ends Contract<br><br>
  - **PUT** : &nbsp; `{{URL}} /api/contract`
    - ```x 
        {
            "contractId": "60a2288f788f921b543cd811",
            "issuerId": "6076cfa408541e2ba057e337"
        }
    - ```x
        {
            "status": "OK",
            "data": {
                "n": 1,
                "nModified": 1,
                "opTime": {
                    "ts": "6981945595686551553",
                    "t": 11
                },
                "electionId": "7fffffff000000000000000b",
                "ok": 1,
                "$clusterTime": {
                    "clusterTime": "6981945595686551553",
                    "signature": {
                        "hash": "UJ9p+//rIe4wt3Uih0z4R1Vtd1g=",
                        "keyId": "6927623369017786372"
                    }
                },
                "operationTime": "6981945595686551553"
            },
            "message": "The contract has been ended."
        }
      ```
--- -->
- **[Post Review](..\controller\reviewController.js)** - Ends Contract and posts a review<br><br>
  - **POST** : &nbsp; `{{URL}} /api/review`
    - ```x 
        {
            "contract": "60a2288f788f921b543cd811",
            "lender": "6076cfa408541e2ba057e337",
            "receiver": "6076cfa408541e2ba057e331",
            "ratingValue": "1",
            "details": "Taka niye mere diyeche."
        }
    - ```x
        {
            "status": "OK",
            "data": {
                "_id": "60eb20f48f385c1a70b7bfc8",
                "contract": "60a2288f788f921b543cd811",
                "lender": "6076cfa408541e2ba057e337",
                "receiver": "6076cfa408541e2ba057e331",
                "ratingValue": 1,
                "details": "Taka niye mere diyeche.",
                "__v": 0
            },
            "message": "Review has been posted."
        }
      ```
---

- **[Reviews For a user](..\controller\reviewController.js)** - Fetches reviews for user by user id.<br><br>

  - **GET** : &nbsp; `{{URL}}/api/review/:receiverId`

    - ```x
        {
            "status": "OK",
            "data": [
                {
                    "_id": "60a2288f788f921b543cd811",
                    "receiver": "6076cfa408541e2ba057e331",
                    "lender": "6076cfa408541e2ba057e336",
                    "rating": 4,
                    "details": "Had a really easy contract",
                    "totalAmount": 1400,
                    "issueDate": "2021-07-11T16:47:20.602Z",
                    "contractId": "60a2288f788f921b543cd816"
                },
                {
                    "_id": "60a2288f788f921b543cd813",
                    "receiver": "6076cfa408541e2ba057e331",
                    "lender": "6076cfa408541e2ba057e340",
                    "rating": 4,
                    "details": "Had a fun contract",
                    "totalAmount": 1100,
                    "issueDate": "2021-07-11T16:47:20.603Z",
                    "contractId": "60a2288f788f921b543cd817"
                },
                {
                    "_id": "60eb20f48f385c1a70b7bfc8",
                    "receiver": "6076cfa408541e2ba057e331",
                    "lender": "6076cfa408541e2ba057e337",
                    "rating": 1,
                    "details": "Taka niye mere diyeche.",
                    "totalAmount": 1500,
                    "issueDate": "2021-07-11T16:47:20.599Z",
                    "contractId": "60a2288f788f921b543cd811"
                }
            ],
            "message": "Reviews have been found."
        }
      ```

---

## Receiver Views Lender Dashboard

---

- **[Get Active Contract](..\controller\contractController.js)** - Fetches an active contract if there are any<br><br>
  - **GET** : &nbsp; `{{URL}}/api/contract/:lenderId`
    - ```x
        {
            "status": "OK",
            "data": {
                "activeContract": true, // if true fetch bkash number
                "contractId": "60a2288f788f921b543cd811",
                "totalAmount": 200,
                "signingDate": "2021-07-06T20:34:22.556Z",
                "collectedAmount": 0,
                "nextInstallment": "2021-08-05T20:34:22.556Z",
                "nextInstallmentAmount": 66.66666666666667,
                "installmentsCompleted": 0,
                "interestRate": 5
            },
            "message": "There is an active contract."
        }
      ```
    - ```x
        {
            "status": "ERROR",
            "data": null,
            "message": "No active request at this moment."
        }
        ```
---


- **[ Get Contract Offer ](..\controller\contractController.js)** - Fetches a contract offer if there are any( only happens if there are no active request)<br><br>
  - **GET** : &nbsp; `{{URL}}/api/contract/:lenderId`
    - ```x
        {
            "status": "OK",
            "data": {
                "activeContract": false,
                "contractId": "60e4f16d91a05f33d88baec8",
                "totalAmount": 1500,
                "signingDate": "2021-07-07T00:12:29.938Z",
                "installments": 2,
                "firstInstallmentDate": "2021-08-06T00:12:29.938Z",
                "finalInstallmentDate": "2021-09-05T00:12:29.939Z",
                "totalAmountWithInterest": 1620,
                "interestRate": 8
            },
            "message": "Contract Offer has been found"
        }
      ```
    - ```x
        {
            "status": "ERROR",
            "data": null,
            "message": "No active request at this moment."
        }
        ```
---
- **[ Get Lender Info For Receiver ](..\controller\userController.js)** - Fetches aggregated Lender info<br><br>
  - **GET** : &nbsp; `{{URL}}/api/user/view/:lenderId`
    - ```x
        {
            "data": {
                "name": "Akid",
                "details": "Habijaaosndcosndcnacnosdnzi",
                "maxAmountLent": 200,
                "totalAmountLent": 200,
                "defaults": 0,
                "completedContracts": 0
            },
            "status": "OK",
            "message": "All contracts for this lender have been found."
        }
      ```
    - ```x
        {
               data:null,
               status: 'ERROR',
               message: 'Lender Details could not be fetched'
        }
        ```
---

- **[Deny Contract Offer/Request](..\controller\contractController.js)** - Denies a contract offer.<br><br>

  - **DELETE** : &nbsp; `{{URL}}/api/contract/:contractId`
    - ```x
        req.body
        {
            "issuerId": "6076cfa408541e2ba057e335" // receiverId
        }
        ```
    - ```x
        {
            "status": "OK",
            "data": {
                "collectedAmount": 0,
                "defaults": 0,
                "status": "Requested",
                "installments": 3,
                "installmentsCompleted": 0,
                "installmentDates": [
                    "2021-08-05T20:27:25.177Z",
                    "2021-09-04T20:27:25.179Z",
                    "2021-10-04T20:27:25.179Z"
                ],
                "_id": "60e4bcad507bc5307c4728c9",
                "loanId": "60a2288f788f921b543cd8ce",
                "lenderId": "6076cfa408541e2ba057e336",
                "receiverId": "6076cfa408541e2ba057e335",
                "amount": 1200,
                "interestRate": 8,
                "__v": 0
            },
            "message": "The contract offer has been denied."
        }
      ```
---

- **[Accept Contract Offer/Request](..\controller\contractController.js)** - Denies a contract offer.<br><br>

  - **PUT** : &nbsp; `{{URL}}/api/contract/:contractId`
    - ```x
        req.body
        {
            "issuerId": "6076cfa408541e2ba057e335" // receiverId
        }
        ```
    - ```x
        {
            "status": "OK",
            "data": {
                "collectedAmount": 0,
                "defaults": 0,
                "status": "Requested",
                "installments": 3,
                "installmentsCompleted": 0,
                "installmentDates": [
                    "2021-08-05T20:35:48.459Z",
                    "2021-09-04T20:35:48.460Z",
                    "2021-10-04T20:35:48.460Z"
                ],
                "_id": "60e4bea401f3f22330e8b3ea",
                "loanId": "60a2288f788f921b543cd8ce",
                "lenderId": "6076cfa408541e2ba057e336",
                "receiverId": "6076cfa408541e2ba057e335",
                "amount": 1200,
                "interestRate": 8,
                "__v": 0
            },
            "message": "The contract offer has been accepted."
        }
      ```
---