
test()
async function test() {
    container.innerHTML = "";
    const cf = {
        "0": {
            "url": `/test`,
            "pass": "Server connected",
            "fail": "Server not connected",
        },
        "1": {
            "url": `/test/adguard`,
            "pass": "AdGuard Running",
            "fail": "AdGuard Not Running",
        },
        "2": {
            "url": `http://dns.luluhu.man/test`,
            "pass": "Using DNS",
            "fail": "Not Using DNS",
        },
        "3": {
            "url": `https://sg-api.mobileguardian.com/`,
            "pass": "Mobile Guardian api blocked",
            "fail": "Mobile Guardian can api"
        }
    }


    for (let i = 0; i < 4; i++) {

        const resElement = document.createElement("span");
        resElement.innerHTML = `<div> - | Waiting for ${cf[i].url}</div>`
        container.appendChild(resElement);
        if (cf[i].url == "https://sg-api.mobileguardian.com/") {
            resElement.remove()
            var element = showOutput(cf, i, "", "fail")
            fetch(cf[i].url, { mode: 'no-cors' })
                .catch(async (err) => {
                    element.innerHTML = element.innerHTML.replace("❌","✅").replace(cf[i].fail,cf[i].pass)
                });
            return;
        }

        fetch(cf[i].url, { "mode": "no-cors" })
            .then(async (res) => {
                resElement.remove()

                switch (res.status) {
                    case 500:
                        var resText = await res.text()
                        showOutput(cf, i, resText, "fail")
                        console.log(cf[i].url);
                        break;

                    case 200:
                        var resText = await res.text()
                        showOutput(cf, i, resText, "pass")
                        break;
                    default:
                        showOutput(cf, i, resText, "pass")
                }
            })
            .catch(async (err) => {
                showOutput(cf, i, err, "fail")
                resElement.remove()
            })
    }
}
function showOutput(cf, i, res, status) {
    const resElement = document.createElement("span");
    const resElementInfo = document.createElement("span");
    const resElementShow = document.createElement("span");
    resElement.innerHTML = `<div>${status == "pass" ? '✅' : '❌'} | ${cf[i][status]} </div> `

    resElementInfo.style.display = "none"
    resElementInfo.style.paddingLeft = "45px"
    resElementInfo.innerHTML = `<div> url: ${cf[i].url} \n ${status == "pass" ? "Result" : "error"}: ${res}</div > `

    resElementShow.classList.add("underline")
    resElementShow.innerHTML = "--Details--"
    resElementShow.addEventListener("click", () => {
        if (resElementInfo.style.display == "none") {
            resElementInfo.style.display = "block"
        } else {
            resElementInfo.style.display = "none"
        }
    })


    container.appendChild(resElement);
    resElement.appendChild(resElementShow)
    resElement.appendChild(resElementInfo)
    return resElement
}