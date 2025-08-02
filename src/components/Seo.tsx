import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  schema?: object;
}

const SEO: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  schema,
}) => {
  const siteUrl = 'https://libracredito.com.br';
  const fullCanonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;
  const fullOgImageUrl = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/images/logos/libra-logo.png`; // Default image

  // Otimização do título e descrição para os limites recomendados
  const optimizedTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  const optimizedDescription = description.length > 160 ? `${description.substring(0, 157)}...` : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />

      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl || siteUrl} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="Libra Crédito" />
      <meta property="og:locale" content="pt_BR" />


      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullCanonicalUrl || siteUrl} />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={fullOgImageUrl} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
