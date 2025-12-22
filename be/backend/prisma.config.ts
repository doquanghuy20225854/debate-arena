import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    // đúng đường dẫn schema của bạn
    schema: "prisma/schema.prisma",

    datasource: {
        url: env("DATABASE_URL"),
    },
});
