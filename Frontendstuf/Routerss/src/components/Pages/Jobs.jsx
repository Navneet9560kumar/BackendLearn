import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const Jobs = () => {
  const jobsData = useLoaderData();

  return (
    <div>
    {(jobsData.jobs || jobsData || []).map((job) => (
  <Link key={job.id} to={`/jobs/${job.id}`}>
    <h3>{job.title}</h3>
    <p>{job.location}</p>
  </Link>
))}

    </div>
  );
};

export default Jobs;

export const jobsLoader = async () => {
  const res = await fetch("http://localhost:5000/jobs");
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return res.json();
};
