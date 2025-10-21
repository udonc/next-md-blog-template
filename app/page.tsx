import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";

type PostSummary = {
  slug: string;
  title: string;
  description?: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

async function getPosts(): Promise<PostSummary[]> {
  const entries = await readdir(CONTENT_DIR, { withFileTypes: true });

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
      .map(async (entry) => {
        const filename = entry.name;
        const slug = filename.replace(/\.mdx?$/, "");
        const module = (await import(`@/content/${filename}`)) as {
          frontmatter?: { title?: string; description?: string };
        };

        return {
          slug,
          title: module.frontmatter?.title ?? slug,
          description: module.frontmatter?.description,
        };
      }),
  );

  return posts.sort((a, b) => a.slug.localeCompare(b.slug, "ja"));
}

export const metadata: Metadata = {
  title: "ブログ",
  description: "Markdownで書かれた記事の一覧ページです。",
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-12">
      <section>
        <h1 className="text-4xl font-bold tracking-tight">ブログ</h1>
        <p className="mt-4 text-lg text-gray-600">
          最新の記事をこちらからご覧いただけます。
        </p>
      </section>

      <section className="space-y-10">
        {posts.length === 0 ? (
          <p className="text-gray-500">まだ記事がありません。</p>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="group border-b border-gray-200 pb-6 transition"
            >
              <h2 className="text-2xl font-semibold">
                <Link
                  href={`/post/${post.slug}`}
                  className="hover:text-blue-600 focus-visible:text-blue-600"
                >
                  {post.title}
                </Link>
              </h2>
              {post.description ? (
                <p className="mt-2 text-gray-600">{post.description}</p>
              ) : null}
              <div className="mt-4">
                <Link
                  href={`/post/${post.slug}`}
                  className="text-sm font-medium text-blue-600 hover:underline focus-visible:underline"
                >
                  記事を読む →
                </Link>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
