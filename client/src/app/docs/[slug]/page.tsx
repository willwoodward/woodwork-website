/* eslint-disable @typescript-eslint/no-explicit-any */

import { getDocBySlug } from '../../../lib/markdown';

interface PageParams {
    params: any;
}

export default async function DocPage({ params }: PageParams) {
  const { slug } = params;
  const { contentHtml, title, description } = await getDocBySlug(slug);

  return (
    <div className="docs">
      <h1 id='main-title' className='pb-2'>{title}</h1>
      <h3 id='description' className='pb-8'>{description}</h3>
      <div id="content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
