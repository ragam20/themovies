import z from "zod";

const privateEnvSchema = z.object({
  TMDB_API_KEY: z.string(),
  TMDB_ACCESS_TOKEN: z.string(),
});

const createPrivateEnv = () => {
  const parsedEnv = privateEnvSchema.safeParse({
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
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

export const privateEnv = createPrivateEnv();
