import { NextPage } from "next";
interface Props {
    post?: any;
}

const Post: NextPage<Props> = ({post}) => (
    <div>{post}</div>
)

Post.getInitialProps = async ({req}) => {
    return {
        post: 'post 1'
    };
}

export default Post;
