function Review() {
  const reviews = [
    {
      name: 'David Carter',
      img: 'https://images.unsplash.com/photo-1597612041762-93a90e22af06',
      profession: 'Tech Enthusiast',
      review:
        'Newtova is an amazing platform for discovering the latest tech products! The upvoting system helps highlight the best innovations, and the reviews give real user insights. Highly recommended for tech lovers!',
    },
    {
      name: 'Daniel Roberts',
      img: 'https://images.unsplash.com/photo-1556474835-b0f3ac40d4d1',
      profession: 'Startup Founder',
      review:
        'As a founder, getting my product in front of the right audience is crucial. Newtova’s submission and upvoting system make it easier to gain visibility. The premium features are worth it for extra exposure!',
    },
    {
      name: 'Handy Wilson',
      img: 'https://images.unsplash.com/photo-1521132293557-5b908a59d1e1',
      profession: 'Software Developer',
      review:
        'I love how user-friendly and well-designed Newtova is! The authentication system is seamless, and the dashboard makes managing my submissions effortless. A must-visit for anyone in the tech space!',
    },
  ];

  return (
    <div id="review" className="container mx-auto w-[70vw] my-16">
      <h1 className="text-3xl lg:text-5xl text-center font-bold my-8">
        What Our Users Say About Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between flex-grow">
        {reviews.map((review) => (
          <div key={review.name} className="mid p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={review.img}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-sm">{review.profession}</p>
              </div>
            </div>
            <p className="mt-3">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
