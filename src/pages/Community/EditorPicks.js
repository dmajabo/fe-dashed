import React from "react";
import { Button } from "reactstrap";
import starImg from "../../assets/images/Star.svg";
import commentImg from "../../assets/images/Comment.svg";
import chart1 from "../../assets/images/charts/community-chart-1.png";
import chart2 from "../../assets/images/charts/community-chart-2.png";
import chart3 from "../../assets/images/charts/community-chart-3.png";
import chart4 from "../../assets/images/charts/community-chart-4.png";
import chart5 from "../../assets/images/charts/community-chart-5.png";
import chart6 from "../../assets/images/charts/community-chart-6.png";

const picks = [
  {
    category: "On-chain Analysis",
    title: "Mapping The Moon: An Overview of Terra's Ecosystem",
    picture: chart1,
    by: ["@cryptoguy", "@cryptogirl"],
    publishedAt: "March 18",
    saves: 500,
    comments: 125,
  },
  {
    category: "Market Insights",
    title: "BTC VS ETH VS SOL VS AVAX",
    picture: chart2,
    by: ["@cryptoguy", "@cryptogirl"],
    publishedAt: "March 18",
    saves: 500,
    comments: 125,
  },
  {
    category: "Exhange Activity",
    title: "Exchange Market Share",
    picture: chart3,
    by: ["@cryptoguy", "@cryptogirl"],
    publishedAt: "March 18",
    saves: 500,
    comments: 125,
  },
  {
    category: "On-chain Analysis",
    title: "Which Defi Protocol makes the most money?",
    picture: chart4,
    by: ["@cryptoguy", "@cryptogirl"],
    publishedAt: "March 18",
    saves: 500,
    comments: 125,
  },
  {
    category: "On-chain Analysis",
    title: "Exploring Exchange Flows",
    picture: chart5,
    by: ["@cryptoguy", "@cryptogirl"],
    publishedAt: "March 18",
    saves: 500,
    comments: 125,
  },
  {
    category: "NFTS",
    title: "What are the highest trending NFTs on Foundation?",
    picture: chart6,
    by: ["@cryptoguy", "@cryptogirl"],
    publishedAt: "March 18",
    saves: 500,
    comments: 125,
  },
  //   {
  //     category: "",
  //     title: "",
  //     by: ["@cryptoguy", "@cryptogirl"],
  //     publishedAt: "March 18",
  //     saves: 500,
  //     comments: 125,
  //   },
];
export default function EditorPicks() {
  return (
    <div className="picks">
      <h2 className="">Editor’s Picks</h2>
      <div className="picks-list">
        {picks.map(
          (
            { category, title, picture, by, saves, comments, publishedAt },
            index
          ) => (
            <div key={index} className="card-pick">
              <span className="category">{category}</span>
              <h3 className="title">{title}</h3>
              <img src={picture} />
              <div className="info">
                <p className="author">
                  by
                  {by.map((author, index) => (
                    <div key={index}>
                      <a href="#">{author}</a>
                      {index < by.length - 1 && " and"}
                    </div>
                  ))}
                </p>
                <p className="date">{publishedAt}</p>
              </div>
              <div className="stats">
                <Button outline>
                  <img src={starImg} />
                  {saves} saves
                </Button>
                <Button outline className="comments-count">
                  <img src={commentImg} />
                  {comments} comments
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
