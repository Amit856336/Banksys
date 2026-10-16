let hum = document.querySelector("#hum");
let nav = document.querySelector(".baar");
let back = document.querySelector(".back");
let slider = document.querySelector(".slider");
let img = document.querySelectorAll(".img");
let head = document.querySelector(".header");
let  main= document.querySelector(".screen");
let body = document.querySelector(".maincontent");
let clr = document.querySelector(".clr");
hum.addEventListener("click",function(e){
    e.preventDefault();
    nav.classList.toggle("hider");
    back.classList.add("ground");
    body.style.opacity="0.6";
    main.style.opacity="0.6";
   hum.style.color="black";
     if(!nav.classList.contains("hider")){
        body.style.opacity="1";
    main.style.opacity="1";
        hum.style.color="white";
        nav.classList.remove("hider");
    back.classList.remove("ground");
    }
});

back.addEventListener("click",function(){
    nav.classList.remove("hider");
    back.classList.remove("ground");
   hum.style.color="white";
    body.style.opacity="1";
    main.style.opacity="1";
});

let alert = document.querySelector(".body .alert");
function alertmessage(data) {
    let h6 = document.querySelector(".body .alert h6");
   
    alert.classList.remove("removealert");
    h6.innerText = data;
}

clr.addEventListener("click",function(e){
   e.preventDefault();
alert.classList.add("removealert");
});


function removehider(){
   nav.classList.remove("hider");
    back.classList.remove("ground");
   hum.style.color="white";
    body.style.opacity="1";
    main.style.opacity="1";
}
function animate(){
let i=0;
let position = 1;
setInterval(()=>{
    slider.style.transition="1.6s";
    slider.style.transform=`translatex(-${img[i].clientWidth*i}px)`;
    i += position;
    if(i===img.length-1){
        position = -1;
    }
    else if(i===0){
        position = 1;
    }
},1600);
}

animate();

class BankAccount{
    constructor(name, acc, pin,aadharNumber,balance=0, block =false){
        this.name = name;
        this.accn = acc;
        this.pin = pin;
        this.balance = balance
        this.Aadhar = aadharNumber;
        this.history = [];
        this.blocked = block;
    }
    
    getter(){
        console.log(this.balance);
    }
    withdraw(amount){
        if(this.blocked) throw new Error("this account is blocked");
        if(amount > this.balance || amount<=0){
            throw new Error("check the amount and balance");
        }
        else if (!Number.isInteger(amount)){
            throw new Error("only allow Integer");
        }
        else{
            this.balance = this.balance - amount;
            let obj = {
                "date": new Date(),
                "Debited_Amount": amount,
                "remained_balance": this.balance
            }
            this.history.push(obj);
        }
    }
    
    credit(amount){
        if(this.blocked) throw new Error("this account is blocked");

        if(amount<=0){
            throw new Error("please add money more than zero");
        }
        else if (!Number.isInteger(amount)){
            throw new Error("only allow Integer");
        }
        else{
            this.balance += amount;
            let obj = {
                "date": new Date(),
                "Credited_Amount": amount,
                "remained_balance": this.balance
            }
            this.history.push(obj);
        }
    }
    
    historyAll(){
        for(let a of this.history){
            console.log(`Tranjection date is: ${a.date}`);
            if("Debited_Amount" in a){console.log(`Debited amount is: ${a.Debited_Amount}`);}
                else if("Credited_Amount" in a){console.log(`Credited amount is: ${a.Credited_Amount}`);}
            console.log(`Remained Balance is: ${a.remained_balance}`);
        }
    }
}

class Bank{
    accounts;
    constructor(){
        this.accounts = [];
    }
    createAccount(name, pin,aadharNumber){
        let accn = "ACC"+Math.floor(1000+(Math.random()*900));
        let newacc = new BankAccount(name, accn, pin, aadharNumber);
        this.accounts.push(newacc);
        return newacc;
    }
    findAcc(accn,pin){
       for(let a of this.accounts){
           
           if(a.accn === accn && a.pin ===pin){
               return a;
           }
       }
    }
    
    deleteAcc(accn,pin){
       for(let a of this.accounts){
           if(a.accn === accn && a.pin ===pin){
               let i = this.accounts.indexOf(a);
               this.accounts.splice(i,1);
           }
       }
    }
    blockAcc(accn,pin){
       for(let a of this.accounts){
           if(a.accn === accn && a.pin ===pin){
               a.blocked = true;
           }
           else{
               console.log("acc not exits")
           }
       }
    }
     showAllAcc(){
         if(this.accounts.length === 0){
             console.log("did not any accounts")
         }
         for(let acc of this.accounts){
             console.log(`Acount holder name is: ${acc.name}`);
             console.log(`Acount Number is: ${acc.accn}`);
             console.log(`Acount holder Aadhar Number is: ${acc.Aadhar}`);
             console.log(`Acount blocked status is: ${acc.blocked}`);
         }
     }
}

