const stripe = Stripe('pk_test_51MRv0tFecsPiqRmb4ewKRMSbPh0znYmSmBJxEcdI5pF8Efc4a9omHy4odjtT4M2CpLTcUdRp5A0BbGPYGMgvkdlW00ke3K85AZ');

checkStatus();

async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );

    if (!clientSecret) {
        return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    const messageContainer = document.getElementById("payment-message");

    messageContainer.classList.remove('success');
    messageContainer.classList.remove('fail');

    switch (paymentIntent.status) {
        case "succeeded":
            messageContainer.classList.add('success');
            messageContainer.textContent = "Payment succeeded!";
            break;
        case "processing":
            messageContainer.textContent = "Your payment is processing.";
            break;
        case "requires_payment_method":
            messageContainer.classList.add('fail');
            messageContainer.textContent = "Your payment was not successful, please try again.";
            break;
        default:
            messageContainer.classList.add('fail');
            messageContainer.textContent = "Something went wrong.";
            break;
    }
}