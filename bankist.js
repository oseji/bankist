"use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//CODE

// const displayMovement = function (movements) {
//   account1.movements.forEach(function (transaction, index) {
//     console.log(`${index + 1}.) TRANSACTION : ${transaction}`);
//   });
// };

//DISPLAY MOVEMENTS
const displayMovement = function (movements) {
  containerMovements.innerHTML = ""; //The Element property innerHTML gets or sets the HTML or XML markup contained within the element.
  //here its set to an empty string to clear the previous html so the html code below can be pushed into an empty slate

  movements.forEach(function (transaction, index) {
    // let type = "";
    // if (transaction > 0) {
    //   type = "deposit";
    // } else {
    //   type = "withdrawal";
    // }

    const type = transaction > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">$${transaction}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html); //afterbegin makes the inserted html appear after the already present html
    //beforebegin would make them appear before the present html
  });
};
//displayMovement(account1.movements);

//DISPLAY BALANCE
const calcBalance = function (acct) {
  //function to call later to display balance of an account
  acct.balance = acct.movements.reduce(function (acc, element) {
    return acc + element; //the array passed into the function is reduced into the single value total and returned
  }, 0); //the initial accumulator value was set to 0
  labelBalance.textContent = `$${acct.balance}`; //the textcontent displaying the balance is then set to the result of the reduced account array
};
//calcBalance(account1.movements);

//DISPLAY BOTTOM SUMMARY
const displaySummary = function (accounts) {
  const deposits = accounts.movements
    .filter(function (money) {
      return money > 0;
    })
    .reduce(function (acc, money) {
      return acc + money;
    });

  const withdrawal = accounts.movements
    .filter(function (money) {
      return money < 0;
    })
    .reduce(function (acc, money) {
      return acc + money;
    }, 0);

  const interest = accounts.movements
    .filter(function (money) {
      return money > 0;
    })
    .map(function (money) {
      return (money * accounts.interestRate) / 100;
    })
    .filter(function (interest) {
      return interest >= 1;
    })
    .reduce(function (acc, money) {
      return acc + money;
    });

  labelSumIn.textContent = `$${deposits}`;
  labelSumOut.textContent = `$${Math.abs(withdrawal)}`;
  labelSumInterest.textContent = `$${interest}`;
};
//displaySummary(account1.movements);

//COMPUTING USERNAMES

//first version
// const user = account3.owner;
// const username = user.toLowerCase().split(" ");
// const userID = [];
// console.log(username);
// for (const i of username) {
//   userID.push(i[0].toUpperCase());
// }
// const userIdComplete = userID.join("");
// console.log(userIdComplete);

//second version
// const usernameGenerator = function (user) {

//   const username = user
//     .toLowerCase() //change all letters to lowercase
//     .split(" ") //split the name into an array comprising of each name as an array element
//     .map(function (i) {
//       return i[0];
//     }) //return the first letter of each array element,remember map() returns a new array so the array being worked with from here moving forward is now [s,t,w]
//     .join("") //join the individual array elements into a string so [s,t,w] is now stw
//     .toUpperCase(); //change the string to uppercase

//   return username;
// };

//final version
const usernameGenerator = function (accounts) {
  //pass in the array of account objects
  accounts.forEach(function (account) {
    //loop over the each account object in the accounts array
    account.username = account.owner //in each iteration a username key is added to each account object
      .toLowerCase() //change all letters to lowercase
      .split(" ") //split the name into an array comprising of each name as an array element
      .map(function (i) {
        return i[0];
      }) //return the first letter of each array element,remember map() changes the actual array so the array is now [s,t,w]
      .join("") //join the individual array elements into a string so [s,t,w] is now stw
      .toUpperCase(); //change the string to uppercase
  });
};
usernameGenerator(accounts);
console.log(accounts);

//IMPLEMENTING LOGIN
let currentAccount; //current account is defined in the global scope so we can access the value for other functions

btnLogin.addEventListener("click", function (event) {
  event.preventDefault(); //forms automatically reload the page when submitted,.preventdefault() stops that from happening
  console.log("submitted");

  //finding the username the user inputted
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value; //the current account is the account that matches the username inputted
  });
  console.log(currentAccount);

  // if (currentAccount.pin === Number(inputLoginPin.value)) {
  //   //the pin only works when it matches the pin of the current account,else it returns an undefined error
  //   console.log("LOGGED IN"); //login only happens when the correct pin and username of the same object are used
  // }

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //to stop the error we use optional chaining so that JS only reads the pin object ket if the current account exists
    console.log("LOGGED IN"); //login only happens when the correct pin and username of the same object are used

    //display login message
    labelWelcome.textContent = `Welcome back,${currentAccount.owner.split(" ")[0]}`;

    //display UI
    containerApp.style.opacity = "100"; //change the opacity from 0 to 100 to reveal the UI
  }

  //clear login input fields
  inputLoginUsername.value = inputLoginPin.value = "";

  // //display movements
  // displayMovement(currentAccount.movements);

  // //display balance
  // calcBalance(currentAccount);

  // //display summary
  // displaySummary(currentAccount);

  //update UI
  updateUi(currentAccount);
});

const updateUi = function (currentAccount) {
  //display movements
  displayMovement(currentAccount.movements);

  //display balance
  calcBalance(currentAccount);

  //display summary
  displaySummary(currentAccount);
};

//IMPLEMENTING TRANSFERS
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });

  //console.log(amount, recieverAccount);

  if (amount > 0 && recieverAccount && currentAccount.balance >= amount && recieverAccount?.username !== currentAccount.username) {
    console.log(`Transfer of $${amount} to ${recieverAccount.owner} is valid`);

    //doing the actual transfer of money
    currentAccount.movements.push(-amount); //the negative amount of the money transferred is added to the current accounts movements,this changes the balance and summary when calculated
    recieverAccount.movements.push(amount); //the amount transferred is added to the recieverAccounts movements
    updateUi(currentAccount);
  } else {
    console.log(`INVALID TRANSFER`);
  }

  inputTransferAmount.value = inputTransferTo.value = ""; //this sets the input fields back to empty when the transfer button is clicked
});

//CLOSING AN ACCOUNT
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  inputCloseUsername.value = inputClosePin.value = "";

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    //finding the index of the account to delete using findIndex()
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    //console.log(`INDEX : `, index);

    //deleting the current account with splice()
    accounts.splice(index, 1);
    console.log(accounts);

    //hide UI
    containerApp.style.opacity = "0";
  } else {
    console.log(`WRONG DETAILS`);
  }
});

//IMPLEMENTING LOANS
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((money) => money > amount * 0.1)) {
    //this code block executes if the loan amount is more than 0 and if the current acct has a deposit greater than 10% of the loan amount

    currentAccount.movements.push(amount); //add loan amount to the current accounts movements
    console.log(`Your loan request of $${amount} to ${currentAccount.owner} has been approved`);

    updateUi(currentAccount); //update the UI

    inputLoanAmount.value = ""; //clear the input field
  } else {
    console.log("CANT PROCESS THIS LOAN REQUEST");
  }
});

const overallBalance = accounts.flatMap((acc) => acc.movements).reduce((acc, i) => acc + i, 0);
console.log(overallBalance);
