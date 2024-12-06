
document
  .getElementById("createPassword")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    // Password validation logic
    const password = document.getElementById("password").value;

    // Check if password meets the required criteria
    if (password.length < 8) {
      alert(
        "Password must be at least 8 characters long with numbers & symbols."
      );
      return; 
    }

    // Use regular expressions to check for the presence of special characters, numbers, and "@" symbol
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least one special character, one number, and one letter."
      );
      return; 
    }

    const requestBody = JSON.stringify({
      email: email,
      password: password,
    });

    const myHeaders = new Headers();
    myHeaders.append(
      "sec-ch-ua",
      '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append(
      "x-api-key",
      "WyJhYmhpc2hla0B0aWdlcmxvZ2lzdGljcy5pbiIsInRpZ2VyLWxvamlzdGljcyJd.Zz7MAA.-L-fx349N0qIUc2X0V0TfpOc9zI"
    );
    myHeaders.append(
      "User-Agent",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'"
    );
    myHeaders.append("ngsw-bypass", "true");
    myHeaders.append("location", "mumbai");
    myHeaders.append("Accept", "application/json, text/plain, /");
    myHeaders.append("organisation", "tiger-lojistics");
    myHeaders.append(
      "Referer",
      "https://tiger-lojistics'.manage.shipthis.co/'"
    );
    myHeaders.append("region", "india");
    myHeaders.append("x-session-id", "jd9k5hzuh");
    myHeaders.append("usertype", "employee");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: requestBody,
      redirect: "follow",
    };

    fetch(
      "https://api.shipthis.co/api/v3/customer/auth/reset_password",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((result) => {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        alert("Your account has been created successfully!");
        window.location.href = "https://app.freightjar.com/";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert(
          "There was a problem creating your account. Please try again later."
        );
      });
  });
