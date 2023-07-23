function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo_input");
    db.collection("todo_items").add({
        text: text.value,
        status: "active"
    });

    document.getElementById("todo_input").value = "";
}