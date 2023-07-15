function getMenu() {
  // fetch(
  //   "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  // )
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const menuDiv = document.querySelector(".Menu");

      for (let i = 0; i < data.length; i += 3) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = i; j < i + 3 && j < data.length; j++) {
          const menuItem = document.createElement("div");
          menuItem.classList.add("menu-item");

          const item = data[j];
          menuItem.innerHTML = `
            <div class="gallery">
              <img src="${item.imgSrc}" />
              <h2>${item.name}</h2>
              <p>Rs. ${item.price}/-</p>
            </div>
          `;

          row.appendChild(menuItem);
        }

        menuDiv.appendChild(row);
      }
      // Call the TakeOrder function after fetching and rendering the menu
      TakeOrder()
        .then((order) => {
          console.log("Order received:", order);
        })
        .then((order) => {
          return orderPrep(order);
        })
        .then((status) => {
          console.log("Order status:", status);
        })
        .then((order) => {
          return payOrder(order);
        })
        .then((status) => {
          console.log("Order-status:", status);
          if (status.paid) {
            thankyouFnc();
          }
        })

        .catch((error) => {
          console.log("Error while taking order:", error);
        });
    })

    .catch((error) => console.log(error));
}

function TakeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(
        "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const burgers = data.filter(
            (item) =>
              item.name === "Cheeseburger" ||
              item.name === "Burrito" ||
              item.name === "Pancakes"
          );

          const order = {
            burgers: [],
          };

          while (order.burgers.length < 3) {
            const randomIndex = Math.floor(Math.random() * burgers.length);
            const randomBurger = burgers[randomIndex];
            order.burgers.push(randomBurger);
          }

          resolve(order);
        })
        .catch((error) => {
          reject(error);
        });
    }, 2500);
  });
}
function orderPrep(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = {
        order_status: true,
        paid: false,
      };

      resolve(status);
    }, 1500);
  });
}
function payOrder(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = {
        order_status: true,
        paid: true,
      };

      resolve(status);
    }, 1000);
  });
}
function thankyouFnc() {
  alert("thankyou for eating with us today!");
}

getMenu();
