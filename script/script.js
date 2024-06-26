let btn = document.getElementsByClassName("btn")[0];
let input = document.getElementsByClassName("search-input")[0];
let displaycoins = document.getElementsByClassName("displaycoins")[0]; 
displaycoins.classList.add("m-5","container-fluid","container-sm")

let options = {
    method:'GET',
    headers:{
        accept:'application/json',
        'x-cg-demo-api-key': 'CG-8HMN4XPinsFDtBBjCKRA4yBU'
    }
}

let coinsId = ["","bitcoin","ethereum","binance-bitcoin","tether","solana","bitcoin-cash","dogecoin","litecoin","monero","stellar","cardano","cosmos","shiba-inu","eos","dai","chainlink","arbitrum","immutable","maker","bittensor","optimism","jasmycoin","bonk","fantom","ethena","bittorrent","nexo","worldcoin","dexe","uniswap","pepe","sui","floki","brett","chiliz","apenft","kava"]
coinsId.forEach(coin => {
    let option = document.createElement("option");
    if (coin == "") {
        option.value = coin;
        option.innerText = "Select a coin";
        option.style.color = "black";
        option.disabled = true;
        option.selected = true;
    }
    else {
        option.style.color = "black";
        option.value = coin;
        option.innerText = coin;
    }
    input.appendChild(option)
})



btn.addEventListener("click", () => {
    displaycoins.innerHTML = "";
    let coinToSearch = document.getElementsByClassName("search-input")[0].value;
    async function getCoinsData() {
        let coinsListUrl =  `https://api.coingecko.com/api/v3/coins/${coinToSearch}`;
        let response = await fetch(coinsListUrl, options);
        let coindata = await response.json()
        return coindata;
    }  
    getCoinsData().then(data => {
        console.log(data)
        //display head of the coin details name and symbol
        let displayhead = document.createElement("div");
        displayhead.classList.add("displayhead","d-flex","justify-content-center","align-items-center","text-center","col-12");
        
        //coin name
        let coinName = document.createElement("h1");
        coinName.innerText = data.name.toUpperCase();
        coinName.classList.add("mx-3")
        displayhead.appendChild(coinName);
        
        //coin symbol
        let coinSymbol = document.createElement("img");
        coinSymbol.src = data.image.small;
        displayhead.appendChild(coinSymbol);
        displaycoins.appendChild(displayhead);

        //coin description
        let coinDesc = document.createElement("p");
        coinDesc.classList.add("col-12","lead","small","text-justify");
        coinDesc.innerHTML = data.description.en;
        displaycoins.appendChild(coinDesc);

        //coin market data container
        let marketdataDiv = document.createElement("div");
        marketdataDiv.classList.add("marketDataDiv","d-md-flex","m-2","m-sm-5","border","border-dark","p-2","p-md-5")
        displaycoins.appendChild(marketdataDiv);

        //current data table
        let marketData = document.createElement("div");
        marketData.classList.add("marketData","col-12","col-md-6")
        let tableName = document.createElement("h3");
        tableName.classList.add("text-center")
        tableName.innerText = "Market Data";
        marketData.appendChild(tableName);    
        let dataTable = document.createElement("table");
        dataTable.classList.add("table", "table-striped", "table-hover")
        dataTable.style.maxHeight = "500px";
        dataTable.style.overflow = "auto";
        marketData.appendChild(dataTable)
        marketdataDiv.appendChild(marketData)

        //table head
        let tableHead = document.createElement("thead");
        let exchangeHead = document.createElement("th");
        exchangeHead.classList.add("mx-2")
        exchangeHead.innerText = "Symbol";
        exchangeHead.classList.add("text-center")
        let currentPriceHead = document.createElement("th");
        currentPriceHead.classList.add("mx-2")
        currentPriceHead.classList.add("text-center")
        currentPriceHead.innerText = "Current Price";
        tableHead.appendChild(exchangeHead);
        tableHead.appendChild(currentPriceHead);
        dataTable.appendChild(tableHead);

        //table body
        let tableBody = document.createElement("tbody");
        let currPrices = data.market_data.current_price;
        for(let Key of Object.keys(currPrices)){
            let tableRow = document.createElement("tr");
            let exchange = document.createElement("td");
            exchange.innerText = Key.toUpperCase();
            tableRow.appendChild(exchange)
            let price = document.createElement("td");
            price.innerText = currPrices[Key];
            tableRow.appendChild(price);
            tableBody.appendChild(tableRow);
        }
        dataTable.appendChild(tableBody);

        //coin details links
        let linksAndDetailsDiv = document.createElement("div");
        linksAndDetailsDiv.classList.add("linksAndDetailsDiv", "col-12","col-md-6");

        //official links
        let officialLinksDiv = document.createElement("div");
        officialLinksDiv.classList.add("officialLinksDiv")
        let detailsHead = document.createElement("h3");
        detailsHead.classList.add("text-center")
        detailsHead.innerText = "Official pages"
        detailsHead.classList.add("mt-3")
        officialLinksDiv.appendChild(detailsHead);

        let links = {
            "blockchainSite" : data.links.blockchain_site[0],
            "homepage" : data.links.homepage[0],
            "chatUrl" : data.links.chat_url[0],
            "twitterScreenName" : data.links.twitter_screen_name,
            "subredditUrl" : data.links.subreddit_url,
            "githuburl" : data.links.repos_url.github[0]
        }

        let linkDiv = document.createElement("ul");
        for(let link of Object.keys(links)){
            if(links[link] !== ""){
                let linklist = document.createElement("li");
                let linkName = link;
                let linkurl = links[link];
                linklist.innerHTML = `<p>${linkName} : <a href=${linkurl}>${linkurl}</a></p>`;
                linkDiv.appendChild(linklist);
                officialLinksDiv.appendChild(linkDiv);
            }
        }
        linksAndDetailsDiv.appendChild(officialLinksDiv);


        //developer details
        let devDetailsDiv = document.createElement("div");
        let devDetailsHead = document.createElement("h3");
        devDetailsHead.classList.add("text-center")
        devDetailsHead.innerText = "Developer details"
        devDetailsDiv.appendChild(devDetailsHead);

        let devDetails = {
            "githuburl" : data.links.repos_url.github[0],
            "Forks" : data.developer_data.forks,
            "Stars" : data.developer_data.stars,
            "Total issues" : data.developer_data.total_issues,
            "closed issues" : data.developer_data.closed_issues,
            "Subscribers" : data.developer_data.subscribers,
            "Hashing Algorithm" : data.developer_data.hashing_algorithm
        }

        let detailsDiv = document.createElement("ul");
        for(let key of Object.keys(devDetails)){
            if( devDetails[key] !== "" &&  devDetails[key]!==null && devDetails[key]!==undefined){
                let devDetail = document.createElement("li");
                devDetail.innerHTML = `<p><b>${key} : </b> ${devDetails[key]}</p>`;
                detailsDiv.appendChild(devDetail);
            }
        }
        devDetailsDiv.appendChild(detailsDiv);


        linksAndDetailsDiv.appendChild(devDetailsDiv);

        marketdataDiv.appendChild(linksAndDetailsDiv);
    })
})




