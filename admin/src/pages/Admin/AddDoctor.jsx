import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, SetDocImg] = useState(false);
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [experience, SetExperience] = useState("1 Year");
  const [fees, SetFees] = useState("");
  const [about, SetAbout] = useState("");
  const [speciality, SetSpeciality] = useState("General physician");
  const [degree, SetDegree] = useState("");
  const [address1, SetAddress1] = useState("");
  const [address2, SetAddress2] = useState("");
  const [addDoc, SetAddDoc] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (addDoc) return;

    if (!docImg) {
      toast.error("Image Not Selected");
      return;
    }

    if (!name || !email || !password || !degree || !address1 || !address2) {
      toast.error("Please fill all required fields");
      return;
    }

    const feeNumber = Number(fees);
    if (!Number.isFinite(feeNumber) || feeNumber <= 0) {
      toast.error("Please enter a valid positive fee");
      return;
    }

    SetAddDoc(true);

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", feeNumber);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`, // ✅ FIXED HERE
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        SetDocImg(false);
        SetName("");
        SetEmail("");
        SetPassword("");
        SetFees("");
        SetAbout("");
        SetDegree("");
        SetAddress1("");
        SetAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      SetAddDoc(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="block">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 cursor-pointer flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </div>
          </label>

          <input
            onChange={(e) => SetDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
            disabled={addDoc}
          />

          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <input
              onChange={(e) => SetName(e.target.value)}
              value={name}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Doctor Name"
              required
            />

            <input
              onChange={(e) => SetEmail(e.target.value)}
              value={email}
              className="border rounded px-3 py-2"
              type="email"
              placeholder="Doctor Email"
              required
            />

            <input
              onChange={(e) => SetPassword(e.target.value)}
              value={password}
              className="border rounded px-3 py-2"
              type="password"
              placeholder="Password"
              required
            />

            <select
              onChange={(e) => SetExperience(e.target.value)}
              value={experience}
              className="border rounded px-3 py-2"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>

            <input
              onChange={(e) => SetFees(e.target.value)}
              value={fees}
              className="border rounded px-3 py-2"
              type="number"
              placeholder="Fees"
              required
            />
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <select
              onChange={(e) => SetSpeciality(e.target.value)}
              value={speciality}
              className="border rounded px-3 py-2"
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>

            <input
              onChange={(e) => SetDegree(e.target.value)}
              value={degree}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Education"
              required
            />

            <input
              onChange={(e) => SetAddress1(e.target.value)}
              value={address1}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Address line 1"
              required
            />

            <input
              onChange={(e) => SetAddress2(e.target.value)}
              value={address2}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Address line 2"
              required
            />
          </div>
        </div>

        <textarea
          onChange={(e) => SetAbout(e.target.value)}
          value={about}
          className="w-full mt-4 px-4 pt-2 border rounded"
          rows={5}
          placeholder="About Doctor"
          required
        />

        <button
          type="submit"
          disabled={addDoc}
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          {addDoc ? "Adding..." : "Add doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
