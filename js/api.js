
//Load phones
const loadPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}
//Display phones on UI
const displayPhones = phones => {
    const container = document.getElementById('phones-container');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="col mb-3">
        <div class="card h-100 ">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body ">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button class="btn btn-lg btn-success">Details</button>
            </div>
        </div>
    </div>
    `;
        container.appendChild(div);
    })
}