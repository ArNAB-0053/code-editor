import Image from "next/image";

const EmptyBox = () => {
  return (
    <Image
      src="/empty-inbox.png"
      width={400}
      height={400}
      alt=""
      className="w-16 invert brightness-10 contrast-50 grayscale"
    />
  );
};

export default EmptyBox;
