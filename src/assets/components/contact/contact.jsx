const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4 md:px-16 bg-white">
      <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Contact Me</h2>
      <form action="https://formspree.io/f/mzbnwgvw" method="POST" className="max-w-xl mx-auto space-y-4">
        <input name="name" required type="text" placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        <input name="email" required type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        <textarea name="message" required rows="5" placeholder="Your message..." className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;