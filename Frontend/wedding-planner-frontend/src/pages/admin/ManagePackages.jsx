import { useEffect, useState } from "react";
import EmptyState from "../../components/admin/EmptyState";
import { getPackages } from "../../services/adminService";

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const data = await getPackages();
      setPackages(data || []);
    } catch (error) {
      console.error(error);
      setPackages([]);
    }
  };

  return (
    <div className="space-y-6 px-4 py-4 sm:px-6 lg:px-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

        {/* Left Side - Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Packages
          </h1>

          <p className="mt-2 text-base text-gray-500">
            View and manage all wedding packages.
          </p>
        </div>


        {/* Right Side - Add Package Button */}
        <button
          type="button"
          className="
            mt-4
            rounded-lg
            bg-rose-500
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-rose-600
            md:mt-0
          "
        >
          Add Package
        </button>

      </div>


      {/* ================= PACKAGES ================= */}

      {packages.length === 0 ? (

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <EmptyState message="No packages available." />
        </div>

      ) : (

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {packages.map((pkg) => (

            <div
              key={pkg.id}
              className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              {/* Package Name */}
              <h2 className="text-xl font-semibold text-gray-800">
                {pkg.name}
              </h2>


              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {pkg.description}
              </p>


              {/* Price */}
              <div className="mt-4">

                <p className="text-2xl font-bold text-rose-600">
                  ₹{pkg.price}
                </p>

              </div>


              {/* Features */}
              <div className="mt-5">

                <h3 className="mb-2 font-semibold text-gray-700">
                  Features
                </h3>

                <ul className="space-y-2">

                  {pkg.features &&
                    pkg.features.map((feature, index) => (

                      <li
                        key={index}
                        className="text-sm text-gray-600"
                      >
                        <span className="mr-2 text-rose-500">
                          •
                        </span>

                        {feature}
                      </li>

                    ))}

                </ul>

              </div>


              {/* Buttons */}
              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  className="
                    flex-1
                    rounded-lg
                    bg-green-500
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-green-600
                  "
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="
                    flex-1
                    rounded-lg
                    bg-red-500
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-red-600
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}