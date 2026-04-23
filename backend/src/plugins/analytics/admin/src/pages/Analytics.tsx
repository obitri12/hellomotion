import { Box, Typography, Flex, Alert } from '@strapi/design-system';
import { Layouts } from '@strapi/strapi/admin';

const LOOKER_STUDIO_URL = process.env.STRAPI_ADMIN_ANALYTICS_EMBED_URL || '';

const Analytics = () => {
  return (
    <Layouts.Root>
      <Layouts.Header
        title="Analytics"
        subtitle="Traffic & performa website HelloMotion"
      />
      <Layouts.Content>
        <Box padding={4}>
          {LOOKER_STUDIO_URL ? (
            <Box
              background="neutral0"
              shadow="filterShadow"
              borderColor="neutral150"
              hasRadius
              style={{ overflow: 'hidden', borderRadius: '8px' }}
            >
              <iframe
                src={LOOKER_STUDIO_URL}
                width="100%"
                height="900"
                style={{ border: 'none', display: 'block' }}
                allowFullScreen
                title="Google Analytics Dashboard"
              />
            </Box>
          ) : (
            <Box>
              <Alert
                variant="default"
                title="Setup Analytics Dashboard"
                closeLabel="Close"
              >
                <Typography>
                  Untuk menampilkan data analytics di sini, ikuti langkah berikut:
                </Typography>
              </Alert>

              <Box
                marginTop={4}
                padding={6}
                background="neutral0"
                shadow="filterShadow"
                hasRadius
              >
                <Typography variant="beta" tag="h2">
                  Cara Setup Looker Studio
                </Typography>

                <Box marginTop={4}>
                  <Flex direction="column" gap={3}>
                    <Typography>
                      <strong>1.</strong> Buka{' '}
                      <a
                        href="https://lookerstudio.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#4945FF' }}
                      >
                        lookerstudio.google.com
                      </a>
                    </Typography>
                    <Typography>
                      <strong>2.</strong> Klik "Create" → "Report" → pilih data source "Google Analytics"
                    </Typography>
                    <Typography>
                      <strong>3.</strong> Pilih properti GA4 kamu (G-QMY66L0590)
                    </Typography>
                    <Typography>
                      <strong>4.</strong> Desain dashboard sesuai kebutuhan (visitors, page views, dll)
                    </Typography>
                    <Typography>
                      <strong>5.</strong> Klik "Share" → "Get report link" → pilih "Embed"
                    </Typography>
                    <Typography>
                      <strong>6.</strong> Copy URL embed-nya, lalu tambahkan di file{' '}
                      <code style={{ background: '#f0f0ff', padding: '2px 6px', borderRadius: '4px' }}>
                        backend/.env
                      </code>
                    </Typography>
                    <Box
                      marginTop={2}
                      padding={4}
                      background="neutral100"
                      hasRadius
                    >
                      <code style={{ fontSize: '14px', wordBreak: 'break-all' }}>
                        ANALYTICS_EMBED_URL=https://lookerstudio.google.com/embed/reporting/YOUR-REPORT-ID/page/p_xxxxx
                      </code>
                    </Box>
                    <Typography>
                      <strong>7.</strong> Restart Strapi — dashboard akan muncul di halaman ini.
                    </Typography>
                  </Flex>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Layouts.Content>
    </Layouts.Root>
  );
};

export default Analytics;
