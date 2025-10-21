export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="prose lg:prose-xl mx-auto p-8">{children}</div>;
}
