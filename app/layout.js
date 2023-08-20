import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background: linear-gradient(to right, #232526, #414345);
              background-size: cover;
              background-attachment: fixed;
              color: white;
            }

            .container {
              padding: 20px;
            }
          `}
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}
