import { api } from "encore.dev/api";
import { hello } from "~encore/clients";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("hello", {
});


interface Response {
  greeting: string;
}

export const greeting = api(
  { expose: true, method: "GET", path: "/greeting/:name" },
  async ({ name }: { name: string }): Promise<Response> => {
    // Calling the get endpoint on the hello service
    const allHello = await db.exec`INSERT INTO hello (name, enabled) VALUES
    (${name}, false);`;
    
    const { message } = await hello.get();

    return { greeting: `${message} ${name}!` };
  },
);