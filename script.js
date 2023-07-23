function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo_input");
    db.collection("todo_items").add({
        text: text.value,
        status: "active"
    });

    text.value = "";
}

function getItems(){
    db.collection("todo_items").onSnapshot((snapshot) => {
        console.log(snapshot);
        let items = [];
        snapshot.docs.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            })
        });
        generateItems(items);
    })
}

function generateItems(items){

    let itemHTML = ""; 
    items.forEach((item) =>{
        console.log(item);
        itemHTML += `
            <div class="todo">
                <div class="check">
                    <div class="check_mark">
                    </div>
                </div>
                <div class="new_todo_text">
                    ${item.text}
                </div>
            </div>
        `
    })

    document.querySelector(".todo_list").innerHTML = itemHTML;
}

getItems();