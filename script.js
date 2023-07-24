
function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo_input");
    db.collection("todo_items").add({
        text: text.value,
        status: "active"
    });

    text.value = "";
}

function getItems() {
    db.collection("todo_items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        generateItems(items);
    });
}

function toggleCheckMarkClass(checkMark, status) {
    if (status === "Completed") {
        checkMark.classList.add("check_mark_done");
        checkMark.classList.remove("check_mark");
    } else if (status === "active") {
        checkMark.classList.add("check_mark");
        checkMark.classList.remove("check_mark_done");
    }
}

function listenForStatusChanges(docId) {
    const docRef = db.collection("todo_items").doc(docId);

    docRef.onSnapshot((snapshot) => {
        if (snapshot.exists) {
            const data = snapshot.data();
            const status = data.status;
            const checkMark = document.querySelector(`[data-id="${docId}"]`);

            if (checkMark) {
                toggleCheckMarkClass(checkMark, status);
            }
        }
    });
}

function generateItems(items) {
    let itemHTML = "";
    items.forEach((item) => {
        itemHTML += `
            <div class="todo">
                <div class="new_todo_text">
                    ${item.text}
                </div>
                <div class="check">
                    <div data-id="${item.id}" class="${item.status === 'Completed' ? 'check_mark_done' : 'check_mark'}"></div>
                    <span class="material-symbols-outlined">delete</span>
                </div>
            </div>
        `;
    });

    document.querySelector(".todo_list").innerHTML = itemHTML;
    createEventListeners();
}

function createEventListeners() {
    let todoCheckMarks = document.querySelectorAll(".todo .check .check_mark, .todo .check .check_mark_done");
    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", function () {
            markCompleted(checkMark.dataset.id);
        });
    });
}


function markCompleted(id){
    let item = db.collection("todo_items").doc(id);

    item.get().then(function(doc){
        if(doc.exists){
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status: "Completed"
                })
            } else if(status == "Completed"){
                item.update({
                    status: "active"
                })
            }
        }
    })
}

const deleteItems = document.getElementsByClassName(".delete");
deleteItems.addEventListener("click", deleteItem);

function deleteItem(){
    db.collection("todo_items").doc("id").delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

    



getItems();
