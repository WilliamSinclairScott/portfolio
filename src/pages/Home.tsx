import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to my portfolio!</h1>
      <p>
        My name is William Scott, and I am a software engineer with a passion for learning and creating.
      </p>
      <p>
        Here are some of the projects I have worked on:
      </p>
      <ul>
        <li>
          The first project I worked on was a website for a local business. I used HTML, CSS, and PHP in WordPress to refactor the site and make it more user-friendly. You can check it out at <a href="https://thebrooklynstrategist.com">thebrooklynstrategist.com</a>.
        </li>
        <li>
          Another project I worked on is <a href="https://nextmovecafe.com">nextmovecafe.com</a>.
        </li>
        <li>
          I also collaborated with a team of developers on a project called Divvy. It is a full-stack MERN application designed to help friends split expenses after a night out.
        </li>
        <li>
          I led the development of a TypeScript Django project called Chrysalis. It is a full-stack application designed to help freelancers manage their projects and clients.
        </li>
      </ul>
      <p>
        I am currently looking for a position that will allow me to grow as a developer and work on challenging and rewarding projects.
      </p>
    </div>
  );
};

export default Home;