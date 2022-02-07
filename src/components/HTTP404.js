import notFoundImg from './assets/images/404.png';

import Footer from './Footer';

const HTTP404 = () => {
  return (
    <>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
        <h2>404: Not Found</h2>
        <img src={notFoundImg} width='256px' />
      </div>
      <Footer />
    </>
  );
};

export default HTTP404;