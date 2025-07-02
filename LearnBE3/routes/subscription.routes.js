import { Router } from "express";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", (req, res) => {
  res.send({ title: "GET all subscriptions" });
});

subscriptionRoutes.get("/:id", (req, res) => {
  res.send({ title: "GET subscription details" });
});

subscriptionRoutes.post("/", (req, res) => {
  res.send({ title: "POST subscription" });
});

subscriptionRoutes.put("/:id", (req, res) => {
  res.send({ title: "PUT subscription" });
});

subscriptionRoutes.delete("/:id", (req, res) => {
  res.send({ title: "DELETE subscription" });
});

export default subscriptionRoutes;
