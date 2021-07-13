import { getServices } from '@/lib/api';
import Layout from '@/components/layout';
type Props = {
  services: any;
};

const Index = ({ services }: Props) => {
  console.log(services);
  return <Layout>Services works!</Layout>;
};

export default Index;

export const getServerSideProps = async () => {
  const services = (await getServices('vi')) || [];
  return {
    props: {
      services,
    },
  };
};
