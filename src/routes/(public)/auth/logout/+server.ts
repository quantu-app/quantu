import { base } from "$app/paths";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({cookies}) => {

  const token = cookies.get("token")
  
  if (token) {
    cookies.delete("token", { path: "/" });
  }

  throw redirect(303, `${base}/`);
}