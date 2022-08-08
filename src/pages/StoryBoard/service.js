import storyData from "./solana";
import shortid from "shortid";
import { supabase } from "supabaseClient";

const service = {
  save: (canvas, story, onComplete) => {

    const user = supabase.auth.user()

    supabase
      .from("storyboard")
      .select("*")
      .eq("userId", user?.id)
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
              .match({ userId: user?.id })
              .then(({ data, error, status }) => {
                if (onComplete) onComplete(false)
                if (status == 200) {
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
                  userId: user?.id,
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
  selectStory: (id, onCanvas, onCanvasId, onStory, onNotification, onComplete, onOnlyPreview) => {

    const user = supabase.auth.user()

    supabase
      .from("storyboard")
      .select("*")
      .eq(id ? "id" : "userId", id ? id : user?.id)
      .then(({ data, error, status }) => {
        if (status == 200) {
          if (data?.length) {
            if(data[0].userId != user?.id) {onOnlyPreview(true)}
            if (onCanvas) onCanvas(data[0].canvas.canvas)
            if (onCanvasId) onCanvasId(data[0].id)
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
  uploadFiles: (file, onComplete) => {
    const filename = file[0]?.name
    const user = supabase.auth.user()

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
          if (data?.Key) {
            if (onComplete) onComplete(data.Key)
          } else {
            if (error) console.log(error.message);
          }
        })
    }
  },
  getFiles: (folder, onComplete) => {
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
          if (onComplete) onComplete(files)
        } else {
          if (error) console.log(error.message);
        }
      })
  }
}

export default service