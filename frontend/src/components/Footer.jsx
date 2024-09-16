import React from "react";

const Footer = () => {
  return (
    <footer className="hidden md:block footer bg-base-200 text-black items-center p-4 fixed bottom-0 w-full border-t border-gray-300 ">
      <aside className="flex items-center justify-between w-full">
        <p>
          Created by Trupti Yadav © {new Date().getFullYear()} - All rights
          reserved
        </p>
        <nav className="flex gap-4">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/trupti-yadav/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-600 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.5h-3v-4.5c0-1.653-2-1.52-2 0v4.5h-3v-9h3v1.403c1.396-2.586 5-2.777 5 2.476v5.121z" />
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/Trupti0406"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-600 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path d="M12 .5c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.087-.743.083-.727.083-.727 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.774.418-1.305.761-1.604-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.469-2.382 1.236-3.221-.124-.305-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.046.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.871.119 3.176.77.839 1.236 1.911 1.236 3.221 0 4.61-2.803 5.624-5.473 5.922.43.372.814 1.102.814 2.221v3.293c0 .32.219.694.825.577 4.765-1.591 8.198-6.087 8.198-11.385 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          {/* Mail */}
          <a
            href="mailto:truptiyadav.in@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-600 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current">
              <path d="M12 13.5l8-6.5h-16l8 6.5zm0 1.5l-12-9v14h24v-14l-12 9z" />
            </svg>
          </a>
        </nav>
      </aside>
    </footer>
  );
};

export default Footer;
