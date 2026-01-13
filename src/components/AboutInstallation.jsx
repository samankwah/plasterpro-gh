import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Shield,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Settings,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutInstallation = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const installationSteps = [
    {
      title: "Initial Assessment",
      description:
        "Our team evaluates your current setup and specific needs to provide the best installation plan.",
      icon: <Wrench className="w-6 h-6" />,
      duration: "1-2 hours",
      details: [
        "Equipment compatibility check",
        "Measurement and fitting",
        "User requirements gathering",
        "Installation plan creation",
      ],
    },
    {
      title: "Setup & Configuration",
      description:
        "Professional installation of the Fowohodie Conversion Kit with careful attention to safety and comfort.",
      icon: <Settings className="w-6 h-6" />,
      duration: "2-3 hours",
      details: [
        "Hardware mounting",
        "Component assembly",
        "Safety system setup",
        "Initial calibration",
      ],
    },
    {
      title: "Testing & Adjustment",
      description:
        "Thorough testing of all components and fine-tuning based on user feedback and comfort.",
      icon: <Wrench className="w-6 h-6" />,
      duration: "1 hour",
      details: [
        "Safety checks",
        "Performance testing",
        "User comfort assessment",
        "Final adjustments",
      ],
    },
  ];

  const pricingPlans = [
    {
      title: "Basic Installation",
      price: "GH₵500",
      features: [
        "Standard hardware installation",
        "Basic configuration",
        "Safety testing",
        "30-day support",
      ],
    },
    {
      title: "Premium Installation",
      price: "GH₵800",
      features: [
        "Enhanced hardware setup",
        "Advanced configuration",
        "Extended safety testing",
        "90-day support",
        "Priority assistance",
        "Custom adjustments",
      ],
      recommended: true,
    },
    {
      title: "Professional Installation",
      price: "GH₵1200",
      features: [
        "Premium hardware setup",
        "Professional configuration",
        "Comprehensive testing",
        "1-year support",
        "24/7 priority assistance",
        "Custom adjustments",
        "Monthly check-ups",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Kwame Mensah",
      role: "Healthcare Professional",
      content:
        "The installation process was incredibly professional and thorough. The team went above and beyond to ensure everything was perfect.",
      rating: 5,
    },
    {
      name: "Abena Osei",
      role: "User",
      content:
        "I was impressed by how carefully they considered my specific needs during installation. The result has significantly improved my mobility.",
      rating: 5,
    },
    {
      name: "Dr. Koffi Addo",
      role: "Rehabilitation Specialist",
      content:
        "As a medical professional, I appreciate the attention to detail and safety standards maintained during the installation process.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How long does the installation process take?",
      answer:
        "The complete installation typically takes 4-6 hours, including initial assessment, setup, and testing. We ensure everything is properly configured and comfortable before we finish.",
    },
    {
      question: "Is the installation covered by warranty?",
      answer:
        "Yes, all installations come with a minimum 30-day warranty. Premium and Professional installations include extended warranty coverage of 90 days and 1 year respectively.",
    },
    {
      question: "Can you install at my location?",
      answer:
        "Yes, we provide on-site installation services throughout Ghana. Our team will come to your preferred location, whether it's your home, clinic, or facility.",
    },
    {
      question: "What maintenance is required after installation?",
      answer:
        "We recommend regular check-ups every 3-6 months to ensure optimal performance. Basic maintenance can be performed by users, and we provide detailed maintenance guides.",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/services")}
          className="text-teal-500 hover:text-teal-600 flex items-center gap-2 transition-colors mb-6"
        >
          <span>←</span>
          <span className="text-sm font-medium">GO BACK</span>
        </button>
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Expert Plastering Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our skilled team at PlasterPro ensures high-quality finishes that
            enhance both durability and aesthetics of your walls and ceilings.
          </p>
        </motion.div>

        {/* Installation Steps */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {installationSteps.map((step, index) => (
            <div
              key={step.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="text-amber-500 mr-3">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{step.description}</p>
              <ul className="space-y-2 mb-4">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{step.duration}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Installation Packages
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.title}
                className={`bg-white rounded-lg shadow-md p-6 relative ${
                  plan.recommended ? "border-2 border-amber-500" : ""
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                    Recommended
                  </div>
                )}
                <h4 className="text-xl font-semibold mb-4">{plan.title}</h4>
                <p className="text-3xl font-bold text-amber-500 mb-6">
                  {plan.price}
                </p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2 px-4 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex text-amber-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-lg text-gray-600 mb-6">
            Ready to give your walls a perfect finish? Schedule your service
            today.
          </p>
          <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors duration-200">
            Book a Plastering Service
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutInstallation;
