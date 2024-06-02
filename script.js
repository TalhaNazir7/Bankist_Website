'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//__________Displaying Transactions and sorting_____________
let displayMovements=(account,sort=true)=>{
containerMovements.innerHTML=' ';
const transacAmount= sort ?account.movements:account.movements.slice().sort((a,b)=>a-b);
// console.log(transacAmount);
transacAmount.forEach(function(amount,i){

let type=amount>0?"deposit":"withdrawal";
  let html=` <div class="movements__row">
<div class="movements__type movements__type--${type}">${i+1}${type}</div>
<div class="movements__value">${amount}€</div>
</div>`;
containerMovements.insertAdjacentHTML('afterbegin',html);
});
}

//_____________Generating USer Name_____________

const userName=(accounts)=>{ 
accounts.forEach(function(acc){
acc.userName=acc.owner.toLowerCase().split(' ').map(name=>name[0]).join(''); 
});
};

//_____________Current balance_____________

const currentBalance=(account)=>{
let balance=account.movements.reduce((acc,mov)=>{
return acc+mov;
},0);
labelBalance.textContent=`${balance}€`;
account.balance=balance;
}

//_____________Calculating Summary_____________

const calculateSummary=(account)=>{
  
  const incomeMoney=account.movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov);
  labelSumIn.textContent=`${incomeMoney}€`;
  
  const outcomeMoney=account.movements.filter(mov=> mov<0).reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent=`${Math.abs(outcomeMoney)}€`;
  
  const interest=account.movements.filter(mov=>mov>0).map(mov=>mov*(account.interestRate/100)).reduce((acc,mov)=>acc+mov);
  labelSumInterest.textContent=`${interest}€`;
}


//_____________Logged in account_____________

const logined=function(userName,pin){
const loginedAccount =accounts.find((account)=>{
  return account.userName===userName && account.pin===pin;
});
return loginedAccount;
}

//_____________Update UI_____________

const updateUi=(loginedAccount)=>{
  displayMovements(loginedAccount);
  currentBalance(loginedAccount);
  calculateSummary(loginedAccount);
}

userName(accounts);

//_____________Login Btn_____________
let loginedAccount;
btnLogin.addEventListener('click',(e)=>{
  e.preventDefault();
  loginedAccount=logined(inputLoginUsername.value,Number(inputLoginPin.value));
  if(loginedAccount){
  containerApp.style.opacity=100;
labelWelcome.textContent=`Welcome back, ${loginedAccount.owner.split(' ')[0]}`;
inputLoginUsername.value=inputLoginPin.value="";
updateUi(loginedAccount);
}
});

//_____________Transfer Money btn_____________

btnTransfer.addEventListener('click',(e)=>{
e.preventDefault();
  const recieverAccount=accounts.find((acc)=>acc.userName===inputTransferTo.value);
  const tranferAmount=Number(inputTransferAmount.value);
  if (tranferAmount<= loginedAccount.balance && recieverAccount ){
    recieverAccount.movements.push(tranferAmount);
    loginedAccount.movements.push(-tranferAmount)
  alert(`Transfer Successfully to ${recieverAccount.owner}`);
  inputTransferAmount.value=inputTransferTo.value="";
  updateUi(loginedAccount);
  }
});

//_____________ Close Account btn_____________

btnClose.addEventListener('click',(e)=>{
e.preventDefault();
if(loginedAccount.userName===inputCloseUsername.value &&loginedAccount.pin===Number(inputClosePin.value))
{
  const closeAccountIndex= accounts.findIndex(acc=>acc.userName===inputCloseUsername.value);
  inputCloseUsername.value=inputClosePin.value="";
 accounts.splice(closeAccountIndex,1);
 containerApp.style.opacity=0;
 labelWelcome.textContent=`Log in to get started`
}
});

// let sorted=false;
// //_____________ Close Account btn_____________
// btnSort.addEventListener('click',(e)=>{
//   e.preventDefault();
//  displayMovements(loginedAccount,sorted)
//   sorted=!sorted;
// })
// });

for (const x of accounts) {
  x.sorted=false;
}
//_____________ Close Account btn_____________
btnSort.addEventListener('click',(e)=>{
  e.preventDefault();
 displayMovements(loginedAccount,loginedAccount.sorted)
 loginedAccount.sorted=!loginedAccount.sorted;
})


 


















//////////////////////////////////////////////
/*
const calcAverageHumanAge=ages=>{
const adultDogsHumanAge=ages.map(dogAge=> dogAge<=2 ?dogAge*2 : 16+dogAge*4)
.filter(DogsHumanAge=> DogsHumanAge>=18);
const averageAge=adultDogsHumanAge.reduce((acc,age)=>acc+age,0)/adultDogsHumanAge.length;
console.log(averageAge);
}


const dogsJulia=[3, 5, 2, 12, 7];
const dogsKate=[4, 1, 15, 8, 3];
const checkDogs=(dogsJulia,dogsKate)=>{
const corrDogsJulia=[...dogsJulia.slice(1,-2)];
const dogsData=[...corrDogsJulia,...dogsKate];
dogsData.forEach((dogsAge,i)=>{
  const type=dogsAge>=3?"Adult":"Puppy"
// console.log(`Dog Number ${i+1} is an ${type}, and is ${dogsAge} years old `);
});
}
checkDogs(dogsJulia,dogsKate);
const dogs=dogsJulia.map(dog => dog*2 )
// console.log(dogs);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
 */