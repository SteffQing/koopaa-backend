import { neon } from "@neondatabase/serverless";
import { getEnv } from "./config";

class DB {
  private get sql() {
    const dbUrl = getEnv("DATABASE_URL");
    return neon(dbUrl);
  }

  public async getUser(address: string) {
    const user = await this.sql`
      SELECT * FROM public."User" WHERE address = ${address}
    `;
    if (user.length === 1) return user[0] as User;
    return null;
  }

  public async createGroupWithActivities(
    name: string,
    pda: string,
    tag: string,
    cover_photo: string,
    description: string,
    address: string,
    signature: string
  ) {
    const sql = this.sql;

    try {
      await sql`BEGIN`;

      const group = await sql`
        INSERT INTO public."Group" (name, pda, tag, cover_photo, description)
        VALUES (${name}, ${pda}, ${tag}, ${cover_photo}, ${description})
        RETURNING id;
      `;
      const groupId = group[0].id;

      await sql`
        INSERT INTO public."GroupParticipants" ("groupId", "userAddress")
        VALUES (${groupId}, ${address});
      `;

      await sql`
        INSERT INTO public."Activity" (title, type, "userId", sig, group_pda)
        VALUES (${`Created ${name} Ajo Group`}, 'create', ${address}, ${signature}, ${pda});
      `;

      await sql`
        INSERT INTO public."Activity" (title, type, "userId", sig, group_pda)
        VALUES (${`Joined ${name} Ajo Group`}, 'create', ${address}, ${signature}, ${pda});
      `;

      await sql`COMMIT`;
    } catch (err) {
      await sql`ROLLBACK`;
      throw err;
    }
  }
}

const db = new DB();
export default db;
