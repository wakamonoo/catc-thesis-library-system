import Logo from "@/assets/catc-logo.jpg";
import Image from "next/image";
import { BiMenu } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
  return (
    <div className="fixed z-100 w-full flex justify-between items-center p-8 md:px-16 lg:px-32 xl:px-64 h-14">
      <div className="flex items-center gap-2">
        <button className="cursor-pointer">
          <div className="w-12 h-auto">
            <Image
              src={Logo}
              alt="catc_logo"
              className="w-full h-full object-contain"
            />
          </div>
        </button>
        <div className="flex flex-col justify-center mt-2.5">
          <h4 className="text-lg text-brand font-heading font-bold leading-2.5">
            CAT-C
          </h4>
          <p className="text-xs font-alt text-muted">
            Discover • Read • Research
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-12">
        <button>
          <p className="font-alt text-sm font-bold text-brand">Home</p>
        </button>
        <button>
          <p className="font-alt text-sm font-bold text-brand">Featured</p>
        </button>
        <button>
          <p className="font-alt text-sm font-bold text-brand">Browse</p>
        </button>
        <button>
          <p className="font-alt text-sm font-bold text-brand">About</p>
        </button>
      </div>
      <div className="hidden lg:block">
        <button className="flex items-center gap-2 px-4 py-2 border border-panel rounded-full">
          <FaUser className="text-base text-brand shrink-0" />
          <p className="text-sm text-brand">Sign In</p>
        </button>
      </div>
      <div className="block lg:hidden">
        <button>
          <BiMenu className="text-2xl text-brand" />
        </button>
      </div>
    </div>
  );
}
