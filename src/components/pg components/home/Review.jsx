function Review() {
  const reviews = [
    {
      name: 'David Carter',
      img: 'https://img.freepik.com/free-photo/positive-young-man_1385-2287.jpg',
      profession: 'Tech Enthusiast',
      review:
        'Newtova is an amazing platform for discovering the latest tech products! The upvoting system helps highlight the best innovations, and the reviews give real user insights. Highly recommended for tech lovers!',
    },
    {
      name: 'Daniel Roberts',
      img: 'https://st3.depositphotos.com/1715570/14089/i/450/depositphotos_140892126-stock-photo-laughing-young-african-guy.jpg',
      profession: 'Startup Founder',
      review:
        'As a founder, getting my product in front of the right audience is crucial. Newtova’s submission and upvoting system make it easier to gain visibility. The premium features are worth it for extra exposure!',
    },
    {
      name: 'Handy Wilson',
      img: 'https://img.freepik.com/free-photo/portrait-smiling-handsome-man-eyeglasses_171337-4853.jpg?t=st=1746185601~exp=1746189201~hmac=7cb1578e7ce3f3ebb28ed3c924d565ea5a9a69e893c23a94286860b03a9156ff&w=1380',
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
          <div key={review.name} className="mid p-4 rounded-lg border border-[#4a484a] hover:border-[#fff]">
            <div className="flex items-center space-x-4">
              <img
                src={review.img}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-left">{review.name}</h3>
                <p className="text-sm opacity-70 text-left">{review.profession}</p>
              </div>
            </div>
            <p className="mt-3 text-left">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
