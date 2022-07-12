import { createClient } from "@supabase/supabase-js";
import storyData from "./solana";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const service = {
  save: (canvas, story, browserId, onId, onComplete) => {
    supabase
    .from("storyboard")
    .select("*")
    .eq("userFakeId", browserId)
    .then(({ data, error, status }) => {
      if (status == 200) {
        if (data && data.length) {
          supabase
            .from("storyboard")
            .update({
              title: "The Story of Solana",
              canvas: {
                w: story.w,
                h: story.h,
                canvas: canvas,
              },
            })
            .match({ userFakeId: browserId })
            .then(({ data, error, status }) => {
              if(onComplete) onComplete(false)
              if (status == 200) {
                if (data.length) {
                  if(onId) onId(data[0].id)
                }
              } else {
                if (error) console.log(error.message);
              }
            });
        } else {
          supabase
            .from("storyboard")
            .insert([
              {
                title: "The Story of Solana",
                canvas: {
                  w: story.w,
                  h: story.h,
                  canvas: canvas,
                },
                userFakeId: browserId,
              },
            ])
            .then(({ data, error, status }) => {
              if(onComplete) onComplete(false)
              if (status == 200) {
                console.log(data);
              } else {
                if (error) console.log(error.message);
              }
            });
        }
      } else {
        if (error) console.log(error.message);
      }
    });
  },
  selectStory: (id, bId, onCanvasId, onCanvas, onStory, onNotification, onComplete) => {
    supabase
    .from("storyboard")
    .select("*")
    .eq(id ? "id" : "userFakeId", id ? id : bId)
    .then(({ data, error, status }) => {
      if (status == 200) {
        if (data?.length) {
          if(onCanvasId) onCanvasId(data[0].id)
          if(onCanvas) onCanvas(data[0].canvas.canvas)
          if(onStory) onStory({ w: data[0].canvas.w, h: data[0].canvas.h })
        } else {
          if (id) {
            if(onNotification) onNotification("Id is wrond")
          } else {
            if(onCanvas) onCanvas(storyData.canvas)
            if(onStory) onStory({ w: storyData.w, h: storyData.h })
          }
        }
      } else {
        if (error) console.log(error.message);
      }
    });
  }
}

export default service