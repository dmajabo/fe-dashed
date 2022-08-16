import axios from "axios";

export const fetchCategories = async () => {
  const categories = [
    "decentralized-exchange",
    "defi-index",
    "governance",
    "metaverse",
    "polygon-ecosystem",
    "solana-ecosystem",
    "storage",
    "near-protocol-ecosystem",
  ];

  const API = "https://api.coingecko.com/api/v3/coins/categories";

  return new Promise((resolve, reject) => {
    axios
      .get(API)
      .then(({ data }) => {
        const _data = data
          .filter(({ id }) => categories.includes(id))
          .sort((a, b) => a.market_cap - b.market_cap)
          .map(({ market_cap, name, market_cap_change_24h }) => ({
            name,
            market_cap,
            market_cap_change_24h,
          }));

        resolve(_data);
      })
      .catch(reject);
  });
};

export const fetchPrices = () => {
  const categories = [
    { name: "Ethereum", slug: "ethereum", code: "ETH" },
    { name: "Cardano", slug: "cardano", code: "ADA" },
    { name: "Solana", slug: "solana", code: "SOL" },
    { name: "Polkadot", slug: "polkadot", code: "DOT" },
    { name: "Avalanche", slug: "avalanche-2", code: "AVAX" },
    { name: "Polygon", slug: "matic-network", code: "MATIC" },
    { name: "Stellar", slug: "stellar", code: "XLM" },
    { name: "Algorand", slug: "algorand", code: "ALGO" },
    { name: "Cosmos Hub", slug: "cosmos", code: "ATOM" },
    { name: "NEAR Protocol", slug: "near", code: "NEAR" },
  ];

  const ids = categories.map(({ slug }) => slug).join(",");

  const API = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  return new Promise((resolve, reject) => {
    axios
      .get(API)
      .then(({ data }) => {
        console.log("data", data);

        const _data = data.map(
          ({
            market_cap,
            name,
            market_cap_change_percentage_24h: market_cap_change_24h,
          }) => ({
            name,
            market_cap,
            market_cap_change_24h,
          })
        );
        resolve(_data);
      })
      .catch(reject);
  });
};