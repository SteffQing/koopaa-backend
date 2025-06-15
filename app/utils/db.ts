import { neon } from "@neondatabase/serverless";
import { getEnv } from "./config";

class DB {
  private get sql() {
    const dbUrl = getEnv("DATABASE_URL");
    return neon(dbUrl);
  }

  public async getUser(address: string) {
    const user = await this.sql`SELECT * FROM public."User" WHERE address = ${address}`;
    if (user.length === 1) return user[0];
    return null;
  }
}

const db = new DB();

export default db;
