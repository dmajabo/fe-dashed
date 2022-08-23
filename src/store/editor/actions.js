import {
  SET_CANVAS,
  SET_PREVIEW,
  SET_NOTIFICATION,
  SET_IS_LOADING,
  SET_FILES,
  SET_FILE,
  SET_IS_SAVING,
  SET_IS_FILES_UPLOADING,
  SET_PUBLISH,
  SET_INVITATIONS,
  SET_STORIES,
  SET_NEW_STORY_TITLE,
  SET_NEW_STORY_DESCRIPTION,
  SET_PUBLIC_STORIES
} from "./actionTypes";

import storyData from "../../pages/StoryBoard/solana";
import shortid from "shortid";
import { supabase } from "supabaseClient";
import domtoimage from "dom-to-image-more";

const actions = {
  setCanvas: data => ({
    type: SET_CANVAS,
    payload: data,
  }),
  setPreview: data => ({
    type: SET_PREVIEW,
    payload: data,
  }),
  setPublish: data => ({
    type: SET_PUBLISH,
    payload: data,
  }),
  setNotification: data => ({
    type: SET_NOTIFICATION,
    payload: data,
  }),
  setIsLoading: data => ({
    type: SET_IS_LOADING,
    payload: data,
  }),
  setIsSaving: data => ({
    type: SET_IS_SAVING,
    payload: data,
  }),
  setIsFilesUploading: data => ({
    type: SET_IS_FILES_UPLOADING,
    payload: data,
  }),
  setFiles: files => ({
    type: SET_FILES,
    payload: files,
  }),
  setFile: file => ({
    type: SET_FILE,
    payload: file,
  }),
  setInvitations: data => ({
    type: SET_INVITATIONS,
    payload: data,
  }),
  setStories: data => ({
    type: SET_STORIES,
    payload: data,
  }),
  setPublicStories: data => ({
    type: SET_PUBLIC_STORIES,
    payload: data,
  }),
  setNewStoryTitle: data => ({
    type: SET_NEW_STORY_TITLE,
    payload: data,
  }),
  setNewStoryDescription: data => ({
    type: SET_NEW_STORY_DESCRIPTION,
    payload: data,
  }),
}

export const getStories = () => (dispatch) => {

  const user = supabase.auth.user()

  dispatch(actions.setIsLoading(true))

  supabase
    .from("storyboard")
    .select("*")
    .eq("userid", user?.id)
    .then(({ data, error, status }) => {
      if (status == 200) {
        if (data?.length) {
          dispatch(actions.setStories(data))
        }
        dispatch(actions.setIsLoading(false))
      } else {
        if (error) console.log(error.message);
      }
    });
};

export const getPublicStories = () => (dispatch) => {

  dispatch(actions.setIsLoading(true))

  supabase
    .from("storyboard")
    .select("*")
    .eq("published", true)
    .then(({ data, error, status }) => {
      if (status == 200) {
        if (data?.length) {
          dispatch(actions.setPublicStories(data))
        }
        dispatch(actions.setIsLoading(false))
      } else {
        if (error) console.log(error.message);
      }
    });
};

export const getStory = (id, isPublic, isNew, title, description) => (dispatch) => {

  const user = supabase.auth.user()

  dispatch(actions.setIsLoading(true))

  if (isPublic && !id) {
    dispatch(actions.setIsLoading(false))
    dispatch(actions.setCanvas({ canvas: storyData }))
    return
  }

  if (!isPublic && !user?.id) {
    dispatch(actions.setIsLoading(false))
    dispatch(actions.setCanvas({ canvas: storyData }))
    dispatch(actions.setPreview(true))
    return
  }

  if (isNew) {
    supabase
      .from("storyboard")
      .insert([
        {
          title: title,
          description: description,
          canvas: {
            w: 1100,
            h: 800,
            canvas: [],
          },
          userid: user?.id,
        },
      ])
      .then(({ data, error, status }) => {
        dispatch(actions.setIsSaving(false))

        if (status == 201 || status == 200) {
          dispatch(actions.setCanvas(data[0]))
        } else {
          if (error) console.log(error.message);
        }
      });
  } else {
    supabase
      .rpc("getStory", { cid: id })
      .then(({ data, error, status }) => {
        if (status == 200) {
          if (data.id) {
            dispatch(actions.setCanvas(data))
            if (!isPublic) {
              if (data.userid != user?.id) {
                supabase
                  .from("invitations")
                  .select("*")
                  .eq("userid", user?.id)
                  .eq("canvasId", id)
                  .then(({ data, error, status }) => {
                    if (status == 200) {
                      if (!data?.length) {
                        dispatch(actions.setPreview(true))
                      }
                      dispatch(actions.setIsLoading(false))
                    } else {
                      if (error) console.log(error.message);
                    }
                  });
              }
            }
          } else {
            if (id) {
              dispatch(actions.setNotification("Id is wrond or the Story is not published"))
            } else {
              dispatch(actions.setCanvas({ canvas: storyData }))
            }
          }
          dispatch(actions.setIsLoading(false))
        } else {
          if (error) console.log(error.message);
        }
      });
  }
};

