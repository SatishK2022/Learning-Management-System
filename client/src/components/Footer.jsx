import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Container from "./Container";

const footerLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "All Courses",
    link: "/courses",
  },
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "Contact Us",
    link: "/contact",
  },
];

const socialIcons = [
  {
    title: "Facebook",
    icon: <FaFacebookF />,
    link: "#",
  },
  {
    title: "Instagram",
    icon: <FaInstagram />,
    link: "#",
  },
  {
    title: "Twitter",
    icon: <FaXTwitter />,
    link: "#",
  },
  {
    title: "LinkedIn",
    icon: <FaLinkedinIn />,
    link: "#",
  },
];

function Footer() {
  return (
    <Container className="w-full bg-zinc-900 select-none">
      <footer className="relative overflow-hidden">
        <div className="container relative z-10 mx-auto">
          <div className="-m-8 flex flex-wrap flex-col md:flex-row items-center justify-between">
            <div className="w-auto p-8">
              <Link to={"/"}>
                <h2 className="text-xl font-bold select-none">
                  <span className="text-orange-500 text-2xl">C</span>
                  oursify
                </h2>
              </Link>
            </div>
            <div className="w-auto p-8">
              <ul className="-m-5 flex flex-wrap flex-col md:flex-row items-center">
                {footerLinks &&
                  footerLinks.map((nav) => (
                    <li className="p-2 mg:p-5">
                      <Link
                        className="font-medium transition-all duration-200 ease-in-out text-gray-400 hover:text-orange-500"
                        to={nav.link}
                      >
                        {nav.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="w-auto p-8">
              <div className="-m-1.5 flex flex-wrap">
                {socialIcons &&
                  socialIcons.map((icon) => (
                    <div className="w-auto p-1.5">
                      <Link to={icon.link}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full hover:text-orange-500 border border-gray-300 hover:border-orange-500 transition-all duration-300 ease-in-out">
                          {icon.icon}
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
}

export default Footer;
