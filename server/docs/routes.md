# __Routes For Home Page__

## For Receiver 
---
- will not be shown for receiver

## For Lender
---
* **[Check if user is verified](..\controller\authController.js)** - Basically returns if user has both NID and Collateral Present. Check if both values are true, otherwise show the button and redirect accordingly <br><br>
- __GET__ : &nbsp; `{{URL}}/api/auth/6076cfa408541e2ba057e335`

     - ```x
            {
                "status": "OK",
                "data": {
                    "hiddenDetails": false,
                    "collateral": false
                },
                "message": "User has filled out the form"
            }
- __GET__ : &nbsp; `{{URL}}/api/loans?type=loan&sort=review` 
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


# __Routes For User Profiles__


## Lender Dashboard 
---
* **[Find User's Hidden Details](..\controller\userController.js)** - Basically gives the hidden details about a user<br><br>
    - __GET__ : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335`

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
---

* **[Show User's Site History](..\controller\userController.js)** - Shows Currently lending section & Site history section <br><br>
    - __GET__ : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335/history`

        - ```x
            {
                "data": {
                    "completedContractCount": 0,
                    "maxAmountLent": 200,
                    "nextInstallmentDate": "2021-08-03T12:10:27.786Z",
                    "nextInstallmentAmount": 66.66666666666667,
                    "currentlyActiveContacts": [
                        {
                            "contractId": "60a2288f788f921b543cd811",
                            "amount": 200,
                            "collectedAmount": 0,
                            "nextInstallmentAmount": 66.66666666666667,
                            "nextInstallmentDate": "2021-08-03T12:10:27.786Z",
                            "interestRate": 5,
                            "contractDefaults": 0,
                            "installmentsCompleted": 0
                        },
                        
                        {
                            "contractId": "60a2288f788f921b543cd811",
                            "amount": 200,
                            "collectedAmount": 0,
                            "nextInstallmentAmount": 66.66666666666667,
                            "nextInstallmentDate": "2021-08-03T12:10:27.786Z",
                            "interestRate": 5,
                            "contractDefaults": 0,
                            "installmentsCompleted": 0
                        }
                    ]
                },
                "status": "OK",
                "message": "User history of contracts has been found."
            }

    - __PUT__ :&nbsp; `{{URL}}/api/contract`
    

        - ```x
            req.body  

            {
                "contractId": "60a2288f788f921b543cd812",
                "issuerId": "6076cfa408541e2ba057e336"
            }
        - returns nothing important <br><br>
    - __POST__ : &nbsp; `{{URL}}/api/report`
        - not yet implemented

   
---
## Receiver Dashboard
---

* **[Find User's Hidden Details](..\controller\userController.js)** - Basically gives the hidden details about a user<br><br>
    - __GET__ : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335`

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
---