type ContactFormEmailProps = { message: string; senderEmail: string };

export default function ContactFormEmail({
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <html lang="en">
      <head>
        <title>New portfolio message</title>
      </head>
      <body
        style={{
          backgroundColor: "#f3f4f6",
          color: "#000",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 6,
            maxWidth: 600,
            margin: "0 auto",
            padding: "16px 40px",
          }}
        >
          <h1 style={{ fontSize: 24, lineHeight: 1.25 }}>
            You received the following message from the contact form
          </h1>
          <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
          <hr />
          <p>The sender&apos;s email is: {senderEmail}</p>
        </div>
      </body>
    </html>
  );
}
