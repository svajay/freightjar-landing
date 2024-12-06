function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

let containerTypes = [];

const fetchContainerTypes = async () => {
  try {
    showLoader();
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append(
      "x-api-key",
      "WyJhYmhpc2hla0B0aWdlcmxvZ2lzdGljcy5pbiIsInRpZ2VyLWxvamlzdGljcyJd.Zz7MAA.-L-fx349N0qIUc2X0V0TfpOc9zI"
    );
    myHeaders.append("location", "india");
    myHeaders.append("organisation", "tiger-lojistics");
    myHeaders.append("origin", "https://tiger-lojistics.manage.shipthis.co");
    myHeaders.append("referer", "https://tiger-lojistics.manage.shipthis.co/");
    myHeaders.append("region", "india");
    myHeaders.append("usertype", "employee");
    myHeaders.append(
      "Cookie",
      "GAESA=CooBMDBmNDZiOTI4NWExNGY0ZmVjMTYxNjYyMWFiZWNkNWJiYTllZDVjNTQ4NjhmZGUwY2JlYTViNGYyNDU1OGZjMmQyOWY5NDhkZDQwNzE3NTc1OTJjZDI4N2Y1NDlhNTc3ZWZjMmE3NWJiOTZkOGQxMzcxOGRjZTdkZmNiMTFkZjdiMjkwYjNlMGRmEKiCx8DzMQ"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "https://main-app-asia-south1-fast-devops-lckdthv2fa-el.a.run.app/api/v3/incollection/container_type",
      requestOptions
    );
    const data = await response.json();
    return data.data.items;
  } catch (error) {
    console.error("Error fetching container types:", error);
    return [];
  } finally {
    hideLoader();
  }
};

const displayContainerTypes = async () => {
  try {
    const types = await fetchContainerTypes();
    types.forEach((type) => {
      containerTypes.push(type);
    });
  } catch (error) {
    console.error("Error displaying container types:", error);
  }
};

displayContainerTypes();

const containerTypeInput = document.getElementById("containerType");
const containerFullName = document.getElementById("containerFullName");

containerTypeInput.addEventListener("keyup", () => {
  removeElements();
  const inputValue = containerTypeInput.value.trim().toLowerCase(); // Trim to remove leading and trailing spaces
  if (inputValue === "") return; // If input is empty, exit function
  containerTypes.forEach((type) => {
    if (typeof type === "object" && type.code && type.name) {
      if (
        type.code.toLowerCase().startsWith(inputValue) ||
        type.name.toLowerCase().startsWith(inputValue)
      ) {
        containerTypeList(type);
      }
    }
  });
});

function handleContainerSelection(container) {
  containerTypeInput.value = container.code;
  containerFullName.innerText = container.name;
  removeElements();
}

function containerTypeList(container) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";
  listItem.addEventListener("click", () => handleContainerSelection(container));
  listItem.innerHTML = `<span>${container.code}</span> - <span>${container.name}</span>`;
  document.getElementById("container-type-list").appendChild(listItem);
}

function removeElements() {
  const items = document.querySelectorAll(".list-items");
  items.forEach((item) => item.remove());
}

// ************* logic for display list data onClick in input box--START *************

// Function to display container type data list
function displayContainerTypeList() {
  removeElements();
  containerTypes.forEach((type) => {
    containerTypeList(type);
  });
}

// Event listener to handle container type input box click
function handleContainerTypeInputBoxClick(inputBox) {
  inputBox.addEventListener("click", (event) => {
    event.stopPropagation();
    removeElements();
    displayContainerTypeList();

    // Add event listener to remove list on any click outside the input box and data list
    document.addEventListener("click", function clickListener(event) {
      if (
        !inputBox.contains(event.target) &&
        event.target.closest(".list") === null
      ) {
        removeElements();
        document.removeEventListener("click", clickListener);
      }
    });
  });
}

// Handle click events for container type input box
handleContainerTypeInputBoxClick(containerTypeInput);

// Function to handle container type selection
function handleContainerSelection(container) {
  containerTypeInput.value = container.code;
  containerFullName.innerText = container.name;
  removeElements();
}
// ************* logic for display list data onClick in input box--End *************
