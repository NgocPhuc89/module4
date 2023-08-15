
const customers = [
    {
        "id":1,
        "fullName": "Phuc",
        "email": "phuc@gmail.com",
        "phone": "0123456789",
        "address": "an cuu",
        "balance": 100000,
        "deleted": 0
    }
]

const API_CUSTOMER = "http://localhost:8080/api/customers"

function renderCustomer (){
    $.ajax({
        url: API_CUSTOMER,
        method: "GET"
    }).done((data) => {
        let str = '';
        data.forEach((customer) => {
            str = `
            <tr>
    <th>${customer.id}</th>
    <td>${customer.fullName}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.address}</td>
    <td>${customer.balance}</td>
    <td>
      <button type="button" class="btn btn-outline-success">
        <i class="fas fa-user-edit"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-primary">
        <i class="fas fa-plus"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-warning">
        <i class="fas fa-minus"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-primary">
        <i class="fas fa-exchange-alt"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-danger">
        <i class="fas fa-user-slash"></i>
      </button>
    </td>
  </tr>  `
        })
        $('#customer').html(str) ;
    })
        .fail((error) => {
            console.log(error)
        })

}
renderCustomer();



