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
            items.push(doc.data())
        });
        console.log(items);
    })
}

getItems();