class StorageHandle{
    static save(bank){
        let accounts = {accounts:bank.accounts};
        localStorage.setItem("Bankdetail",JSON.stringify(accounts));
    }
    static load(){
        let raw = localStorage.getItem("Bankdetail");
        let bank = new Bank();
        if (!raw){
            return bank;
        }
        let detailed = JSON.parse(raw);
        detailed.accounts.forEach(d=>{
            let acc = new BankAccount(d.name,d.accn,d.pin,d.Aadhar,d.balance,d.blocked);
            acc.history = d.history;
            bank.accounts.push(acc);
        });
        return bank;
    }
}


class UImanage{
    constructor(bank){
        this.bank = bank;
        this.currentUser = false;
         this.img = document.querySelectorAll(".img"); 
       this.card = document.querySelectorAll(".crd");
        this.home = document.querySelectorAll(".home"); 
         this.main = document.querySelector("#main"); 
         this.pagelogin= document.querySelector("#screen-login"); 
         this.pagesignup = document.querySelector("#screen-signup"); 
         this.pagedashboard = document.querySelector("#screen-dashboard"); 
         this.hidden = document.querySelectorAll(".hidden");
         this.loginpage = document.querySelectorAll(".login");
         this.signuppage = document.querySelectorAll(".sign");
         this.signupbutton = document.querySelector("#signupBtn");
         this.loginbutton = document.querySelector("#loginBtn");
         this.deposit= document.querySelector("#depositBtn");
         this.withdraw= document.querySelector("#withdrawBtn");
         this.logout= document.querySelector("#logoutBtn");
       this.historybtn= document.querySelector(".historybutton");
       

//for debug code
         if (!this.main) console.error("Missing HTML: #main");
        if (!this.pagelogin) console.error("Missing HTML: #screen-login");
        if (!this.pagesignup) console.error("Missing HTML: #screen-signup");
        if (!this.pagedashboard) console.error("Missing HTML: #screen-dashboard");
        if (!this.signupbutton) console.error("Missing HTML: #signupBtn");
        if (!this.loginbutton) console.error("Missing HTML: #loginBtn");
        if (!this.deposit) console.error("Missing HTML: #depositBtn");
        if (!this.withdraw) console.error("Missing HTML: #withdraBtn (Check spelling)");
        if (!this.logout) console.error("Missing HTML: #logoutBtn");

this.loginpage.forEach((e)=>{e.addEventListener("click",(even)=>{
    even.preventDefault();
   removehider();
    // this.pagelogin.scrollIntoView();
    this.showOnDisplay(this.pagelogin);
});
});
       
this.card[0].addEventListener("click",(e)=>{
   e.preventDefault();
   this.showOnDisplay(this.pagesignup);
});       
       
       for(let i=1; i<this.card.length; i++){
          this.card[i].addEventListener("click",(e)=>{
   e.preventDefault();
   this.showOnDisplay(this.pagelogin);
}); 
       }
       
       this.historybtn.addEventListener("click",(e)=>{
          e.preventDefault();
        this.showhistory();
       });
       

this.home.forEach((e)=>{e.addEventListener("click",(even)=>{
    even.preventDefault();
   removehider();
    // this.pagelogin.scrollIntoView();
    this.showOnDisplay(this.main);
});
});

this.signuppage.forEach((e)=>{e.addEventListener("click",(even)=>{
    even.preventDefault();
   removehider();
    // this.pagelogin.scrollIntoView();
    this.showOnDisplay(this.pagesignup);
});
});

this.loginbutton.addEventListener("click",(e)=>{
e.preventDefault();
this.loginHandle();
document.querySelector("#loginAccNo").value="";
document.querySelector("#loginPin").value="";
});

this.signupbutton.addEventListener("click",(e)=>{
e.preventDefault();
this.createAccoountFunc();
document.querySelector("#signupName").value="";
document.querySelector("#signupAadhar").value="";
document.querySelector("#signupPin").value="";
});

this.logout.addEventListener("click",(e)=>{
e.preventDefault();
this.handleLogout();
});

this.deposit.addEventListener("click",(e)=>{
e.preventDefault();
this.handleDeposit();
document.querySelector("#amount").value="";
});

this.withdraw.addEventListener("click",(e)=>{
e.preventDefault();
this.handleWithdraw();
document.querySelector("#amount").value="";
});
    }

showhistory(){
   let list= document.querySelector(".list");
   let his = this.currentUser.history;
   if(his.length ===0){
      let li = document.createElement("li");
      li.innerText="there is no any history!";
      li.style.color="red";
      list.append(li);
      return;
   }
   else{
      list.innerHTML = "";
   for(let a of his){
      let li = document.createElement("li");
      let div = document.createElement("div");
   let h31= document.createElement("span");
      let h32= document.createElement("span");
   let h33= document.createElement("span");
            h31.innerText=`Tranjection date is: ${a.date}`;
            if("Debited_Amount" in a){
               h32.innerText=`Debited amount is: ${a.Debited_Amount}`;
            }
                else if("Credited_Amount" in a){
                   h32.innerText=`Credited amount is: ${a.Credited_Amount}`;
                }
            h33.innerText=`Remained Balance is: ${a.remained_balance}`;
      div.appendChild(h31);
      div.appendChild(h32);
      div.appendChild(h33);
      div.style.display="flex";
   div.style.flexDirection="column";
   li.appendChild(div);
   list.append(li);
        }
   }
}

