let provider, signer;
let userAddress = "";
let points = 0;

document.getElementById("connectWallet").addEventListener("click", async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        document.getElementById("walletAddress").innerText = العنوان: ${userAddress};
    } else {
        alert("يرجى تثبيت محفظة ميتامسك!");
    }
});

document.getElementById("sendTransaction").addEventListener("click", async () => {
    if (!signer) {
        alert("يرجى الاتصال بمحفظة ميتامسك أولاً!");
        return;
    }

    const amount = document.getElementById("amount").value;
    const coinType = document.getElementById("coinType").value;
    let pointsEarned = 0;

    if (coinType === "ETH") {
        pointsEarned = amount * 500;
    } else if (coinType === "BNB") {
        pointsEarned = amount * 80;
    }

    try {
        const tx = await signer.sendTransaction({
            to: "0xYourBridgeContractAddress", // استبدل بعنوان العقد الذكي للجسر
            value: ethers.utils.parseEther(amount)
        });

        document.getElementById("status").innerText = "جاري تنفيذ المعاملة...";
        await tx.wait();
        document.getElementById("status").innerText = "تمت المعاملة بنجاح!";

        points += pointsEarned;
        document.getElementById("points").innerText = ${points} نقطة;

    } catch (error) {
        document.getElementById("status").innerText = "فشلت المعاملة!";
        console.error(error);
    }
});
