
import { updateSession } from "@/utils/updatesession";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    return await updateSession(req);
}