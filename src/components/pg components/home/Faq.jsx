function Faq() {
  const faqs = [
    {
      question: 'How do I submit a new product on Newtova?',
      answer:
        "To submit a product, follow these steps:\n1. Log in or sign up if you don't have an account.\n2. Go to the 'Submit Product' page from the navbar.\n3. Fill in details like product name, description, image URL, and category.\n4. Click the 'Submit' button to add your product.\n5. A confirmation message will appear once your product is successfully submitted.",
    },
    {
      question: 'How does the upvoting system work?',
      answer:
        "The upvoting system helps highlight popular products:\n1. Log in to your account.\n2. Browse the product listings.\n3. Click the upvote button on a product you like.\n4. The upvote count will increase, and you won't be able to upvote the same product again.",
    },
    {
      question: 'Can I edit or delete a product I submitted?',
      answer:
        "Yes, you can manage your submitted products:\n1. Go to your dashboard after logging in.\n2. Find the product you want to update or delete.\n3. Click the 'Edit' button to modify details or the 'Delete' button to remove it.",
    },
    {
      question: 'Is there a way to post reviews and ratings?',
      answer:
        'Yes! You can leave a review and rate products:\n1. Log in to your account.\n2. Open the product details page.\n3. Scroll down to the reviews section.\n4. Write your review, select a rating, and submit.',
    },
    {
      question: 'What are the benefits of premium features?',
      answer:
        'Premium features provide additional visibility and tools:\n1. Your submitted product gets highlighted.\n2. Access to advanced analytics about product engagement.\n3. Priority listing in product categories.\n4. More features coming soon!',
    },
  ];

  return (
    <div id="faq" className="mt-12 container mx-auto px-4 lg:w-[70vw] my-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        Frequently Asked Questions
      </h1>
      {faqs.map((faq, id) => (
        <div key={id} className="collapse collapse-arrow my-3 border">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            <h2>{faq.question}</h2>
          </div>
          <div className="collapse-content">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Faq;
