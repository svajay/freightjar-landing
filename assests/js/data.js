function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}



let portFullNames = [];
let airportFullNames = [];

const sortedPorts = portFullNames.map((port) => port.code).sort();

const fclShortNameOrigin = document.getElementById("fclShortNameOrigin");
const fclFullNameOrigin = document.getElementById("fclFullNameOrigin");
const fclShortNameDestination = document.getElementById(
  "fclShortNameDestination"
);
const fclFullNameDestination = document.getElementById(
  "fclFullNameDestination"
);

const sortedAirPort = airportFullNames.map((port) => port.code).sort();

const airShortNameOrigin = document.getElementById("airShortNameOrigin");
const airFullNameOrigin = document.getElementById("airFullNameOrigin");
const airShortNameDestination = document.getElementById(
  "airShortNameDestination"
);
const airFullNameDestination = document.getElementById(
  "airFullNameDestination"
);

// ############################################################################
const fetchPorts = async () => {
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
      "https://main-app-asia-south1-fast-devops-lckdthv2fa-el.a.run.app/api/v3/incollection/port",
      requestOptions
    );
    const data = await response.json();
    return data.data.items.map((port) => ({
      code: port.code,
      name: port.name,
    }));
  } catch (error) {
    console.error("Error fetching ports:", error);
    return [];
  } finally {
    hideLoader();
  }
};

const displayPorts = async () => {
  try {
    const ports = await fetchPorts();
    ports.forEach((port) => {
      portFullNames.push(port);
    });
  } catch (error) {
    console.error("Error displaying port options:", error);
  }
};

displayPorts();

// ############################################################################

// airport ################################################

const fetchAirports = async () => {
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
      "GAESA=CooBMDBmNDZiOTI4NWE4ZWQ0ZTg1ZDVlM2VmZDAzNDVkNmRlZGFkM2FkN2U2N2ZkNjg5NzVlYzNiZGNmZjNmODcxYjU2Njc3ZWYzYWM0MDViNTE4OWY1ZWU3ODJiMGUzYjI1Yzk4NTI3ODQyNjdiMGM2MmQxZGYzMmJkYWQxMzg1MGI1ZjlhYWY0MDJjEKytxfLzMQ"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "https://main-app-asia-south1-fast-devops-lckdthv2fa-el.a.run.app/api/v3/incollection/airport",
      requestOptions
    );
    const data = await response.json();
    return data.data.items;
  } catch (error) {
    console.error("Error fetching airports:", error);
    return [];
  } finally {
    hideLoader();
  }
};

// Function to update airport data in input boxes
// Function to handle airport selection
airShortNameOrigin.addEventListener("keyup", () => {
  removeElements();
  for (const airport of airportFullNames) {
    if (
      airport.code
        .toLowerCase()
        .startsWith(airShortNameOrigin.value.toLowerCase()) &&
      airShortNameOrigin.value !== ""
    ) {
      airOriginList(airport.code, OriginDisplayNames);
    }
  }
});

airShortNameDestination.addEventListener("keyup", () => {
  removeElements();
  for (const airport of airportFullNames) {
    if (
      airport.code
        .toLowerCase()
        .startsWith(airShortNameDestination.value.toLowerCase()) &&
      airShortNameDestination.value !== ""
    ) {
      airDestinationList(airport.code, DestinationDisplayNames);
    }
  }
});

// Function to update airport data in input boxes
const selectedAirports = {
  origin: null,
  destination: null,
};

// Function to update airport data in input boxes
function updateAirportInputBoxes(airport, field) {
  if (field === "origin") {
    airShortNameOrigin.value = airport.code;
    airFullNameOrigin.innerText = airport.name;
    selectedAirports.origin = airport;
  } else if (field === "destination") {
    airShortNameDestination.value = airport.code;
    airFullNameDestination.innerText = airport.name;
    selectedAirports.destination = airport;
  }
}

// Function to handle airport selection
function handleAirportSelection(value, inputBox, fullNameBox, field) {
  const airport = airportFullNames.find((airport) => airport.code === value);
  if (airport) {
    updateAirportInputBoxes(airport, field);
    removeElements();
  }
  inputBox.value = value;
  fullNameBox.innerText = airport ? airport.name : "Unknown Airport";
}

// Event listener for "from" airport input
airShortNameOrigin.addEventListener("input", () => {
  const input = airShortNameOrigin.value.toLowerCase();
  updateAirportList(input, "origin");
});

