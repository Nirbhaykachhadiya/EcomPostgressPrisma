import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createProduct = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/createproduct",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("product created successfully", response);
    } catch (error) {
      console.log("product creation failed");
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append other form data
    formData.append("title", data.Title);
    formData.append("desc", data.Desc);
    formData.append("price", data.Price);

    // Append file data
    if (data.Image.length > 0) {
      formData.append("Image", data.Image[0]);
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    createProduct(formData);
    reset();
  };

  return (
    <div className="mx-[50px]">
      <div className="text-center font-semibold text-xl pt-10 shadow-lg">
        List a product on marketplace (enter product details in below form)
      </div>
      <div className="pt-5 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 ">
            <label className="text-xl ">Title</label>
            <input
              type="text"
              className="ml-8 border"
              {...register("Title", { required: true })}
            />
            {errors.Title && <span>Title is must</span>}
          </div>

          <div className="my-5">
            <label className="text-xl ">Desc</label>
            <textarea
              className="ml-7 border "
              type="text"
              {...register("Desc", { required: true })}
              rows="3"
              cols="50"
              required
            ></textarea>
            {errors.Desc && <span>Desc is must</span>}
          </div>

          <div className="my-5 ">
            <label className="text-xl ">Price </label>
            <input
              type="text"
              className="ml-8 border"
              {...register("Price", { required: true })}
            />
            {errors.Price && <span>Price is must</span>}
          </div>

          <div className="my-5 ">
            <label className="text-xl ">Image </label>
            <input
              type="file"
              className="ml-8 border"
              {...register("Image", { required: true })}
            />
            {errors.Image && <span>Image is must</span>}
          </div>

          <div className="">
            <button
              className="text-xl bg-black text-white shadow-lg rounded-lg px-5 py-2 "
              type="submit"
            >
              Submit
            </button>
          </div>
          {/* <div className="underline mt-3 cursor-pointer" onClick={signup}>
            New User click here for SignUp
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Create;
