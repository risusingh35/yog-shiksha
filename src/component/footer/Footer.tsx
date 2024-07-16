import React, { useEffect, useState } from "react";
import { FaLinkedin, FaFacebook, FaInstagramSquare, FaGithub } from "react-icons/fa";
import Link from "next/link";

interface SocialIconProps {
  className: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ className, icon: Icon, href }) => (
  <Link href={href} target="_blank">
    <div className="text-[#ff014f] bg-transparent mx-2 shadow hover:shadow-lg">
      <Icon className={`p-2 ${className}`} />
    </div>
  </Link>
);

const Footer: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime ? currentDateTime.toLocaleString() : "";

  return (
    <footer className="w-full max-w-full mt-2 bg-gray-300 fixed bottom-0 left-0">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between p-4">
        <div className="flex items-center justify-center md:justify-start text-gray-900 mb-4 sm:mb-0">
          <span className="text-xl font-medium">Risu Singh</span>
        </div>
        <div className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2">
          <p>
            © {new Date().getFullYear()}
            <a
              href="mailto:risusingh35@gmail.com"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @risusingh35@gmail.com
            </a>
          </p>
          {currentDateTime && <p>{formattedDateTime}</p>}
        </div>
        <div className="flex justify-center sm:justify-start mt-4 sm:mt-0">
          <SocialIcon
            className="text-3xl"
            icon={FaLinkedin}
            href="https://www.linkedin.com/in/risu-singh-7631b1a5/"
          />
          <SocialIcon
            className="text-3xl"
            icon={FaFacebook}
            href="https://www.facebook.com/risusingh7771815989"
          />
          <SocialIcon
            className="text-3xl"
            icon={FaInstagramSquare}
            href="https://www.instagram.com/rishusinghrk/"
          />
          <SocialIcon
            className="text-3xl"
            icon={FaGithub}
            href="https://github.com/risusingh35"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
