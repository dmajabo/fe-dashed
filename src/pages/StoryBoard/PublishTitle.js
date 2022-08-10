import React from "react";

import {
  IconComments,
  IconStar
} from "../../components/Common/Icon";

const PublishTitle = () => {

  return (
  <div className="story-publish-row">
    <div>
      <div><span className="story-publish-label">Fundamentals</span></div>
      <div><span className="story-publish-title">The Story of Solana</span></div>
      <div className="story-publish-description"><span>by</span> <a href="#">@cryptoguy</a> <span>and</span> <a href="#">@cryptogirl</a>, <span>March 18</span></div>
    </div>
    <div className="text-end">
      <div>
        <div className="story-publish-saves"><IconStar /> 500 saves</div>
      </div>
      <div>
        <div className="story-publish-commemts"><IconComments /> 125 comments</div>
      </div>
    </div>
  </div>
  );
};

export default PublishTitle;
