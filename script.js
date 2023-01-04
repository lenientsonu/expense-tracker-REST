

document.addEventListener('DOMContentLoaded', (e) => {
    axios.get('https://crudcrud.com/api/44ef185831a14bfe82f9a1cbf71344b7/expenseDetails')
    .then((response)=>{
        for(let i of response.data){
            printHistory(i);
        }
    })
    .catch(err=>console.log(err));
});

function onbuttonclick(e){

    //preventing the default behaviour of form submit
    e.preventDefault();
    //getting all the values of form on submit
    const amount = document.getElementById('amount').value;
    const desc = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    //console.log(amount,desc,category);

    //creating a object of expense details
    let expenseDetails = {
        'amount' : amount,
        'desc' : desc,
        'category' : category
    };
    // console.log(expenseDetails);
    
    //using axios for storing expense details to crudcrud endpoint
    axios.post('https://crudcrud.com/api/44ef185831a14bfe82f9a1cbf71344b7/expenseDetails',expenseDetails)
    .then((response)=>{
        console.log(response);
        printHistory(response.data);
    })
    .catch(err=>console.log(err));
    
}

function printHistory(obj){
    //getting expense history list and creating a new list item child in it
    const ul = document.getElementById('expense-list');
    const li = document.createElement('li');
    //modifying newly created list item
    li.appendChild(document.createTextNode(`${obj.amount} - ${obj.category} - ${obj.desc}`));
    li.id = obj._id;
    li.className = 'list-group-item';
    //creating edit and delete button and adding them to list item
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger btn-sm float-right delete';
    delBtn.appendChild(document.createTextNode('Delete'));
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-info btn-sm float-right edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    
    //when edit button is clicked
    editBtn.addEventListener('click', (e)=>{
        document.getElementById('amount').value = obj.amount;
        document.getElementById('description').value = obj.desc;
        document.getElementById('category').value = obj.category;
        li.remove();
        axios.delete(`https://crudcrud.com/api/44ef185831a14bfe82f9a1cbf71344b7/expenseDetails/${obj._id}`)
        .then((response)=>{
                console.log(response.data);
        })
        .catch(err=>console.log(err));
        
    });
    //when delete button is clicked
    delBtn.addEventListener('click', (e)=>{
        axios.delete(`https://crudcrud.com/api/44ef185831a14bfe82f9a1cbf71344b7/expenseDetails/${obj._id}`)
        .then((response)=>{
            console.log('Deleted');
            li.remove();
        })
        .catch(err=>console.log(err));
    });


    ul.appendChild(li);
}