export const saveStory = (canvas, story, id, node) => (dispatch) => {

  const user = supabase.auth.user()
  dispatch(actions.setIsSaving(true))

  if (!id) {
    supabase
      .from("storyboard")
      .insert([
        {
          title: "The Story of Solana",
          description: "A compelling introduction",
          canvas: {
            w: story.w,
            h: story.h,
            canvas: canvas,
          },
          userid: user?.id,
        },
      ])
      .then(({ data, error, status }) => {
        dispatch(actions.setIsSaving(false))

        if (status == 201 || status == 200) {
          dispatch(actions.setCanvas(data[0]))
        } else {
          if (error) console.log(error.message);
        }
      });
  } else {
    supabase
      .from("storyboard")
      .select("*")
      .eq("id", id)
      .then(({ data, error, status }) => {
        if (status == 200) {
          if (data && data.length) {
            if (!data[0].thumbnail) {
              supabase
                .from("storyboard")
                .update({
                  canvas: {
                    w: story.w,
                    h: story.h,
                    canvas: canvas,
                  },
                })
                .match({ id: id })
                .then(({ data, error, status }) => {
                  dispatch(actions.setIsSaving(false))

                  if (status == 200) {
                    console.log("Save story")
                  } else {
                    if (error) console.log(error.message);
                  }
                });
            } else {
              supabase
                .from("storyboard")
                .update({
                  canvas: {
                    w: story.w,
                    h: story.h,
                    canvas: canvas,
                  },
                })
                .match({ id: id })
                .then(({ data, error, status }) => {
                  dispatch(actions.setIsSaving(false))

                  if (status == 200) {
                  } else {
                    if (error) console.log(error.message);
                  }
                });
            }
          }
        } else {
          dispatch(actions.setIsSaving(false))
          if (error) console.log(error.message);
        }
      });
  }
}

export const updateStory = (id, title, description) => (dispatch) => {

  const user = supabase.auth.user()
  dispatch(actions.setIsSaving(true))

  return supabase
    .from("storyboard")
    .update({
      title: title,
      description: description
    })
    .match({ id: id, userid: user.id })
    .then(({ data, error, status }) => {
      dispatch(actions.setIsSaving(false))

      if (status == 200) {
        dispatch(actions.setCanvas(data[0]))
        console.log("Update story")
      } else {
        if (error) console.log(error.message);
      }
    });
}

export const saveThumbnail = (id, node, url) => (dispatch) => {

  const user = supabase.auth.user()
  dispatch(actions.setIsSaving(true))

  if (url) {
    supabase
      .from("storyboard")
      .update({
        customThumbnail: url == 'clear' ? null : url,
      })
      .match({ id: id, userid: user.id })
      .then(({ data, error, status }) => {
        dispatch(actions.setIsSaving(false))

        if (status == 200) {
          dispatch(actions.setCanvas(data[0]))
          console.log("Save thumbnail")
        } else {
          if (error) console.log(error.message);
        }
      });
  } else {
    domtoimage.toPng(node.current)
      .then((dataUrl) => {
        supabase
          .from("storyboard")
          .update({
            thumbnail: dataUrl,
            customThumbnail: null,
          })
          .match({ id: id, userid: user.id })
          .then(({ data, error, status }) => {
            dispatch(actions.setIsSaving(false))

            if (status == 200) {
              dispatch(actions.setCanvas(data[0]))
              console.log("Save thumbnail")
            } else {
              if (error) console.log(error.message);
            }
          });
      })
  }
}

