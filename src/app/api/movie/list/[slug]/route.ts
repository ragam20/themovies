import { getNowPlaying } from "@/features/movie/api/get-now-playing";
import { getPopular } from "@/features/movie/api/get-popular";
import { getUpComing } from "@/features/movie/api/get-up-coming";
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
    case "now-playing":
      return NextResponse.json(await getNowPlaying(filter));

    case "popular":
      return NextResponse.json(await getPopular(filter));

    case "up-coming":
      return NextResponse.json(await getUpComing(filter));

    default:
      return NextResponse.json(
        {
          message: `Unknown movie type: ${slug}`,
        },
        {
          status: 404,
        },
      );
  }
}
