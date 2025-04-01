const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

let records = JSON.parse(localStorage.getItem('records')) || [];

function isDuplicateName(email) {
    return records.some(
        (record) => record.email.toLowerCase() === email.toLowerCase()
    );
}

function displayRecords() {
    recordList.innerHTML = '';
    if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" style="text-align:center; color:red;">No Record Found</td>`;
        recordList.appendChild(row);
    } else {
        records.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${record.name}</td>
              <td>${record.age}</td>
              <td>${record.email}</td>
              <td><button onclick="editRecord(${index})">Edit</button></td>
              <td class="deleteButton"><button onclick="deleteRecords(${index})">Delete</button></td>
            `;
            recordList.appendChild(row);
        });
    }
}

recordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const email = emailInput.value.trim();
    const editIndex = parseInt(editIndexInput.value);

    if (name && age && email) {
        if (isDuplicateName(email) && editIndex === -1) {
            alert('Student already exists');
            return;
        }

        if (editIndex === -1) {
            records.push({ name, age, email });
        } else {
            records[editIndex] = { name, age, email };
            editIndexInput.value = -1;
        }

        localStorage.setItem('records', JSON.stringify(records));
        nameInput.value = '';
        ageInput.value = '';
        emailInput.value = '';
        displayRecords();
    }
});

function editRecord(index) {
    const recordToEdit = records[index];
    nameInput.value = recordToEdit.name;
    ageInput.value = recordToEdit.age;
    emailInput.value = recordToEdit.email;
    editIndexInput.value = index;
}

function deleteRecords(index) {
    let delBtn = document.querySelectorAll('.deleteButton');
    delBtn[index].innerHTML = `
        <i id="yesBtn" onclick="confirmDelete(${index})" style="cursor:pointer; color:green;">✔️</i>
        <i id="noBtn" onclick="resetDelete()" style="cursor:pointer; color:red;">❌</i>
    `;
}

function confirmDelete(index) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    displayRecords();
}

function resetDelete() {
    displayRecords();
}

displayRecords();
