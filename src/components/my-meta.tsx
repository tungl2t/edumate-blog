import Head from 'next/head';

type Props = {
  title: string | any;
  description: string | any;
  imageUrl: string;
  url: string;
};
const MyMeta = ({ title, description, imageUrl, url }: Props) => {
  const titleContent = `edumate | ${title}`;
  const imgUrl = imageUrl.startsWith('http') ? imageUrl : `https://edumate.vn${imageUrl}`;
  return (
    <Head>
      <title>{titleContent}</title>
      <meta name="title" content={titleContent} />
      <meta name="description" content={description} />
      <meta name="og:title" content={titleContent} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={imgUrl} />
      <meta name="og:url" content={url} />
      <meta name="twitter:title" content={titleContent} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      <meta name="twitter:url" content={url} />
    </Head>
  );
};

export default MyMeta;
