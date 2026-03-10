import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { updateUserProfile } from "../api/auth";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, loadUserProfileData, token } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure profile is loaded when visiting page directly via URL
    if (token && !userData) {
      loadUserProfileData();
    }
  }, [token, userData, loadUserProfileData]);

  const updateUserProfileData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await updateUserProfile(formData);

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-lg">
        <p className="text-sm text-dark-muted">Please login to view your profile.</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-lg">
        <div className="w-36 h-36 rounded overflow-hidden bg-dark-card animate-pulse" />
        <div className="h-6 bg-dark-card rounded w-40 mt-4 animate-pulse" />
        <div className="h-px bg-dark-border my-4" />
        <p className="text-sm text-dark-muted">Loading profile…</p>
      </div>
    );
  }

  return (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer w-36 h-36 rounded overflow-hidden">
              <img
                className="w-full h-full object-cover opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-3 right-3"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <div className="w-36 h-36 rounded overflow-hidden">
            <img className="w-full h-full object-cover" src={userData.image} alt="" />
          </div>
        )}

        {isEdit ? (
          <input
            className="bg-dark-surface border border-dark-border text-dark-text text-3xl font-medium max-w-60 mt-4 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-dark-text mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-dark-border h-[1px] border-none" />
        <div>
          <p className="text-dark-muted underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-dark-muted">
            <p className="font-medium text-dark-text">Email id:</p>
            <p className="text-primary">{userData.email}</p>

            <p className="font-medium text-dark-text">Phone:</p>
            {isEdit ? (
              <input
                className="bg-dark-surface border border-dark-border text-dark-text max-w-52 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-primary">{userData.phone}</p>
            )}

            <p className="font-medium text-dark-text">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-dark-surface border border-dark-border text-dark-text rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  type="text"
                />
                <br />
                <input
                  className="bg-dark-surface border border-dark-border text-dark-text rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  type="text"
                />
              </p>
            ) : (
              <p className="text-dark-muted">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-dark-muted underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-dark-muted">
            <p className="font-medium text-dark-text">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-dark-surface border border-dark-border text-dark-text rounded focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-dark-muted">{userData.gender || "Not specified"}</p>
            )}
            <p className="font-medium text-dark-text">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-dark-surface border border-dark-border text-dark-text rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-dark-muted">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className={`border border-sky-500 px-8 py-2 rounded-full bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-500 hover:to-teal-400 text-white transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={updateUserProfileData}
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-dark-border border-t-primary rounded-full animate-spin"></div>
                  Saving...
                </span>
              ) : (
                'Save information'
              )}
            </button>
          ) : (
            <button
              className="border border-sky-500 px-8 py-2 rounded-full bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-500 hover:to-teal-400 text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
  );
};

export default MyProfile;
