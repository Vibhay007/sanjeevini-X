import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-dark-text md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-dark-muted">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 4).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-dark-border bg-dark-card rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:border-sky-500/50 transition-all duration-500"
            key={index}
          >
            <div className="bg-dark-surface w-full h-56 overflow-hidden">
              <img className="w-full h-full object-cover" src={item.image} alt="" />
            </div>
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-400" : "text-dark-muted"
                }`}
              >
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-400" : "bg-dark-muted"
                  } rounded-full`}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-dark-text text-lg font-medium">{item.name}</p>
              <p className="text-dark-muted text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-dark-card border border-dark-border text-dark-text hover:border-sky-500 hover:text-sky-400 px-12 py-3 rounded-full mt-10 transition-colors"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
