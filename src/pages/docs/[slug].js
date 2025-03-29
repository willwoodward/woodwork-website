import { getDocSlugs, getDocBySlug } from '../../lib/markdown';

export async function getStaticProps({ params }) {
  const doc = await getDocBySlug(params.slug);
  return { props: { doc } };
}

export async function getStaticPaths() {
  const slugs = getDocSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function DocPage({ doc }) {
  return (
    <div className="prose mx-auto">
      <h1>{doc.title || doc.slug}</h1>
      <h4>{doc.description}</h4>
      <div dangerouslySetInnerHTML={{ __html: doc.contentHtml }} />
    </div>
  );
}
