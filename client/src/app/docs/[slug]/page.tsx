import { getDocBySlug } from '../../../lib/markdown';

interface Params {
    slug: string;
}

export default async function DocPage({ params }: { params: Params}) {
  const { slug } = await params;
  const { contentHtml, title } = await getDocBySlug(slug);

  return (
    <div className="docs">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
