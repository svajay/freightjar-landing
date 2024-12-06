// Function to get URL parameter by name
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Retrieve encrypted string from URL parameter
const queryString = window.location.href;
// console.log(queryString);
const encryptedString = queryString.split("=")[1];
// console.log(encryptedString);

const key = "gUjXn2r5u8x/A?D(G+KbPeShVmYp3s6v";
const iv = "0123456789123456";

// Decode Base64
const ciphertext = CryptoJS.enc.Base64.parse(encryptedString);

// Decrypt using AES-256-CBC
const decryptedBytes = CryptoJS.AES.decrypt(
  { ciphertext },
  CryptoJS.enc.Utf8.parse(key),
  { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC }
);

// Convert decrypted bytes to string
const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

document.getElementById("decryptedText").textContent = decryptedText;

// Parse decrypted data
const decryptedData = JSON.parse(decryptedText);

// Store email in localStorage
localStorage.setItem("email", decryptedData.email || "");

// Fill form fields with decrypted data
document.getElementById("fullname").value = decryptedData.name || "";
document.getElementById("email").value = decryptedData.email || "";
document.getElementById("phone").value = decryptedData.number || "";
document.getElementById("companyname").value = decryptedData.company_name || "";

// Simulate delay for  0.4 seconds before showing the form
setTimeout(function () {
  document.getElementById("loading").style.display = "block";
  document.getElementById("content").style.display = "none";
  document.getElementById("createCustomer").style.display = "block";
  document.getElementById("submitButton").click();
}, 400);

// Handle form submission
document
  .getElementById("createCustomer")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const companyname = document.getElementById("companyname").value;

    // Construct headers
    const myHeaders = new Headers();
    myHeaders.append(
      "x-api-key",
      "WyJhYmhpc2hla0B0aWdlcmxvZ2lzdGljcy5pbiIsInRpZ2VyLWxvamlzdGljcyJd.Zz7MAA.-L-fx349N0qIUc2X0V0TfpOc9zI"
    );
    myHeaders.append("content-type", "application/json");
    myHeaders.append("location", "mumbai");
    myHeaders.append("ngsw-bypass", "true");
    myHeaders.append("organisation", "tiger-lojistics");
    myHeaders.append("region", "india");
    myHeaders.append("usertype", "employee");
    myHeaders.append(
      "Cookie",
      "GAESA=CooBMDBhMjI0MDRkYzk2YzBhYjExMzc0MThjZTc3MzBmYzE3ZWE4OTM0MjU4NjU5NTc3MzA2MTZhNTlmYzIwMjIxZTI2NGNmYzM2OWE4MjNhNjEwN2I3MzNhYjg2MThlOTc3ZDJkMjE4NjM1YmFjMWMyOGU4ZGY2Yjg4MTliY2NjYWRiMDcwM2NhNGIwEJXYktfuMQ"
    );

    // Construct request body
    const bodyData = {
      reqbody: {
        company: {
          is_agent: false,
          name: companyname,
        },
        custom: {
          customer_type: "Properiter",
        },
        address: {
          city: {},
        },
        accounting: {
          credit_limit: 0,
          external_balance: 0,
          is_sez: false,
          gst_treatment: "registered_composition",
          currency: {
            _id: {
              $oid: "581451213a90d4b7e8cdcf37",
            },
            _cls_: "currency",
            name: "INR",
            __display: "INR",
          },
        },
        automatic_ar_reminder: {
          enable_automatic_reminder: false,
          amount: 0,
        },
        notification: {
          sea_shipment_email: {
            confirmed: false,
            in_transit: false,
            vessel_arrived: false,
            vessel_unloaded: false,
            arrived_inland: false,
            arrived_warehouse: false,
            customs_cleared: false,
            released_pickedup: false,
            completed: false,
          },
          air_shipment_email: {
            confirmed: false,
            in_transit: false,
            arrived: false,
            customs_cleared: false,
            released_pickedup: false,
            completed: false,
          },
          land_shipment_email: {
            confirmed: false,
            in_transit: false,
            arrived: false,
            completed: false,
          },
          documentation_job_email: {
            confirmed: false,
            completed: false,
          },
          quotation_email: {
            new_quote_published_email_notification: false,
            quote_accepted_notification: false,
          },
        },
        "__cache.credit_status": {},
        primary_contact_person: {
          additional_emails: [],
          enable_portal_access: true,
          first_name: fullname,
          name: fullname,
          mobile: phone,
          email: email,
        },
        opening_balance: {},
        account_contact_person: {
          same_as_primary: true,
          additional_emails: [],
          enable_portal_access: true,
          first_name: fullname,
          name: fullname,
          mobile: phone,
          email: email,
        },
        __scp: {},
        some_other_field: "",
        is_inter_branch: false,
        documents: [],
        full_address: "",
        full_address_field_compute: "",
      },
      action_op_data: {},
      captcha: {},
    };

    // Make API call
    fetch(
      "https://main-app-hypercorn-hypercorn-asia-south1-fast-dev-lckdthv2fa-el.a.run.app/api/v3/incollection/customer?location=mumbai&replicate_count=0",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(bodyData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        // alert("Customer registered successfully!");
        window.location.href = "icicipassword.html";
      })
      .catch((error) => {
        console.error(error);
        alert(
          "There was a problem registering the customer. Please try again later."
        );
      });
  });
