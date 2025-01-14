import { Helmet, HelmetProvider } from 'react-helmet-async';

function THelmet({ title }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default THelmet;
