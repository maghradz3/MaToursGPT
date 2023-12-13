"use client";

import { getAllTours } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";
import { useState } from "react";
import { fadeIn } from "@/variants";
import { motion } from "framer-motion";

const TousPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () => getAllTours(searchTerm),
  });
  return (
    <>
      <motion.form
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="max-w-lg mb-12 mt-5"
      >
        <div className="join w-wull">
          <input
            type="text"
            placeholder="enter city or country here"
            className="input input-bordered join-item w-full "
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchTerm("")}
          >
            {isPending ? "please wait..." : "Search"}
          </button>
        </div>
      </motion.form>
      {isPending ? (
        <span className="loading"></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
};

export default TousPage;