export const getFiles = (folder, onComplete) => (dispatch) => {
  const user = supabase.auth.user()

  supabase
    .storage
    .from('storyboard')
    .list(`${folder}${user?.id}`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
    .then(async ({ data, error, status }) => {
      if (data.length) {
        const files = await Promise.all(data.map(async (item) => {
          const { signedURL, error } = await supabase
            .storage
            .from('storyboard')
            .createSignedUrl(`${folder}${user?.id}/${item.name}`, 5256000)

          return { ...item, url: signedURL }
        }));
        dispatch(actions.setFiles(files))
      } else {
        if (error) console.log(error.message);
      }
    })
}

export const uploadFiles = (file) => (dispatch) => {
  const filename = file[0]?.name
  const user = supabase.auth.user()
  dispatch(actions.setIsFilesUploading(true))

  if (filename) {
    const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

    supabase
      .storage
      .from('storyboard')
      .upload(`images/${user?.id}/${shortid.generate()}.${ext}`, file[0], {
        cacheControl: '3600',
        upsert: false
      })
      .then(({ data, error, status }) => {
        dispatch(actions.setIsFilesUploading(false))
        if (data?.Key) {

        } else {
          if (error) console.log(error.message);
        }
      })
  }
}

export const inviteUser = (user, canvas, role) => (dispatch) => {

  dispatch(actions.setIsSaving(true))

  supabase
    .from("invitations")
    .select("*")
    .eq("userid", user?.id)
    .eq("canvasId", canvas?.id)
    .then(({ data, error, status }) => {
      if (status == 200) {
        if (data.length == 0) {
          supabase
            .from("invitations")
            .insert([
              {
                canvasId: canvas.id,
                userid: user?.id,
                role: role,
              },
            ])
            .then(({ data, error, status }) => {
              dispatch(actions.setIsSaving(false))

              if (status == 200) {

              } else {
                if (error) console.log(error.message);
              }
            });
        }
      } else {
        dispatch(actions.setIsSaving(false))
        if (error) console.log(error.message);
      }
    });
}

export const removeUser = (userid, canvasId) => (dispatch) => {

  dispatch(actions.setIsSaving(true))

  supabase
    .from("invitations")
    .delete()
    .match({ userid: userid, canvasId: canvasId })
    .then(({ data, error, status }) => {
      dispatch(actions.setIsSaving(false))

      if (status != 200) {
        if (error) console.log(error.message);
      }
    });
}

export const getInvitations = (id) => (dispatch) => {

  dispatch(actions.setIsLoading(true))

  supabase
    .from("invitations")
    .select("*")
    .eq("canvasId", id)
    .then(({ data, error, status }) => {
      console.log(data);
      if (status == 200) {
        if (data?.length) {
          dispatch(actions.setInvitations(data))
        } else {
          dispatch(actions.setInvitations([]))
        }
        dispatch(actions.setIsLoading(false))
      } else {
        if (error) console.log(error.message);
      }
    });
};

export const publish = (id, state) => (dispatch) => {

  const user = supabase.auth.user()

  supabase
    .from("storyboard")
    .update({
      published: state
    })
    .match({ id: id, userid: user.id })
    .then(({ data, error, status }) => {
      dispatch(actions.setIsSaving(false))

      if (status == 200) {

      } else {
        if (error) console.log(error.message);
      }
    });
}

export const setPreview = (state) => (dispatch) => dispatch(actions.setPreview(state))
export const setPublish = (state) => (dispatch) => dispatch(actions.setPublish(state))
export const setNewStoryTitle = (state) => (dispatch) => dispatch(actions.setNewStoryTitle(state))
export const setNewStoryDescription = (state) => (dispatch) => dispatch(actions.setNewStoryDescription(state))
