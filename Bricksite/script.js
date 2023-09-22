const BRICKS = [
  {
    "name": "Brickson Brick",
    "desc": "this is a old school brick",
    "style": "is-info",
    "cost": 1,
    "images": ["https://www.kulucrete.co.za/website/wp-content/uploads/2016/11/smooth-brick.jpg"]
  },
  {
    "name": "Bricketty Brick",
    "desc": "this is a step up and a cooler brick",
    "style": "is-warning",
    "cost": 5,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJc_W56qiCUiHHECVkar1jKQSrTniYAaqL_g&usqp=CAU"]
  },
    {
    "name": "MyBrickerty McBrickson",
    "desc": "this is the best brick, The wolf can't blow down!!!",
    "style": "is-success",
    "cost": 100,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6LWKwpEFAfNXgPT6Ot5xdjHbqoKYa6ktG0g&usqp=CAU"]
  }
];

 var stripe = Stripe("pk_test_51IKlwdAhJUZ4ZUqHO9ukmofCvmpp4ttlqsSpupeTYwiDJTYOVnh2n0xNYhYzP9Tkw3ddNXGe5LZliOGu3f8sxX6N001zb0122M");

for (var i = 0; i < BRICKS.length; i++) {
  let newBrick = document.createElement('div');
  newBrick.className = "tile is-parent";

  let newBrickArticle = document.createElement('article');
  newBrickArticle.className = "tile is-child notification " + BRICKS[i].style;

  let newBrickTitle = document.createElement('p');
  newBrickTitle.className = "title";
  newBrickTitle.innerHTML = BRICKS[i].name;

  let newBrickDesc = document.createElement('p');
  newBrickDesc.className = "subtitle";
  newBrickDesc.innerHTML = BRICKS[i].desc;

  let newBrickCost = document.createElement('div');
  newBrickCost.className = "box";
  newBrickCost.innerHTML = "This brick costs: $" + BRICKS[i].cost;

  let newBrickButton = document.createElement('a');
  newBrickButton.id = i;
  newBrickButton.className = "button is-dark";
  newBrickButton.innerHTML = "Buy this brick"
  newBrickButton.onclick = buttonClick;

  newBrickArticle.appendChild(newBrickTitle);
  newBrickArticle.appendChild(newBrickDesc);
  newBrickArticle.appendChild(newBrickCost);
  newBrickArticle.appendChild(newBrickButton);

  newBrick.appendChild(newBrickArticle);
  document.getElementById("bricks").appendChild(newBrick);
}


async function buttonClick(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;

  var id = target.id;
  let i = parseInt(id);

  const API_URL = "https://stripe-checkout-server.ritza.repl.co";

  return fetch(API_URL + "/create-checkout-session", {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: BRICKS[i].name,
      images: BRICKS[i].images,
      desc: BRICKS[i].desc,
      price: BRICKS[i].cost * 100
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}