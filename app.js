var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

const formToggle = document.querySelector(".plan-option-toggle");

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
  } else {
    nextBtn.innerHTML = "Next Step";
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
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
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

// resets the class of inputs
function classReset(e){
  // checks if the input alredy has the class invalid
  if (e.classList.contains("invalid")) {
    e.classList.remove("invalid");
  }
}


formToggle.addEventListener("click", function (e) {
  // toggles the active class
  formToggle.classList.toggle('active');

  // stores the year plan
  const monthlyPlan = [ "9/mo","12/mo", "15/mo"];
  const yearlyPlan = [ "90/yr","120/yr", "150/yr"];

  // element for displaying the price
  const prices = document.querySelectorAll(".price");

  // element for showing discount
  const discount = document.querySelectorAll(".discount");

  // all the radio inputs
  const planInput = document.querySelectorAll(".plan-input");

  // checks if the toggle button has the active class
  if (formToggle.classList.contains("active")) {
    formToggle.dataset.plan = "yearly";

    for (let i = 0; i < monthlyPlan.length; i++) {
      prices[i].textContent = `$${yearlyPlan[i]}`;
      discount[i].classList.add("show");

      // changes the value of input to match plan
      planInput[i].value = yearlyPlan[i];
    }

  } else {
    formToggle.dataset.plan = "monthly";
    
    for (let i = 0; i < monthlyPlan.length; i++) {
      prices[i].textContent = `$${monthlyPlan[i]}`;
      discount[i].classList.remove("show");

      planInput[i].value = monthlyPlan[i];
    }
  }

});