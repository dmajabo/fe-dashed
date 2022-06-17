import * as React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  Row,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import { format } from "date-fns";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";

import Breadcrumbs from "../../components/Common/Breadcrumb";

import BTCCard from "pages/GeneralDashboard/btc-card";

// https://nivo.rocks/sankey/

/**
 *  
 * 7. Go to create data story, click blank
8. Click add chart (Illuvial diagram) and load data from template
9. Paste in data (CSV)
10. It shows a data CSV table
11. Click to accept data
12. It shows a preview of the chart
13. Click accept
14. It shows the finished static image that is in Rawgraphs, data viz style
15. Show what it’s like to the edit the text header.
16. Presentation end.
 */

const StoryFlowPage = () => {
  const [showModal, setShowModal] = React.useState(true);
  const [modalStep, setModalStep] = React.useState(1);
  const [storyTitle, setStoryTitle] = React.useState("Story title");

  React.useEffect(() => {
    const editor = new MediumEditor("#editor", {
      placeholder: {
        /* This example includes the default options for placeholder,
               if nothing is passed this is what it used */
        text: "Type something...",
        hideOnClick: true,
      },
      toolbar: {
        buttons: [
          "bold",
          "italic",
          {
            name: "h1",
            action: "append-h2",
            aria: "header type 1",
            tagNames: ["h2"],
            contentDefault: "<b>H1</b>",
            classList: ["custom-class-h1"],
            attrs: {
              "data-custom-attr": "attr-value-h1",
            },
          },
          {
            name: "h2",
            action: "append-h3",
            aria: "header type 2",
            tagNames: ["h3"],
            contentDefault: "<b>H2</b>",
            classList: ["custom-class-h2"],
            attrs: {
              "data-custom-attr": "attr-value-h2",
            },
          },
          "quote",
          "anchor",
        ],
      },
    });
  }, []);

  const renderModalStep = () => {
    if (modalStep === 3) {
      return (
        <>
          <h6>Select a chart</h6>
          <div className="template-row">
            <div>
              <div className="template-selector selected">A</div>
              <p>Chart A</p>
              <span>Correlations, proportions</span>
            </div>

            <div>
              <div className="template-selector">A</div>
              <p>Chart B</p>
              <span>Timechunks, proportions</span>
            </div>

            <div>
              <div className="template-selector">A</div>
              <p>Chart C</p>
              <span>Correlations, distributions</span>
            </div>

            <div>
              <div className="template-selector">A</div>
              <p>Chart D</p>
              <span>Correlations, proportions</span>
            </div>

            <div>
              <div className="template-selector">A</div>
              <p>Chart E</p>
              <span>Timechunks, proportions</span>
            </div>

            <div>
              <div className="template-selector">A</div>
              <p>Chart F</p>
              <span>Correlations, distributions</span>
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
            // onChange={e => setStoryTitle(e.target.value)}
            className="form-control"
            style={{ height: "200px" }}
          />
        </>
      );
    }

    if (modalStep === 1) {
      return (
        <>
          <h6>Basic Templates</h6>
          <div className="template-row">
            <div>
              <div className="template-selector selected">A</div>
              <p>Blank</p>
              <span>Start from scratch with an empty workspace</span>
            </div>

            <div>
              <div className="template-selector">A</div>
              <p>Price Chart</p>
              <span>Connect a price chart</span>
            </div>

            <div>
              <div className="template-selector">A</div>
              <p>Correlation Chart</p>
              <span>
                A good starting point to compare two different dimensions of
                data
              </span>
            </div>
          </div>

          <hr />
          <h6>Your Stories</h6>

          <div className="template-row">
            <div>
              <div className="template-selector">A</div>
              <p>The Story of Solana</p>
              <span>A compelling introduction</span>
            </div>
          </div>

          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </>
      );
    }
  };

  return (
    <div className="page-content">
      <Container
        className="story"
        fluid={true}
        style={{ paddingBottom: "64px" }}
      >
        <Breadcrumbs title="Dashboards" breadcrumbItem="Story Flow" />

        <div className="editor" id="editor">
          <h1>{storyTitle}</h1>
          <h6>
            By <span style={{ color: "#00ff85" }}>@WebD00D</span> on{" "}
            {format(Date.now(), "MMM dd, yyyy")}
          </h6>
          {modalStep === 3 && !showModal && (
            <>
              <hr />
              <div className="chart-here">
                <BTCCard />
              </div>
            </>
          )}
          <hr />

          <p>Write something...</p>
        </div>

        <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Create Data Story
            </h5>
            <button
              type="button"
              onClick={() => setShowModal(false)}
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
              onClick={() => setShowModal(false)}
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (modalStep === 3) {
                  setShowModal(false);
                } else {
                  setModalStep(modalStep + 1);
                }
              }}
            >
              Continue
            </button>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default StoryFlowPage;
