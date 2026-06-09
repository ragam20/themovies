import z from "zod";

const publicEnvSchema = z.object({
  ENV: z.string(),
  TMDB_BASE_URL: z.string(),
  TMDB_BASE_IMG_URL: z.string(),
});

const createPublicEnv = () => {
  const parsedEnv = publicEnvSchema.safeParse({
    ENV: process.env.NEXT_PUBLIC_ENV,
    TMDB_BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
    TMDB_BASE_IMG_URL: process.env.NEXT_PUBLIC_TMDB_BASE_IMG_URL,
  });

  if (!parsedEnv.success) {
    throw new Error(
      [
        "Invalid environment variables: ",
        ...Object.entries(parsedEnv.error.flatten().fieldErrors).map(
          ([key, errors]) => `- ${key}: ${errors?.join(", ")}`,
        ),
      ].join("\n"),
    );
  }

  return parsedEnv.data ?? {};
};

export const publicEnv = createPublicEnv();
