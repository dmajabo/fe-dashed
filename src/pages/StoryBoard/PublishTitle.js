import React from "react";

import {
  IconComments,
  IconStar
} from "../../components/Common/Icon";

const PublishTitle = ({ asAdmin, onClickEdit, onClickUnpublish, isPublished }) => {

  return (
    <div className="story-publish-row">
      <div>
        <div><span className="story-publish-label">Fundamentals</span></div>
        <div><span className="story-publish-title">The Story of Solana</span></div>
        <div className="story-publish-description"><span>by</span> <a href="#">@cryptoguy</a> <span>and</span> <a href="#">@cryptogirl</a>, <span>March 18</span></div>
        {asAdmin && <div className="pt-3">
          <button
            type="button"
            className="btn btn-grey ps-4 pe-4 me-1"
            onClick={() => { if (onClickEdit) onClickEdit() }}
          >
            Edit
          </button>
          <button
            type="button"
            className={`btn ps-4 pe-4 ${isPublished ? 'btn-error' : 'btn-primary'}`}
            onClick={() => { if (onClickUnpublish) onClickUnpublish() }}
          >
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>
        </div>}
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
