import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { env } from "@/env";

export const dynamic = "force-dynamic";

/**
 * SEC-08: Verificación en tiempo constante contra ataques de canal lateral (timing attacks).
 */
function isSecretValid(providedSecret: string | null | undefined): boolean {
  if (!providedSecret || !env.REVALIDATE_SECRET) return false;
  const providedBuffer = Buffer.from(providedSecret);
  const expectedBuffer = Buffer.from(env.REVALIDATE_SECRET);
  if (providedBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

function handleRevalidation(path: string) {
  revalidatePath(path);
  if (path === "/") {
    revalidatePath("/catalogo");
    revalidatePath("/(public)", "page");
    revalidatePath("/(public)/catalogo", "page");
    revalidatePath("/", "layout");
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  let secret = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;

  let path = "/";

  try {
    const body = (await request.json().catch(() => ({}))) as {
      path?: string;
      secret?: string;
    };
    if (body.path && typeof body.path === "string") {
      path = body.path;
    }
    if (!secret && body.secret && typeof body.secret === "string") {
      secret = body.secret;
    }
  } catch {}

  if (!isSecretValid(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    handleRevalidation(path);
    return NextResponse.json({
      success: true,
      message: `Revalidation triggered successfully for path: ${path}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const bearerSecret = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : null;
  const querySecret = request.nextUrl.searchParams.get("secret");
  const secret = bearerSecret || querySecret;
  const path = request.nextUrl.searchParams.get("path") || "/";

  if (!isSecretValid(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    handleRevalidation(path);
    return NextResponse.json({
      success: true,
      message: `Revalidation triggered successfully for path: ${path}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