// Event listener for "to" airport input
airShortNameDestination.addEventListener("input", () => {
  const input = airShortNameDestination.value.toLowerCase();
  updateAirportList(input, "destination");
});

// Function to update airport list based on input
function updateAirportList(input, field) {
  removeElements();
  airportFullNames.forEach((airport) => {
    if (airport.code.toLowerCase().startsWith(input) && input !== "") {
      airOriginList(
        airport.code,
        field === "origin" ? OriginDisplayNames : DestinationDisplayNames,
        field
      );
    }
  });
}

// Function to display airport data in the list
function airOriginList(value, onClickHandler, field) {
  const airport = airportFullNames.find((airport) => airport.code === value);
  const listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";
  listItem.addEventListener("click", () => {
    updateAirportInputBoxes(airport, field);
    removeElements();
  });
  listItem.innerText = `${value} - ${airport.name}`;
  document.getElementById(`air-${field}-list`).appendChild(listItem);
}

// Function to display airports
const displayAirports = async () => {
  try {
    const airports = await fetchAirports();
    airports.forEach((airport) => {
      airportFullNames.push(airport);
    });
  } catch (error) {
    console.error("Error displaying airport options:", error);
  }
};

displayAirports();

// Functions to handle airport selection and display
function OriginDisplayNames(value) {
  handleAirportSelection(value, airShortNameOrigin, airFullNameOrigin);
}

function DestinationDisplayNames(value) {
  handleAirportSelection(
    value,
    airShortNameDestination,
    airFullNameDestination
  );
}

// Function to handle airport selection
// Function to handle airport selection
function handleAirportSelection(value, inputBox, fullNameBox, field) {
  const airport = airportFullNames.find((airport) => airport.code === value);
  if (airport) {
    updateAirportInputBoxes(airport, field);
    removeElements();
  }
  inputBox.value = value;
  fullNameBox.innerText = airport ? airport.name : "Unknown Airport";
}

// Event listener for "from" airport input
airShortNameOrigin.addEventListener("input", () => {
  const input = airShortNameOrigin.value.toLowerCase();
  updateAirportList(input, "origin");
});

// Event listener for "to" airport input
airShortNameDestination.addEventListener("input", () => {
  const input = airShortNameDestination.value.toLowerCase();
  updateAirportList(input, "destination");
});

// Function to update airport list based on input
function updateAirportList(input, field) {
  removeElements();
  airportFullNames.forEach((airport) => {
    if (airport.code.toLowerCase().startsWith(input) && input !== "") {
      airOriginList(
        airport.code,
        field === "origin" ? OriginDisplayNames : DestinationDisplayNames
      );
    }
  });
}

// Function to display airport data in the list
function airOriginList(value, onClickHandler) {
  const airport = airportFullNames.find((airport) => airport.code === value);
  const listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";
  listItem.addEventListener("click", () => {
    updateAirportInputBoxes(
      airport,
      onClickHandler === OriginDisplayNames ? "origin" : "destination"
    );
    removeElements();
  });
  listItem.innerText = `${value} - ${airport.name}`;
  document.getElementById("air-o-list").appendChild(listItem);
}

// Function to display airport data in the list
function airDestinationList(value, onClickHandler) {
  const airport = airportFullNames.find((airport) => airport.code === value);
  const listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";
  listItem.addEventListener("click", () => {
    updateAirportInputBoxes(
      airport,
      onClickHandler === OriginDisplayNames ? "origin" : "destination"
    );
    removeElements();
  });
  listItem.innerText = `${value} - ${airport.name}`;
  document.getElementById("air-d-list").appendChild(listItem);
}

//end airport ############################################################

fclShortNameOrigin.addEventListener("keyup", () => {
  removeElements();
  for (const port of portFullNames) {
    if (
      port.code
        .toLowerCase()
        .startsWith(fclShortNameOrigin.value.toLowerCase()) &&
      fclShortNameOrigin.value !== ""
    ) {
      fclOriginList(port.code, OriginDisplayNames);
    }
  }
});

fclShortNameDestination.addEventListener("keyup", () => {
  removeElements();
  for (const port of portFullNames) {
    if (
      port.code
        .toLowerCase()
        .startsWith(fclShortNameDestination.value.toLowerCase()) &&
      fclShortNameDestination.value !== ""
    ) {
      fclDestinationList(port.code, DestinationDisplayNames);
    }
  }
});

function handlePortSelection(value, inputBox, fullNameBox) {
  const port = portFullNames.find((port) => port.code === value);
  inputBox.value = value;
  fullNameBox.innerText = port ? port.name : "Unknown Port";
  removeElements();
}

