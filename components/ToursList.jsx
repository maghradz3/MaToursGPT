import TourCard from "./TourCard";

import { fadeIn } from "@/variants";
import { motion } from "framer-motion";

const ToursList = ({ data }) => {
  if (data.length === 0) return <h4 className="text-lg">No tours found...</h4>;
  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {data.map((tour) => {
        return <TourCard key={tour.id} tour={tour} />;
      })}
    </motion.div>
  );
};

export default ToursList;
