function Footer() {
  return (
    <>
      <div className=" bg-agent h-[200px] lg:pt-4 w-full mt-10 absolute  ">
        {" "}
        <a
          href="https://playvalorant.com/en-us/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-transparent hidden sm:flex md:flex lg:flex items-center justify-center mt-5">
            <img
              className=" h-[30px] w-[30px]  bg-transparent  opacity-80 mx-4 "
              src="https://cdn.discordapp.com/attachments/1144637676016898219/1163455816230256750/image.png?ex=653fa3aa&is=652d2eaa&hm=50d91cf61855f7edfcb40e6481864cfeba323a38fb5b9de2e5fee07abc73b4ad&"
            />
            <p
              title="Valorant Download"
              className=" text-center bg-transparent text-[20px] font-semibold tracking-wider  "
            >
              Valorant Download
            </p>
          </div>
        </a>
        <div className="bg-transparent flex items-center justify-center mt-4">
          <div className="w-[50%] lg:w-[30%] items-center bg-transparent">
            <p className="bg-transparent text-[12px]  mt-4">
              © Copyright This Page and Valorant-API. All Rights Reserved
              Valorant-API is a non-official API and not endorsed by Riot Games
              in any way. Riot Games, Valorant, and all associated properties
              are trademarks or registered trademarks of Riot Games, Inc.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
