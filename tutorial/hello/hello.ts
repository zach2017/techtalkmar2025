import { api } from "encore.dev/api";
import log from "encore.dev/log";
import { getAuthData } from "~encore/auth";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import {fetchEvents } from "./webscrape"

interface Response {
  message: string;
}

const db = new SQLDatabase("hello", {
  migrations: "./migrations",
});

export const get = api(
  { method: "GET", path: "/hello", expose: false },

  async (): Promise<Response> => {
     await fetchEvents()
    return { message: "Hello" };
  },
);

export const admin = api(
  {
    auth: true, // Require the user to be authenticated
    expose: true,
    method: "GET",
    path: "/admin",
  },
  async (): Promise<Response> => {
    const userID = getAuthData()!.userID;
    log.info("Data requested by user", { userID });
   
    return { message: "Secret message for admins" };
  },
);