import { getAiringToday } from "@/features/tv/api/get-airing-today";
import { getOnTheAir } from "@/features/tv/api/get-on-the-air";
import { getPopular } from "@/features/tv/api/get-popular";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page") ?? "1");
  const minDate = searchParams.get("minDate") ?? undefined;
  const maxDate = searchParams.get("maxDate") ?? undefined;

  const filter = {
    page,
    minDate,
    maxDate,
  };

  switch (slug) {
    case "airing-today":
      return NextResponse.json(await getAiringToday(filter));

    case "popular":
      return NextResponse.json(await getPopular(filter));

    case "on-the-air":
      return NextResponse.json(await getOnTheAir(filter));

    default:
      return NextResponse.json(
        {
          message: `Unknown TV type: ${slug}`,
        },
        {
          status: 404,
        },
      );
  }
}
