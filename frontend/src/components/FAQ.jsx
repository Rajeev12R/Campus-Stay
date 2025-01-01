import React, { useState } from 'react';

const FAQ = () => {
  const questions = [
    {
      id: 1,
      question: "How can I book a room?",
      answer:
        "To book a room, navigate to the 'Book Now' section on our homepage. Select your preferred accommodation type, check availability, and follow the prompts to complete your booking. You'll receive a confirmation email once your booking is confirmed.",
    },
    {
      id: 2,
      question: "What types of rooms are available?",
      answer:
        "We offer a range of accommodation options including single rooms, shared rooms, and suites. You can find detailed descriptions and pricing for each type on our 'Rooms' page.",
    },
    {
      id: 3,
      question: "What amenities are included with the room?",
      answer:
        "Each room comes with essential amenities such as Wi-Fi, a bed, a desk, and storage. Some rooms may also include additional features like air conditioning, a private bathroom, and a kitchenette. Check the room details for specific amenities.",
    },
    {
      id: 4,
      question: "Is there a cancellation policy?",
      answer:
        "Yes, we have a flexible cancellation policy. You can cancel your booking up to 48 hours before the check-in date for a full refund. For cancellations within 48 hours, a cancellation fee may apply. Please refer to our 'Cancellation Policy' for more details.",
    },
    {
      id: 5,
      question: "How do I contact the accommodation if I have issues during my stay?",
      answer:
        "If you encounter any issues during your stay, please contact our support team through the 'Contact Us' page on our website. Alternatively, you can reach out to the accommodation's on-site management directly using the contact information provided in your booking confirmation.",
    },
    {
      id: 6,
      question: "Are there any additional fees or charges?",
      answer:
        "Additional fees may apply for services such as late check-out, extra cleaning, or special requests. These fees will be communicated to you at the time of booking or upon check-in. Please review the terms and conditions for a full breakdown of potential charges.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative mx-auto w-full py-16 px-5 font-sans text-gray-800 sm:px-20 md:max-w-screen-lg lg:py-24">
      <h2 className="mb-5 text-center font-sans text-4xl sm:text-5xl font-bold">Frequently Asked Questions</h2>
      <p className="mb-12 text-center text-lg text-gray-600">Here are some of the most common questions about booking and staying with us. If you have any other queries, feel free to reach out.</p>
      <ul className="space-y-4">
        {questions.map((item) => (
          <li key={item.id} className="text-left">
            <div
              className="relative flex flex-col rounded-md border bg-white/20 border-gray-100 shadow-md cursor-pointer"
              onClick={() => toggleAnswer(item.id)}
            >
              <div className="relative ml-4 py-4 pr-12">
                <h3 className="text-sm text-gray-600 lg:text-base">{item.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition-transform ${openIndex === item.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className={`max-h-0 overflow-hidden transition-all duration-500 ${openIndex === item.id ? 'max-h-96' : ''}`}>
                <div className="p-5">
                  <p className="text-sm">{item.answer}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col justify-center items-center">
        <a className="inline-flex rounded-lg py-3 px-5 text-2xl text-gray-600" href="#">Still have questions?</a>
        <a className="inline-flex cursor-pointer rounded-lg bg-[#101827] py-3 px-9 my-3 text-lg text-white" href="#">Contact us</a>
      </div>
    </div>
  );
};

export default FAQ;
