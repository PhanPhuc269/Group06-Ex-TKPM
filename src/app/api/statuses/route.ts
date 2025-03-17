import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";
import type { StudentStatus } from "@/types/student";

// Định nghĩa schema cho StudentStatus
const statusSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

// Kết nối MongoDB
async function getDb() {
  const client = await clientPromise;
  return client.db("student_dashboard").collection("statuses");
}

// 📌 API lấy danh sách tình trạng sinh viên
export async function GET() {
  try {
    const collection = await getDb();
    const statuses = await collection.find({}).toArray();
    return NextResponse.json(statuses, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tình trạng sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi lấy danh sách tình trạng sinh viên" }, { status: 500 });
  }
}

// 📌 API thêm tình trạng sinh viên (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const collection = await getDb();
    await collection.insertOne(parsed.data);
    return NextResponse.json({ message: "Thêm tình trạng sinh viên thành công", status: parsed.data }, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi thêm tình trạng sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi thêm tình trạng sinh viên" }, { status: 500 });
  }
}

// 📌 API cập nhật tình trạng sinh viên (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const collection = await getDb();
    await collection.updateOne({ id: parsed.data.id }, { $set: parsed.data });

    return NextResponse.json({ message: "Cập nhật tình trạng sinh viên thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cập nhật tình trạng sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi cập nhật tình trạng sinh viên" }, { status: 500 });
  }
}

// 📌 API xóa tình trạng sinh viên (DELETE)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID không được để trống" }, { status: 400 });

    const collection = await getDb();
    await collection.deleteOne({ id });

    return NextResponse.json({ message: "Xóa tình trạng sinh viên thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi xóa tình trạng sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi xóa tình trạng sinh viên" }, { status: 500 });
  }
}