import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { closeModal } from "../../../store/modals/actions"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import storySolana from "../../../assets/images/story-board/story-of-solana.png";
import StoryBoardService from "../../StoryBoard/service";

const StoryFlowModal = () => {
  const [modalStep, setModalStep] = useState(1);
  const [storyTitle, setStoryTitle] = useState("Story title");
  const [storyDataString, setStoryDataString] = useState("");
  const [chartType, setChartType] = useState("AREA_BUMP"); // AREA_BUMP or LINE
  const history = useHistory();
  const [storyId, setStoryId] = useState(null)
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.Modals.isStoryFlow)

  useEffect(() => {
    let bId = localStorage.getItem("browserId");

    if (bId) {
      StoryBoardService.selectStory(null, bId, setStoryId)
    }
  }, []);

  const renderModalStep = () => {
    if (modalStep === 3) {
      return (
        <>
          <h6>Select a chart</h6>
          <div className="template-row two-col">
            <div>
              <div
                className={`template-selector ${chartType === "AREA_BUMP" && "selected"
                  }`}
                onClick={() => setChartType("AREA_BUMP")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#222638"
                >
                  <path d="M0 5.783v-2.783l4 4 5-6 9 7.878 6-3.922v2.437l-6.176 3.989-8.6-7.528-5.09 6.108-4.134-4.179zm18.909 7.279l-1.267.818-1.135-.994-7.058-6.177-3.778 4.534-1.41 1.692-1.548-1.566-2.713-2.743v14.374h24v-13.226l-5.091 3.288z" />
                </svg>
              </div>
              <p>Area Bump</p>
              <span>
                The AreaBump chart is similar to the Bump chart, but instead of
                only showing the ranking over time, it also shows the values on
                the y-axis.
              </span>
            </div>

            <div>
              <div
                className={`template-selector ${chartType === "LINE" && "selected"
                  }`}
                onClick={() => setChartType("LINE")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="#222638"
                >
                  <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
                </svg>
              </div>
              <p>Line</p>
              <span>
                Line chart with stacking ability. Given an array of data series
                having an id and a nested array of points (with x, y
                properties), it will compute the line for each data series
              </span>
            </div>
          </div>
        </>
      );
    }

    if (modalStep === 2) {
      return (
        <>
          <h6>Story title</h6>
          <input
            onChange={e => setStoryTitle(e.target.value)}
            className="form-control form-control-lg"
          />
          <hr />
          <h6>Paste your data</h6>
          <textarea
            onChange={e => setStoryDataString(e.target.value)}
            className="form-control"
            style={{ height: "200px" }}
            value={storyDataString}
          />
        </>
      );
    }

    if (modalStep === 1) {
      return (
        <>
          <h6 className="d-none">Basic Templates</h6>
          <div className="template-row d-none">
            <div>
              <div className="template-selector selected">
                <svg
                  width="55"
                  height="55"
                  viewBox="0 0 55 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "40px" }}
                >
                  <g clipPath="url(#clip0_310_16978)">
                    <path
                      d="M13.7498 4.5835C11.2221 4.5835 9.1665 6.63912 9.1665 9.16683V45.8335C9.1665 48.3612 11.2221 50.4168 13.7498 50.4168H29.0664C28.3881 48.9914 27.9148 47.4537 27.6833 45.8335H13.7498V9.16683H29.7915V20.6252H41.2498V27.6792C41.9992 27.5715 42.7623 27.4957 43.5415 27.4957C44.3207 27.4957 45.0838 27.5715 45.8332 27.6792V18.3335L32.0832 4.5835H13.7498ZM18.3332 27.5002V32.0835H32.3249C33.5853 30.8483 35.0555 29.8321 36.6665 29.0667V27.5002H18.3332ZM43.5415 32.0835C37.2142 32.0835 32.0832 37.2145 32.0832 43.5418C32.0832 49.8691 37.2142 55.0002 43.5415 55.0002C49.8688 55.0002 54.9998 49.8691 54.9998 43.5418C54.9998 37.2145 49.8688 32.0835 43.5415 32.0835ZM18.3332 36.6668V41.2502H27.6833C27.9148 39.63 28.3881 38.0922 29.0664 36.6668H18.3332ZM41.2498 36.6668H45.8332V41.2502H50.4165V45.8335H45.8332V50.4168H41.2498V45.8335H36.6665V41.2502H41.2498V36.6668Z"
                      fill="black"
                      fillOpacity="0.5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_310_16978">
                      <rect width="55" height="55" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p>Blank</p>
              <span>Start from scratch with an empty workspace</span>
            </div>

            <div>
              <div className="template-selector">
                <svg
                  width="239"
                  height="129"
                  viewBox="0 0 239 129"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M238 0L237.366 2.42745L235.993 0.551689L234.092 13.2407L232.297 8.27541L230.29 17.1025L229.128 7.28236L228.389 15.3371L227.439 13.02L226.699 18.3162L224.693 14.344C224.622 16.5876 224.355 21.2292 223.848 21.8471C223.214 22.6195 222.158 22.3988 221.735 24.1642C221.397 25.5765 221.102 26.7388 220.996 27.1434L219.834 25.1573C219.623 29.2766 218.926 37.5814 217.828 37.8462C216.729 38.111 215.539 37.9566 215.082 37.8462L213.709 47.9974L212.864 43.9149L211.913 45.7906L210.223 42.3701L209.484 48.2181L208.639 39.9427L207.055 52.9626L204.626 37.0738L203.886 50.4249L202.197 53.404H201.352L199.662 56.7142L198.711 52.9626L196.599 65.8723L195.648 64.2172L194.803 65.8723H193.747L193.008 69.7341L192.269 63.8862L190.79 75.8028L188.255 66.9757L187.516 75.2511L185.721 73.4857L184.981 78.4509H183.397L182.341 74.258L181.813 84.8506L180.123 81.3197L179.278 84.5195L178.433 82.8645L177.483 84.8506L176.955 90.9192H175.793L174.525 95.6638L172.624 92.2433H170.09L169.456 93.788H167.872L166.921 92.0226L165.231 97.4292C165.231 92.4272 163.858 81.5404 163.858 81.5404L162.697 81.099L160.479 71.9409L158.789 66.8653L157.944 72.2719L156.36 65.4309L154.775 78.3406L153.825 79.8853L153.191 76.6855H152.135L151.607 82.9748L150.656 84.8506L149.178 72.934L148.227 76.7958L146.326 76.6855L144.108 95.8844L143.263 90.4778L140.94 95.3328H139.778L139.039 97.0982L138.405 101.953L137.56 99.7463L136.715 101.732L135.976 100.077H134.92L134.18 98.5326L133.441 98.3119L132.174 96.7672L130.906 98.8636L130.273 94.8914L129.217 99.4153L128.688 92.3536L126.893 89.2641L124.57 76.7958H123.408L122.985 81.4301L121.295 86.0643H119.711L118.655 84.1885L117.916 89.2641H117.071L116.437 92.4639L115.487 90.5882H114.642L114.008 93.8983L112.846 95.4431L112.213 100.85L110.628 94.45L109.678 97.2085L109.044 92.2433H107.988L107.354 89.0434L106.193 90.8089L104.82 95.6638L104.186 92.0226L103.13 94.45L102.39 87.278L100.701 84.5195H98.2714L97.4265 80.8784L96.6872 86.616L94.9973 87.8297L93.8356 85.8436L92.5682 87.0573L91.8289 84.2989L90.0334 89.2641L89.3997 95.6638L87.6043 93.6777L86.9706 95.4431H85.9144L83.5909 103.608L82.746 97.2085L82.0067 104.822H81.0562L80.4225 98.4222H79.5775L78.7326 100.188L77.7821 98.4222L76.1979 106.808L74.8249 99.0843L73.7687 100.188L73.0294 98.4222L72.3957 100.077L71.2339 100.188L70.6003 109.787L67.7487 101.512L66.4813 103.056H65.5307L64.7914 104.822H63.8409L62.4679 109.456L61.5174 107.691L59.7219 113.318L58.4545 103.167H57.2928L56.0254 109.787L54.0187 104.27L52.7513 109.456L51.6952 107.691L49.8997 110.339L49.3717 114.09L45.992 122.476L44.5134 115.304H42.8235L41.873 117.18H41.1337L40.2888 115.304L39.5495 117.18L38.4933 116.187L37.8596 121.924H36.9091L35.4305 118.504L34.5856 118.614L33.1069 123.359H31.3115L30.5722 118.063L29.516 121.924C29.164 121.961 28.3754 121.814 28.0374 120.931C27.6995 120.049 26.3476 113.87 25.7139 110.891L24.5521 112.656L24.0241 120.931L23.2848 117.18H22.3342L21.0668 113.98L18.9545 117.18L16.631 116.959L15.0468 122.255L14.0963 120.159L13.4626 121.704H12.512L9.02673 127L7.75935 113.759L6.5976 117.511L4.48529 103.829L1 114.201"
                    stroke="#42465F"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p>Price Chart</p>
              <span>Connect a price chart</span>
            </div>

            <div>
              <div className="template-selector">
                <svg
                  width="256"
                  height="129"
                  viewBox="0 0 256 129"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 105.43C6.11351 103.261 9.73125 102.525 15.2875 102.525C20.8438 102.525 23.7542 100.413 29.575 100.413C35.1966 100.413 37.7121 104.579 43.3333 104.638C49.1524 104.699 52.0646 100.413 57.6208 100.413C65.1552 100.413 64.3754 113.493 71.9083 113.352C79.2896 113.213 79.3167 102.525 85.6667 100.413C91.8196 98.366 93.4684 91.9629 99.9542 91.9629C106.569 91.9629 107.405 100.555 113.713 100.413C121.04 100.248 120.67 88.266 128 88.266C135.33 88.266 134.958 100.413 142.288 100.413C152.077 100.413 149.314 82.8821 156.046 72.9504C162.131 63.9723 160.808 45.752 170.333 45.752C177.742 45.752 176.154 49.7129 184.092 52.0895C193.158 54.804 190.706 66.877 198.379 71.6301C204.961 75.707 205.258 85.3613 212.667 85.3613C220.949 85.3613 219.476 70.9049 226.425 69.2535C231.981 67.9332 233.262 70.8379 240.713 70.8379C248.385 70.8379 252.465 63.8176 254.471 56.0504"
                    stroke="#42465F"
                    strokeWidth="2"
                  />
                  <circle
                    opacity="0.2"
                    cx="113.538"
                    cy="100.244"
                    r="6"
                    fill="#858CBD"
                  />
                  <circle cx="113.538" cy="100.244" r="3" fill="#858CBD" />
                  <path
                    d="M1 11.1597C6.02708 21.9864 8.9375 29.116 15.2875 30.7004C21.6375 32.2848 22.4313 35.7175 29.575 35.7175C36.7188 35.7175 37.7121 39.8839 43.3333 39.9425C49.1524 40.0031 52.0646 35.7175 57.6208 35.7175C65.1552 35.7175 67.7291 42.4 71.9083 48.6565C78.7875 58.955 81.1688 79.2879 86.1958 79.2879C92.8104 79.2879 94.1333 57.6348 99.9542 53.1456C105.188 49.109 107.405 40.0848 113.713 39.9425C121.04 39.7772 120.67 53.1456 128 53.1456C135.33 53.1456 134.958 39.9425 142.288 39.9425C152.077 39.9425 149.696 58.955 156.046 58.955C162.396 58.955 165.042 65.5565 170.333 65.5565C175.625 65.5565 175.89 70.5737 184.092 71.894C193.436 73.3983 191.798 87.3578 198.379 91.4347C204.961 95.5116 207.375 105.166 212.667 105.166C219.017 105.166 220.869 89.0581 226.425 89.0581C231.981 89.0581 235.685 103.317 240.713 103.317C246.269 103.317 246.798 93.0192 254.471 93.0192"
                    stroke="#676E98"
                    strokeWidth="2"
                  />
                  <circle
                    opacity="0.2"
                    cx="113.538"
                    cy="39.5098"
                    r="6"
                    fill="#1E202C"
                  />
                  <circle
                    cx="113.538"
                    cy="39.5098"
                    r="3"
                    fill="url(#paint0_linear_310_17001)"
                  />
                  <path
                    d="M113.712 -19.4717V148.472"
                    stroke="#1E202C"
                    strokeDasharray="2 2"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_310_17001"
                      x1="116.538"
                      y1="38.8396"
                      x2="110.538"
                      y2="38.8396"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#1E202C" />
                      <stop offset="1" stopColor="#725CFA" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p>Correlation Chart</p>
              <span>
                A good starting point to compare two different dimensions of
                data
              </span>
            </div>
          </div>
          <h6>Your Stories</h6>

          <div className="template-row">
            <div onClick={() => {
              dispatch(closeModal("storyFlow"))
              history.push(storyId ? `story-board?id=${storyId}&publish=true` : `story-board`)
            }}>
              <div className="template-selector-img">
                <img src={storySolana} alt="" />
              </div>
              <p>The Story of Solana</p>
              <span>A compelling introduction</span>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <Modal
      centered
      contentClassName="dark"
      size="lg"
      isOpen={isOpen}
      toggle = {() => isOpen ? dispatch(closeModal("storyFlow")) : null}
      onClosed={() => dispatch(closeModal("storyFlow"))}
    >
      <div className="modal-header border-0 pb-0">
        <button
          type="button"
          onClick={() => dispatch(closeModal("storyFlow"))}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">{renderModalStep()}</div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary btn-rounded ps-4 pe-4"
          onClick={() => {
            if (modalStep === 3) {
              dispatch(closeModal("storyFlow"))
            } else {
              setModalStep(modalStep + 1);
            }
          }}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default StoryFlowModal;
