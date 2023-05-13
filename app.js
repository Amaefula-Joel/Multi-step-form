const form = document.querySelector("#regForm");

const thanksYou = document.querySelector(".thanks");

const formPlanToggle = document.querySelector(".plan-option-toggle");
// element for displaying the price
const prices = document.querySelectorAll(".price");

// element for showing discount
const discount = document.querySelectorAll(".discount");

// all the radio inputs
const planInput = document.querySelectorAll(".plan-input");

// price element of the add-on form step
const addOnPrice = document.querySelectorAll(".add-on-price");

var currentTab = 0; // Current tab is set to be the first tab (0)

const payment = {
  yearly: {
    plan: [ "90","120", "150"],
    addOns: ["10", "20", "20"]
  },
  monthly: {
    plan: [ "9","12", "15"],
    addOns: ["1", "2", "2"]
  }
};

const errorMessage = `<p class="invalid">This field is required</p>`;

window.addEventListener("DOMContentLoaded", function () {
  showTab(currentTab); // Display the current tab
});

function showTab(n) {
  let prevBtn = document.getElementById("prevBtn");
  let nextBtn = document.getElementById("nextBtn");
  
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "";
  }
  if (n == (x.length - 1)) {
    nextBtn.innerHTML = "Submit";

    // add new styles
    nextBtn.classList.remove("next");
    nextBtn.classList.add("submit");

    // populate the filled summary text as well as price
    summary();
    
  } else {
    nextBtn.innerHTML = "Next Step";

    // add new styles
    nextBtn.classList.remove("submit");
    nextBtn.classList.add("next");
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    // form.submit();

    // but this challenge doesn't require the backend for this project, so i commented it
    // instead show the thank you page 
    form.style.display = 'none';
    thanksYou.style.display = 'flex';

    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let x, y, i, messageContainer, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].querySelectorAll(".input-personal");
  // message to be appended to an input
  

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // get the div with "message-con" class then add the error message
      messageContainer = y[i].previousElementSibling;
      if (messageContainer.classList.contains("message-con")) {

        // check if the error message is already present, if not it prints the message
        if (messageContainer.querySelector(".invalid") === null) {
          messageContainer.innerHTML += errorMessage;
        }
      }
      
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      
      // and set the current valid status to false:
      valid = false;
    }
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("indicator");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// resets the class of inputs when a key is pressed
function classReset(e){
  // checks if the input alredy has the class invalid
  if (e.classList.contains("invalid")) {
    e.classList.remove("invalid");

    let messageContainer = e.previousElementSibling;
    if (messageContainer.classList.contains("message-con")) {
      // messageContainer.innerHTML -= errorMessage;
      messageContainer.removeChild(messageContainer.querySelector(".invalid"));
      // console.log(messageContainer.querySelector(".invalid"));
    }
  }
}


formPlanToggle.addEventListener("click", function (e) {
  // toggles the active class
  formPlanToggle.classList.toggle('active');  

  const priceFormat = (n, plan) => {
    if (plan === "yr") {
      return `$${n}/yr`;
    } else {
      return `$${n}/mo`;
    }
  }

  // for the plan fpr step
  const yearPlan = payment.yearly.plan.map(function (plan) { return priceFormat(plan, "yr") });
  const monthlyPlan = payment.monthly.plan.map(function (plan) { return priceFormat(plan, "mo") });
  //for the addons form step
  const addOnYearlyPlan = payment.yearly.addOns.map(function (plan) { return priceFormat(plan, "yr") });
  const addOnMonthlyPlan = payment.monthly.addOns.map(function (plan) { return priceFormat(plan, "mo") });

  // checks if the toggle button has data set monthly or yearly
  if (formPlanToggle.dataset.plan == "Monthly") {
    //  if the user chooses yearly plan

    formPlanToggle.dataset.plan = "Yearly";

    for (let i = 0; i < yearPlan.length; i++) {
      prices[i].textContent = yearPlan[i];

      // shows the discount text
      discount[i].classList.add("show");

      // changes the value of  theinput to match plan
      planInput[i].value = payment.yearly.plan[i];

      // changes the text content of the add-on price to match plan
      addOnPrice[i].textContent = `+${addOnYearlyPlan[i]}`; 
    }

  } else {
    //  if the user chooses monthly plan

    formPlanToggle.dataset.plan = "Monthly";
    
    for (let i = 0; i < monthlyPlan.length; i++) {
      prices[i].textContent = monthlyPlan[i];

      // hidess the discount text
      discount[i].classList.remove("show");

      // changes the value of  theinput to match plan
      planInput[i].value = payment.monthly.plan[i];

      // changes the text content of the add-on price to match plan
      addOnPrice[i].textContent = `+${addOnMonthlyPlan[i]}`;
    }
  }

});

// this is for the inpot fields on the third form step
const addOns = document.querySelectorAll(".add-on");

addOns.forEach(function (addOn) {
  const addOnInput = addOn.querySelector(".add-on-input");
  const selectInput = addOn.querySelector(".select-input");

  addOnInput.addEventListener("click", function () {
    selectInput.classList.toggle('selected');
  });
});


function summary() {
  const summaryContent = document.querySelector("#summary-body");
  const summaryTotal = document.querySelector("#summary-total");

  const planType = formPlanToggle.dataset.plan; // (Monthly or Yearly)
  const inputPlan = document.querySelector("input[name=plan]:checked"); // radio input checkedsubmit
  const planId = inputPlan.id; // arcade or advanced or pro
  const planValue = inputPlan.value; // number attached to plan

  let totalAmount = Number(planValue);

  const planTag = () => { // mo or yr
    if (planType === "Monthly") {
      return "mo";
    } else {
      return "yr";
    }
  };
  
  let content = `
    <div class="d-flex justify-content-between align-items-center border-bottom pb-4">
      <div>
        <p class="bold-text mb-0">${planId} (${planType})</p>
        <button type="button" class="changeBtn p-0 border-0" onclick="change()">Change</button>
      </div>
      <span class="bold-text">$${planValue}/${planTag()}</span>
    </div>`;

    const selectedInputs = document.querySelectorAll("input.add-on-input");
    selectedInputs.forEach(function (input, index) {
      let price = planType === "Monthly" ? Number(payment.monthly.addOns[index]) : Number(payment.yearly.addOns[index]);
      
      if (input.checked) {
        const inputValue = input.getAttribute("value") ;
        content += `
          <div class="d-flex justify-content-between mb-3">
            <p class="light-text mb-0">${inputValue}</p>
            <span class="font-weight-bold text-secondary">
              +$${price + planTag()}
            </span>
          </div>`;

          totalAmount += price;
      }
    });

    summaryContent.innerHTML = content;

    summaryTotal.querySelector(".total-plan").innerHTML = planType.slice(0, -2).toLowerCase();

    summaryTotal.querySelector(".total-price").innerHTML = `${totalAmount}${planTag()}`;
}

function change(){
  // debugger;
  currentTab = 0;
  let x = document.getElementsByClassName("tab");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }

  showTab(currentTab);
}