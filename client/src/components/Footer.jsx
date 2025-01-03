import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoIosFitness } from "react-icons/io";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer container className="bg-white text-gray-800">
      <div className="w-full max-w-7xl mx-auto py-8 px-5">
        {/* Top Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div>
            <Link
              to="/"
              className="flex items-center whitespace-nowrap text-lg font-bold"
              aria-label="My Workout Collection Homepage"
            >
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-lg p-2 text-white shadow-md">
                <IoIosFitness className="w-6 h-6" />
              </span>
              <span className="ml-3 text-orange-600 font-extrabold">
                My Workout Collection
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Your ultimate guide to tracking and progressing in your fitness
              journey.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Footer.Title title="Explore" className="text-orange-600" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-700"
                >
                  About Us
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/JimmyHe05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-700"
                >
                  GitHub
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-orange-600" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="hover:underline text-gray-700">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" className="hover:underline text-gray-700">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col sm:items-end">
            <Footer.Title title="Follow Us" className="text-orange-600" />
            <div className="flex gap-4 mt-2">
              <Footer.Icon
                href="https://github.com/JimmyHe05"
                icon={FaGithub}
                className="text-gray-600 hover:text-orange-600 transition-colors"
              />
              <Footer.Icon
                href="https://www.linkedin.com/in/jimmy-he-badger/"
                icon={FaLinkedin}
                className="text-gray-600 hover:text-orange-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="border-gray-400" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <Footer.Copyright
            href="#"
            by="My Workout Collection"
            year={new Date().getFullYear()}
            className="text-gray-600"
          />
          <p className="text-sm mt-2 sm:mt-0 text-gray-600">
            Built with 💪 by Jimmy
          </p>
        </div>
      </div>
    </Footer>
  );
}
