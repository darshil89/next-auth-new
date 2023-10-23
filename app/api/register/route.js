import { connectToDB } from "../../../utils/index";
import prisma from "../../../prisma/index";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    await connectToDB();

    const { email, phone, address, name, password } = await req.json();
    // console.log({ email, phone, address, name, password });

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exist)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        address,
        name,
        password,
      },
    });
    return NextResponse.json("User Created", { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
