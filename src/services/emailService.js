import emailjs from "@emailjs/browser";

export async function sendEnquiryEmail(formData) {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
}