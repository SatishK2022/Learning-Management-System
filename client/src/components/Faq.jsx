import React from "react";
import Container from "./Container";

const faqs = [
  {
    id: 1,
    title: "I am unable to login. What should I do?",
    description:
      "If you are unable to login, it may be due to incorrect email ID or a typing mistake.",
  },
  {
    id: 2,
    title: "Do i need a computer for this course?",
    description:
      "Yes, you are required to have a decent laptop/computer with an internet connection.",
  },

  {
    id: 3,
    title: "Can we download the video content?",
    description:
      "Although you can download the class notes, you will not be allowed to download any video content.",
  },
  {
    id: 4,
    title: "How do the classes take place?",
    description:
      "The classes will take place in both pre-recorded and LIVE modes. The recorded lessons can be accessed from anywhere at any point in time. The timings for the LIVE sessions will be shared after the batch starts.",
  },
  {
    id: 5,
    title:
      "I mistakenly bought the course and need a refund. What is the refund policy?",
    description:
      "As per our policy, we have a strict no refund and no cancellation policy. Refunds are only provided in cases where the course has not been allotted to you after payment.",
  },
];

const Faq = () => {
  return (
    <Container>
      <section>
        <h1 className="text-3xl text-white lg:text-4xl font-semibold py-5 mb-5">
          Frequently Asked{" "}
          <span className="font-bold text-orange-500">Questions</span>
        </h1>
        <div className="flex flex-col gap-4">
          {faqs &&
            faqs.map((faq) => (
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base lg:text-xl font-medium">
                  {faq.title}
                </div>
                <div className="collapse-content">
                  <p className="text-sm lg:text-base">{faq.description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Container>
  );
};

export default Faq;
