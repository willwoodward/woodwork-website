import { getDocBySlug } from '../../../lib/markdown';

interface Params {
    slug: string;
}

export default async function DocPage({ params }: { params: Params}) {
  const { slug } = await params;
  const { contentHtml, title, description } = await getDocBySlug(slug);

  return (
    <div className="docs">
      <h1 id='main-title' className='pb-2'>{title}</h1>
      <h3 id='description' className='pb-8'>{description}</h3>
      <div id="content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
