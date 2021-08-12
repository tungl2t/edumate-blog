import remark from 'remark';
import html from 'remark-html';
import remarkExternalLinks from 'remark-external-links';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkExternalLinks, { target: '_blank' })
    .use(html)
    .process(markdown);
  return result.toString();
}