function OriginDisplayNames(value) {
  handlePortSelection(value, fclShortNameOrigin, fclFullNameOrigin);
}

function DestinationDisplayNames(value) {
  handlePortSelection(value, fclShortNameDestination, fclFullNameDestination);
}

function fclOriginList(value, onClickHandler) {
  const port = portFullNames.find((port) => port.code === value);
  const listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";
  listItem.addEventListener("click", () => onClickHandler(value));
  listItem.innerText = `${value} - ${port.name}`;
  document.getElementById("fcl-o-list").appendChild(listItem);
}

function fclDestinationList(value, onClickHandler) {
  const port = portFullNames.find((port) => port.code === value);
  const listItem = document.createElement("li");
  listItem.classList.add("list-items");
  listItem.style.cursor = "pointer";
  listItem.addEventListener("click", () => onClickHandler(value));
  listItem.innerText = `${value} - ${port.name}`;
  document.getElementById("fcl-d-list").appendChild(listItem);
}

function removeElements() {
  const items = document.querySelectorAll(".list-items");
  items.forEach((item) => item.remove());
}

// ----- Script for by default autofill value in Search Container Start--------
window.addEventListener("DOMContentLoaded", () => {
  // Autofill airport values
  airShortNameOrigin.value = "DEL";
  airFullNameOrigin.innerText = "Indira Gandhi International Airport";
  airShortNameDestination.value = "GDL";
  airFullNameDestination.innerText = "Don Miguel  International Airport";

  // Autofill port values
  fclShortNameOrigin.value = "INMUN";
  fclFullNameOrigin.innerText = "Mundra";
  fclShortNameDestination.value = "AEJEA";
  fclFullNameDestination.innerText = "Jebel Ali";

  // Autofill Container Type values
  containerType.value = "40RF";
  containerFullName.innerText = "40RF";

  // Autofill Weight Type values
  weightShortNameOrigin.value = "456";
  weightFullNameOrigin.innerText = "456";

  // Autofill Air Weight Type Values
  airWeightShortNameOrigin.value = "336";
  airWeightFullNameOrigin.innerText = "336";
});
// ----- Script for by default autofill value in Search Container End --------

// ************* logic for display list data onClick in input box Start *************

// Function to display FCL port data list
function displayFCLPortList(field) {
  removeElements();
  portFullNames.forEach((port) => {
    if (field === "origin") {
      fclOriginList(port.code, OriginDisplayNames);
    } else if (field === "destination") {
      fclDestinationList(port.code, DestinationDisplayNames);
    }
  });
}

// Function to display airport data list
function displayAirportList(field) {
  removeElements();
  airportFullNames.forEach((airport) => {
    if (field === "origin") {
      airOriginList(airport.code, OriginDisplayNames, field);
    } else if (field === "destination") {
      airDestinationList(airport.code, DestinationDisplayNames, field);
    }
  });
}

// Event listener to handle input box click
function handleInputBoxClick(inputBox, field) {
  inputBox.addEventListener("click", () => {
    event.stopPropagation();
    removeElements();
    displayFCLPortList(field);
    displayAirportList(field);

    // Add event listener to remove list on any click outside the input boxes and data lists
    document.addEventListener("click", function (event) {
      if (
        !inputBox.contains(event.target) &&
        event.target.closest(".list") === null
      ) {
        removeElements();
        document.removeEventListener("click", arguments.callee);
      }
    });
  });
}

// Handle click events for FCL ports input boxes
handleInputBoxClick(fclShortNameOrigin, "origin");
handleInputBoxClick(fclShortNameDestination, "destination");

// Handle click events for airport input boxes
handleInputBoxClick(airShortNameOrigin, "origin");
handleInputBoxClick(airShortNameDestination, "destination");

// Event listener to handle input box click for FCL ports
function handleFCLInputBoxClick(inputBox, field) {
  inputBox.addEventListener("click", () => {
    removeElements();
    displayFCLPortList(field);

    // Add event listener to remove list on any click outside the input boxes and data lists
    document.addEventListener("click", function (event) {
      if (
        !inputBox.contains(event.target) &&
        event.target.closest(".list") === null
      ) {
        removeElements();
        document.removeEventListener("click", arguments.callee);
      }
    });
  });
}

// Handle click events for FCL ports "FROM PORT" and "TO PORT" input boxes
handleFCLInputBoxClick(fclShortNameOrigin, "origin");
handleFCLInputBoxClick(fclShortNameDestination, "destination");

// ************* logic for display list data onClick in input box--End *************
