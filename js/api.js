
//Load phones
const loadPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
};
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
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-lg btn-success">Details</button>
            </div>
        </div>
    </div>
    `;
        container.appendChild(div);
    })
};
//Load phone details 
const loadPhoneDetails = phone => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
};

//Display phone details
const displayPhoneDetails = phone => {
    console.log(phone);
    const container = document.getElementById('phone-details-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card w-50 mx-auto">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
            <h6 class="card-title">${phone.brand}</h6>
            <p class="card-text">${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
            <p class="card-text">${phone.mainFeatures.chipSet}</p>
            <p class="card-text">${phone.mainFeatures.displaySize}</p>
            <p class="card-text">${phone.mainFeatures.memory}</p>

        </div>   
    </div>
    `;
    container.appendChild(div);
};