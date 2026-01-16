import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { usePageMeta } from "../../../hooks/usePageMeta";
import { PAGE_METADATA } from "../../../constants/pageMetadata";

function Contact() {
  usePageMeta(PAGE_METADATA.contact.title, PAGE_METADATA.contact.description);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, isSubmitted: false, error: null });

    const formspreeId = import.meta.env.VITE_FORMSPREE_CONTACT_FORM_ID;

    // Check if Formspree ID is configured
    if (!formspreeId || formspreeId === "your_contact_form_id_here") {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error:
          "Form service not configured. Please check your environment variables.",
      });
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState({ isSubmitting: false, isSubmitted: true, error: null });
        setFormData({ name: "", email: "", message: "", phone: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormState({
            isSubmitting: false,
            isSubmitted: false,
            error: null,
          });
        }, 5000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error:
          "Failed to send message. Please try again or contact us via WhatsApp.",
      });
    }
  };

  const contactMethods = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "East Legon Hills, Accra",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+233 249 718 356",
      details2: "+233 244 493 6551",
      color: "from-slate-700 to-slate-800",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "plasterproent@gmail.com",
      color: "from-blue-600 to-slate-700",
    },
  ];

  const faqs = [
    {
      question: "What is POP Ceiling Installation?",
      answer:
        "POP Ceiling Installation involves using high-quality Plaster of Paris to create elegant, modern ceilings that enhance interior spaces.",
    },
    {
      question: "How do Room Lighting Solutions improve my space?",
      answer:
        "Our Room Lighting Solutions are designed to provide energy-efficient and stylish lighting, improving both the aesthetics and functionality of your space.",
    },
    {
      question: "What services are included in Hardware Installation?",
      answer:
        "We offer expert installation of various building hardware, including ceiling frames, wall brackets, and other essential fittings to ensure your space is secure and visually appealing.",
    },
    {
      question: "How can I book Repairs & Maintenance services?",
      answer:
        "You can easily contact us via our website form or email us directly to schedule repairs and maintenance for your ceilings, walls, or lighting fixtures.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-gray-100 text-black py-12 md:py-16 pt-24 md:pt-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Get in Touch with PlasterPro
          </h1>
          <p className="text-base md:text-xl text-black max-w-2xl mx-auto">
            We're here to help bring your vision to life. Reach out to us today!
          </p>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Contact Methods Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-12 md:mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-gray-100"
            >
              <div
                className={`inline-flex p-3 md:p-4 bg-gradient-to-br ${method.color} rounded-lg md:rounded-xl mb-3 md:mb-4`}
              >
                <method.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed break-words">
                {method.details}
              </p>
              {method.details2 && (
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed break-words">
                  {method.details2}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Contact Form */}
          <div className="bg-white shadow-xl rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-100">
            <h2 className="text-xl md:text-3xl font-bold mb-5 md:mb-6 flex items-center text-gray-900">
              <Send className="mr-2 md:mr-3 text-blue-600" size={24} />
              <span className="text-lg md:text-3xl">Send us a Message</span>
            </h2>

            {formState.isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 text-center">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formState.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{formState.error}</p>
                  </div>
                )}
                <div>
                  <label className="block mb-2 text-gray-700 font-medium flex items-center text-sm">
                    <User className="mr-2 text-blue-600" size={18} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium flex items-center text-sm">
                    <Mail className="mr-2 text-blue-600" size={18} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium flex items-center text-sm">
                    <Phone className="mr-2 text-blue-600" size={18} />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="+233 123 456 789"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 font-medium flex items-center text-sm">
                    <MessageCircle className="mr-2 text-blue-600" size={18} />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center font-semibold shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-6">
            {/* Office Hours */}
            <div className="bg-white shadow-xl rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-100">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center text-gray-900">
                <Clock className="mr-2 md:mr-3 text-blue-600" size={20} />
                <span className="text-base md:text-xl">Office Hours</span>
              </h3>
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-4 md:p-5 rounded-lg md:rounded-xl">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-700 font-medium">
                      Monday - Friday
                    </span>
                    <span className="text-sm md:text-base text-gray-900 font-semibold">
                      9:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-700 font-medium">
                      Saturday
                    </span>
                    <span className="text-sm md:text-base text-gray-900 font-semibold">
                      10:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-gray-700 font-medium">
                      Sunday
                    </span>
                    <span className="text-sm md:text-base text-gray-500">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white shadow-xl rounded-xl md:rounded-2xl p-5 md:p-8 border border-gray-100">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center text-gray-900">
                <MapPin className="mr-2 md:mr-3 text-blue-600" size={20} />
                <span className="text-base md:text-xl">Find Us on the Map</span>
              </h3>
              <div className="bg-gray-200 rounded-lg md:rounded-xl h-56 md:h-64 overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5236.664162824433!2d-0.1248235666702112!3d5.680111695431955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf8304b16b9965%3A0xdc89da7f4fff61a0!2sPlaster%20Pro!5e0!3m2!1sen!2sgh!4v1768559524922!5m2!1sen!2sgh"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Accordion Style */}
        <div className="mt-12 md:mt-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start flex-1 pr-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-blue-100 text-blue-600 rounded-full text-xs md:text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                      ?
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-9 md:pl-10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-8 md:mt-12 bg-gradient-to-br from-gray-300 to-gray-700 rounded-xl md:rounded-2xl p-6 md:p-8 text-center shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
            Prefer to chat directly?
          </h3>
          <p className="text-sm md:text-base text-blue-50 mb-4 md:mb-6 px-2">
            Get instant responses to your questions via WhatsApp
          </p>
          <button
            onClick={() => {
              window.open(
                "https://wa.me/233249718356?text=Hi%2C%20I%20have%20a%20question",
                "_blank"
              );
            }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
