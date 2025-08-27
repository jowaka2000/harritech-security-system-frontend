import React, { useReducer, useRef } from "react";
import axiosClient from "../../axiosClient";
const reducer = (state, action) => {
  if (action.type === "CATEGORY_ON_CHANGE") {
    let device = [];
    if (action.payLoad === "Cameras") {
      device = [
        "Ip Cameras",
        "DVRs and NVRs",
        "Analogue HD Cameras",
        "Vehicle DVRs",
        "Vehicle Cameras",
      ];
    } else if (action.payLoad === "Biometric Systems") {
      device = [
        "Access Control",
        "Attedance Systems",
        "Software and Solutions",
      ];
    } else if (action.payLoad === "Perimeter Security") {
      device = ["Electric Fence", "Automatic Gates"];
    } else if (action.payLoad === "Alarm Systems") {
      device = ["Intruder alarm systems", "Fire alarm systems", "Fire doors"];
    } else {
      device = [];
    }

    return { ...state, devices: device, category: action.payLoad };
  }

  if (action.type === "DEVICE_ON_CHANGE") {
    return { ...state, device: action.payLoad };
  }

  if (action.type === "PRICE_ON_CHANGE") {
    return { ...state, price: action.payLoad };
  }

  if (action.type === "DESCRIPTION_ON_CHANGE") {
    return { ...state, description: action.payLoad };
  }

  if (action.type === "IMAGE_ON_CHANGE") {
    const files = Array.from(action.payLoad);

    return { ...state, images: files };
  }
  return state;
};

const defaultValues = {
  category: "",
  devices: [],
  device: "",
  price: "",
  description: "",
  images:{},
};

const CreatePosts = () => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  const imageRef = useRef(null);

  const onSubmitDeviceData = (e) => {
    e.preventDefault();



    if (
      state.category !== "" &&
      state.device !== "" &&
      state.price !== "" &&
      state.description !== ""
    ) {
      const payload = {
        category: state.category,
        device: state.device,
        price: state.price,
        description: state.description,
      };

      let formData = new FormData();


      
      
      console.log(state.images)
      formData.append('images',state.images);

      formData.append("payload", JSON.stringify(payload));

     
      
      axiosClient
        .post("/harritech/devices/store", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  
  return (
    <div className="p-3">
      <div>
        <section>
          <h1 className="flex justify-end">
            <button className="my-shadow rounded p-2">Add Post</button>
          </h1>

          <form className="space-y-3" encType="multipart/form-data">
            <article>
              <label className="text-sm font-bold text-gray-800">
                Select Category
              </label>
              <select
                onChange={(e) =>
                  dispatch({
                    type: "CATEGORY_ON_CHANGE",
                    payLoad: e.target.value,
                  })
                }
                value={state.category}
                className="outline-none rounded p-2 my-shadow border border-slate-300 w-full"
              >
                <option value="" disabled>
                  choose---
                </option>
                <option value="Cameras">Cameras</option>
                <option value="Biometric Systems">Biometric Systems</option>
                <option value="Perimeter Security">Perimeter Security</option>
                <option value="Alarm Systems">Alarm Systems</option>
              </select>
            </article>

            <article>
              <label className="text-sm font-bold text-gray-800">
                Select System
              </label>
              <select
                value={state.device}
                onChange={(e) =>
                  dispatch({
                    type: "DEVICE_ON_CHANGE",
                    payLoad: e.target.value,
                  })
                }
                className="outline-none rounded p-2 my-shadow border border-slate-300 w-full"
              >
                {state.devices.map((device, index) => {
                  return (
                    <option key={index} value={device}>
                      {device}
                    </option>
                  );
                })}
              </select>
            </article>

            <article>
              <label className="text-sm font-bold text-gray-800">
                Price(Ksh.)
              </label>
              <input
                type="number"
                value={state.price}
                onChange={(e) =>
                  dispatch({ type: "PRICE_ON_CHANGE", payLoad: e.target.value })
                }
                className="outline-none rounded p-2 my-shadow border border-slate-300 w-full"
                placeholder="Amount in KSH"
              />
            </article>

            <article>
              <label className="text-sm font-bold text-gray-800">
                Description
              </label>
              <textarea
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: "DESCRIPTION_ON_CHANGE",
                    payLoad: e.target.value,
                  })
                }
                className="outline-none rounded p-2 my-shadow border border-slate-300 w-full"
                placeholder="Short description"
              ></textarea>
            </article>

            <article>
              <label className="text-sm font-bold text-gray-800">
                Upload Image
              </label>
              <input
                ref={imageRef}
                type="file"
                name="images[]"
                accept="image/jpg,image/png,image/jpeg"
                onChange={(e) =>
                  dispatch({ type: "IMAGE_ON_CHANGE", payLoad: e.target.files })
                }
                className="outline-none rounded p-2 my-shadow border border-slate-300 w-full"
              />
            </article>

            <article className="pt-4">
              <button type="button" onClick={onSubmitDeviceData} className="w-full bg-pink-700 rounded-lg py-2 text-white text-lg">
                Submit
              </button>
            </article>
          </form>
        </section>

        <section>
          <h1>posts</h1>
        </section>
      </div>

      <div>
        <section>
          <h1>
            <button>Add System</button>
          </h1>

          <form>add</form>
        </section>

        <section>
          <h1>posts</h1>
        </section>
      </div>
    </div>
  );
};

export default CreatePosts;
