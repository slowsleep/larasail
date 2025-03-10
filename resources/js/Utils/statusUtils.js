import { ABANDONED, FINISHED, PLANNING, WATCHING } from "@/constants.js";

export const getStatusColorClass = (value) => {
    switch (value) {
        case PLANNING:
            return "text-blue-500";
        case WATCHING:
            return "text-yellow-500";
        case FINISHED:
            return "text-green-500";
        case ABANDONED:
            return "text-gray-500";
        default:
            return "";
    }
};
