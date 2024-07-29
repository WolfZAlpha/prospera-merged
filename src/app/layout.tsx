import "../styles/index.css"

const isDev = process.env.NODE_ENV === 'development'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta name="description" content="PROSPERA – is a cutting-edge De-Fi company at the forefront of innovation in the Artificial Intelligence sector." />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}