import axios from "axios";
import { post } from "../../../helpers/supabase_api_helper";

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

  return new Promise((resolve, reject) => {
    post('categories', {}).then((data) => {
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
    { name: "NEAR", slug: "near", code: "NEAR" },
  ];

  const ids = categories.map(({ slug }) => slug).join(",");

  return new Promise((resolve, reject) => {
    post('markets', {"ids": ids}).then((data) => {
      const _data = data.map(
        ({
          market_cap,
          name,
          market_cap_change_percentage_24h: market_cap_change_24h,
          current_price
        }) => ({
          name: name == "NEAR Protocol"
          ? name.replace("NEAR Protocol", "NEAR")
          : name,
          market_cap,
          market_cap_change_24h,
          current_price
        })
      );
      resolve(_data);
    })
    .catch(reject);
  });
};
