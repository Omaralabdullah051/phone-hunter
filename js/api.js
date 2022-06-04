//handle error
const message = (text) => {
  document.getElementById("message").innerText = text;
};
//handle spinner
const spinner = (displayType) => {
  document.getElementById("spinner").style.display = displayType;
};
//handle text content
const textContent = () => {
  document.getElementById("phones-container").textContent = "";
  document.getElementById("phone-details-container").textContent = "";
  document.getElementById("more-phone-container").textContent = "";
};

//Load phones
const loadPhones = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  spinner("block");
  document.getElementById("see-more-btn").style.display = "none";
  document.getElementById("more-phone-container").textContent = "";
  if (searchField.value === "") {
    spinner("none");
    message("No result found");
    textContent();
    document.getElementById("see-more-btn").style.display = "none";
  } else {
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => displayPhones(data.data));
  }
  searchField.value = "";
};

//Display phones on UI
const displayPhones = (phones) => {
  const container = document.getElementById("phones-container");
  spinner("none");
  message("No result found");
  textContent();
  const maximumPhones = phones.slice(0, 20);
  maximumPhones?.forEach((phone) => {
    const div = document.createElement("div");
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
    spinner("none");
    message(`${phones.length} results found`);
  });
  // show see more button and add event handler
  if (phones.length > 20) {
    document.getElementById("see-more-btn").style.display = "block";
    document
      .getElementById("see-more-btn")
      .addEventListener("click", function () {
        const container = document.getElementById("more-phone-container");
        container.textContent = "";
        const otherPhones = phones.slice(20);
        otherPhones?.forEach((phone) => {
          const div = document.createElement("div");
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
          document.getElementById("see-more-btn").style.display = "none";
        });
      });
  }
};

//Load phone details
const loadPhoneDetails = (phone) => {
  spinner("block");
  fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

//Display phone details
const displayPhoneDetails = (phone) => {
  const container = document.getElementById("phone-details-container");
  spinner("none");
  message("");
  textContent();
  document.getElementById("see-more-btn").style.display = "none";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"><span class="fw-bolder">Name:</span> ${
              phone.name
            }</h5>
            <h6 class="card-text"><span class="fw-bolder">Brand:</span> ${
              phone.brand
            }</h6>
            <p class="card-text"><span class="fw-bolder">Release Date:</span> ${
              phone.releaseDate ? phone.releaseDate : "No release date found"
            }</p>
            <p class="card-text"><span class="fw-bolder">Chipset:</span> ${
              phone.mainFeatures.chipSet
                ? phone.mainFeatures.chipSet
                : "No chipset found"
            }</p>
            <p class="card-text"><span class="fw-bolder">Display Size:</span> ${
              phone.mainFeatures.displaySize
                ? phone.mainFeatures.displaySize
                : "No display size found"
            }</p>
            <p class="card-text"><span class="fw-bolder">Memory:</span> ${
              phone.mainFeatures.memory
                ? phone.mainFeatures.memory
                : "No memeory found"
            }</p>
            <p class="card-text"><span class="fw-bolder">Sensors:</span> ${
              phone.mainFeatures.sensors
                ? phone.mainFeatures.sensors
                : "NO sensor found"
            }</p>
            <p class="card-text"><span class="fw-bolder">Bluetooth:</span> ${
              phone?.others?.Bluetooth
                ? phone.others.Bluetooth
                : "No bluetooth found"
            }</p>
            <p class="card-text"><span class="fw-bolder">GPS:</span> ${
              phone?.others?.GPS ? phone.others.GPS : "No GPS found"
            }</p>
            <p class="card-text"><span class="fw-bolder">NFC:</span> ${
              phone?.others?.NFC ? phone.others.NFC : "No NFC found"
            }</p>
            <p class="card-text"><span class="fw-bolder">Radio:</span> ${
              phone?.others?.Radio ? phone.others.Radio : "No radio found"
            }</p>
            <p class="card-text"><span class="fw-bolder">USB:</span> ${
              phone?.others?.USB ? phone.others.USB : "No USB found"
            }</p>
            <p class="card-text"><span class="fw-bolder">WLAN:</span> ${
              phone?.others?.WLAN ? phone.others.WLAN : "No WLAN found"
            }</p>
            
        </div>   
    </div>
    `;
  container.appendChild(div);
};
