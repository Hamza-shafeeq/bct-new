import React, { useState } from "react";
import faqPeop from "../../../public/assets/faqPeop.png";
import Image from "next/image";
const Faqmain = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I get my staking rewards?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuse sed auctor mi. Sed hendrerit tincidunt dui nec interdum. Nam vel elementum risus, at auctor enim. Maecenas condimentum neque non enim rutrum elementum.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      question: "Lorem ipsum dolor sit adipiscing elit?",
      answer: "Lorem ipsum dolor sit adipiscing elit.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet, consectetur elementum sed adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur elementum sed adipiscing elit.",
    },
    {
      question: "Lorem ipsum dolor sit adipiscing elit?",
      answer: "Lorem ipsum dolor sit adipiscing elit.",
    },
    {
      question: "How do I get my staking rewards?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuse sed auctor mi. Sed hendrerit tincidunt dui nec interdum. Nam vel elementum risus, at auctor enim. Maecenas condimentum neque non enim rutrum elementum.",
    },
  ];

  return (
    <main className="flex flex-col items-center px-4 md:px-10 py-8 bg-[#050505] text-white w-full min-h-screen">
      <p className="text-[#E41E34]">Support</p>
      <h1 className="text-[30px]  md:text-[44px] font-semibold mt-2 mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-[#858585] text-[18px] mb-8 max-w-xl text-center">
        Need something cleared up? Here are our most frequently asked questions.
      </p>

      <input
        placeholder="Search"
        className="mb-12 mt-4 px-4 py-2 w-72 rounded-xl bg-[#333] text-white placeholder-gray-500 outline-none"
      />

      <div className="w-full max-w-3xl space-y-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl ${
              activeIndex === index ? "bg-[#222]" : ""
            }`}
          >
            <div
              onClick={() => toggleFaq(index)}
              className="flex items-start gap-9 cursor-pointer"
            >
              <p
                className={`text-2xl w-6 h-6 flex justify-center align-middle items-center rounded-full ${
                  activeIndex === index ? "text-[#E41E34]" : "text-[#E41E34]"
                }`}
                style={{ border: "1px solid #E41E34", padding: "10px" }}
              >
                {activeIndex === index ? "−" : "+"}
              </p>
              <div>
                <h3 className="text-lg font-medium text-left">
                  {faq.question}
                </h3>
                {activeIndex === index && (
                  <p className="mt-2 text-[#858585] text-left">{faq.answer}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="w-full bg-gradient-to-b from-[rgba(34,36,41,0.5)] to-[#050505] max-w-7xl p-6 mt-10 md:mt-24 rounded-2xl"
        style={{ border: "2px solid #222429" }}
      >
        <div className="bg-[#2E3037] text-center text-white py-10 px-4 rounded-2xl mx-auto w-full">
          <div className="flex justify-center space-x-2 mb-4">
            <Image
              src={faqPeop}
              alt="Avatar 1"
              className="w-24 rounded-full border-2 border-gray-800"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">Still have questions?</h2>
          <p className="text-gray-400 mt-2">
            Can’t find the answer you’re looking for? Please chat with our
            friendly team.
          </p>
          <button className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg">
            Get in Touch
          </button>
        </div>
      </div>
    </main>
  );
};

export default Faqmain;
