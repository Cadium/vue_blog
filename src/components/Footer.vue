<script>
export default {
  name: "PaymentFlutterWave",
  data() {
    return {
      paymentData: {
        tx_ref: this.generateReference(),
        amount: 25,
        currency: "USD",
        payment_options: "card,ussd",
        redirect_url: "",
        meta: {
          counsumer_id: "7898",
          consumer_mac: "kjs9s8ss7dd",
        },
        customer: {
          name: "Demo Customer  Name",
          email: "customer@mail.com",
          phone_number: "081845***044",
        },
        customizations: {
          title: "dasdas",
          description: "Customization Description",
          logo: "",
        },
        callback: this.makePaymentCallback,
        onclose: this.closedPaymentModal,
      },
    };
  },
  methods: {
    payViaService() {
      this.payWithFlutterwave(this.paymentData);
    },
    makePaymentCallback(response) {
      console.log("Pay", response);
      if (response && response.status == "successful") {
        setTimeout(() => {
          alert("testing");
          document.location.href = "/";
        }, 10000);
      }
    },
    closedPaymentModal() {
      console.log("payment is closed");
    },
    generateReference() {
      let date = new Date();
      return date.getTime().toString();
    },
  },
};
</script>

<template>
  <div class="footer-container">
    <h4>Join our Team of Writers</h4>
    <p>
      On dasdas, writers earn a living doing what they love. Getting started is
      easy. Just pay a one time <b style="font-weight: bold">$25 fee</b> and
      everything is ready to go.
    </p>
    <button @click="payViaService">Join Us</button>
  </div>
</template>

<style scoped>
.footer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 227px;
}
h4 {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 12px;
  text-align: center;
}
p {
  color: #6e6e6e;
  font-size: 22px;
  max-width: 741px;
  margin-bottom: 35px;
  text-align: center;
}
button {
  background-color: black;
  color: #ffffff;
  text-transform: uppercase;
  border: none;
  font-size: 18px;
  width: 117px;
  height: 45px;
  cursor: pointer;
}
button:hover {
  transform: scale(1.1);
}
</style>
