let totalValue = 0;
function checkTotal(){
    let scrollValue = 10000;
    var timeOut;
    const callback = mutations => {
        clearTimeout(timeOut);
        console.log("Fetching number, please wait..");
        scrollValue += 1000;
        window.scroll(0, scrollValue);
        timeOut = setTimeout(() => {
            getTotalAmount();
        }, 7000);
    }
    const targetNode = document.querySelector(".shopee-progress-bar.shopee-progress-bar--reset");
    const config = {
      attributes: true,
      characterData: true,
      subtree: true,
      attributeFilter: ["style"],
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    timeOut = setTimeout(() => {
      getTotalAmount();
    }, 7000);
    window.scroll(0, scrollValue);
}

function getTotalAmount(){
    var allPrice = document.querySelectorAll(
        ".purchase-card-buttons__total-price"
    );
    for (var i = 0; i < allPrice.length; i++) {
        let value = allPrice[i].innerText;
        let valueToString = value.replace(/\D/g, "");
        let valueToNumber = parseInt(valueToString);
        totalValue += valueToNumber;
    }
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
    });
    let totalMoney = formatter.format(totalValue);
    console.clear();
    console.log("Total money spent on shopee: ", totalMoney);
    return totalValue;
}
checkTotal();
