import { createClient } from "@supabase/supabase-js";
import storyData from "./solana";
import shortid from "shortid";

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
                if (onComplete) onComplete(false)
                if (status == 200) {
                  if (data.length) {
                    if (onId) onId(data[0].id)
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
                if (onComplete) onComplete(false)
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
  selectStory: (id, bId, onCanvasId, onCanvas, onStory, onNotification, onComplete, onOnlyPreview) => {
    supabase
      .from("storyboard")
      .select("*")
      .eq(id ? "id" : "userFakeId", id ? id : bId)
      .then(({ data, error, status }) => {
        if (status == 200) {
          if (data?.length) {
            if(data[0].userFakeId != bId) {onOnlyPreview(true)}
            if (onCanvasId) onCanvasId(data[0].id)
            if (onCanvas) onCanvas(data[0].canvas.canvas)
            if (onStory) onStory({ w: data[0].canvas.w, h: data[0].canvas.h })
          } else {
            if (id) {
              if (onNotification) onNotification("Id is wrond")
            } else {
              if (onCanvas) onCanvas(storyData.canvas)
              if (onStory) onStory({ w: storyData.w, h: storyData.h })
            }
          }

          if(onComplete) onComplete(true)
        } else {
          if (error) console.log(error.message);
        }
      });
  },
  uploadFiles: (file, bid, onComplete) => {
    const filename = file[0]?.name

    if (filename) {
      const ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

      supabase
        .storage
        .from('storyboard')
        .upload(`images/${bid}/${shortid.generate()}.${ext}`, file[0], {
          cacheControl: '3600',
          upsert: false
        })
        .then(({ data, error, status }) => {
          if (data?.Key) {
            if (onComplete) onComplete(data.Key)
          } else {
            if (error) console.log(error.message);
          }
        })
    }
  },
  getFiles: (folder, onComplete) => {
    console.log(folder)
    supabase
      .storage
      .from('storyboard')
      .list(folder, {
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
              .createSignedUrl(`${folder}/${item.name}`, 5256000)

            return { ...item, url: signedURL }
          }));
          if (onComplete) onComplete(files)
        } else {
          if (error) console.log(error.message);
        }
      })
  }
}

export default service