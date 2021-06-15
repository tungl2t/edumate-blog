import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
};
const Meta = ({ title, description, imageUrl, url }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={imageUrl} />
      <meta name="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:url" content={url} />
    </Head>
  );
};

export default Meta;
