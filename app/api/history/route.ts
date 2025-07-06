import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { userHistoryTable } from "../../../configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
export async function POST(req: any) {
  const { content, recordId } = await req.json();
  const user = await currentUser();
  try {
    //Insert record
    const result = await db.insert(userHistoryTable).values({
      recordId: recordId,
      content: content,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: new Date().toString(),
    });

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function PUT(req: any) {
  const { content, recordId } = await req.json();
  try {
    //Insert record
    const result = await db
      .update(userHistoryTable)
      .set({
        content: content,
      })
      .where(eq(userHistoryTable.recordId, recordId));

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(e);
  }
}