   showOnDisplay(idname){
this.hidden.forEach(h=>{
    h.style.display="none";
})
idname.style.display="flex";
   }

createAccoountFunc(){
let sign1 = document.querySelector("#signupName");
let  sign2= document.querySelector("#signupAadhar");
let  sign3= document.querySelector("#signupPin");
let signupname = sign1.value;
let signuppin = sign3.value;
let signupaadhar= sign2.value;
let exist = this.bank.accounts.some((e)=>{
return e.name===signupname && e.Aadhar ===signupaadhar;
});
if(exist){
   alertmessage("this account is exists")
   return;
}

else{
if(signuppin.length < 4){
   alertmessage("enter 4 digit upi pin");
   return; 
}
if(signupaadhar.length < 12){
   alertmessage("enter aadhar number minnimum 12 digits");
   return;
}
if(signupname.trim()==="" || signuppin.trim()===""|| signupaadhar.trim()==="")
{
   alertmessage("first fill all the data"); 
   return;
}
let create = this.bank.createAccount(signupname,signuppin,signupaadhar);
StorageHandle.save(this.bank);
alertmessage(`your Account is created and account number is: ${create.accn}`);
sign1.value="";
sign2.value="";
sign3.value="";

this.showOnDisplay(this.pagelogin);
}


}

loginHandle(){
let login1= document.querySelector("#loginAccNo");
let login2= document.querySelector("#loginPin");
let loginacc = login1.value;
let loginpin = login2.value;
let acc = this.bank.findAcc(loginacc, loginpin);
if(!acc){
   alertmessage("this acc is not exist")
   return;
}
this.currentUser = acc;
this.updateDashboard();
this.showOnDisplay(this.pagedashboard);
}

updateDashboard(){
 document.querySelector("#userName").textContent = this.currentUser.name;
document.querySelector("#balance").textContent = this.currentUser.balance;
   document.querySelector("#accnc").textContent = this.currentUser.accn;
}

handleDeposit(){
    try{
let amount= Number(document.querySelector("#amount").value);
if(typeof amount !== "number" || Number.isNaN(amount)) throw new Error("please Enter a valid value");
this.currentUser.credit(amount);
StorageHandle.save(this.bank);
this.updateDashboard();
    }
    catch(e){
        alertmessage(e.message);
    }
}

handleWithdraw(){
    try{
let amount= Number(document.querySelector("#amount").value);
if(typeof amount !== "number" || Number.isNaN(amount)) throw new Error("please Enter a valid value");
this.currentUser.withdraw(amount);
StorageHandle.save(this.bank);
this.updateDashboard();
    }
    catch(e){
        alert(e.message);
    }
}

handleLogout(){
    this.currentUser = null;
    this.showOnDisplay(this.pagelogin);
}

}

window.addEventListener("DOMContentLoaded",()=>{
let bank = StorageHandle.load();
if(!bank){
    console.log("bank is not here");
}
let start = new UImanage(bank);
if(start.main){
start.showOnDisplay(start.main);
}
else {
    console.log("main is not");
}
});
// start.showOnDisplay(start.main);
//  console.log(start.loginpage);
// localStorage.clear();