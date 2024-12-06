document
  .getElementById("createCustomer")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let form = document.getElementById("createCustomer");
    let fullname = form.elements["fullname"].value;
    let email = form.elements["email"].value;
    let phone = form.elements["phone"].value;
    let companyname = form.elements["companyname"].value;

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

    const raw = JSON.stringify({
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
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://main-app-asia-south1-fast-devops-lckdthv2fa-el.a.run.app/api/v3/incollection/customer?location=mumbai&replicate_count=0",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        alert("Customer registered successfully!");
        window.location.href = "password.html";
      })
      .catch((error) => {
        console.error(error);
        alert(
          "There was a problem registering the customer. Please try again later."
        );
      });
  });




  