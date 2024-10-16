const arr = JSON.parse(localStorage.getItem("array")) || [];

display(...arr);

// submit actions
//1.get values of the form fields after the form submission
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const studentName = document.querySelector("#name").value;
    const studentId = document.querySelector("#id").value;
    const studentEmail = document.querySelector("#email").value;
    const studentPhone = document.querySelector("#phone").value;

    // storing into local storage
    let obj = { name: "", id: 0, email: "", phone: 0 };
    obj.name = studentName;
    obj.id = studentId;
    obj.email = studentEmail;
    obj.phone = studentPhone;
    arr.push(obj);
    localStorage.setItem("array", JSON.stringify(arr));
    display(obj);
    //to include verticalo scroll after submitting data more than the height of the list-section
    const listSection = document.querySelector(".list-section");
    console.log(listSection);
    if (listSection.scrollHeight > listSection.clientHeight) {
      listSection.style.overflowY = "auto";
    } else {
      listSection.style.overflowY = "hidden";
    }
  });
//display the list of data registered and stored in local storage
function display(...arg) {
  for (let item of arg) {
    console.log(arg);
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const inputId = document.createElement("input");
    inputId.type = "number";
    inputId.disabled = true;
    inputId.style.border = "none";
    const parent = document.querySelector("tbody");
    parent.appendChild(tr);
    tr.appendChild(tdId);
    tdId.appendChild(inputId);

    // when the display is called from the submit evenlistener and arg is object
    if (Array.isArray(arg) === false) {
      item = arg;
    }

    inputId.value = item.id;
    const tdName = document.createElement("td");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.disabled = true;
    inputName.style.border = "none";

    tr.appendChild(tdName);
    tdName.appendChild(inputName);
    inputName.value = item.name;
    const tdEmail = document.createElement("td");
    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.disabled = true;
    inputEmail.style.border = "none";
    tr.appendChild(tdEmail);
    tdEmail.appendChild(inputEmail);
    inputEmail.value = item.email;
    const tdPhone = document.createElement("td");
    const inputPhone = document.createElement("input");
    inputPhone.type = "tel";
    inputPhone.disabled = true;
    inputPhone.style.border = "none";

    tr.appendChild(tdPhone);
    tdPhone.appendChild(inputPhone);
    inputPhone.value = item.phone;
    //hide input button while showing just the list

    //edit button
    const tdEditBtn = document.createElement("td");
    tr.appendChild(tdEditBtn);
    const editbtn = document.createElement("button");
    editbtn.innerHTML = "Edit";
    editbtn.style.color = "beige";

    //applying style to btnedit
    editbtn.style.background = "green";
    editbtn.addEventListener("mouseover", function () {
      editbtn.style.opacity = 0.6;
    });
    editbtn.addEventListener("mouseout", function () {
      editbtn.style.opacity = 1;
    });

    editbtn.classList.add("item");
    tdEditBtn.appendChild(editbtn);

    //delete button
    const tdDeleteBtn = document.createElement("td");
    tr.appendChild(tdDeleteBtn);
    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deletebtn.classList.add("item");
    tdDeleteBtn.appendChild(deletebtn);
    //applying style to btndelete
    deletebtn.style.background = "red";
    deletebtn.addEventListener("mouseover", function () {
      deletebtn.style.opacity = 0.6;
    });
    deletebtn.addEventListener("mouseout", function () {
      deletebtn.style.opacity = 1;
    });

    //edit functionality
    editbtn.addEventListener("click", function () {
      editbtn.disabled = true;
      inputId.disabled = true;
      inputEmail.disabled = false;
      inputName.disabled = false;
      inputPhone.disabled = false;
      inputEmail.placeholder = "Email";
      inputName.placeholder = "Name";
      inputPhone.placeholder = "Phone";
      inputEmail.style.border = "1px solid black";
      inputName.style.border = "1px solid black";
      inputPhone.style.border = "1px solid black";
      tr.style.backgroundColor = "#2596be";
      const tdSaveBtn = document.createElement("td");
      tr.appendChild(tdSaveBtn);
      const savebtn = document.createElement("button");
      savebtn.innerHTML = "save";
      savebtn.classList.add("item");
      tdSaveBtn.appendChild(savebtn);
      document.getElementById("save").style.display = "inline-block";

      savebtn.addEventListener("click", function () {
        item.name = inputName.value;
        item.email = inputEmail.value;
        item.phone = inputPhone.value;
        inputEmail.disabled = true;
        inputName.disabled = true;
        inputPhone.disabled = true;
        localStorage.setItem("array", JSON.stringify(arr));
        savebtn.style.display = "none";
        document.getElementById("save").style.display = "none";
        tr.style.backgroundColor = "azure";
        tdSaveBtn.style.display = "none";
        inputEmail.style.border = "none";
        inputName.style.border = "none";
        inputPhone.style.border = "none";
        editbtn.disabled = false;
      });
    });
    //delete functionality
    deletebtn.addEventListener("click", function (e) {
      // Finding the index of the item in the array based on its ID (assuming ID is unique)
      let x = arr.findIndex((student) => student.id == item.id);
      console.log(x);
      if (x > -1) {
        // Remove the item from the array (local storage)
        arr.splice(x, 1);

        // Update localStorage
        localStorage.setItem("array", JSON.stringify(arr));

        // Remove the row from the DOM
        e.target.parentElement.parentElement.remove();
      }
    });
  }
}

//vertical scroll if the contents height inside the list-section is exceeding the list-section height
const listSection = document.querySelector(".list-section");
console.log(listSection);
if (listSection.scrollHeight > listSection.clientHeight) {
  listSection.style.overflowY = "auto";
} else {
  listSection.style.overflowY = "hidden";
}
