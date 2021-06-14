import Link from 'next/link';
import Image from 'next/image';
import PostType from '@/types/post';

type Props = {
  post: PostType;
};

const PostPreview = ({ post }: Props) => {
  const { slug, coverImage, title, excerpt } = post;
  const linkPath = `/posts/${slug}`;
  const imagePath = `https://cms.edumate.vn${coverImage.url}`;
  return (
    <div>
      <Link href={linkPath}>
        <a>
          <div>
            <Image src={imagePath} alt={title} width={300} height={200} layout="responsive" />
          </div>
          <div>
            <h3>{title}</h3>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PostPreview;
