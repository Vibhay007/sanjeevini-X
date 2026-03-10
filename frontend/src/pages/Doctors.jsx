import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-dark-muted">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border border-dark-border rounded text-sm transition-all sm:hidden text-dark-text ${
            showFilter ? "bg-gradient-to-r from-sky-600 to-teal-500 text-white border-transparent" : "bg-dark-card"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-dark-muted ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-primary/20 border-primary text-primary"
                : "border-dark-border bg-dark-card text-dark-text hover:border-dark-muted"
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-primary/20 border-primary text-primary" : "border-dark-border bg-dark-card text-dark-text hover:border-dark-muted"
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-primary/20 border-primary text-primary" : "border-dark-border bg-dark-card text-dark-text hover:border-dark-muted"
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-primary/20 border-primary text-primary" : "border-dark-border bg-dark-card text-dark-text hover:border-dark-muted"
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-primary/20 border-primary text-primary" : "border-dark-border bg-dark-card text-dark-text hover:border-dark-muted"
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-primary/20 border-primary text-primary"
                : "border-dark-border bg-dark-card text-dark-text hover:border-dark-muted"
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
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
      </div>
    </div>
  );
};

export default Doctors;
