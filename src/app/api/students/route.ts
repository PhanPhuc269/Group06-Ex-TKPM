import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { z } from "zod";

// Xác định schema kiểm tra dữ liệu nhập vào
const studentSchema = z.object({
  mssv: z.string().optional(),
  fullName: z.string().min(3, "Họ tên không hợp lệ"),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), "Ngày sinh không hợp lệ"),
  gender: z.enum(["Nam", "Nữ", "Khác"]),
  faculty: z.enum(["Khoa Luật", "Khoa Tiếng Anh thương mại", "Khoa Tiếng Nhật", "Khoa Tiếng Pháp"]),
  course: z.string(),
  program: z.string(),
  address: z.string(),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^(0[0-9]{9})$/, "Số điện thoại không hợp lệ"),
  status: z.enum(["Đang học", "Đã tốt nghiệp", "Đã thôi học", "Tạm dừng học"]),
});

// Kết nối MongoDB
async function getDb() {
  const client = await clientPromise;
  return client.db("student_management").collection("students");
}

// 📌 API lấy danh sách sinh viên
export async function GET() {
  try {
    const collection = await getDb();
    const students = await collection.find({}).toArray();
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi lấy danh sách sinh viên" }, { status: 500 });
  }
}
// 📌 API thêm sinh viên (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = studentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const collection = await getDb();

    // 🔹 Lấy tất cả MSSV từ database và tìm giá trị lớn nhất
    const students = await collection.find({}, { projection: { mssv: 1 } }).toArray();
    const maxMssv = students.reduce((max, student) => {
      const numberPart = parseInt(student.mssv.replace("SV", ""), 10);
      return isNaN(numberPart) ? max : Math.max(max, numberPart);
    }, 0);

    // 🔹 Tạo MSSV mới với định dạng "SVxxx"
    const newMssv = `SV${String(maxMssv + 1).padStart(3, "0")}`;

    // 🔹 Thêm MSSV vào dữ liệu sinh viên
    const newStudent = { ...parsed.data, mssv: newMssv };

    await collection.insertOne(newStudent);
    return NextResponse.json({ message: "Thêm sinh viên thành công", student: newStudent }, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi thêm sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi thêm sinh viên" }, { status: 500 });
  }
}


// 📌 API cập nhật sinh viên (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parsed = studentSchema.safeParse(body);
    console.log(parsed);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const collection = await getDb();
    await collection.updateOne({ mssv: parsed.data.mssv }, { $set: parsed.data });

    return NextResponse.json({ message: "Cập nhật thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi cập nhật sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi cập nhật" }, { status: 500 });
  }
}

// 📌 API xóa sinh viên (DELETE)
export async function DELETE(req: Request) {
  try {
    const { mssv } = await req.json();
    if (!mssv) return NextResponse.json({ error: "MSSV không được để trống" }, { status: 400 });

    const collection = await getDb();
    await collection.deleteOne({ mssv });

    return NextResponse.json({ message: "Xóa thành công" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi khi xóa sinh viên:", error);
    return NextResponse.json({ error: "Lỗi khi xóa" }, { status: 500 });
  }
}