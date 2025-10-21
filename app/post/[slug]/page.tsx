import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = (await import(`@/content/${slug}.md`)) as {
    default: React.ComponentType;
    frontmatter: { title?: string; description?: string };
  };

  return {
    title: frontmatter.title ?? "Untitled Post",
    description: frontmatter.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { default: Post } = (await import(`@/content/${slug}.md`)) as {
    default: React.ComponentType;
    frontmatter: { title?: string; description?: string };
  };

  return <Post />;
}
