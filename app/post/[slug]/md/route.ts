import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * マークダウンファイルのパスを取得する関数
 */
async function getMarkdownFilePath(slug: string) {
  const filename = `${slug}.md`;
  const filepath = path.join(process.cwd(), "content", filename);

  return filepath;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const filepath = await getMarkdownFilePath(slug);

  // ファイルの存在確認
  const fileExists = await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) {
    return notFound();
  }

  // ファイルの内容を読み込む
  const content = await fs.readFile(filepath, "utf-8");

  return new Response(content, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
