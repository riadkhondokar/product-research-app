import './globals.css';

export const metadata = {
  title: 'FBA Product Research Tracker',
  description: 'Beginner-friendly product tracker for Amazon FBA research'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
