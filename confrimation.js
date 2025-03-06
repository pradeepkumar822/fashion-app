
    function getDeliveryDate() {
        let today = new Date();
        today.setDate(today.getDate() + 5);
        let options = { weekday: "long", month: "long", day: "numeric" };
        return today.toLocaleDateString("en-US", options);
    }

  
    document.getElementById("delivery-date").innerText = "Estimated Delivery: " + getDeliveryDate();