import { Props } from 'src/types/PropsInterface';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, ...props }: Props) {
  return (
    <>
      <Header />
      <main {...props}>{children}</main>
      <Footer />
    </>
  );
}
