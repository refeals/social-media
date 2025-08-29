import { Database } from "@/db/database.types"

declare global {
  type DB = Database["public"]["Tables"]
}
