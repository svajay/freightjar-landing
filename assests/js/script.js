
// ---- script for owlCarousel slider in home page ------
$(".owl-carousel").owlCarousel({
  loop: true,
  autoplay: true,
  items: 1,
  nav: false,
  autoplayHoverPause: true,
  animateOut: "slideOutUp",
  animateIn: "slideInUp",
});

//script for port,container & airport data show list.& active (FCL,LCL,AIR)in home page 
let fcl = document.getElementById("fcl");
let lcl = document.getElementById("lcl");
let air = document.getElementById("air");
let portsSearchContainer = document.getElementById("portsSearchContainer");
let airportsSearchContainer = document.getElementById(
  "airportsSearchContainer"
);
let containerInput = document.getElementById("containerInput");
let weightInput = document.getElementById("weightInput");

document.getElementById("fclActive").addEventListener("click", function () {
  fcl.classList.add("sel-active");
  lcl.classList.remove("sel-active");
  air.classList.remove("sel-active");

  portsSearchContainer.classList.remove("display-none");
  airportsSearchContainer.classList.add("display-none");

  containerInput.classList.remove("display-none");
  weightInput.classList.add("display-none");
});

document
  .getElementById("fclActive")
  .addEventListener("touchstart", function () {
    fcl.classList.add("sel-active");
    lcl.classList.remove("sel-active");
    air.classList.remove("sel-active");

    portsSearchContainer.classList.remove("display-none");
    airportsSearchContainer.classList.add("display-none");

    containerInput.classList.add("display-none");
    weightInput.classList.remove("display-none");
  });

document.getElementById("lclActive").addEventListener("click", function () {
  fcl.classList.remove("sel-active");
  lcl.classList.add("sel-active");
  air.classList.remove("sel-active");

  portsSearchContainer.classList.remove("display-none");
  airportsSearchContainer.classList.add("display-none");

  containerInput.classList.add("display-none");
  weightInput.classList.remove("display-none");
});

document
  .getElementById("lclActive")
  .addEventListener("touchstart", function () {
    fcl.classList.remove("sel-active");
    lcl.classList.add("sel-active");
    air.classList.remove("sel-active");

    portsSearchContainer.classList.remove("display-none");
    airportsSearchContainer.classList.add("display-none");
  });

document.getElementById("airActive").addEventListener("click", function () {
  fcl.classList.remove("sel-active");
  lcl.classList.remove("sel-active");
  air.classList.add("sel-active");

  portsSearchContainer.classList.add("display-none");
  airportsSearchContainer.classList.remove("display-none");
});

document
  .getElementById("airActive")
  .addEventListener("touchstart", function () {
    fcl.classList.remove("sel-active");
    lcl.classList.remove("sel-active");
    air.classList.add("sel-active");

    portsSearchContainer.classList.add("display-none");
    airportsSearchContainer.classList.remove("display-none");
  });

  