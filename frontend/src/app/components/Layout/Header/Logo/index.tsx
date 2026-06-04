import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ height = 40 }) => {
  return (
    <Link href="/" className="flex items-center gap-3 select-none">
      <Image
        src="/images/logo/hms-logo-v2.png"
        alt="HMS logo"
        width={231}
        height={122}
        style={{ width: "auto", height: `${height}px` }}
        priority
      />
    </Link>
  );
};

export default Logo;
