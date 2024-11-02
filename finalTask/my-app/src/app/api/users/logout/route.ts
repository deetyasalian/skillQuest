import { NextResponse } from "next/server";
import cookie from "cookie";

export async function GET() {
    try {
        // You need to define `token` in this scope or get it from somewhere
        const token = ""; // You should set this with an actual value if needed

        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        });

        // Set the cookie with the correct `sameSite` value
        response.headers.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            sameSite: 'strict', // Use lowercase "strict"
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        }));

        return response;
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
