const stripe = Stripe('pk_test_51MRv0tFecsPiqRmb4ewKRMSbPh0znYmSmBJxEcdI5pF8Efc4a9omHy4odjtT4M2CpLTcUdRp5A0BbGPYGMgvkdlW00ke3K85AZ');

let elements;

initialize();

document.querySelector("#payment-form").addEventListener("submit", handleSubmit);

async function initialize() {
    let paymentForm = document.getElementById("payment-form");
    const response = await fetch("payment/" + paymentForm.dataset.id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const { clientSecret } = await response.json();

    const appearance = {
        theme: 'stripe',
    };
    elements = stripe.elements({ appearance, clientSecret });

    const linkAuthenticationElement = elements.create("linkAuthentication");
    linkAuthenticationElement.mount("#link-authentication-element");

    linkAuthenticationElement.on('change', (event) => {
        emailAddress = event.value.email;
    });

    const paymentElementOptions = {
        layout: "tabs",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: 'http://localhost:3000/paymentstatus',
            receipt_email: emailAddress,
        },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occurred.");
    }

    setLoading(false);
}

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
    }, 4000);
}

function setLoading(isLoading) {
    if (isLoading) {
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}