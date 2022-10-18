"use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: ["2019-11-18T21:31:17.178Z", "2019-12-23T07:42:02.383Z", "2020-05-08T14:11:59.604Z", "2020-07-26T17:01:17.194Z", "2020-08-01T10:51:36.790Z"],
  currency: "EUR",
  locale: "de-DE",
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

//CODE

//TIME
const time = new Date();
const day = `${time.getDate()}`.padStart(2, 0);
const month = `${time.getMonth() + 1}`.padStart(2, 0);
const year = time.getFullYear();
const hour = time.getHours();
const minutes = time.getMinutes();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

//SET TIMER FUNCTION
const startLogoutTimer = function () {
  //set time
  let clock = 10;

  const logoutTimer = setInterval(() => {
    //-1 second after each second passes
    const min = String(Math.trunc(clock / 60)).padStart(2, "0");
    const sec = String(Math.trunc(clock % 60)).padStart(2, "0");

    labelTimer.textContent = `${min}:${sec}`;
    clock--;
    console.log(clock);

    //stop timer and logout when time reaches 0
    if (clock === 0) {
      clearInterval(logoutTimer);

      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = "0";
    }
  }, 1000);
};

//NUMBER FORMATTER
const numberFormat = function (number, locale, currency) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: currency }).format(number);
};

//DISPLAY MOVEMENTS
const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = ""; //The Element property innerHTML gets or sets the HTML or XML markup contained within the element.
  //here its set to an empty string to clear the previous html so the html code below can be pushed into an empty slate

  const moves = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  moves.forEach(function (transaction, index) {
    const type = transaction > 0 ? "deposit" : "withdrawal";
    //console.log(acc.movementsDates);

    const date = new Date(acc.movementsDates[index]); //the index parameter in the moves.forEach() loop is used to help loop over the movementDates since they share the same indexes
    const formattedDate = new Intl.DateTimeFormat(currentAccount.locale).format(date);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    const displayDate = formattedDate;

    const formattedMovements = new Intl.NumberFormat(acc.locale, { style: "currency", currency: acc.currency }).format(transaction);

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${numberFormat(transaction, acc.locale, acc.currency)}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html); //afterbegin makes the inserted html appear after the already present html
    //beforebegin would make them appear before the present html
  });
};
//displayMovement(account1.movements);

//DISPLAY BALANCE
const calcBalance = function (acct) {
  acct.balance = acct.movements.reduce(function (acc, element) {
    return acc + element;
  }, 0); //the initial accumulator value was set to 0
  labelBalance.textContent = `${numberFormat(acct.balance, acct.locale, acct.currency)}`;
};

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

  labelSumIn.textContent = `${numberFormat(deposits, accounts.locale, accounts.currency)}`;
  labelSumOut.textContent = `${numberFormat(withdrawal, accounts.locale, accounts.currency)}`;
  labelSumInterest.textContent = `${numberFormat(interest, accounts.locale, accounts.currency)}`;
};
//displaySummary(account1.movements);

//COMPUTING USERNAMES
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

  //finding the username the user inputted and setting the current account
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value; //the current account is the account that matches the username inputted
  });

  //setting the current time under the current balance and internationalizing it
  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(time);

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

  //update UI
  updateUi(currentAccount);

  //start logout timer
  startLogoutTimer();

  //make the background of every second movement row a darker shade of white
  document.querySelectorAll(".movements__row").forEach(function (element, index) {
    if (index % 2 === 0) {
      element.style.backgroundColor = "#E6E6E6";
    }
  });
});

//UPDATE UI FUNCTION
const updateUi = function (currentAccount) {
  //display movements
  displayMovement(currentAccount);

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

  if (amount > 0 && recieverAccount && currentAccount.balance >= amount && recieverAccount?.username !== currentAccount.username) {
    console.log(`Transfer of $${amount} to ${recieverAccount.owner} is valid`);

    //doing the actual transfer of money
    currentAccount.movements.push(-amount); //the negative amount of the money transferred is added to the current accounts movements,this changes the balance and summary when calculated
    currentAccount.movementsDates.push(new Date());
    recieverAccount.movements.push(amount); //the amount transferred is added to the recieverAccounts movements
    recieverAccount.movementsDates.push(new Date());
    updateUi(currentAccount);
  } else {
    console.log(`INVALID TRANSFER`);
  }

  inputTransferAmount.value = inputTransferTo.value = "";
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

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((money) => money > amount * 0.1)) {
    //this code block executes if the loan amount is more than 0 and if the current acct has a deposit greater than 10% of the loan amount

    setTimeout(() => {
      currentAccount.movements.push(amount); //add loan amount to the currentAccount movements
      currentAccount.movementsDates.push(new Date());

      console.log(`Your loan request of $${amount} to ${currentAccount.owner} has been approved`);

      updateUi(currentAccount);
    }, 5000);

    inputLoanAmount.value = ""; //clear the input field
  } else {
    console.log("CANT PROCESS THIS LOAN REQUEST");
  }
});

//SORTING THE MOVEMENTS
let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});
